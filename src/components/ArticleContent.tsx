/* =========================
   Client Component for MDX rendering
   Path: src/components/ArticleContent.tsx
   ========================= */

// src/components/ArticleContent.tsx
"use client";
import { useMDXComponent } from "next-contentlayer/hooks";

interface Props {
  code: string;
}

export default function ArticleContent({ code }: Props) {
  const MDXContent = useMDXComponent(code);
  return <MDXContent />;
}
