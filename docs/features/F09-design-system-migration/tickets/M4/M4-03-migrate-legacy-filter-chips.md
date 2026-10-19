# M4-03: Migrate legacy filter chips to shared `FilterChips`

**Status:** Draft
**Blocked by:** (none)
**Implements:** R.8 (from `../../spec.md`); Filter chips row in `docs/design-system.md`
**Type:** build

## Found during

2026-10-18 — Board departures shipped the shared squared `FilterChips` helper (F08 M6-04). Design system still lists Jobs location chips as migration debt; M1-06 had deferred the helper to “first surface migrate.” No ticket owned the leftover legacy chip dialects specifically (they were only mentioned inside the broader M2 Jobs/Apps/Interviews chrome wave).

## Evidence

| Call site | Current control | Conflict |
|-----------|-----------------|----------|
| Jobs ranked location filter | [`LocationFilterChips.tsx`](../../../../../apps/web/src/features/jobs/LocationFilterChips.tsx) + `.jobs-loc-chip` (pill + filled blue `.on`) | Not squared; active ≠ ink border + wash |
| Progress Past work completion kind | [`LedgerCompletionsPanel.tsx`](../../../../../apps/web/src/features/progress/LedgerCompletionsPanel.tsx) `.ledger-subtab` | Nested-tab clothes for an L2 filter; DS wants squared chips |

Shared primitive already live: [`FilterChips.tsx`](../../../../../apps/web/src/ui/FilterChips.tsx) / `.ui-filter-chip` (Status Board departures is the reference call site).

## What to build

Move the legacy filter-chip call sites onto `FilterChips` (squared, ink active wash). Delete or stop using `.jobs-loc-chip` / `.ledger-subtab` styles once unused. Keep counts on chips where the UI already shows them (extend the helper with an optional count slot if needed).

**Out of scope:** Jobs/Apps/Interviews page-tab → `ChromeTab` migration, shared `Pager`, and full title→tabs→chips card anatomy (remain M2 surface waves). Time-range controls that correctly use `Segmented` (Earnings / Pull history / History chart) stay Segmented.

## Acceptance criteria

- [ ] Jobs location filter uses `FilterChips` (or a thin wrapper over it); no pill / blue-fill chip styles remain in use
- [ ] Past work Completions kind filter uses `FilterChips` instead of `.ledger-subtab`
- [ ] Active/inactive match design-system Filter chips (ink border + `--tab-active-bg` wash)
- [ ] Dead `.jobs-loc-chip*` / unused `.ledger-subtab*` CSS removed or clearly orphaned with a follow-up
- [ ] `docs/design-system.md` no longer calls Jobs loc chips “migration debt” once done; F09 current-behavior row updated

## Edge cases

- “All” / unset location options and per-chip counts must keep working
- Completions kind filter when weekly tab is hidden (existing hideWeeklyTab behavior)
- FilterChips may need an optional `count` affordance; prefer extending the shared helper over a one-off

## Tests

- [ ] Manual: Jobs ranked location chips switch filters and show counts
- [ ] Manual: Past work Completions kind chips switch the diary slice
- [ ] `npm run check` (incl. `check:ui` — no new bare `<button>`)

## Reuse notes

`apps/web/src/ui/FilterChips.tsx`; Board departures head row as the visual reference. Do not invent a third chip dialect.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M4-03: …`
- [ ] End-of-task report given
