# M2-03: Tasks controls + near-control EarnFlash

**Status:** Done
**Blocked by:** (none) — M2-02 Done
**Implements:** R.1, R.9, R2.1 (from `../../spec.md`); EarnFlash placement in `docs/design-system.md`
**Type:** build

## What to build

Finish the Tasks wave after layout (**M2-02**): move Tasks onto explicit control variants, and place **`EarnFlash` near the control that earned** (inline under the row / action cluster, or anchored portal). When the action has no stable anchor (e.g. after a modal closes), use the sticky viewport **toast fallback**. Reject page-top-only EarnFlash as the Tasks default.

**Out of scope:** further compaction tactics already decided in M2-02; Jobs/Progress EarnFlash hosts (later M2 tickets); F08 M3 recurring.

## Acceptance criteria

- [x] Tasks page actions use `Button` / `TextField` / `SelectField` / `TextAreaField` (or other named variants) — no new bare `<button>` / unclassed fields; replace obvious `button.secondary` / interim `ui-btn*` call sites on this page
- [x] Completing a task (and other in-page earns on Tasks) shows `EarnFlash` in the current viewport near that row/control
- [x] Modal-driven earns on Tasks use toast fallback when there is no stable anchor
- [x] Page-top-only `EarnFlash` under the tabs is removed as the default placement
- [x] F09 Current behavior EarnFlash / Tasks rows updated; `design-system.md` “apply on Tasks” note marked done for this host
- [x] `npm run check` passes (incl. `check:ui`)

## Edge cases

- Earn while the earning row is scrolled inside the 28rem well — flash must still be visible without jumping to page top
- Rapid completes / flash replaced by a newer earn
- Reopen / non-earn actions must not show a false EarnFlash

## Tests

- [x] Complete path uses toast (row removed after modal); actual-minutes save uses inline under card (by reading handlers + placement)
- [x] `npm run check`

## Reuse notes

- `EarnFlash` (`placement`), `Button`, `TextField`, `SelectField`
- Pattern: M1-10 / `docs/design-system.md` § EarnFlash / notice placement
- Layout from M2-02 (`Tasks.tsx`)

## Definition of done

- [x] Acceptance criteria met and checked
- [x] `npm run check` passes
- [x] Follows `docs/design-system.md`
- [x] Reuse check done
- [x] No production imports of prototype code
- [x] Committed as `F09 M2-03: …`
- [x] End-of-task report given

## Verification notes

**2026-10-18:** Tasks controls → `Button` / `TextField` / `SelectField`. `EarnFlash` gained `placement: inline | toast`. Complete/applied (modal; row removed) → toast; actual-minutes save → inline under that card. Page-top flash removed. Weekly-target checkbox left as a labeled checkbox (not a Field primitive). `npm run check` passed. Commit: `e55169d`.
