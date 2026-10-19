# Board: Design system migration (F09)

Index of every ticket in this feature. Each ticket file's `Status:` line is the source of truth; update this board in the same commit. Spec: [spec.md](./spec.md).

## M0: Visual direction & foundations

**Milestone status:** Done

No open tickets.

<details>
<summary>Done (3)</summary>

| Ticket | Title | Commit |
|--------|-------|--------|
| [M0-01](./tickets/M0/M0-01-production-ui-inventory.md) | Production UI visual inventory (spike) | `e872617` / `9297b9d` + review close-out |
| [M0-02](./tickets/M0/M0-02-prototype-visual-direction.md) | F09 visual-direction prototypes (exploratory lab) | `548ba4e` |
| [M0-03](./tickets/M0/M0-03-lock-visual-foundations.md) | Lock visual foundations into `docs/design-system.md` | `b26fb29` |

</details>

## M1: Primitives, patterns, enforcement, pilot migrate

**Milestone status:** Done

No open tickets.

<details>
<summary>Done (16)</summary>

| Ticket | Title | Commit |
|--------|-------|--------|
| [M1-01](./tickets/M1/M1-01-production-tokens-fonts-brand.md) | Production tokens, fonts, shell 1100, flora mark | `9b5af76` |
| [M1-02](./tickets/M1/M1-02-button-field-segmented-primitives.md) | Button, field, segmented primitives | `caa0d3c` |
| [M1-03](./tickets/M1/M1-03-tabs-and-badge-helpers.md) | Tabs / chrome-tab + badge helpers | `26329b2` |
| [M1-14](./tickets/M1/M1-14-apply-heat-urgency-washes.md) | Apply heat, urgency, surface-2 washes | `7e7c335` |
| [M1-04](./tickets/M1/M1-04-neutralize-global-control-defaults.md) | Neutralize global button/field defaults | `8af8ad0` |
| [M1-05](./tickets/M1/M1-05-pilot-home.md) | Pilot migrate Home + app shell | `6ab5517` |
| [M1-15](./tickets/M1/M1-15-prototype-home-chrome-refinements.md) | Prototype + lock Home chrome & urgency refinements | `518386b` |
| [M1-06](./tickets/M1/M1-06-pattern-feature-shell-nested-tabs.md) | Pattern: feature shell / nested tabs (Q9/Q15) | `1d71980` |
| [M1-07](./tickets/M1/M1-07-pattern-paired-panel-height.md) | Pattern: paired panel height + in-panel overflow (Q16) | `2a60bb0` |
| [M1-08](./tickets/M1/M1-08-pattern-chrome-budget.md) | Pattern: chrome budget / width (Q16 remainder) | `9855852` |
| [M1-09](./tickets/M1/M1-09-pattern-list-pagination.md) | Pattern: list pagination (Q8/R.7) | `b700154` |
| [M1-10](./tickets/M1/M1-10-pattern-earnflash-placement.md) | Pattern: EarnFlash placement (Q10/R.9) | `e25943c` |
| [M1-11](./tickets/M1/M1-11-pattern-compact-long-pages.md) | Pattern: compact long-page tactics (Q11/R.10) | `62ed23a` |
| [M1-16](./tickets/M1/M1-16-in-content-link-hover.md) | Apply in-content link hover app-wide | `fd60056` |
| [M1-12](./tickets/M1/M1-12-modal-anatomy.md) | Modal chrome anatomy | `cbb2f5e` |
| [M1-13](./tickets/M1/M1-13-enforcement-variant-lint.md) | Enforcement for variant-less controls (Q6) | `3afa0e1` |

</details>

## M2: Core surface waves

**Milestone status:** In progress

**Plan (2026-10-18):** Phase 1 — **M2-01 → M2-02 → M2-03** (Tasks). Then pause for **F08 M3** (recurring). Phase 2 — **M2-04 → M2-07** (Jobs / Apps / Interviews / Progress apply). Legacy chip *look* is **M4-03** (Ready; pairs with M2-04). M2-07 This week = audit/gaps only (F11 already remodeled the hub).

