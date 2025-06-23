import { allArticles } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import MDXRenderer from '@/components/MDXRenderer'
import Image from 'next/image'

export async function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await Promise.resolve(params)
  const article = allArticles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params)
  const article = allArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <article className="prose dark:prose-invert mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {/* ✅ 画像表示部分をここに配置 */}
      <Image
        src={article.image}
        alt={article.title}
        width={640}
        height={360}
        className="mb-6"
      />

      <MDXRenderer code={article.body.code} />
    </article>
  )
}
