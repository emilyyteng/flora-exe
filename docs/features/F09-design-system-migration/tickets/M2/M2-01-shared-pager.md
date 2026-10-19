# M2-01: Shared `Pager` primitive

**Status:** Done
**Blocked by:** (none)
**Implements:** R.7, R2.1 (from `../../spec.md`); List pagination in `docs/design-system.md`
**Type:** build

## What to build

Extract a production shared **`Pager`** so list migrations (Tasks well first, then Jobs) stop inventing page controls. Contract is already locked (M1-09): bottom Prev · `page / pages` · Next; default page size **25**; no page-jump `<select>`, no page-size selector. Optional duplicate pager above a tall well is allowed by the design system but not required in this ticket.

Prototype sketch lives only in `/prototype/f09/patterns` — do not import it from production; reimplement under `apps/web/src/ui/`.

## Acceptance criteria

- [x] `Pager` lives in `apps/web/src/ui/` and is exported from `ui/index.ts`
- [x] Anatomy: Prev / current-page text (mono) / Next only; uses `Button` (or documented pager button styling), no bare `<button>`
- [x] Props cover at least: current page (1-based), total pages, `onPage` (or equivalent); disabled Prev on page 1 and Next on last page; hide or no-op sensibly when `pages <= 1` (document choice)
- [x] Default page size **25** is documented for callers (constant or JSDoc); this ticket need not migrate any list yet
- [x] `docs/design-system.md` no longer says “build when the first list migrates” — note the helper is live and point at the module
- [x] F09 Current behavior / migrate-later notes updated if they still imply no shared `Pager`
- [x] `npm run check` passes (incl. `check:ui`)

## Edge cases

- `pages === 0` or `pages === 1` (empty or single page)
- Rapid clicks / already-on-page callbacks should be harmless
- Do not add jump select or page-size UI “for convenience”

## Tests

- [x] Documented choice: render nothing when `pages <= 1`; Prev/Next disabled at ends (checked by reading + `check:ui`)
- [x] `npm run check`

## Reuse notes

- Contract: `docs/design-system.md` § List pagination (M1-09)
- Visual reference only: `apps/web/src/prototype/f09-design-system/PatternsPage.tsx` (do not import)
- `Button` from `ui/`

## Definition of done

- [x] Acceptance criteria met and checked
- [x] `npm run check` passes
- [x] Follows `docs/design-system.md`
- [x] Reuse check done
- [x] No production imports of prototype code
- [x] Committed as `F09 M2-01: …`
- [x] End-of-task report given

## Verification notes

**2026-10-18:** Added `apps/web/src/ui/Pager.tsx` + `.ui-pager` styles; exported `Pager` and `DEFAULT_PAGE_SIZE` (25). Hides when `pages <= 1`. Design-system catalogue + List pagination section updated; F09 Jobs pager current-behavior note points at M2-01 / M2-04. `npm run check` passed (check:ui, typecheck, web build, 390 API tests). No list host migrated yet (M2-02+). Commit: `cd4b2ad`.
