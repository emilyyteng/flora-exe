# M4-04: Button `size="icon"` for dense icon toolbars

**Status:** Ready
**Blocked by:** (none)
**Implements:** R.1, R.15 (from `../../spec.md`); extends Button sizes in `docs/design-system.md`
**Type:** build
**Scheduled with:** may land on `f09-m2-tasks` after M4-05; Tasks currently uses a temporary cascade override

## Found during

2026-10-18 — F09 M2-03 migrated Tasks card toolbar (edit / duplicate / delete) onto `Button size="sm"`. Icons shrank badly: Tasks CSS wants a fixed **1.65rem** hit target with `padding: 0`, but `button.secondary.ui-button` / `-sm` padding (from `ui.css`, loaded after `styles.css`) won the cascade and crushed the SVGs.

## Evidence

- Original Targets: [`.task-edit-btn` / `.todo-remove-btn`](../../../../../apps/web/src/styles.css) `width`/`height` 1.65rem, `padding: 0`
- Button sm: [`ui.css`](../../../../../apps/web/src/ui/ui.css) `padding: 0.28rem 0.65rem`
- Temporary fix on Tasks: higher-specificity overrides restoring 1.65rem (follow-up on `f09-m2-tasks`, not a lasting DS solution)

## What to build

Add a design-system **icon-only** Button size (proposed name: `size="icon"`):

- Fixed square hit target (match today’s Tasks **1.65rem**, or lock a token if preferred)
- No labeled-control padding; centers a single icon
- Works with `ghost` / `secondary` (and `primary` if needed)
- Document in `docs/design-system.md` Button row; migrate Tasks toolbar off the local override onto `size="icon"`

**Out of scope:** redesigning every icon button in the app in one pass (other call sites can follow); changing labeled `sm` / `md`.

## Acceptance criteria

- [ ] `Button` accepts `size="icon"` (or agreed name) with documented hit target
- [ ] Tasks edit / duplicate / delete use it; temporary Tasks-only size overrides removed or reduced to non-size chrome
- [ ] `docs/design-system.md` lists the size; no ambiguity between labeled `sm` and icon-only
- [ ] `npm run check` passes (incl. `check:ui`)

## Edge cases

- Disabled opacity still readable
- Hover/border language matches dense card toolbars (ink desk; no blue fill)

## Tests

- [ ] Manual: Tasks toolbar icons match pre–M2-03 visual size
- [ ] `npm run check`

## Reuse notes

`apps/web/src/ui/Button.tsx`, `ui.css`; Tasks toolbar as the first consumer.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] No production imports of prototype code
- [ ] Committed as `F09 M4-04: …`
- [ ] End-of-task report given

## Verification notes

(pending)
