import Link from "next/link";

export default function SiteFooter({ categories }: { categories: string[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rule-double" />
        <div className="grid gap-10 py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-hairline">
          <div className="md:pr-10">
            <p className="font-display text-2xl font-black tracking-tight">
              Carthage Courier
            </p>
            <p className="mt-3 text-sm italic leading-relaxed text-navy">
              Reporting the affairs of Tunisia and the wider Maghreb since
              1886. Independent, sober, and set in good type.
            </p>
          </div>
          <div className="md:px-10">
            <h2 className="kicker text-carmine">Sections</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/category/${encodeURIComponent(category)}`}
                      className="transition-colors hover:text-carmine"
                    >
                      {category}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/" className="transition-colors hover:text-carmine">
                    Front Page
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="md:pl-10">
            <h2 className="kicker text-carmine">The Courier</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/feed.xml" className="transition-colors hover:text-carmine">
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="transition-colors hover:text-carmine">
                  Sitemap
                </a>
              </li>
              <li>
                <Link href="/" className="transition-colors hover:text-carmine">
                  Today&rsquo;s Edition
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hairline py-4 text-center">
          <p className="byline text-xs">
            © {year} Carthage Courier — Printed daily in Tunis, Republic of
            Tunisia
          </p>
        </div>
      </div>
    </footer>
  );
}
