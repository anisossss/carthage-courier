import Link from "next/link";

export default function Pagination({
  current,
  pages,
  basePath,
}: {
  current: number;
  pages: number;
  basePath: string;
}) {
  if (pages <= 1) return null;

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.15em]"
    >
      {current > 1 && (
        <Link
          href={pageHref(current - 1)}
          className="border border-hairline px-3 py-2 transition-colors hover:border-carmine hover:text-carmine"
        >
          ← Previous
        </Link>
      )}
      {numbers.map((page) =>
        page === current ? (
          <span
            key={page}
            aria-current="page"
            className="border border-carmine bg-carmine px-3.5 py-2 text-paper"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            className="border border-hairline px-3.5 py-2 transition-colors hover:border-carmine hover:text-carmine"
          >
            {page}
          </Link>
        )
      )}
      {current < pages && (
        <Link
          href={pageHref(current + 1)}
          className="border border-hairline px-3 py-2 transition-colors hover:border-carmine hover:text-carmine"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
