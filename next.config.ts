// next.config.ts
import { withContentlayer } from "next-contentlayer"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // App Router を使うならトップレベルで true
  appDir: true,
  // （必要があれば他のオプションをここに）
}

export default withContentlayer(nextConfig)
