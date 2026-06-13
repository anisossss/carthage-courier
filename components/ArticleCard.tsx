import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col">
      {article.coverImage?.url && (
        <Link
          href={`/article/${article.slug}`}
          className="mb-4 block border border-hairline bg-white p-1"
        >
          <span className="relative block aspect-[3/2]">
            <Image
              src={article.coverImage.url}
              alt={article.coverImage.alt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </span>
        </Link>
      )}
      <p className="kicker text-carmine">
        <Link
          href={`/category/${encodeURIComponent(article.category)}`}
          className="transition-colors hover:text-navy"
        >
          {article.category}
        </Link>
      </p>
      <h3 className="mt-2 font-display text-xl font-bold leading-snug tracking-tight">
        <Link
          href={`/article/${article.slug}`}
          className="transition-colors hover:text-navy"
        >
          {article.title}
        </Link>
      </h3>
      {article.excerpt && (
        <p className="mt-2 line-clamp-3 text-[0.95rem] italic leading-relaxed text-navy">
          {article.excerpt}
        </p>
      )}
      <p className="byline mt-3 border-t border-dotted border-hairline pt-2 text-xs">
        By {article.author?.name || "The Newsroom"} ·{" "}
        {formatDate(article.publishedAt)}
      </p>
    </article>
  );
}
