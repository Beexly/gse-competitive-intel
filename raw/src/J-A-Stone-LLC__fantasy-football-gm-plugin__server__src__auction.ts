/**
 * Auction draft arithmetic — the half of auction support that needs no
 * external data at all.
 *
 * An auction board is conditional on money: what a seat can still bid, and how
 * much is left in the room. All of that follows from the league's own rules
 * (the budget) and what the user reports was paid. None of it says what a
 * player goes for next.
 *
 * 🔴 What is deliberately NOT here: a price baseline, and therefore inflation.
 * Both need a published auction-value list, and **FantasyFootballCalculator
 * does not publish one** — measured 2026-08-27 with
 * `scripts/measure-auction.mjs`: `adp/auction` returns HTTP 400
 * `{"status":"Error","errors":["Invalid format"]}`, and `/auction` and
 * `/auction-values` are 404 HTML. That is a real answer rather than a broken
 * probe, because the same host and URL shape returned 267 players for `ppr`,
 * 225 for `half-ppr`, 218 for `standard` and 246 for `2qb` in the same run —
 * the control is what makes the negative evidence.
 *
 * FantasyCalc was the remaining candidate and it does not publish them either
 * (measured 2026-08-27): its rows carry no auction, dollar, price or budget
 * field; `values/auction` and `auction/current` are 404; and an `auction=true`
 * parameter on the working endpoint returns a BYTE-IDENTICAL payload — it is
 * ignored, not honoured, which is the kind of thing that reads as support if
 * you only check the status code.
 *
 * So no free source this project can use publishes auction dollars, and every
 * auction response says no baseline is wired in. Deriving dollars from a value
 * scale would be a pricing MODEL, not arithmetic on a published list, and that
 * is a different decision than this spec made.
 *
 * 🔴 WHAT A SLEEPER AUCTION ACTUALLY CARRIES, measured 2026-08-27 across four
 * real auction drafts (596 picks: three completed seasons plus one in
 * progress). None of it is in Sleeper's docs, which mention "auction" zero
 * times — it was read off live payloads:
 *
 * - `draft.settings.budget` is the per-team budget. 200 in all four.
 * - `draft.settings.nomination_timer` appears on auctions and marks the format
 *   alongside `type: "auction"`.
 * - **The price paid is `pick.metadata.amount`, and it is a STRING** ("21",
 *   not 21). 596 of 596 picks carried it; none was missing. Reading it as a
 *   number without parsing gives string concatenation, which is why
 *   `sleeperPurchases` parses and REPORTS what it could not parse instead of
 *   coercing.
 * - Per-team spend never exceeded the budget, and completed drafts cluster at
 *   exactly it (2025: eight of twelve teams spent all 200).
 * - `draft_slot` maps 1:1 to `roster_id` within a draft, and
 *   `slot_to_roster_id` is populated — the two still differ, so the existing
 *   rule holds: never assume the slot IS the roster.
 * - A `pre_draft` auction can already carry priced picks (20 of them, across
 *   11 teams, in the 2026 draft measured). Consistent with keepers being
 *   recorded as pre-draft buys — so a "not started" auction is not
 *   necessarily an empty one, and the money already committed counts.
 */

export interface Purchase {
  player_id: string;
  price: number;
  /** Who bought him: "mine", a manager's name, or null when nobody said. */
  buyer: string | null;
}

export interface AuctionSeat {
  buyer: string;
  players_bought: number;
  spent: number;
  remaining: number;
  /** Null when the league's roster size is unknown — never 0, which is a claim. */
  roster_spots_open: number | null;
  /**
   * The most this seat can bid on one player: remaining budget minus one
   * dollar for every other spot still to fill. Arithmetic from the league's
   * own rules, not a valuation.
   *
   * 🔴 Null when roster size is unknown. It used to be computed from
   * `draft.settings["rounds"] ?? 0`, so a draft with no `rounds` setting gave
   * every seat `roster_spots_open: 0` and `max_bid: 0` — "you cannot bid on
   * anything" — next to a budget showing every dollar unspent. A default read
   * as a fact, which is how this project gets things wrong.
   */
  max_bid: number | null;
}

export interface AuctionRoom {
  budget_per_team: number;
  teams: number;
  /** Null when the draft carries no roster size. Never 0, which is a claim. */
  roster_size: number | null;
  /** Every recorded purchase, by everyone. */
  purchases_recorded: number;
  total_spent: number;
  /** teams × budget − spent: what the whole room still holds. */
  room_remaining: number;
  /** Purchases with no buyer named. They drain the room but no seat. */
  unattributed: number;
  /** One seat per buyer that was actually named, "mine" included. */
  seats: AuctionSeat[];
  note: string;
}

