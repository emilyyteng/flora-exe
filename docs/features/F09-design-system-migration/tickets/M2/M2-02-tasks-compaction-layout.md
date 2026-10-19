# M2-02: Tasks compaction layout

**Status:** Ready
**Blocked by:** (none) — M2-01 Done
**Implements:** R.10, R.8 (page tabs already), R2.1 (from `../../spec.md`); Compact long pages + section chips → one well in `docs/design-system.md`
**Type:** build

## What to build

Migrate the **Tasks** page layout onto the locked R.10 tactic order so the first viewport is usable and recurring work (F08 M3) can design against a stable chrome:

1. **Section chips → one scroll well** (not stacked per-category open sections)
2. **Paginate inside the well** with shared `Pager` (size 25)
3. **28rem clamp** on the primary list body
4. Density / sticky compose **only if** actions still fall below the first viewport after 1–3

Keep existing open / completed **`ChromeTab`** page tabs. Chip counts follow the **active tab only**. Prefer containerized title → tabs → chips → content inside one card where the page is still loose vs R.8.

**Out of scope:** control/`Button` migration and EarnFlash placement (**M2-03**); recurring tasks (F08 M3); Jobs/Apps/Interviews.

## Acceptance criteria

- [ ] Open and completed views use section chips + a single primary list well (no multi-section open stacks as the standard)
- [ ] Chip counts match the active page tab only (open counts on Open, completed on Completed)
- [ ] Well uses shared `Pager` (M2-01), page size 25
- [ ] Primary list body uses the 28rem clamp / in-panel scroll rule from M1-07
- [ ] Density tightening and sticky compose are applied only if still needed after chips + pager + clamp (or explicitly deferred with a note)
- [ ] Existing task behavior preserved: categories, weekly boost sort, complete/reopen, application tasks, completed view
- [ ] F09 Current behavior row for Tasks long scroll updated; `design-system.md` migrate note for Tasks updated if needed
- [ ] `npm run check` passes

## Edge cases

- Empty categories / empty active chip
- Many categories (chips wrap per M1-07/08)
- Switching Open ↔ Completed resets or preserves page sensibly (document choice; prefer reset to page 1)
- Application vs misc sections under chips — filtering must not drop rows or break counts

## Tests

- [ ] Manual: Open/Completed tabs, chip filter, pager, clamp scroll with enough tasks
- [ ] Manual: complete/reopen and category rename still work after layout change
- [ ] `npm run check`

## Reuse notes

- `ChromeTab`, `FilterChips` (or squared chips matching DS), `Pager` (M2-01)
- Layout prototype reference: `/prototype/f09/layout` (Tasks chips → one well); patterns surface C
- Current page: `apps/web/src/pages/Tasks.tsx`

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-02: …`
- [ ] End-of-task report given

## Verification notes

(pending)
