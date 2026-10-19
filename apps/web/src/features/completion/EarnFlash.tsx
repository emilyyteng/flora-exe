import { useEffect } from "react";
import type { PointsEarnInfo } from "../../api";
import { Button } from "../../ui";

type Props = {
  earn: PointsEarnInfo | null;
  onDismiss: () => void;
  /** Auto-hide after ms; 0 disables. */
  durationMs?: number;
  /**
   * `inline` — in document flow near the earning control (default).
   * `toast` — sticky viewport fallback when there is no stable anchor
   * (e.g. after a modal close removes the row).
   */
  placement?: "inline" | "toast";
  className?: string;
};

/** Small mint banner after a points-earning action. */
export default function EarnFlash({
  earn,
  onDismiss,
  durationMs = 4200,
  placement = "inline",
  className = "",
}: Props) {
  useEffect(() => {
    if (!earn || durationMs <= 0) return;
    const id = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(id);
  }, [earn, durationMs, onDismiss]);

  if (!earn) return null;

  const line =
    earn.message.trim() ||
    (earn.amount >= 0
      ? `+${earn.amount} points`
      : `${earn.amount} points`);

  const banner = (
    <p
      className={[
        "earn-flash",
        placement === "toast" ? "earn-flash-toast" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <span className="earn-flash-msg">{line}</span>
      <span className="earn-flash-balance">balance {earn.balanceAfter}</span>
      <Button
        variant="ghost"
        size="sm"
        className="earn-flash-dismiss"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        ×
      </Button>
    </p>
  );

  if (placement === "toast") {
    return <div className="earn-flash-toast-host">{banner}</div>;
  }

  return banner;
}
