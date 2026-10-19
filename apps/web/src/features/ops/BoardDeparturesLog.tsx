/**
 * Status board departures log (F08 M6-03 / M6-04 / R6.2–R6.7).
 */
import { useEffect, useState } from "react";
import {
  getBoardDepartures,
  type BoardDepartureDay,
  type BoardDeparturesSnapshot,
} from "../../api";
import FilterChips from "../../ui/FilterChips";

type DepartureView = "left_board" | "duplicate" | "task_removed";

const VIEW_OPTIONS: ReadonlyArray<{ value: DepartureView; label: string }> = [
  { value: "left_board", label: "Left board" },
  { value: "duplicate", label: "Duplicate" },
  { value: "task_removed", label: "Task removed" },
];

function browserTz(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

function formatDayLabel(isoDate: string, today: string): string {
  if (isoDate === today) return "Today";
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function visibleDays(
  snap: BoardDeparturesSnapshot,
  view: DepartureView,
): BoardDepartureDay[] {
  return snap.days
    .map((day) => {
      const rows = day.rows.filter((r) => {
        if (view === "left_board") return r.reason === "left_board";
        if (view === "duplicate") return r.reason === "duplicate";
        return r.taskRemoved;
      });
      return {
        ...day,
        rows,
        taskRemovedCount: rows.filter((r) => r.taskRemoved).length,
      };
    })
    .filter((day) => day.rows.length > 0);
}

function emptyCopy(view: DepartureView): string {
  if (view === "left_board") return "No left-board departures in the last day.";
  if (view === "duplicate") return "No duplicate departures in the last day.";
  return "No departures with a task removed in the last day.";
}

export default function BoardDeparturesLog() {
  const [snap, setSnap] = useState<BoardDeparturesSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<DepartureView>("left_board");

  useEffect(() => {
    let cancelled = false;
    void getBoardDepartures(browserTz())
      .then((data) => {
        if (!cancelled) {
          setSnap(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load departures");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const days = snap ? visibleDays(snap, view) : [];
  const hasAny = (snap?.days.length ?? 0) > 0;

  return (
    <article className="card ops-card ops-card-wide ops-departures">
      <div className="ops-departures-head">
        <div>
          <h3 className="ops-card-heading">Board departures</h3>
          <p className="muted ops-card-hint ops-departures-lede">
            Postings that left the board or were removed as duplicates. Explains why an
            application task may have disappeared.
          </p>
        </div>
        {hasAny && (
          <FilterChips
            label="Board departure view"
            value={view}
            onChange={setView}
            options={VIEW_OPTIONS}
          />
        )}
      </div>

      {error && <p className="error ops-card-error">{error}</p>}
      {!snap && !error && <p className="muted">Loading departures…</p>}

      {snap && !hasAny && (
        <p className="muted ops-departures-empty">No board departures in the last day.</p>
      )}

      {snap && hasAny && days.length === 0 && (
        <p className="muted ops-departures-empty">{emptyCopy(view)}</p>
      )}

      {snap && days.length > 0 && (
        <div className="ops-departures-days">
          {days.map((day) => (
            <details
              key={day.date}
              className="ops-departures-day"
              open={day.date === snap.localDate}
            >
              <summary className="ops-departures-day-summary">
                <span className="ops-departures-day-label">
                  {formatDayLabel(day.date, snap.localDate)}
                </span>
                {view !== "task_removed" && day.taskRemovedCount > 0 && (
                  <span className="ops-departures-day-count">
                    {day.taskRemovedCount} task removed
                  </span>
                )}
                <span className="muted ops-departures-day-total">
                  {day.rows.length} posting{day.rows.length === 1 ? "" : "s"}
                </span>
              </summary>
              <ul className="ops-departures-list">
                {day.rows.map((row) => (
                  <li
                    key={row.id}
                    className={
                      row.taskRemoved
                        ? "ops-departures-row is-task-removed"
                        : "ops-departures-row"
                    }
                  >
                    <div className="ops-departures-row-main">
                      <strong className="ops-departures-title">{row.title}</strong>
                      <span className="ops-departures-meta">
                        {row.company}
                        {row.location ? ` · ${row.location}` : ""}
                      </span>
                    </div>
                    <div className="ops-departures-row-tags">
                      <span className="ops-departures-reason">{row.reasonLabel}</span>
                      {row.taskRemoved && (
                        <span className="ops-departures-task-flag">task removed</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </article>
  );
}
