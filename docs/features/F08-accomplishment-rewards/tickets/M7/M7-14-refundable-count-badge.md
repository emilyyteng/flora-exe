# M7-14: Show ×1 refundable badge on album cards

**Status:** Done
**Blocked by:** (none)
**Implements:** R7.7 (refundable dupes above 6 kept copies; Collection album UI)
**Type:** bug

## Found during

Post-M7-13 polish (2026-10-18). User reported the top-right copy badge missing when exactly one refundable dupe exists.

## Evidence

Album passes `count={refundableCount}` when refundable &gt; 0, but `CatCakeCard` rendered the badge only when `count > 1`, so ×1 never appeared.

## What to build

Show `×N` for any refundable count ≥ 1 (including a single dupe past 6 kept copies).

## Acceptance criteria

- [x] One refundable dupe shows `×1` on the album card.
- [x] Two or more refundable dupes still show `×N`.
- [x] Cards with no refundable copies show no badge.

## Tests

- [x] Manual: own 7 copies of a variant → album badge `×1`; own 8 → `×2`.
- [ ] No automated web harness for the badge; skipped unit tests.

## Reuse notes

`CatCakeCard` `count` prop; Collection already supplies refundable count.

## Definition of done

- [x] Acceptance criteria met and checked
- [x] Follows `docs/design-system.md`
- [x] Reuse check done
- [x] No production imports of prototype code
- [x] Committed as `F08 M7-14: …`
- [x] End-of-task report given

## Verification notes

Logic change only (`count > 1` → `count >= 1`). Commit hash filled in follow-up.
