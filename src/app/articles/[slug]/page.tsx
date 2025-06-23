/* =========================
   Article Detail Page (rev.10) 🛠️
   Project: revmv (Next.js App Router + Contentlayer)
   Updated: 2025‑06‑23
   - Fixed duplicate import syntax error
   ========================= */

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

// src/app/articles/[slug]/page.tsx

export const dynamic = "force-dynamic";

import Sidebar from "@/components/Sidebar";
import PopularRanking from "@/components/PopularRanking";
import { allArticles } from "contentlayer/generated";
import { useRouter } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import Image from "next/image";

export default function ArticlePage({ params }: any) {
  const { slug } = params;
  const router = useRouter();

  const article = allArticles.find((a) => a.slug === slug);
  if (!article) {
    router.replace("/404");
    return null;
  }

  const popularArticles = allArticles
    .filter((a: any) => typeof a.views === "number")
    .sort((a: any, b: any) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 10);

  return (
    <main className="grid gap-8 lg:grid-cols-[220px_1fr_260px]">
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

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
          <ArticleContent code={(article as any).body.code} />
        </article>
      </section>

      <aside className="hidden lg:block">
        <PopularRanking articles={popularArticles} />
      </aside>
    </main>
  );
}
