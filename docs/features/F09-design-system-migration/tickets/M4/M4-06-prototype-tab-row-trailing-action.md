# M4-06: Prototype page-tab row trailing action

**Status:** Ready
**Blocked by:** (none)
**Implements:** R.8, R.15 (from `../../spec.md`); extends Page chrome / nesting in `docs/design-system.md`
**Type:** prototype
**Scheduled with:** after Tasks wave / before or beside M2 list chrome waves; does not block shipping current Tasks “Add category +”

## Found during

2026-10-18 — F09 M2 Tasks polish. User placed a right-aligned **primary** “Add category +” on the Open/Completed **page-tab row**, opening a create modal. R.8 documents title → tabs → chips → content and “primary writes stay modals,” but does **not** document a trailing write control on the tab row. Keeping the Tasks control as-is for this branch; lock the pattern (or reject it) via prototype before enforcing app-wide.

## State today (audit seeds)

| Surface | Trailing control | Variant / look | Notes |
|---------|------------------|----------------|-------|
| **Tasks** (`f09-m2-tasks`) | “Add category +” on Open/Completed tab row | `Button` **primary** sm | [`Tasks.tsx`](../../../../../apps/web/src/pages/Tasks.tsx) `.tasks-tabs-row`; chips sit **below** the tab row |
| **Applications** | “Add application +” on status tabs row | `Button` **primary** | [`ApplicationsPage.tsx`](../../../../../apps/web/src/features/applications/ApplicationsPage.tsx) `.tabs-row`; legacy `.tab.on` (M2-05) |
| **Interviews** | “Add interview +” on tabs row | `Button` **primary** | [`InterviewsPage.tsx`](../../../../../apps/web/src/features/interviews/InterviewsPage.tsx) `.tabs-row`; legacy tabs (M2-06) |
| **Jobs** | “Refresh board” on ranked/unranked tabs row | `button.secondary.refresh-btn` | [`JobsPage.tsx`](../../../../../apps/web/src/features/jobs/JobsPage.tsx) `.tabs-row`; operational, not create |
| **Home** | No page-tab trailing CTA | — | [`Home.tsx`](../../../../../apps/web/src/pages/Home.tsx) section cards (Upcoming, etc.); user flagged as arguably needing the same trailing-action language once locked |

Open axes (do not assume in build tickets):

1. **Primary vs secondary** for create CTAs vs operational actions (refresh)
2. **Alignment:** tab row vs **chip row** (Tasks has both; Apps/Interviews often have no L2 chips)
3. Whether Home **section** headers get the same trailing-action language or stay a separate pattern

## Design questions (prototype only)

Variants may differ **only** on these axes. Every variant must still satisfy locked R.8 (containerized title → tabs → optional chips → content; chrome budget; primary writes in modals unless deep-linkable).

1. Trailing create CTA: **primary** vs **secondary** (and does Jobs refresh stay secondary forever)?
2. Vertical placement when chips exist: **tab row** vs **chip row** (right-aligned)?
3. Does Home need a related “section header trailing action” pattern, a deliberate exception, or no trailing CTAs?

Prototype URL: `/prototype/f09/tab-trailing` (or under `/prototype/f09/…` with PrototypeSwitcher)

## What to build

1. F09-owned prototype exploring the axes above (include mocked Tasks with chips, Apps-like tabs+create, Jobs-like tabs+refresh, and a Home section mock).
2. User verdict recorded in this ticket + **decisions log** / `docs/design-system.md` Page chrome section (concrete rule for trailing actions).
3. **Required follow-up:** create a separate Ready **build** ticket to enforce the locked rule across Tasks, Applications, Interviews, Jobs, and Home (and any other audited hosts). Do not implement the app-wide migrate in this prototype ticket.

## Acceptance criteria

- [ ] Prototype live in DEV with labeled “Experimental prototype” banner; file header cites this ticket and the design questions
- [ ] Variants cover primary vs secondary, tab-row vs chip-row (when chips exist), and Home section treatment
- [ ] Verdict recorded; `docs/design-system.md` updated with the locked trailing-action rule (or explicit “no trailing on tab row”)
- [ ] Follow-up **enforce** ticket created from the template, linked here and on the board, Ready or Draft per user
- [ ] Current Tasks Add category + left as-is until the enforce ticket runs (no drive-by restyle in this ticket)
- [ ] `npm run check` passes

## Edge cases

- Narrow widths: trailing CTA wraps vs shrinks vs icon-only (document choice)
- Refresh / long-running labels vs short “Add x +”
- Chip row present only on some tabs (Jobs location chips)

## Tests

- [ ] Manual: switch variants; check against R.8 chrome budget
- [ ] `npm run check`

## Reuse notes

`PrototypeSwitcher`, `/prototype/f09/nesting` and `/prototype/f09/layout` as historical chrome reference; `Button`, `ChromeTab`, `FilterChips`.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md` / Prototypes rules in `AGENTS.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M4-06: …`
- [ ] End-of-task report given
- [ ] Follow-up enforce ticket filed

## Verification notes

(pending)
