# M4-05: Dense Field `sm` aligned with Button `sm`

**Status:** Ready
**Blocked by:** (none)
**Implements:** R.1, R.15 (from `../../spec.md`); extends Field sizes in `docs/design-system.md`
**Type:** build
**Scheduled with:** resolve on `f09-m2-tasks` (after toast / icon tickets land in the layout follow-up)

## Found during

2026-10-18 — After F09 M2-03 put Tasks card footers on `Button` / `TextField` / `SelectField`, control heights alternated in one row:

- Category move `SelectField` grew to full `.ui-field` **md** (Tasks `.task-move-select` compact rules lose to `ui.css`, which loads after `styles.css`)
- Deadline kind / date / time still partly forced compact by higher-specificity Tasks selectors
- `Button size="sm"` uses different metrics than Field md
- Native `date` / `time` chrome often reads taller than a text button even with matching padding

Design system today: Field variants are only **`md`** and **`num`** (compact number). There is **no** shared dense height for selects/text fields next to `Button sm` in card action rows.

## Evidence

- Field md: [`ui.css`](../../../../../apps/web/src/ui/ui.css) `.ui-field` — `font-size: 0.875rem`, `padding: 0.45rem 0.6rem`
- Button sm: `.ui-button-sm` — `font-size: 0.75rem`, `padding: 0.28rem 0.65rem`
- Tasks compact leftovers: `.application-card-apply-by select…`, `.task-move-select` in [`styles.css`](../../../../../apps/web/src/styles.css)

## What to build

1. Add **`fieldSize="sm"`** on `TextField` / `SelectField` (and document it) with vertical metrics **aligned to `Button size="sm"`** — same type size and comparable padding/target height so dense action rows don’t alternate.
2. Short **dense action row** note in `docs/design-system.md` (card footers: Button sm + Field sm together; prefer one shared height).
3. Apply on **Tasks** footer controls (deadline kind/date/time, Save, category move, Complete / Edit subtasks row) and remove obsolete Tasks-only compact overrides that fight `.ui-field`.

**Out of scope:** `fieldSize="num"` behavior change; full-app field migration; icon Button size (**M4-04**).

## Acceptance criteria

- [ ] `fieldSize="sm"` exists and is documented next to `md` / `num`
- [ ] Visual height of Field sm ≈ Button sm in a horizontal dense row (spot-check Tasks footer)
- [ ] Tasks category select, deadline controls, and adjacent buttons no longer alternate thick/thin in an obvious way
- [ ] Cascade hacks that only partially compact some controls are removed or reduced to non-size concerns
- [ ] `npm run check` passes

## Edge cases

- Native date/time: document if browser chrome still adds a few pixels; prefer shared padding/font even if UA min-height differs slightly
- Disabled / focus rings still meet Field policy
- `num` remains for short numeric boxes (not a substitute for sm selects)

## Tests

- [ ] Manual: Tasks open-card footer — kind, date, time, Save, Complete, category select read as one dense band
- [ ] `npm run check`

## Reuse notes

`apps/web/src/ui/Field.tsx`, `ui.css`, Tasks card footer in `Tasks.tsx`.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M4-05: …`
- [ ] End-of-task report given

## Verification notes

(pending)
