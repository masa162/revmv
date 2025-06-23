/* eslint-disable @typescript-eslint/no-explicit-any */

// src/app/tags/[tag]/page.tsx
import { allArticles } from "contentlayer/generated";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import PopularRanking from "@/components/PopularRanking";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  // 全タグをビルド時に取得
  const tags = Array.from(
    new Set(allArticles.flatMap((a) => a.tags ?? []))
  );
  return tags.map((tag) => ({ tag }));
}

export default function TagPage({ params }: any) {
  const { tag } = params;
  // タグでフィルタした記事一覧
  const articles = allArticles
    .filter((a: any) => (a.tags ?? []).includes(tag))
    .sort(
      (a: any, b: any) =>
        new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
    );

  if (articles.length === 0) notFound();

  // 人気ランキング（同じロジックを使う）
  const popularArticles = allArticles
    .filter((a: any) => typeof a.views === "number")
    .sort((a: any, b: any) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">タグ: {tag}</h1>
      </header>

      <main className="grid gap-8 lg:grid-cols-[220px_1fr_260px]">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article: any) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </section>

        <aside className="hidden lg:block">
          <PopularRanking articles={popularArticles} />
        </aside>
      </main>
    </div>
  );
}
