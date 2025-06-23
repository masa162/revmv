import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'RevMV – 映画ドラマレビュー',
  description: '映画・ドラマのレビューを発信するメディア RevMV',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 text-zinc-100 antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
