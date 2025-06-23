// src/app/tags/page.tsx
import Link from 'next/link'
import { allArticles } from 'contentlayer/generated'

export default function TagsIndexPage() {
  // 全記事の tags を集めて重複排除 → ソート
  const tags = Array.from(
    new Set(allArticles.flatMap(a => a.tags ?? []))
  ).sort()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">タグ一覧</h1>

      {tags.length === 0 ? (
        <p>タグが見つかりません。</p>
      ) : (
        <ul className="space-y-2">
          {tags.map(tag => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-blue-600 hover:underline"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
