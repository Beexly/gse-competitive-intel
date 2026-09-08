import { canonicalPosition } from "./identity.js";
import { optimalLineup, startableSlots } from "./lineup.js";
import { rosterSpots } from "./trade.js";
import type { PlayerIndex, SleeperPlayer, SleeperRoster } from "./sleeper.js";
import type { ValueBoard, ValueEntry } from "./values.js";

/**
 * Finds trades that do not exist yet.
 *
 * The thesis is one piece of arithmetic, and it is checkable: **a player sitting
 * on your bench who would out-value another team's worst starter at his position
 * is a trade waiting to happen** — he is worth more to them than to you, and the
 * reverse holds for somebody on their bench.
 *
 * Everything here prices on one published scale and describes fit. It never says
 * a side wins. Two teams can both improve their starting lineup on the same
 * scale, and that is the whole point of a trade; it is not a claim about how the
 * season goes.
 *
 * 🔴 FantasyCalc prices QB/RB/WR/TE only. Kickers and defenses cannot appear on
 * either side of a proposal, and the report says so rather than valuing them at
 * zero.
 */

export interface RosterView {
  roster_id: number;
  owner: string | null;
  /** Best startable arrangement by trade value, so "worst starter" is well defined. */
  starters: Array<{ slot: string; player_id: string | null; value: number }>;
  /** Priced players not in that arrangement. */
  bench: Array<{ player_id: string; position: string; value: number }>;
  /** Lowest-valued starter at each position, the bar a trade has to clear. */
  worst_starter: Record<string, { player_id: string; value: number }>;
  unpriced: string[];
}

export interface TradeIdea {
  with_roster_id: number;
  with_owner: string | null;
  you_give: Array<{ player_id: string; name: string; position: string; value: number }>;
  you_get: Array<{ player_id: string; name: string; position: string; value: number }>;
  value_delta: number;
  /** What each side's starting lineup gains, on this scale. */
  your_lineup_gain: number;
  their_lineup_gain: number;
  rationale: string;
}

const displayName = (p: SleeperPlayer | undefined, id: string): string =>
  p ? (p.full_name ?? [p.first_name, p.last_name].filter(Boolean).join(" ").trim()) : id;

export function rosterView(
  roster: SleeperRoster,
  owner: string | null,
  rosterPositions: string[],
  values: Record<string, ValueEntry>,
  players: PlayerIndex,
): RosterView {
  const owned = roster.players ?? [];
  const priced = owned.filter((id) => values[id] !== undefined);
  const weights = Object.fromEntries(priced.map((id) => [id, values[id]!.value]));

  const lineup = optimalLineup(weights, priced, rosterPositions, players);
  const seated = new Set(
    lineup.assignments.map((a) => a.player_id).filter((id): id is string => Boolean(id)),
  );

  const worst: RosterView["worst_starter"] = {};
  for (const a of lineup.assignments) {
    if (!a.player_id) continue;
    const pos = canonicalPosition(players[a.player_id]?.position ?? "");
    const current = worst[pos];
    if (!current || a.points < current.value) {
      worst[pos] = { player_id: a.player_id, value: a.points };
    }
  }

  return {
    roster_id: roster.roster_id,
    owner,
    starters: lineup.assignments.map((a) => ({ slot: a.slot, player_id: a.player_id, value: a.points })),
    bench: priced
      .filter((id) => !seated.has(id))
      .map((id) => ({
        player_id: id,
        position: canonicalPosition(players[id]?.position ?? ""),
        value: values[id]!.value,
      }))
      .sort((a, b) => b.value - a.value),
    worst_starter: worst,
    unpriced: owned.filter((id) => values[id] === undefined),
  };
}

/** How much a roster's starting lineup gains by swapping `out` for `in`. */
function lineupGain(
  view: RosterView,
  roster: SleeperRoster,
  outIds: string[],
  inIds: string[],
  rosterPositions: string[],
  values: Record<string, ValueEntry>,
  players: PlayerIndex,
): number {
  const before = view.starters.reduce((sum, s) => sum + s.value, 0);
  const owned = (roster.players ?? []).filter((id) => !outIds.includes(id)).concat(inIds);
  const priced = owned.filter((id) => values[id] !== undefined);
  const weights = Object.fromEntries(priced.map((id) => [id, values[id]!.value]));
  const after = optimalLineup(weights, priced, rosterPositions, players).total;
  return Math.round((after - before) * 10) / 10;
}