export function seatFor(
  buyer: string,
  purchases: Purchase[],
  budget: number,
  rosterSize: number | null,
): AuctionSeat {
  const own = purchases.filter((p) => p.buyer === buyer);
  const spent = own.reduce((sum, p) => sum + p.price, 0);
  const remaining = Math.max(0, budget - spent);
  if (rosterSize === null) {
    return {
      buyer,
      players_bought: own.length,
      spent,
      remaining,
      roster_spots_open: null,
      max_bid: null,
    };
  }
  const open = Math.max(0, rosterSize - own.length);
  return {
    buyer,
    players_bought: own.length,
    spent,
    remaining,
    roster_spots_open: open,
    // A seat with nothing left to fill has no bid to make.
    max_bid: open === 0 ? 0 : Math.max(0, remaining - (open - 1)),
  };
}

export function auctionRoom(args: {
  budget: number;
  teams: number;
  rosterSize: number | null;
  purchases: Purchase[];
}): AuctionRoom {
  const { budget, teams, rosterSize, purchases } = args;
  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);
  const unattributed = purchases.filter((p) => p.buyer === null).length;
  const buyers = [...new Set(purchases.map((p) => p.buyer).filter((b): b is string => b !== null))];
  // "mine" leads even before any purchase, so the caller's own seat and max
  // bid are always present once a budget is known.
  if (!buyers.includes("mine")) buyers.unshift("mine");

  const seats = buyers.map((b) => seatFor(b, purchases, budget, rosterSize));

  const unknownSizeGap =
    rosterSize === null
      ? ` This draft carries no roster size, so max bid cannot be worked out and is left ` +
        `unknown rather than guessed — remaining budget is still exact.`
      : "";
  const attributionGap =
    unattributed > 0
      ? ` ${unattributed} purchase(s) have no buyer named: they are subtracted from the room ` +
        `but no seat, so per-seat remainders are only as complete as the attribution — say ` +
        `who bought whom and the seats catch up.`
      : "";
  return {
    budget_per_team: budget,
    teams,
    roster_size: rosterSize,
    purchases_recorded: purchases.length,
    total_spent: totalSpent,
    room_remaining: Math.max(0, teams * budget - totalSpent),
    unattributed,
    seats,
    note:
      `Budget arithmetic from the league's own rules and the purchases you reported — it is ` +
      `only as current as the last batch. Max bid is remaining budget minus a dollar for ` +
      `every other open spot. No published price baseline is wired in: the free ADP source ` +
      `publishes no auction values at all (measured 2026-08-27), so nothing here estimates ` +
      `what a player goes for.` + attributionGap + unknownSizeGap,
  };
}


/** One Sleeper auction pick, as much of it as the money math needs. */
export interface SleeperAuctionPick {
  player_id: string;
  roster_id: number | null;
  metadata: Record<string, unknown> | null;
}

/**
 * Turns Sleeper's auction picks into purchases.
 *
 * 🔴 `metadata.amount` is a STRING in every payload measured, so it is parsed
 * rather than trusted, and anything that will not parse is RETURNED, never
 * dropped or read as zero. A price silently treated as 0 inflates the buyer's
 * remaining budget and its max bid — a confident wrong number, which is the
 * failure this project exists to avoid.
 */
export function sleeperPurchases(
  picks: SleeperAuctionPick[],
  buyerFor: (rosterId: number | null) => string | null,
): { purchases: Purchase[]; unpriced: Array<{ player_id: string; raw: unknown }> } {
  const purchases: Purchase[] = [];
  const unpriced: Array<{ player_id: string; raw: unknown }> = [];
  for (const pick of picks) {
    const raw = (pick.metadata ?? {})["amount"];
    // 🔴 An EMPTY string must not parse: Number("") is 0, so a blank price
    // would read as a free player and hand that seat its whole budget back.
    const price =
      typeof raw === "number"
        ? raw
        : typeof raw === "string" && raw.trim() !== ""
          ? Number(raw.trim())
          : NaN;
    if (!Number.isFinite(price) || price < 0) {
      unpriced.push({ player_id: pick.player_id, raw: raw ?? null });
      continue;
    }
    purchases.push({ player_id: pick.player_id, price, buyer: buyerFor(pick.roster_id) });
  }
  return { purchases, unpriced };
}
