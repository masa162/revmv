import Image from "next/image";
import Link from "next/link";
import type { Article } from "contentlayer/generated";

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block overflow-hidden rounded-2xl shadow transition hover:shadow-lg"
    >
      <div className="relative h-48 w-full">
        <Image
          src={article.image ?? "/placeholder.jpg"}
          alt={article.title}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-lg font-semibold leading-tight">
          {article.title}
        </h2>
        {/* 記事概要 (description) は存在する場合のみ表示 */}
        {"description" in article && article.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {article.description}
          </p>
        )}
        {article.date && (
          <span className="mt-2 inline-block text-xs text-muted-foreground">
            {new Date(article.date).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
}