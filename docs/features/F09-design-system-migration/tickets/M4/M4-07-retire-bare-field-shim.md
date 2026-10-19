# M4-07: Retire bare field structural shim

**Status:** Ready
**Blocked by:** (none) — pairs well after form-heavy surface waves; not blocked on them
**Implements:** R.1, R1.1 (from `../../spec.md`); closes M1-04 field kill-list remainder
**Type:** refactor
**Scheduled with:** M4 cleanup; can run as its own small PR (not one mega M4 branch)

## Found during

2026-10-18/19 — F09 M4-05 (Field `sm` on Tasks). Named `.ui-field` / `.ui-field-sm` lost to the global `input[type="date"]` / `input[type="time"]` shim in `styles.css` (element + attribute beats a single class). Fixed in M4-05 with higher-specificity `input.ui-field…` overrides. User agreed the shim competing with primitives is debt worth retiring.

## Evidence

- Shim: [`styles.css`](../../../../../apps/web/src/styles.css) — `input, textarea, select { … padding; border; … }` and `input[type="date"], input[type="time"], … { padding: 0.45rem 0.65rem; }`
- Product look is supposed to come from `.ui-field` ([`ui.css`](../../../../../apps/web/src/ui/ui.css)); M1-04 left the shim as temporary (“kill with page waves / M1-05+”)
- Spec current behavior: Conflicts R.1 (shim) — still open
- M1-04 inventory (2026-10-15): ~60 bare `<input>`, ~16 `<textarea>`, ~19 `<select>` without `.ui-field` (counts drift as waves migrate)

## What to build

1. **Inventory** remaining production bare `input` / `textarea` / `select` (exclude `ui/`, `prototype/`).
2. **Migrate** those call sites to `TextField` / `SelectField` / `TextAreaField` (or a documented feature class if a true exception), preferring surface-local PRs when a host is large — this ticket may be split into follow-ups by area if the inventory is big.
3. **Neutralize / delete** the product-looking global field rules (padding, border, date/time padding). Keep only a true reset if still needed (e.g. `font` / `box-sizing` inheritance) that cannot override `.ui-field` metrics.
4. **Remove** defensive higher-specificity Field overrides in `ui.css` that exist only to beat the shim (once the shim cannot win).
5. **Expand** `check:ui` (or add a sibling check) so new bare fields outside exempt trees fail CI — at least beyond the Home-only field tree.

**Out of scope:** Migrating legacy `button.secondary` call sites to `Button` (separate; surface waves); global `a` link rules; M4-05 Field sm behavior itself.

## Acceptance criteria

- [ ] Inventory of remaining bare fields recorded in verification notes (or zero left)
- [ ] No production bare fields rely on the structural shim for product chrome
- [ ] Global `input` / `textarea` / `select` / date-time rules no longer set padding/border that fight `.ui-field`
- [ ] `input.ui-field…` shim-beating overrides removed or reduced to non-shim concerns
- [ ] Enforcement covers bare fields beyond Home (or documents an explicit remaining carve-out with a follow-up)
- [ ] Spec current-behavior shim row updated to Conforms / removed
- [ ] `npm run check` passes

## Edge cases

- Third-party / native-only controls that cannot use Field wrappers — document exceptions
- Checkbox / radio / file inputs if the shim currently styles them — don’t break
- Date/time UA chrome still differs by browser after shim removal (Field sm height rules stay)
- Do not reintroduce a `:not(.ui-field)` opt-out chain (AGENTS / design-system forbid that pattern)

## Tests

- [ ] Manual: spot-check migrated forms (Tasks detail, Applications, Interviews, Jobs filters, Progress)
- [ ] `npm run check` (including expanded field enforcement)
- [ ] Optional: count bare fields before/after in verification notes

## Reuse notes

`TextField` / `SelectField` / `TextAreaField`; `scripts/check-ui-variants.mjs`; M1-04 verification notes as historical inventory.

## Definition of done

- [ ] Acceptance criteria met and checked
- [ ] `npm run check` passes
- [ ] Follows `docs/design-system.md`
- [ ] Reuse check done
- [ ] Committed as `F09 M4-07: …`
- [ ] End-of-task report given

## Verification notes

(pending)
