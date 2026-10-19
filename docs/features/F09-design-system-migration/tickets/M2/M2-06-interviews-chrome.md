# M2-06: Interviews page → `ChromeTab` + containerized chrome

**Status:** Draft
**Blocked by:** (none) — after M2-05 preferred
**Implements:** R.8, R2.1 (from `../../spec.md`)
**Type:** build
**Scheduled with:** after F08 M3; resume M2 wave after Applications

## What to build

Migrate the **Interviews** list page onto containerized title → **`ChromeTab`** page tabs → optional squared filter chips → content. Drop legacy `.tabs` / `.tab.on` blue tabs.

**Out of scope:** interview thread detail chrome beyond what this list page owns; Jobs/Applications.

## Acceptance criteria

- [ ] Interviews page partitions use `ChromeTab` `size="page"`
- [ ] Chrome matches title → tabs → optional chips → content inside one card
- [ ] No legacy blue `.tab.on` on this page
- [ ] Existing thread lists, statuses, and navigation still work
- [ ] F09 Current behavior row for Apps/Interviews legacy tabs cleared once Jobs+Apps+Interviews are done (coordinate with M2-04/05)
- [ ] `npm run check` passes

## Edge cases

- Empty / active / completed (or whatever partitions exist) counts
- Query or route state selecting a partition

## Tests

- [ ] Manual: each Interviews tab and open a thread
- [ ] `npm run check`

## Reuse notes

- `ChromeTab`, `FilterChips` if needed
- `apps/web/src/features/interviews/InterviewsPage.tsx`
- Mirror M2-04 / M2-05 anatomy

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-06: …`
- [ ] End-of-task report given

## Verification notes

(pending)
