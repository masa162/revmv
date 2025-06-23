import Image from 'next/image'
import Link from 'next/link'
import { Article } from '../../.contentlayer/generated'

type Props = {
  article: Article
}

export default function ReviewCard({ article }: Props) {
  return (
    <Link href={`/articles/${article.slug}`} className="block hover:opacity-90 transition">
      <div>
        <Image
          src={article.image}
          alt={article.title}
          width={640}
          height={360}
        />
        <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
        <p className="text-sm text-gray-400">{article.author}</p>
        {article.tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="bg-gray-700 text-gray-100 text-xs px-2 py-1 rounded hover:bg-gray-600"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}