import { availability, type Availability } from "./availability.js";
import type { BoardEntry, RankBasis } from "./draft.js";
import { canonicalPosition } from "./identity.js";
import { canFill, isStartableSlot, optimalLineup, startableSlots } from "./lineup.js";
import type { Schedule } from "./schedule.js";
import type { PlayerIndex, SleeperPlayer } from "./sleeper.js";

/**
 * Start/sit for a week that has NOT been played.
 *
 * 🔴 There is no projection here and there is not going to be one — no free
 * source publishes forward-looking points, and inventing one would be exactly
 * the claim this project refuses to make. What this does instead is arithmetic
 * a manager can check:
 *
 *   - who is even ELIGIBLE for each slot,
 *   - how those players order on a published list,
 *   - who cannot play at all this week (bye, or listed Out/IR/PUP),
 *   - who is carrying a designation short of that (Questionable, Doubtful).
 *
 * That answers "who out-ranks whom for this slot", which is a real question,
 * without answering "who scores more", which nobody can.
 *
 * Contrast get_optimal_lineup, which uses FINAL scores for a week already
 * played. That one is hindsight; this one is fit.
 */

export interface Candidate {
  player_id: string;
  name: string;
  position: string;
  team: string;
  rank: number | null;
  rank_source: RankBasis | null;
  availability: Availability;
}

export interface SlotView {
  slot: string;
  currently_started: string | null;
  /** The player this slot gets in the best whole-roster arrangement. */
  recommended: string | null;
  /**
   * Why the slot is EMPTY, when it is. Null whenever `recommended` is set.
   *
   * 🔴 `recommended: null` on its own is indistinguishable from "I did not
   * look", and the three reasons a slot ends up empty need different answers:
   * you roster nobody who can fill it, the ones you have cannot play this week,
   * or your available players were better used elsewhere. Only the first two
   * are fixed on the waiver wire, and the second is invisible without saying
   * WHO is out and why — a roster whose only TE is on bye in week 11 showed a
   * blank row and nothing else.
   */
  unfilled_reason: string | null;
  /**
   * Everyone else eligible, best-ranked first, unavailable last.
   *
   * 🔴 These are ALTERNATIVES, not a per-slot answer. Reading the top of each
   * slot's list as the lineup puts one player in three slots at once — the same
   * greedy failure optimalLineup exists to prevent, which is why `recommended`
   * comes from a whole-roster assignment rather than from this list.
   *
   * Capped, because flex-heavy leagues repeat themselves enormously. A Scott
   * Fish Bowl roster (8 FLEX + 2 SUPER_FLEX) listed the same 16 players ten
   * times over and produced a 99,000-character response nothing could read.
   */
  candidates: Candidate[];
  /** Eligible players beyond the few listed. Never silently dropped. */
  more_candidates: number;
  /**
   * The recommended player is not in the current lineup AT ALL.
   *
   * Deliberately not "this slot's occupant changed": two identical RB slots
   * swapping occupants is not a lineup change, and flagging it sends someone to
   * their app to fix nothing. What matters is who enters and who leaves.
   */
  differs_from_current: boolean;
}

export interface StartSitReport {
  league_id: string;
  /**
   * 🔴 In best ball nobody sets a lineup — the platform scores the optimal one
   * automatically. Every recommendation below is therefore unactionable, and an
   * answer that does not say so is confidently useless. Measured against a real
   * best-ball league, this tool cheerfully named two players to start.
   */
  best_ball: boolean;
  roster_id: number;
  week: number;
  basis: { basis: RankBasis; label: string; credit: string | null };
  slots: SlotView[];
  /** The actual change, if any: who comes in and who sits. Empty means no change. */
  entering: Candidate[];
  leaving: Candidate[];
  /** Slots no available player can fill this week. */
  unfilled_slots: string[];
  unknown_slots: string[];
  cannot_play: Candidate[];
  note: string;
}

const displayName = (p: SleeperPlayer): string =>
  p.full_name ?? [p.first_name, p.last_name].filter(Boolean).join(" ").trim();

/** Alternatives worth showing per slot. The decision lives in entering/leaving. */
const CANDIDATES_PER_SLOT = 5;

