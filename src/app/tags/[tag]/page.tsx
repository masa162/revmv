import { allArticles } from 'contentlayer/generated'
import ReviewCard from '@/components/ReviewCard'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tagSet = new Set<string>()
  allArticles.forEach((a) => a.tags?.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).map((tag) => ({ tag }))
}

export default function TagFilteredPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const filtered = allArticles.filter((a) => a.tags?.includes(tag))

  if (filtered.length === 0) return notFound()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">タグ: #{tag}</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {filtered.map((article) => (
          <ReviewCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  )
}