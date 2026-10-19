# MT-12: Delete task category — move tasks to Misc

**Status:** Done
**Blocked by:** (none)
**Implements:** n/a (maintenance; Tasks category UX)
**Type:** build
**Scheduled with:** after `f09-m2-tasks` Add category modal is testable; pairs with category create flow

## Why

Tasks can create categories (Add category modal on `f09-m2-tasks`) but cannot delete them from the UI, so create cannot be round-tripped in testing. The API already has `DELETE /api/task-categories/:id`, but previously it:

- Blocked delete when the category has **open** tasks (409)
- Repointed only **completed** tasks to a category named **`admin`** (legacy name; product now uses **Misc**)
- Treated Applications + `system` as non-deletable

Desired product behavior: **Misc** is the reserved dumping ground (like Applications). Deleting a user category moves **all** its open and completed tasks to Misc, with a clear confirmation. Misc is listed **last** among categories and cannot be deleted/renamed like other reserved categories.

## Current behavior (pre-fix)

| Piece | Before |
|-------|--------|
| API | open tasks block; completed → `lower(name) = 'admin'` |
| HTTP | `DELETE` → 409 if open tasks remain |
| Web | `deleteTaskCategory` client existed; Tasks UI did not call it |
| Seed | Admin dump-ground name |

## What to build

1. **Reserved Misc:** system category named Misc; migrate Admin → Misc
2. **Order:** Misc last (`sort_order` 10000)
3. **UI:** trash next to rename; confirm that open + completed move to Misc
4. **API:** move all tasks to Misc then delete; Applications / Misc undeletable
5. **Tests:** delete-with-open+completed → Misc; Misc reserved

## Acceptance criteria

- [x] User can create categories and **delete** them from Tasks with confirm
- [x] Confirm copy states open + completed tasks move to Misc
- [x] After delete, tasks are in Misc; category gone from chips
- [x] Misc is last; Misc cannot be deleted or renamed
- [x] Code uses Misc (not Admin) as dump ground
- [x] Applications category still cannot be deleted
- [x] `npm run check` passes

## Edge cases

- Deleting the selected category clears chip selection then reload picks another
- Empty / open-only / completed-only / mixed all move to Misc
- New user categories keep `sort_order` 1000 (before Misc)
- Rename Field sm aligned with Save/Cancel (M4-05)

## Tests

- [x] API: delete with open + completed → Misc; category gone; Misc last
- [x] API: delete Misc rejected (400)
- [x] Manual: create → delete round trip; icon spacing; rename Field sm
- [x] `npm run check`

## Reuse notes

`deleteTaskCategory` API + web client; Tasks header icon buttons; `ModalLayer` + `StepActionConfirm` (same as delete-task confirm).

## Definition of done

- [x] Acceptance criteria met and checked
- [x] `npm run check` passes
- [x] Follows `docs/design-system.md` for modal + controls
- [x] Reuse check done
- [x] Committed as `MT-12: …`
- [x] End-of-task report given

## Verification notes

User verified 2026-10-19. Migration `044_misc_reserved_category.sql`. Trash + pencil in tight icon group; rename uses `fieldSize="sm"`. Commit hash on board follow-up.
