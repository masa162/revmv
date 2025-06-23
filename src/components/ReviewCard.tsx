// src/components/ReviewCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Article } from 'contentlayer/generated'

interface Props {
  article: Article
}

export default function ReviewCard({ article }: Props) {
  return (
    <article className="border rounded-lg overflow-hidden hover:opacity-90 transition">
      {/* アイキャッチ & タイトル */}
      <Link href={`/articles/${article.slug}`} className="block">
        <Image
          src={article.image}
          alt={article.title}
          width={640}
          height={360}
          className="w-full h-auto"
        />
        <h2 className="text-xl font-semibold mt-2 px-4">{article.title}</h2>
      </Link>

      {/* 著者（任意） */}
      {article.author && (
        <p className="text-sm text-gray-400 px-4">{article.author}</p>
      )}

      {/* タグ一覧 */}
      {article.tags?.length && (
        <ul className="flex flex-wrap gap-2 px-4 pb-4">
          {article.tags.map(tag => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="bg-gray-700 text-gray-100 text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
