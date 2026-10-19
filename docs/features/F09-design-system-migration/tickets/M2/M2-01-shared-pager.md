# M2-01: Shared `Pager` primitive

**Status:** Ready
**Blocked by:** (none)
**Implements:** R.7, R2.1 (from `../../spec.md`); List pagination in `docs/design-system.md`
**Type:** build

## What to build

Extract a production shared **`Pager`** so list migrations (Tasks well first, then Jobs) stop inventing page controls. Contract is already locked (M1-09): bottom Prev · `page / pages` · Next; default page size **25**; no page-jump `<select>`, no page-size selector. Optional duplicate pager above a tall well is allowed by the design system but not required in this ticket.

Prototype sketch lives only in `/prototype/f09/patterns` — do not import it from production; reimplement under `apps/web/src/ui/`.

## Acceptance criteria

- [ ] `Pager` lives in `apps/web/src/ui/` and is exported from `ui/index.ts`
- [ ] Anatomy: Prev / current-page text (mono) / Next only; uses `Button` (or documented pager button styling), no bare `<button>`
- [ ] Props cover at least: current page (1-based), total pages, `onPage` (or equivalent); disabled Prev on page 1 and Next on last page; hide or no-op sensibly when `pages <= 1` (document choice)
- [ ] Default page size **25** is documented for callers (constant or JSDoc); this ticket need not migrate any list yet
- [ ] `docs/design-system.md` no longer says “build when the first list migrates” — note the helper is live and point at the module
- [ ] F09 Current behavior / migrate-later notes updated if they still imply no shared `Pager`
- [ ] `npm run check` passes (incl. `check:ui`)

## Edge cases

- `pages === 0` or `pages === 1` (empty or single page)
- Rapid clicks / already-on-page callbacks should be harmless
- Do not add jump select or page-size UI “for convenience”

## Tests

- [ ] Manual or light unit: Prev/Next enablement and page callback
- [ ] `npm run check`

## Reuse notes

- Contract: `docs/design-system.md` § List pagination (M1-09)
- Visual reference only: `apps/web/src/prototype/f09-design-system/PatternsPage.tsx` (do not import)
- `Button` from `ui/`

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-01: …`
- [ ] End-of-task report given

## Verification notes

(pending)
