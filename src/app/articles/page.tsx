import { allArticles } from 'contentlayer/generated'
import ReviewCard from '@/components/ReviewCard'

export default function ArticlesListPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">レビュー記事一覧</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {allArticles.map((article) => (
          <ReviewCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  )
}