**Delivery:** `f09-m2-tasks` (M2-01…03) → PR; then `f09-m2-lists` (M2-04…06); then `f09-m2-progress` (M2-07). Spec Delivery column + map: [spec.md](./spec.md#milestones).

| Ticket | Title | Type | Status | Notes |
|--------|-------|------|--------|-------|
| [M2-04](./tickets/M2/M2-04-jobs-chrome-pager-notice.md) | Jobs chrome, `Pager`, ranking `OneTimeNotice` | build | Draft | After F08 M3; R.6/R.7/R.8 |
| [M2-05](./tickets/M2/M2-05-applications-chrome.md) | Applications → `ChromeTab` + containerized chrome | build | Draft | After F08 M3 |
| [M2-06](./tickets/M2/M2-06-interviews-chrome.md) | Interviews → `ChromeTab` + containerized chrome | build | Draft | After F08 M3 |
| [M2-07](./tickets/M2/M2-07-progress-apply-audit.md) | Progress apply + This week audit/gaps | build | Draft | After F08 M3; not a This week redesign |

<details>
<summary>Done (3)</summary>

| Ticket | Title | Commit |
|--------|-------|--------|
| [M2-01](./tickets/M2/M2-01-shared-pager.md) | Shared `Pager` primitive | `cd4b2ad` |
| [M2-02](./tickets/M2/M2-02-tasks-compaction-layout.md) | Tasks compaction layout | `123e956` |
| [M2-03](./tickets/M2/M2-03-tasks-controls-earnflash.md) | Tasks controls + near-control EarnFlash | `e55169d` |

</details>

## M3: Finish & harden

**Milestone status:** Not started

Tickets after M2. Expected: remaining pages; CSS split if still warranted (Q7); retire dead opt-outs / obsolete prototype styles; feature close-out. Achievement unlock → `ModalLayer` is already ticketed (surfaced in M1-12).

| Ticket | Title | Type | Status | Notes |
|--------|-------|------|--------|-------|
| [M3-01](./tickets/M3/M3-01-achievement-unlock-modallayer.md) | Achievement unlock → ModalLayer | bug | Ready | From M1-12; R.4 |

<details>
<summary>Done (0)</summary>

| Ticket | Title | Commit |
|--------|-------|--------|

</details>

## M4: Cleanup & extensions

**Milestone status:** Not started

Ad hoc design-system cleanups and extensions that don’t fit M2 surface waves or M3 finish/harden. Work independently of M2/M3 unless a ticket says otherwise.

| Ticket | Title | Type | Status | Notes |
|--------|-------|------|--------|-------|
| [M4-01](./tickets/M4/M4-01-heatmap-color-contrast.md) | Heatmap colors — more contrast on lower activity | build | Draft | Pale / low-variation heat scale |
| [M4-02](./tickets/M4/M4-02-negative-points-notifications.md) | Spike: notifications for negative point events | spike | Draft | Moved from MT-11 |
| [M4-03](./tickets/M4/M4-03-migrate-legacy-filter-chips.md) | Migrate legacy filter chips to shared `FilterChips` | build | Ready | Jobs loc + Past work kind; pairs with M2-04 |
| [M4-04](./tickets/M4/M4-04-button-icon-size.md) | Button `size="icon"` for dense icon toolbars | build | Ready | From M2-03 Tasks toolbar shrink; Tasks has temp override |
| [M4-06](./tickets/M4/M4-06-prototype-tab-row-trailing-action.md) | Prototype page-tab row trailing action | prototype | Ready | Lock primary/secondary + tab vs chip; require follow-up enforce ticket; Tasks Add category stays as-is for now |

<details>
<summary>Done (1)</summary>

| Ticket | Title | Commit |
|--------|-------|--------|
| [M4-05](./tickets/M4/M4-05-dense-field-sm.md) | Dense Field `sm` aligned with Button `sm` | `d5a5b0a` |

</details>