export interface FindOptions {
  /** Largest tolerated gap between the two sides, as a share of the larger side. */
  balanceBand: number;
  /** The proposing side must gain at least this much for the idea to be worth raising. */
  minGain: number;
  limit: number;
  /**
   * Also search package shapes: two-for-one and three-for-one consolidation,
   * and two-for-two. On a deep roster consolidation is where the trade usually
   * is: quantity you cannot start, turned into one player you can.
   */
  packages?: boolean;
}

/**
 * 🔴 The package search is BOUNDED, and the bounds are published in
 * diagnostics.pool_caps — a bounded search that does not say where it is
 * bounded reads as exhaustive. Their top bench players are the only targets
 * worth consolidating FOR, and your top bench the material; both caps sit
 * above the priced-bench size of every roster measured while building this.
 * Revisit if diagnostics show them binding.
 */
const POOL_CAPS = { their_bench: 8, my_bench: 10 } as const;

/**
 * Where candidate trades died.
 *
 * An empty `ideas` list is otherwise indistinguishable from a finder that never
 * ran — the same null result this project refuses to read as evidence anywhere
 * else. These counts turn "no trades" into a sentence a manager can act on:
 * a thin bench, a league that values your spares the same way you do, or a band
 * set too tight.
 */
export interface Diagnostics {
  /**
   * 🔴 The shapes this search can see, so an empty result means "none of THESE
   * shapes", never "no trade exists".
   *
   * The field exists because of an eval on a dynasty roster: 20 priced bench
   * players, none individually startable, and the real trade was consolidating
   * two of them for one better player — a shape the finder then could not see.
   * It reported nothing and was technically correct and practically useless — a
   * null result presented as evidence, which is the failure this project
   * exists to avoid. Shapes have been added since; the boundary line stays.
   */
  shapes_searched: string[];
  /** Where the package pools are cut off. Bounded is fine; silent is not. */
  pool_caps: { their_bench: number; my_bench: number };
  your_priced_bench: number;
  your_unpriced_players: number;
  /** Bench players who would start somewhere else in the league. */
  wanted_by_someone: number;
  pairs_considered: number;
  two_for_one_considered: number;
  three_for_one_considered: number;
  two_for_two_considered: number;
  /**
   * Ideas dropped because a smaller package already reaches the same player —
   * a 2-for-1 that also shows up inside a 3-for-1 with a throw-in is one idea,
   * not two.
   */
  duplicates_dropped: number;
  rejected_they_would_not_start_him: number;
  rejected_he_would_not_start_for_you: number;
  rejected_value_gap_too_wide: number;
  rejected_no_mutual_gain: number;
  summary: string;
}