export function startSit(args: {
  bestBall?: boolean;
  leagueId: string;
  rosterId: number;
  week: number;
  rosterPositions: string[];
  ownedIds: string[];
  currentStarters: string[];
  players: PlayerIndex;
  ranked: BoardEntry[];
  schedule: Schedule | null;
  basis: { basis: RankBasis; label: string; credit: string | null };
}): StartSitReport {
  const { slots, unknownSlots } = startableSlots(args.rosterPositions);

  // Sleeper's `starters` array is positional against EVERY non-bench slot in
  // roster_positions order, including one this build cannot fill. `slots` has
  // those dropped, so reading `currentStarters` by our own index sheared every
  // slot after an unknown one onto the previous slot's starter — a confident
  // wrong answer nobody could tell from a right one. Map our index back onto the
  // full list instead. (`benchPoints.missed_starts` refuses over the same shear;
  // here it is repairable, and `unknown_slots` still discloses the gap.)
  const fullSlots = args.rosterPositions.map((p) => p.toUpperCase()).filter(isStartableSlot);
  const starterIndex: number[] = [];
  let cursor = 0;
  for (const slot of slots) {
    while (cursor < fullSlots.length && fullSlots[cursor] !== slot) cursor += 1;
    starterIndex.push(cursor);
    cursor += 1;
  }
  const startedAt = (i: number): string | null => {
    const id = args.currentStarters[starterIndex[i] ?? i];
    return id && id !== "0" ? id : null;
  };
  const rank = new Map(args.ranked.map((e) => [e.player_id, e]));

  const candidateFor = (id: string): Candidate | null => {
    const p = args.players[id];
    if (!p) return null;
    const entry = rank.get(id);
    return {
      player_id: id,
      name: displayName(p),
      position: canonicalPosition(p.position ?? ""),
      team: p.team ?? "",
      rank: entry?.rank ?? null,
      rank_source: entry?.rank_source ?? null,
      availability: availability(p, args.schedule, args.week),
    };
  };

  const all = args.ownedIds.map(candidateFor).filter((c): c is Candidate => c !== null);

  // Available first, then by rank. An unranked player sorts below a ranked one
  // rather than above it — absence of a rank is not evidence of quality.
  const order = (a: Candidate, b: Candidate) => {
    if (a.availability.cannot_play !== b.availability.cannot_play) {
      return a.availability.cannot_play ? 1 : -1;
    }
    return (a.rank ?? Infinity) - (b.rank ?? Infinity);
  };

  // One coherent lineup, not a per-slot pick. Rank is turned into a weight the
  // assignment can maximise: better rank -> higher weight, unranked -> just above
  // nothing, and anyone who cannot play is left out of the pool entirely.
  const available = all.filter((c) => !c.availability.cannot_play);
  const worst = available.reduce((m, c) => Math.max(m, c.rank ?? 0), 0) + 1;
  const weights: Record<string, number> = {};
  for (const c of available) weights[c.player_id] = c.rank === null ? 0.5 : worst - c.rank + 1;

  const assignment = optimalLineup(
    weights,
    available.map((c) => c.player_id),
    args.rosterPositions,
    args.players,
  );
  const recommendedBySlotIndex = assignment.assignments.map((a) => a.player_id);

  const currentSet = new Set(
    args.currentStarters.filter((id): id is string => Boolean(id) && id !== "0"),
  );
  const recommendedSet = new Set(recommendedBySlotIndex.filter((id): id is string => Boolean(id)));
  const byId = new Map(all.map((c) => [c.player_id, c]));

  const views: SlotView[] = slots.map((slot, i) => {
    const eligible = all.filter((c) => canFill(c.player_id, slot, args.players)).sort(order);
    const started = startedAt(i);
    const recommended = recommendedBySlotIndex[i] ?? null;
    // Always keep the recommended player and the current starter visible, then
    // fill the rest by rank.
    const pinned = eligible.filter(
      (c) => c.player_id === recommended || c.player_id === started,
    );
    const rest = eligible.filter((c) => !pinned.includes(c));
    const shown = [...pinned, ...rest].slice(0, Math.max(CANDIDATES_PER_SLOT, pinned.length));

    // An empty slot is a fact about the ROSTER, not a missing answer. Say which
    // of the three it is, and name the players when they exist — "your TE is on
    // bye" is actionable, a blank row is not.
    const playable = eligible.filter((c) => !c.availability.cannot_play);
    const unfilled_reason = recommended
      ? null
      : eligible.length === 0
        ? `Nobody on this roster can fill ${slot}. A free agent is the only way to fill it.`
        : playable.length === 0
          ? `The ${eligible.length} player(s) who can fill ${slot} cannot play in week ` +
            `${args.week}: ${eligible
              .map((c) => `${c.name}${c.availability.note ? ` (${c.availability.note})` : ""}`)
              .join(", ")}. A free agent is the only way to fill it this week.`
          : `Your available ${slot} options were seated in other slots — this roster has ` +
            `fewer playable players than startable slots.`;

    return {
      slot,
      currently_started: started,
      recommended,
      unfilled_reason,
      candidates: shown.sort(order),
      more_candidates: Math.max(0, eligible.length - shown.length),
      differs_from_current: Boolean(recommended && !currentSet.has(recommended)),
    };
  });

  return {
    league_id: args.leagueId,
    best_ball: Boolean(args.bestBall),
    roster_id: args.rosterId,
    week: args.week,
    basis: args.basis,
    slots: views,
    entering: [...recommendedSet]
      .filter((id) => !currentSet.has(id))
      .map((id) => byId.get(id))
      .filter((c): c is Candidate => Boolean(c)),
    leaving: [...currentSet]
      .filter((id) => !recommendedSet.has(id))
      .map((id) => byId.get(id))
      .filter((c): c is Candidate => Boolean(c)),
    unfilled_slots: assignment.unfilledSlots,
    unknown_slots: unknownSlots,
    cannot_play: all.filter((c) => c.availability.cannot_play),
    note: args.bestBall
      ? "🔴 THIS IS A BEST BALL LEAGUE. Lineups are set automatically from whoever " +
        "scored most, so there is no start/sit decision to make and nothing below can " +
        "be acted on. It is shown only as a read on roster strength. Say this first."
      : "`entering` and `leaving` are the actual change; both empty means the lineup " +
      "already stands. `recommended` is one whole-roster arrangement, so no player " +
      "appears in two slots, and two identical slots swapping occupants is not a change. " +
      "`candidates` lists a few other options per slot, with `more_candidates` counting the rest. Ordered by the " +
      "ranking source named in `basis`, with byes and injury designations applied. " +
      "There is no projection here — this says who out-ranks whom and who cannot " +
      "play, not who will score more.",
  };
}
