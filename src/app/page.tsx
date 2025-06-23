/* =========================
   TOP Page UI Skeleton (rev.5) 🛠️
   Project: revmv (Next.js App Router)
   Updated: 2025‑06‑23
   - 🔥 人気記事ランキング (右サイド) を追加
   - レイアウトを 3 カラムへ：Sidebar / Main / Ranking
   ========================= */

/* ---------- src/app/page.tsx ---------- */
import { allArticles } from "contentlayer/generated"
console.log("🔍 allArticles:", allArticles.map(a => a.slug))
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import PopularRanking from "@/components/PopularRanking";




export default function Home() {
  /* ── 全記事を公開日降順で並べる ── */
  const articles = allArticles.sort(
    (a, b) =>
      new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
  );

  /* ── 人気ランキング：views フィールドがある記事のみ ── */
  const popularArticles = allArticles
    .filter((a) => typeof (a as any).views === "number") // views: number | undefined
    .sort((a, b) => ((b as any).views ?? 0) - ((a as any).views ?? 0))
    .slice(0, 10); // 上位 10 件だけ

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6">
      {/* ── Header ───────────────────────── */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">revmv</h1>
        {/* 追加ナビやアイコン類はここに */}
      </header>

      {/* ── Main Grid ─────────────────────── */}
      <main className="grid gap-8 lg:grid-cols-[220px_1fr_260px]">
        {/* 左サイドバー */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* メインカードグリッド */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
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
