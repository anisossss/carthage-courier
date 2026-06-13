import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { getArticles } from "@/lib/api";

const PAGE_SIZE = 12;

interface Props {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const category = decodeURIComponent(name);
  return {
    title: category,
    description: `The latest ${category} dispatches from the Carthage Courier, Tunisia's English-language paper of record.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { name } = await params;
  const { page: pageParam } = await searchParams;
  const category = decodeURIComponent(name);
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1);

  const { articles, total, pages } = await getArticles({
    category,
    page,
    limit: PAGE_SIZE,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="text-center">
        <p className="kicker text-carmine">Section</p>
        <h1 className="mt-3 font-display text-5xl font-black tracking-tight md:text-6xl">
          {category}
        </h1>
        <p className="byline mt-4 text-sm">
          {total} {total === 1 ? "dispatch" : "dispatches"} on file
        </p>
        <div className="rule-double mt-8" />
      </header>

      {articles.length > 0 ? (
        <>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
          <Pagination
            current={page}
            pages={pages}
            basePath={`/category/${encodeURIComponent(category)}`}
          />
        </>
      ) : (
        <EmptyState
          kicker="An empty column"
          title="Nothing filed here yet"
          message={`Our correspondents have no ${category} dispatches on record at present. Check back with the next edition.`}
        />
      )}
    </div>
  );
}
