import type { ReactNode } from "react";
import Button from "./Button";

export type FilterChipOption<T extends string> = {
  value: T;
  label: ReactNode;
};

type Props<T extends string> = {
  value: T;
  options: ReadonlyArray<FilterChipOption<T>>;
  onChange: (value: T) => void;
  label: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Squared filter-chip row (F09 / design-system.md). Separate bordered buttons —
 * not rounded Segmented. Active = ink border + light wash.
 */
export default function FilterChips<T extends string>({
  value,
  options,
  onChange,
  label,
  disabled,
  className = "",
}: Props<T>) {
  return (
    <div
      className={`ui-filter-chips${className ? ` ${className}` : ""}`}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="ghost"
          size="sm"
          role="radio"
          aria-checked={value === opt.value}
          disabled={disabled}
          className={`ui-filter-chip${value === opt.value ? " is-active" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
