import type { APIContext } from "astro"

export function GET(context: APIContext) {
  const sitemap = new URL("sitemap-index.xml", context.site)
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { "Content-Type": "text/plain" },
  })
}
