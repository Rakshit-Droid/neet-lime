import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // The app is fully static — no API routes, server actions, or dynamic data —
  // so we export it to plain HTML. This lets Vercel build and serve it from the
  // repo root without a monorepo Root Directory override. When a backend is
  // added later, remove `output`/`trailingSlash` and set Root Directory to
  // apps/web to restore full Next.js (SSR/serverless) capability.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["@workspace/ui"],
}

export default nextConfig
