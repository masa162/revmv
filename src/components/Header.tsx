import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-zinc-900 text-zinc-100">
      <nav className="max-w-6xl mx-auto flex items-center gap-6 px-4 py-3">
        {/* サイトロゴ */}
        <Link href="/" className="text-xl font-bold">
          🎬 RevMV
        </Link>

        {/* メインメニュー */}
        <Link href="/articles" className="hover:underline">新着</Link>
        <Link href="/tags" className="hover:underline">タグ</Link>
        <Link href="/genres" className="hover:underline">ジャンル</Link>

        {/* 右寄せ：検索など */}
        <div className="ml-auto flex gap-4">
          {/* 検索ボタン / テーマトグルなどを将来追加 */}
        </div>
      </nav>
    </header>
  )
}
