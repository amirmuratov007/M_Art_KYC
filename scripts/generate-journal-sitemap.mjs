import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import telegramPosts from '../data/telegramPosts.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.join(projectRoot, 'public', 'sitemap-journal.xml')
const baseUrl = 'https://www.heimdall-group.ru'

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const posts = [...telegramPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
const latestDate = posts[0]?.date || new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${baseUrl}/journal`, lastmod: latestDate, priority: '0.90' },
  ...posts.map((post) => ({
    loc: `${baseUrl}/journal/${post.slug}`,
    lastmod: post.date,
    priority: '0.78'
  }))
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${escapeXml(url.lastmod)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, xml, 'utf8')
console.log(`Journal sitemap generated: ${urls.length} URLs`)
