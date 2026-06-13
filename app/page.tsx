import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import EmptyState from "@/components/EmptyState";
import { getArticles } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default async function HomePage() {
  const [latest, featured] = await Promise.all([
    getArticles({ limit: 13 }),
    getArticles({ featured: true, limit: 1 }),
  ]);

  const lead = featured.articles[0] ?? latest.articles[0] ?? null;

  if (!lead) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <AdSlot
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
          label="Advertisement"
          className="mx-auto mt-8 min-h-[90px] max-w-4xl"
        />
        <EmptyState />
      </div>
    );
  }

  const rest = latest.articles.filter((a) => a._id !== lead._id);
  const briefs = rest.slice(0, 4);
  const grid = rest.slice(4);
  const mostRead = [...latest.articles]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP}
        label="Advertisement"
        className="mx-auto mt-8 min-h-[90px] max-w-4xl"
      />

      {/* Front page: briefs | lead | most read */}
      <div className="mt-10 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-0">
        {/* Lead story */}
        <section className="lg:col-start-4 lg:col-span-6 lg:row-start-1 lg:border-x lg:border-hairline lg:px-8">
          <p className="kicker text-carmine">
            <Link
              href={`/category/${encodeURIComponent(lead.category)}`}
              className="transition-colors hover:text-navy"
            >
              {lead.category}
            </Link>
          </p>
          <h2 className="mt-3 font-display text-4xl font-black leading-[1.06] tracking-tight md:text-[3.1rem]">
            <Link
              href={`/article/${lead.slug}`}
              className="transition-colors hover:text-navy"
            >
              {lead.title}
            </Link>
          </h2>
          {lead.excerpt && (
            <p className="mt-4 text-xl italic leading-relaxed text-navy">
              {lead.excerpt}
            </p>
          )}
          <p className="byline mt-4 text-sm">
            By {lead.author?.name || "The Newsroom"} ·{" "}
            {formatDate(lead.publishedAt)}
          </p>
          {lead.coverImage?.url && (
            <Link
              href={`/article/${lead.slug}`}
              className="mt-5 block border border-hairline bg-white p-1"
            >
              <span className="relative block aspect-[16/10]">
                <Image
                  src={lead.coverImage.url}
                  alt={lead.coverImage.alt || lead.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </span>
            </Link>
          )}
          <p className="mt-5">
            <Link
              href={`/article/${lead.slug}`}
              className="kicker text-carmine transition-colors hover:text-navy"
            >
              Continue reading →
            </Link>
          </p>
        </section>

        {/* Secondary briefs column */}
        <section className="lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:pr-8">
          <h2 className="section-label">The Briefing</h2>
          {briefs.length > 0 ? (
            <div className="divide-y divide-dotted divide-hairline">
              {briefs.map((article) => (
                <article key={article._id} className="py-4 first:pt-0 last:pb-0">
                  <p className="kicker text-[0.6rem] text-carmine">
                    {article.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-tight">
                    <Link
                      href={`/article/${article.slug}`}
                      className="transition-colors hover:text-navy"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="byline mt-1.5 text-xs">
                    {formatDate(article.publishedAt)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-navy">
              Further dispatches are at the printers.
            </p>
          )}
        </section>

        {/* Most read rail */}
        <aside className="lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:pl-8">
          <h2 className="section-label">Most Read</h2>
          <ol className="divide-y divide-hairline">
            {mostRead.map((article, index) => (
              <li key={article._id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <span
                  className="font-display text-4xl font-black leading-none text-carmine/70"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug tracking-tight">
                    <Link
                      href={`/article/${article.slug}`}
                      className="transition-colors hover:text-navy"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="byline mt-1 text-xs">
                    {article.views ?? 0} readers
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {/* Latest dispatches grid */}
      {grid.length > 0 && (
        <section className="mt-14">
          <div className="rule-double mb-8" />
          <h2 className="section-label">Latest Dispatches</h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
