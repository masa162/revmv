import Link from "next/link";
import type { Article } from "contentlayer/generated";

interface Props {
  articles: Article[];
}

/* シンプルな数字付きランキング */
export default function PopularRanking({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-2">人気記事ランキング</h3>
      <ol className="space-y-3 list-decimal list-inside">
        {articles.map((a) => (
          <li key={a._id}>
            <Link href={`/articles/${a.slug}`} className="hover:underline">
              {a.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