export function findTrades(args: {
  me: SleeperRoster;
  others: Array<{ roster: SleeperRoster; owner: string | null }>;
  rosterPositions: string[];
  board: ValueBoard;
  players: PlayerIndex;
  options: FindOptions;
}): { ideas: TradeIdea[]; me: RosterView; diagnostics: Diagnostics } {
  const { me, others, rosterPositions, board, players, options } = args;
  const values = board.by_player;
  const myView = rosterView(me, null, rosterPositions, values, players);

  const ideas: TradeIdea[] = [];
  let considered = 0;
  let twoForOneConsidered = 0;
  let threeForOneConsidered = 0;
  let twoForTwoConsidered = 0;
  let rejectedTheirBar = 0;
  let rejectedMyBar = 0;
  let rejectedBand = 0;
  let rejectedGain = 0;
  const wanted = new Set<string>();

  for (const { roster, owner } of others) {
    const theirView = rosterView(roster, owner, rosterPositions, values, players);

    for (const mine of myView.bench) {
      // Only offer someone who would actually start for them.
      const theirBar = theirView.worst_starter[mine.position];
      if (!theirBar || mine.value <= theirBar.value) {
        rejectedTheirBar++;
        continue;
      }
      wanted.add(mine.player_id);

      for (const theirs of theirView.bench) {
        considered++;
        const myBar = myView.worst_starter[theirs.position];
        if (!myBar || theirs.value <= myBar.value) {
          rejectedMyBar++;
          continue;
        }

        const larger = Math.max(mine.value, theirs.value);
        if (larger === 0) continue;
        if (Math.abs(mine.value - theirs.value) / larger > options.balanceBand) {
          rejectedBand++;
          continue;
        }

        const yourGain = lineupGain(myView, me, [mine.player_id], [theirs.player_id], rosterPositions, values, players);
        const theirGain = lineupGain(theirView, roster, [theirs.player_id], [mine.player_id], rosterPositions, values, players);
        // For a straight swap, both lineups improving is what makes it worth
        // sending. Packages are judged differently — see the package branch.
        if (yourGain < options.minGain || theirGain < options.minGain) {
          rejectedGain++;
          continue;
        }

        ideas.push({
          with_roster_id: roster.roster_id,
          with_owner: owner,
          you_give: [{ player_id: mine.player_id, name: displayName(players[mine.player_id], mine.player_id), position: mine.position, value: mine.value }],
          you_get: [{ player_id: theirs.player_id, name: displayName(players[theirs.player_id], theirs.player_id), position: theirs.position, value: theirs.value }],
          value_delta: Math.round((theirs.value - mine.value) * 10) / 10,
          your_lineup_gain: yourGain,
          their_lineup_gain: theirGain,
          rationale:
            `${displayName(players[mine.player_id], mine.player_id)} is on your bench and out-values ` +
            `their weakest starting ${mine.position} by ${Math.round(mine.value - theirBar.value)}; ` +
            `${displayName(players[theirs.player_id], theirs.player_id)} is on theirs and out-values ` +
            `your weakest starting ${theirs.position} by ${Math.round(theirs.value - myBar.value)}.`,
        });
      }
    }
    // ------------------------------------------------------------------
    // Consolidation packages: two-for-one and three-for-one.
    //
    // 🔴 The shape the one-for-one search structurally cannot see, and the one an
    // eval found mattered: a dynasty roster with 20 priced bench players and none
    // individually startable. Quantity is worthless in a lineup; consolidating it
    // is the trade. Three-for-one exists for the deeper version of the same
    // roster, where even two spares do not reach a startable player's price.
    //
    // The two sides are NOT symmetric here and should not be judged as if they
    // were. You give up depth to upgrade a starting slot; they give up one
    // starter-grade player for two or three bodies. Their reason to accept is
    // roster quantity and value received, not a lineup gain — so
    // `their_lineup_gain` is reported and allowed to be zero rather than used
    // as a filter. What a bigger package DOES cost them is roster spots, so the
    // rationale carries their active-roster count after the trade — the same
    // rosterSpots arithmetic evaluate_trade uses, not a re-derivation.
    if (options.packages) {
      const name = (id: string) => displayName(players[id], id);

      // Their best bench players are the only thing worth consolidating FOR.
      for (const theirs of theirView.bench.slice(0, POOL_CAPS.their_bench)) {
        const myBar = myView.worst_starter[theirs.position];
        if (!myBar || theirs.value <= myBar.value) continue;

        const pool = myView.bench
          .filter((b) => b.value < theirs.value)
          .slice(0, POOL_CAPS.my_bench);

        const tryConsolidation = (give: typeof pool) => {
          if (give.length === 2) twoForOneConsidered++;
          else threeForOneConsidered++;
          const given = give.reduce((sum, p) => sum + p.value, 0);
          const larger = Math.max(given, theirs.value);
          if (larger === 0) return;
          if (Math.abs(given - theirs.value) / larger > options.balanceBand) return;

          const yourGain = lineupGain(
            myView, me, give.map((p) => p.player_id), [theirs.player_id],
            rosterPositions, values, players,
          );
          if (yourGain < options.minGain) return;
          const theirGain = lineupGain(
            theirView, roster, [theirs.player_id], give.map((p) => p.player_id),
            rosterPositions, values, players,
          );

          const spots = rosterSpots({
            rosterPositions,
            currentPlayerIds: roster.players ?? [],
            reservedPlayerIds: [...(roster.reserve ?? []), ...(roster.taxi ?? [])],
            giving: 1,
            getting: give.length,
          });
          const cuts = Math.max(0, spots.after - spots.limit);
          ideas.push({
            with_roster_id: roster.roster_id,
            with_owner: owner,
            you_give: give.map((p) => ({
              player_id: p.player_id, name: name(p.player_id), position: p.position, value: p.value,
            })),
            you_get: [{
              player_id: theirs.player_id, name: name(theirs.player_id),
              position: theirs.position, value: theirs.value,
            }],
            value_delta: Math.round((theirs.value - given) * 10) / 10,
            your_lineup_gain: yourGain,
            their_lineup_gain: theirGain,
            rationale:
              `Consolidation: ${give.map((p) => name(p.player_id)).join(", ")} ` +
              `${give.length === 2 ? "are both" : "are all"} on your bench and none can crack ` +
              `your lineup, while ${name(theirs.player_id)} would displace your weakest ` +
              `starting ${theirs.position} by ${Math.round(theirs.value - myBar.value)}. ` +
              `They give up one player for ${give.length}, taking roster quantity and ` +
              `${Math.round(given - theirs.value)} of value in return, and land at ` +
              `${spots.after} of ${spots.limit} active spots` +
              (cuts > 0 ? ` — ${cuts} cut(s) to fit them` : "") +
              (theirGain > 0 ? `; their lineup gains ${theirGain}.` : `.`),
          });
        };

        for (let i = 0; i < pool.length; i++) {
          for (let j = i + 1; j < pool.length; j++) {
            tryConsolidation([pool[i]!, pool[j]!]);
            for (let k = j + 1; k < pool.length; k++) {
              tryConsolidation([pool[i]!, pool[j]!, pool[k]!]);
            }
            
          }
        }
      }

      // ------------------------------------------------------------------
      // Two-for-two: a different shape with a different judgement. Both sides
      // rearrange starters, so BOTH lineup gains are filters again — unlike
      // consolidation, where the accepting side's reason is quantity. No roster
      // spots move on either side.
      const myPool = myView.bench.slice(0, POOL_CAPS.my_bench);
      const theirPool = theirView.bench.slice(0, POOL_CAPS.their_bench);
      // Cheap prefilter before the lineup solver runs: a pair is only worth
      // pricing when at least one incoming player beats the receiving side's
      // bar at his position — a two-for-two where nobody starts moves value
      // around and improves nothing.
      const beatsBar = (view: RosterView, p: { position: string; value: number }): boolean => {
        const bar = view.worst_starter[p.position];
        return Boolean(bar && p.value > bar.value);
      };
      for (let i = 0; i < myPool.length; i++) {
        for (let j = i + 1; j < myPool.length; j++) {
          const give = [myPool[i]!, myPool[j]!];
          if (!give.some((p) => beatsBar(theirView, p))) continue;
          for (let k = 0; k < theirPool.length; k++) {
            for (let l = k + 1; l < theirPool.length; l++) {
              const get = [theirPool[k]!, theirPool[l]!];
              if (!get.some((p) => beatsBar(myView, p))) continue;
              twoForTwoConsidered++;
              const given = give[0]!.value + give[1]!.value;
              const got = get[0]!.value + get[1]!.value;
              const larger = Math.max(given, got);
              if (larger === 0) continue;
              if (Math.abs(given - got) / larger > options.balanceBand) continue;

              const yourGain = lineupGain(
                myView, me, give.map((p) => p.player_id), get.map((p) => p.player_id),
                rosterPositions, values, players,
              );
              if (yourGain < options.minGain) continue;
              const theirGain = lineupGain(
                theirView, roster, get.map((p) => p.player_id), give.map((p) => p.player_id),
                rosterPositions, values, players,
              );
              if (theirGain < options.minGain) continue;

              ideas.push({
                with_roster_id: roster.roster_id,
                with_owner: owner,
                you_give: give.map((p) => ({
                  player_id: p.player_id, name: name(p.player_id), position: p.position, value: p.value,
                })),
                you_get: get.map((p) => ({
                  player_id: p.player_id, name: name(p.player_id), position: p.position, value: p.value,
                })),
                value_delta: Math.round((got - given) * 10) / 10,
                your_lineup_gain: yourGain,
                their_lineup_gain: theirGain,
                rationale:
                  `Two-for-two: ${give.map((p) => name(p.player_id)).join(" and ")} sit on your ` +
                  `bench while ${get.map((p) => name(p.player_id)).join(" and ")} sit on theirs; ` +
                  `swapped, each roster seats what it can actually start — your lineup gains ` +
                  `${yourGain} and theirs ${theirGain} on this scale.`,
              });
            }
          }
        }
      }
    }
  }

  // Dedupe across shapes BEFORE sorting: a 2-for-1 that also surfaces inside a
  // 3-for-1 with a throw-in is one idea, not two. Keyed by who is received;
  // the smaller package wins — the extra body has to earn its place through
  // the balance band, not pad the list.
  const byTarget = new Map<string, TradeIdea>();
  let duplicatesDropped = 0;
  for (const idea of ideas) {
    const key = `${idea.with_roster_id}:${idea.you_get.map((p) => p.player_id).sort().join("+")}`;
    const current = byTarget.get(key);
    if (!current) {
      byTarget.set(key, idea);
      continue;
    }
    duplicatesDropped++;
    const wins =
      idea.you_give.length < current.you_give.length ||
      (idea.you_give.length === current.you_give.length &&
        idea.your_lineup_gain > current.your_lineup_gain);
    if (wins) byTarget.set(key, idea);
  }
  const kept = [...byTarget.values()];

  // Best mutual improvement first — a trade both sides want is more likely to happen
  // than one that is merely good for you.
  kept.sort(
    (a, b) =>
      Math.min(b.your_lineup_gain, b.their_lineup_gain) - Math.min(a.your_lineup_gain, a.their_lineup_gain) ||
      b.your_lineup_gain - a.your_lineup_gain,
  );

  // The summary must describe the search that actually ran. It once read
  // "60 of 0 pairs" while also claiming packages were not searched — both halves
  // false, in the one field a reader trusts to explain an empty result. Every
  // new shape is a fresh chance to reintroduce that bug, so each count below
  // comes from its own counter, never inferred.
  const swaps = kept.filter((i) => i.you_give.length === 1).length;
  const consolidations = kept.filter((i) => i.you_give.length > 1 && i.you_get.length === 1).length;
  const twoForTwos = kept.filter((i) => i.you_get.length === 2).length;
  const packagesConsidered = twoForOneConsidered + threeForOneConsidered + twoForTwoConsidered;
  const examined = considered + packagesConsidered;

  const found = [
    swaps > 0 ? `${swaps} straight swap${swaps === 1 ? "" : "s"}` : null,
    consolidations > 0 ? `${consolidations} consolidation package${consolidations === 1 ? "" : "s"}` : null,
    twoForTwos > 0 ? `${twoForTwos} two-for-two swap${twoForTwos === 1 ? "" : "s"}` : null,
  ].filter(Boolean).join(" and ");

  const summary =
    kept.length > 0
      ? `${found} from ${examined} combination${examined === 1 ? "" : "s"} examined.`
      : myView.bench.length === 0
        ? "Your roster has no priced bench player to offer — every player this scale covers is already in your starting lineup."
        : wanted.size === 0 && packagesConsidered === 0
          ? "Nobody in the league starts a weaker player at any position where you have bench depth, so you have nothing they want."
          : rejectedBand > 0 && rejectedGain === 0
            ? `Found ${rejectedBand} combination(s) that fit on both rosters but fell outside the ${Math.round(options.balanceBand * 100)}% balance band. Widen balance_band to see them.`
            : `Examined ${examined} combination(s); none cleared the filters. Lower min_gain or widen balance_band to see near-misses.`;

  const scope = options.packages
    ? " One-for-one swaps, two-for-one and three-for-one consolidation, and two-for-two " +
      "packages were all searched, within the pools pool_caps names. Four-for-one and " +
      "larger were not."
    : " Only one-for-one swaps were searched. Packaging two or three players for one better " +
      "player is a different shape and is not covered — worth considering by hand when " +
      "a roster has depth but no quality, which is exactly when this comes back empty.";

  return {
    ideas: kept.slice(0, options.limit),
    me: myView,
    diagnostics: {
      shapes_searched: options.packages
        ? [
            "one-for-one: a bench player of yours for a bench player of theirs",
            "two-for-one: two of your bench players consolidated into one of theirs",
            "three-for-one: three of your bench players consolidated into one of theirs",
            "two-for-two: two bench players a side, each lineup rearranged",
          ]
        : ["one-for-one: a bench player of yours for a bench player of theirs"],
      pool_caps: { ...POOL_CAPS },
      your_priced_bench: myView.bench.length,
      your_unpriced_players: myView.unpriced.length,
      wanted_by_someone: wanted.size,
      pairs_considered: considered,
      two_for_one_considered: twoForOneConsidered,
      three_for_one_considered: threeForOneConsidered,
      two_for_two_considered: twoForTwoConsidered,
      duplicates_dropped: duplicatesDropped,
      rejected_they_would_not_start_him: rejectedTheirBar,
      rejected_he_would_not_start_for_you: rejectedMyBar,
      rejected_value_gap_too_wide: rejectedBand,
      rejected_no_mutual_gain: rejectedGain,
      summary: summary + scope,
    },
  };
}
