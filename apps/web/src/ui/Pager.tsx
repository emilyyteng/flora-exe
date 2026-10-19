import Button from "./Button";

/** Default page size for long lists (F09 M1-09 / R.7). */
export const DEFAULT_PAGE_SIZE = 25;

type Props = {
  /** Current page, 1-based. */
  page: number;
  /** Total page count. When `pages <= 1`, the pager renders nothing. */
  pages: number;
  onPage: (page: number) => void;
  className?: string;
  /** Accessible name; defaults to "Pagination". */
  label?: string;
};

/**
 * Bottom list pager: Prev · `page / pages` · Next.
 * No page-jump select, no page-size control. Callers paginate with
 * {@link DEFAULT_PAGE_SIZE} unless a documented special case applies.
 */
export default function Pager({
  page,
  pages,
  onPage,
  className = "",
  label = "Pagination",
}: Props) {
  if (pages <= 1) return null;

  const safePage = Math.min(Math.max(1, page), pages);

  return (
    <nav
      className={`ui-pager${className ? ` ${className}` : ""}`}
      aria-label={label}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={safePage <= 1}
        aria-label="Previous page"
        onClick={() => {
          if (safePage > 1) onPage(safePage - 1);
        }}
      >
        Prev
      </Button>
      <span className="ui-pager-meta" aria-current="page">
        {safePage} / {pages}
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled={safePage >= pages}
        aria-label="Next page"
        onClick={() => {
          if (safePage < pages) onPage(safePage + 1);
        }}
      >
        Next
      </Button>
    </nav>
  );
}
