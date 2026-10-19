# M2-07: Progress apply — Past work peers, EarnFlash, completions `Pager` (This week audit)

**Status:** Draft
**Blocked by:** M2-01 (for completions `Pager`)
**Implements:** R.7, R.9, R2.1 (from `../../spec.md`); M1-07 paired panel height
**Type:** build
**Scheduled with:** after F08 M3; last M2 surface wave

## What to build

Apply remaining Progress design-system debt without redesigning F11’s habits hub:

1. **Past work** dual peers: fixed **28rem** bodies with in-panel scroll (M1-07) where still wrong
2. **EarnFlash** near-control (or toast fallback) on Progress hosts that still flash at section/page top (R.9)
3. **Completions diary** (and similar long Progress logs): migrate onto shared **`Pager`** where numbered pages apply. Past work’s **calendar-driven 7-day window** stays the documented special case — do not replace that window with a pager
4. **This week composition — audit / gaps only:** F11 already remodeled This week as the habits hub (F11 R.9). Do **not** run a second composition redesign. Check against M1-07/08 / design-system (gaps, dual +/- peers, mini-above-large if needed) and patch only clear conflicts

**Out of scope:** heatmap contrast (**M4-01**); negative-points notifications (**M4-02**); Past work kind chips → `FilterChips` (**M4-03**); Rewards open-canvas; full Progress shell rewrite.

## Acceptance criteria

- [ ] Past work paired columns use fixed 28rem + in-panel scroll when they are equal peers
- [ ] Progress EarnFlash hosts no longer default to page/section-top-only placement
- [ ] Completions-style long lists that should paginate use shared `Pager` (size 25); 7-day window exception preserved and still documented
- [ ] This week: written audit note in verification (conforms vs gaps); only gap fixes shipped
- [ ] F09 Current behavior rows for EarnFlash / completions pager / Progress height updated
- [ ] `npm run check` passes

## Edge cases

- Narrow breakpoints (dual stack at 640)
- Empty completions / single page
- Weekly tab hidden on completions kind filter (coordinate with M4-03 if both touch the panel)

## Tests

- [ ] Manual: Past work calendar + ledger scroll pairing
- [ ] Manual: earn on a Progress host → flash visible near control or toast
- [ ] Manual: completions paging vs 7-day window
- [ ] Manual: This week smoke (habits strip + weekly column + incrementer)
- [ ] `npm run check`

## Reuse notes

- `Pager` (M2-01), `EarnFlash`, Progress layouts under `apps/web/src/features/progress/`
- F11 This week as the habits-hub baseline — extend, don’t replace

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M2-07: …`
- [ ] End-of-task report given

## Verification notes

(pending)
