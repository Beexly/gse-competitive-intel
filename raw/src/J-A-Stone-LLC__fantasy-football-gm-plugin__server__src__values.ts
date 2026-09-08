import { cached } from "./cache.js";
import { fetchJson } from "./http.js";
import { canonicalPosition, type Coverage } from "./identity.js";
import type { PlayerIndex } from "./sleeper.js";

interface FcRow {
  player: {
    id: number;
    name: string;
    sleeperId: string | null;
    position: string;
    maybeTeam: string | null;
    maybeAge: number | null;
  };
  value: number;
  overallRank: number;
  positionRank: number;
  trend30Day: number;
  redraftValue: number;
  maybeTier: number | null;
}

export interface ValueEntry {
  player_id: string;
  name: string;
  position: string;
  team: string;
  value: number;
  overall_rank: number;
  position_rank: number;
  tier: number | null;
  trend_30_day: number;
}

export interface ValueBoard {
  entries: ValueEntry[];
  by_player: Record<string, ValueEntry>;
  coverage: Coverage;
  /**
   * 🔴 FantasyCalc covers QB/RB/WR/TE only — measured 193 players on 2026-08-25,
   * zero kickers and zero defenses. A trade containing a K or DEF is an
   * INCOMPLETE valuation, and callers must say so rather than treating the
   * missing side as worth nothing.
   */
  priced_positions: string[];
  unpriced_positions: string[];
  /** Ages by Sleeper id, for dynasty contexts. The source already carries them. */
  ages: Map<string, number>;
  source: { name: string; url: string; settings: string; fetched_at: string };
}

const TTL_MS = 6 * 60 * 60 * 1000;
const PRICED = ["QB", "RB", "WR", "TE"];

export async function getTradeValues(
  players: PlayerIndex,
  opts: { isDynasty: boolean; numQbs: number; numTeams: number; ppr: number },
): Promise<ValueBoard> {
  const url =
    `https://api.fantasycalc.com/values/current?isDynasty=${opts.isDynasty}` +
    `&numQbs=${opts.numQbs}&numTeams=${opts.numTeams}&ppr=${opts.ppr}`;
  const hit = await cached(
    `fantasycalc-${opts.isDynasty}-${opts.numQbs}-${opts.numTeams}-${opts.ppr}`,
    TTL_MS,
    () => fetchJson<FcRow[]>(url),
  );

  const entries: ValueEntry[] = [];
  const unmatched: Coverage["unmatched"] = [];

  for (const row of hit.value) {
    const sid = row.player.sleeperId;

    // Draft picks are priced assets with their own ids, not players — a dynasty
    // manager trades them constantly, and dropping them made the whole category
    // invisible to the valuation.
    if (row.player.position === "PICK") {
      entries.push({
        player_id: sid ?? `pick:${row.player.id}`,
        name: row.player.name,
        position: "PICK",
        team: "",
        value: opts.isDynasty ? row.value : row.redraftValue,
        overall_rank: row.overallRank,
        position_rank: row.positionRank,
        tier: row.maybeTier,
        trend_30_day: row.trend30Day,
      });
      continue;
    }
    // FantasyCalc ships a Sleeper id outright; a row without one that we cannot
    // confirm against the player index is dropped LOUDLY, not name-matched.
    if (sid && players[sid]) {
      entries.push({
        player_id: sid,
        name: row.player.name,
        position: canonicalPosition(row.player.position),
        team: row.player.maybeTeam ?? "",
        value: opts.isDynasty ? row.value : row.redraftValue,
        overall_rank: row.overallRank,
        position_rank: row.positionRank,
        tier: row.maybeTier,
        trend_30_day: row.trend30Day,
      });
    } else {
      unmatched.push({
        name: row.player.name,
        position: canonicalPosition(row.player.position),
        team: row.player.maybeTeam ?? "",
      });
    }
  }

  const total = hit.value.length;
  return {
    entries,
    by_player: Object.fromEntries(entries.map((e) => [e.player_id, e])),
    coverage: {
      matched: entries.length,
      total,
      rate: total === 0 ? 1 : entries.length / total,
      unmatched,
    },
    ages: new Map(
      hit.value
        .filter((r) => r.player.sleeperId && r.player.maybeAge !== null)
        .map((r) => [r.player.sleeperId!, r.player.maybeAge!]),
    ),
    priced_positions: PRICED,
    unpriced_positions: ["K", "DEF"],
    source: {
      name: "FantasyCalc",
      url: "https://fantasycalc.com",
      settings:
        `${opts.numTeams}-team, ${opts.numQbs} QB, ${opts.ppr} PPR, ` +
        `${opts.isDynasty ? "dynasty" : "redraft"}`,
      fetched_at: hit.fetchedAt.toISOString(),
    },
  };
}
