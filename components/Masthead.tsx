import Link from "next/link";
import { formatDateLine } from "@/lib/format";

export default function Masthead({ categories }: { categories: string[] }) {
  const dateLine = formatDateLine();

  return (
    <header className="bg-paper">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 border-b border-hairline py-2">
          <p className="byline text-xs">{dateLine}</p>
          <p className="byline hidden text-xs sm:block">
            Tunis · Carthage · Sousse · Sfax
          </p>
          <p className="byline text-xs">No. 41,872</p>
        </div>

        <div className="py-7 text-center md:py-9">
          <p className="kicker text-navy">
            Established 1886 — Tunisia&rsquo;s English-language paper of record
          </p>
          <h1 className="mt-3 font-display text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            <Link href="/" className="transition-colors hover:text-navy">
              Carthage Courier
            </Link>
          </h1>
        </div>

        <div className="rule-double" />
        <nav
          aria-label="Sections"
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 py-2.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
        >
          <Link href="/" className="transition-colors hover:text-carmine">
            Front Page
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${encodeURIComponent(category)}`}
              className="transition-colors hover:text-carmine"
            >
              {category}
            </Link>
          ))}
        </nav>
        <div className="rule-double-flip" />
      </div>
    </header>
  );
}
