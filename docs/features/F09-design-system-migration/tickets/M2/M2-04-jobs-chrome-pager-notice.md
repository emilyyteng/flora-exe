# M2-04: Jobs chrome, shared `Pager`, ranking `OneTimeNotice`

**Status:** Draft
**Blocked by:** M2-01
**Implements:** R.6, R.7, R.8, R2.1 (from `../../spec.md`)
**Type:** build
**Scheduled with:** after F08 M3 (Tasks wave + recurring pause); pairs well with M4-03 for location chip look

## What to build

Migrate **Jobs** onto locked page chrome and list defaults:

- Containerized **title → `ChromeTab` page tabs → optional filter chips → content** (R.8)
- Replace legacy `.tabs` / `.tab.on` blue tabs
- Replace Jobs `.pager` + page-jump `<select>` with shared **`Pager`** (R.7)
- Move the Jobs ranking banner onto **`OneTimeNotice`** (R.6): shown once per event, × closes early, marked seen in `localStorage` (not `sessionStorage` / 30‑minute batch hide as the primary model)

**Out of scope unless pulled in:** location chip *look* → shared `FilterChips` is **M4-03** (Ready; can land in the same pass or separately). Applications / Interviews are M2-05 / M2-06.

## Acceptance criteria

- [ ] Jobs page tabs use `ChromeTab` `size="page"`; no legacy blue `.tab.on` on Jobs
- [ ] Chrome follows title → tabs → chips → content inside one card (or documented Jobs exception)
- [ ] List pagination uses shared `Pager`; jump select removed
- [ ] Ranking result banner uses `OneTimeNotice` with a stable storage key; behavior matches design-system one-time notice rules
- [ ] Ranked/unranked (and other Jobs partitions) keep working; refresh / ranking flows still make sense with the new notice
- [ ] F09 Current behavior rows for Jobs banner, pager, and tabs updated
- [ ] `npm run check` passes

## Edge cases

- Notice keying: new ranking batch vs same batch revisit — follow OneTimeNotice “once per event” intent; do not leave the old sessionStorage+30min path as the primary dismiss model
- Empty pages / single page (Pager hide or disabled ends)
- Location filter still functional whether or not M4-03 has landed

## Tests

- [ ] Manual: tab switch, pager, location filter, ranking notice show/dismiss/seen
- [ ] `npm run check`

## Reuse notes

- `ChromeTab`, `Pager` (M2-01), `OneTimeNotice`, optionally `FilterChips` via M4-03
- `apps/web/src/features/jobs/JobsPage.tsx`

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-04: …`
- [ ] End-of-task report given

## Verification notes

(pending)
