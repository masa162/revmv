import Link from "next/link";
import { allArticles } from "contentlayer/generated";

// 固定ジャンル（後で Contentlayer 経由で動的化予定）
const genres = ["映画", "ドラマ", "配信限定", "ドキュメンタリー"];

// 注目タグ（手動選定）
const featuredTags = ["ヒューマンドラマ", "サスペンス", "ラブロマンス"];

// すべての記事から tags を集計して頻出順に並べる
const tagCounts: Record<string, number> = {};
allArticles.forEach((article) => {
  (article.tags ?? []).forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});

const sortedTags = Object.entries(tagCounts)
  .sort(([, countA], [, countB]) => countB - countA) // 多い順
  .map(([tag]) => tag)
  .slice(0, 20); // 上位 20 件を表示（必要に応じて変更）

export default function Sidebar() {
  return (
    <aside className="space-y-8 text-sm">
      {/* ジャンル */}
      <section>
        <h3 className="font-semibold mb-2">ジャンル</h3>
        <ul className="space-y-1 pl-4 list-disc">
          {genres.map((g) => (
            <li key={g}>
              <Link href={`/genres/${encodeURIComponent(g)}`}>{g}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 注目タグ（固定） */}
      <section>
        <h3 className="font-semibold mb-2">注目タグ</h3>
        <ul className="flex flex-wrap gap-2">
          {featuredTags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-sm text-blue-500 hover:underline"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* タグランキング（動的） */}
      {sortedTags.length > 0 && (
        <section>
          <h3 className="font-semibold mb-2">タグランキング</h3>
          <ul className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
