/* =========================
   Article Detail Page (rev.4) 🛠️
   Project: revmv (Next.js App Router + Contentlayer)
   Updated: 2025-06-23
   - Layout grid: Sidebar / Article / PopularRanking
   - Imported Sidebar & PopularRanking
   ========================= */

// src/app/articles/[slug]/page.tsx
import Sidebar from "@/components/Sidebar";
import PopularRanking from "@/components/PopularRanking";
import { allArticles } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Article } from "contentlayer/generated";
import ArticleContent from "@/components/ArticleContent";
import Image from "next/image";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = allArticles.find((a) => a.slug === slug) as Article | undefined;
  if (!article) notFound();

  // Popular ranking data
  const popularArticles = allArticles
    .filter((a) => typeof a.views === "number")
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 10);

  return (
    <main className="grid gap-8 lg:grid-cols-[220px_1fr_260px]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Article Content */}
      <section>
        <article className="prose dark:prose-invert mx-auto py-8">
          <h1>{article.title}</h1>
          <p className="text-sm text-gray-500">
            {article.date} {article.author && `｜${article.author}`}
          </p>
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="my-4 rounded"
          />
          <ArticleContent code={article.body.code} />

          {/* 前後記事リンク */}
          <nav className="mt-12 flex justify-between">
            {(() => {
              const idx = allArticles.findIndex((a) => a.slug === article.slug);
              const prev = allArticles[idx + 1];
              const next = allArticles[idx - 1];
              return (
                <>
                  {prev ? (
                    <a href={`/articles/${prev.slug}`} className="text-blue-500 hover:underline">
                      ← {prev.title}
                    </a>
                  ) : (
                    <span />
                  )}
                  {next ? (
                    <a href={`/articles/${next.slug}`} className="text-blue-500 hover:underline">
                      {next.title} →
                    </a>
                  ) : (
                    <span />
                  )}
                </>
              );
            })()}
          </nav>
        </article>
      </section>

      {/* Popular Ranking */}
      <aside className="hidden lg:block">
        <PopularRanking articles={popularArticles} />
      </aside>
    </main>
  );
}
