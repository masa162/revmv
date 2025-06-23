/* =========================
   TOP Page UI Skeleton (rev.6) 🛠️
   Project: revmv (Next.js App Router)
   Updated: 2025‑06‑23
   - Disabled ESLint no-explicit-any rule
   ========================= */

// src/app/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { allArticles } from "contentlayer/generated";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import PopularRanking from "@/components/PopularRanking";

export default function Home() {
  // 全記事を公開日降順で並べる
  const articles = allArticles.sort(
    (a, b) => new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
  );

  // 人気ランキング：views フィールドがある記事のみ
  const popularArticles = allArticles
    .filter((a: any) => typeof a.views === "number")
    .sort((a: any, b: any) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">revmv</h1>
      </header>

      {/* Main Grid */}
      <main className="grid gap-8 lg:grid-cols-[220px_1fr_260px]">
        {/* 左サイドバー */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* メインカードグリッド */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article: any) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </section>

        {/* 右：人気記事ランキング */}
        <aside className="hidden lg:block">
          <PopularRanking articles={popularArticles} />
        </aside>
      </main>
    </div>
  );
}
