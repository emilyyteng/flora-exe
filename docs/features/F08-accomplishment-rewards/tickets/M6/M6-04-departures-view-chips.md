# M6-04: Board departures exclusive view chips

**Status:** Done
**Blocked by:** (none)
**Implements:** R6.6 (view chips 2026-10-18) (from `../../spec.md`)
**Type:** build

## What to build

Replace the Status Board departures “Task removed only” toggle with three exclusive chips — **Left board**, **Duplicate**, **Task removed** — so the log is viewed one slice at a time (no combined all view). Default **Left board**.

## Acceptance criteria

- [x] Three exclusive options in the departures card head; selecting one shows only that slice
- [x] No “show everything” / all-departures mode
- [x] Default view is Left board
- [x] Empty copy is specific to the active view when that slice has no rows but other slices may
- [x] Task-removed highlight and row copy unchanged; day “task removed” count omitted on the Task removed view and when 0
- [x] Spec R6.6 + decisions log updated

## Edge cases

- Duplicate rows never have `taskRemoved` (R6.6 write rules); Duplicate view still valid when empty.
- A left-board row with task removed appears under Left board and under Task removed, not both at once.

## Tests

- [x] Manual: `/status` Board departures chips switch slices (no new automated UI tests; API unchanged)

## Reuse notes

- Shared `FilterChips` (`apps/web/src/ui/FilterChips.tsx`) — squared separate buttons per `docs/design-system.md` (not rounded `Segmented`). First production call site for the shared helper.

## Definition of done

- [x] Acceptance criteria met and checked
- [x] `npm run check` passes
- [x] Follows `docs/design-system.md` (variants only, no global CSS, shared modal)
- [x] Reuse check done
- [x] No production imports of prototype code
- [x] Committed as `F08 M6-04: …`
- [x] End-of-task report given

## Verification notes

- Spec R6.6 revised 2026-10-18; changelog M6 bullet updated.
- Commit hash pending follow-up after this commit exists.
