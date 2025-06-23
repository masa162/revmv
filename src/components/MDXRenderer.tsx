'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'

export default function MDXRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent />
}
