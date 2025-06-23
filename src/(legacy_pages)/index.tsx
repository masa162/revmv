/* pages/index.tsx */
import Sidebar from '@/components/Sidebar'
import ReviewCard from '@/components/ReviewCard'
import { allArticles } from 'contentlayer/generated'

export default function Home() {
  const newest = allArticles.slice(0, 6)  // 新着6件 (要：pubDate で sort 済み)

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8 max-w-6xl mx-auto px-4 py-8">
      <Sidebar />

      <main className="space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-4">新着レビュー</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {newest.map(a => <ReviewCard key={a.slug} article={a} />)}
          </div>
        </section>

        {/* 今後：特集スライダーや注目レビューなど */}
      </main>
    </div>
  )
}
