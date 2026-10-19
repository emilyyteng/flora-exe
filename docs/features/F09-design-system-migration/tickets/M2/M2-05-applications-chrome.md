# M2-05: Applications page → `ChromeTab` + containerized chrome

**Status:** Draft
**Blocked by:** (none) — after M2-04 preferred for a consistent Jobs→Apps pass
**Implements:** R.8, R2.1 (from `../../spec.md`)
**Type:** build
**Scheduled with:** after F08 M3; resume M2 wave after Jobs

## What to build

Migrate the **Applications** list page onto the same page-chrome anatomy as the Jobs wave: containerized title → **`ChromeTab`** page tabs → optional squared filter chips → content. Drop legacy `.tabs` / `.tab.on` blue tabs.

**Out of scope:** application detail pages (already partially migrated elsewhere); Jobs/Interviews; shared `Pager` unless Applications already paginates and still uses a custom control.

## Acceptance criteria

- [ ] Applications page partitions use `ChromeTab` `size="page"`
- [ ] Chrome matches title → tabs → optional chips → content inside one card
- [ ] No legacy blue `.tab.on` on this page
- [ ] Existing filters, empty states, and navigation to detail still work
- [ ] F09 Current behavior row for Apps/Interviews legacy tabs updated for Applications
- [ ] `npm run check` passes

## Edge cases

- Tab counts / empty partitions
- Deep links or query params that select a partition (preserve behavior)

## Tests

- [ ] Manual: each Applications tab / filter path
- [ ] `npm run check`

## Reuse notes

- `ChromeTab`, `FilterChips` if the page has L2 filters
- `apps/web/src/features/applications/ApplicationsPage.tsx`
- Mirror Jobs anatomy from M2-04 where practical

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-05: …`
- [ ] End-of-task report given

## Verification notes

(pending)
