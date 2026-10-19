# MT-12: Delete task category — move tasks to Misc

**Status:** Ready
**Blocked by:** (none)
**Implements:** n/a (maintenance; Tasks category UX)
**Type:** build
**Scheduled with:** after `f09-m2-tasks` Add category modal is testable; pairs with category create flow

## Why

Tasks can create categories (Add category modal on `f09-m2-tasks`) but cannot delete them from the UI, so create cannot be round-tripped in testing. The API already has `DELETE /api/task-categories/:id`, but today it:

- Blocks delete when the category has **open** tasks (409)
- Repoints only **completed** tasks to a category named **`admin`** (legacy name; product now uses **Misc**)
- Treats Applications + `system` as non-deletable

Desired product behavior: **Misc** is the reserved dumping ground (like Applications). Deleting a user category moves **all** its open and completed tasks to Misc, with a clear confirmation. Misc is listed **last** in category chips and cannot be deleted/renamed like other reserved categories.

## Current behavior (checked in code)

| Piece | Today |
|-------|--------|
| API | [`deleteTaskCategory`](../../../../apps/api/src/taskCategories.ts) — open tasks block; completed → `lower(name) = 'admin'` |
| HTTP | `DELETE /api/task-categories/:id` → 409 if open tasks remain |
| Web client | [`deleteTaskCategory`](../../../../apps/web/src/api.ts) exists; **Tasks UI does not call it** |
| Seed / naming | Demo/seed and delete path still assume **Admin**; UI/product language is **Misc** |

## What to build

1. **Reserved Misc:** Ensure a system (or equivalently reserved) misc category named Misc exists and is treated like Applications for delete/rename protection. Migrate any leftover Admin → Misc if needed (data + code that still keys on `admin`).
2. **Chip order:** Misc always appears **last** among category chips (Open and Completed views).
3. **UI:** On the Tasks category header, next to the rename pencil (misc non-reserved only), a **trash** icon button opens a **confirmation modal** (`ModalLayer` + modal anatomy): copy that **all open and completed tasks** in this category will move to Misc; Cancel then Delete.
4. **API:** On delete of a non-reserved misc category, **repoint all tasks** (open and completed) in that category to Misc, then delete the category. Remove the “blocked when open tasks exist” path (or replace it with Misc transfer). Keep Applications / Misc undeletable.
5. **Tests:** API coverage for delete-with-open-tasks → Misc; UI smoke or integration as fits the repo.

**Out of scope:** Per-task “move to category” bulk picker beyond the automatic Misc transfer; deleting Applications; F09 icon Button size (**M4-04**) — use the same icon-button approach as rename until M4-04 lands.

## Acceptance criteria

- [ ] User can create categories (existing modal) and **delete** them from Tasks with confirm
- [ ] Confirm copy states open + completed tasks move to Misc
- [ ] After delete, no tasks remain on the removed category; all former tasks are in Misc; chips no longer show the deleted category
- [ ] Misc is always last in the chip row; Misc cannot be deleted (or renamed, consistent with reserved rules)
- [ ] Code no longer depends on an **Admin** category name for this path; Misc is the reserved dumping ground
- [ ] Applications category still cannot be deleted
- [ ] `npm run check` passes

## Edge cases

- Deleting the category currently selected → select another chip (prefer Misc or first remaining)
- Empty category delete still works
- Completed-only / open-only / mixed task sets all move to Misc
- Concurrent rename/delete; points meta / category labels remain sensible (existing points meta behavior may stay or follow Misc name — document in verification)
- Sort order / `sort_order` so new user categories don’t appear after Misc

## Tests

- [ ] API: delete category with open + completed tasks → tasks’ `category_id` is Misc; category gone
- [ ] API: delete Misc / Applications rejected
- [ ] Manual: create → delete round trip on Tasks; Misc last in chips
- [ ] `npm run check`

## Reuse notes

`deleteTaskCategory` API + web client; Tasks header icon buttons; `ModalLayer` / `ModalHeader` / `ModalBody` / `ModalFooter`; mirror Add category confirm pattern.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md` for modal + controls
- [ ] Reuse check done
- [ ] Committed as `MT-12: …`
- [ ] End-of-task report given

## Verification notes

(pending)
