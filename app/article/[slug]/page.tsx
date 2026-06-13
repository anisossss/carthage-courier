import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import { getArticle, getArticles, SITE_NAME, SITE_URL } from "@/lib/api";
import { formatDate } from "@/lib/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Article not found" };
  }

  const title = article.seo?.metaTitle || article.title;
  const description =
    article.seo?.metaDescription ||
    article.excerpt ||
    `${article.title} — reporting from the ${SITE_NAME}.`;
  const url = `${SITE_URL}/article/${article.slug}`;
  const image = article.seo?.ogImage || article.coverImage?.url;

  return {
    title,
    description,
    alternates: {
      canonical: article.seo?.canonicalUrl || url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      publishedTime: article.publishedAt,
      tags: article.tags,
      images: image ? [image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    robots: { index: !article.seo?.noIndex },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getArticles({
    category: article.category,
    exclude: article.slug,
    limit: 3,
  });

  const url = `${SITE_URL}/article/${article.slug}`;
  const image = article.seo?.ogImage || article.coverImage?.url;
  const authorName = article.author?.name || "The Newsroom";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seo?.metaDescription || article.excerpt || "",
    image: image ? [image] : [],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: [{ "@type": "Person", name: authorName }],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    keywords: (article.seo?.keywords?.length
      ? article.seo.keywords
      : article.tags || []
    ).join(", "),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="text-center">
          <p className="kicker text-carmine">
            <Link
              href={`/category/${encodeURIComponent(article.category)}`}
              className="transition-colors hover:text-navy"
            >
              {article.category}
            </Link>
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.08] tracking-tight md:text-5xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-5 text-xl italic leading-relaxed text-navy">
              {article.excerpt}
            </p>
          )}
          <div className="rule-dotted mx-auto my-6 max-w-xs" />
          <p className="byline text-sm">
            By {authorName} · {formatDate(article.publishedAt)} ·{" "}
            {article.views ?? 0} readers
          </p>
        </header>

        {article.coverImage?.url && (
          <figure className="mt-9 border border-hairline bg-white p-1">
            <span className="relative block aspect-[16/9]">
              <Image
                src={article.coverImage.url}
                alt={article.coverImage.alt || article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </span>
            {article.coverImage.alt && (
              <figcaption className="byline px-2 pt-2 pb-1 text-xs">
                {article.coverImage.alt}
              </figcaption>
            )}
          </figure>
        )}

        <div
          className="article-body mt-10"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-hairline pt-6">
            <span className="kicker text-[0.6rem] text-navy">Filed under</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="border border-hairline px-2.5 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.15em] text-faded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE}
        label="Advertisement"
        className="mt-12 min-h-[120px]"
      />

      {related.articles.length > 0 && (
        <section className="mt-16">
          <div className="rule-double mb-8" />
          <h2 className="section-label">Related Coverage</h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {related.articles.map((item) => (
              <ArticleCard key={item._id} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
