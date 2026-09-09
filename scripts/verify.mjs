/* Serves dist/ the way Vercel will - cleanUrls, no trailing slash - and checks
   the search-visibility contract end to end. Run after `npm run build`. */
import { execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'

const DIST = resolve('dist')
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.multicaravane.com').replace(/\/+$/, '')
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
}

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const candidates = path === '/'
    ? [resolve(DIST, 'index.html')]
    : [resolve(DIST, `.${path}`), resolve(DIST, `.${path}.html`), resolve(DIST, `.${path}/index.html`)]
  const file = candidates.find((c) => existsSync(c) && statSync(c).isFile())
  if (!file) { res.writeHead(404); res.end('not found'); return }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

await new Promise((r) => server.listen(0, r))
const base = `http://127.0.0.1:${server.address().port}`
const get = async (path) => {
  const res = await fetch(base + path)
  return { status: res.status, type: res.headers.get('content-type') || '', body: await res.text() }
}

/* 1 - robots.txt */
const robots = await get('/robots.txt')
const CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot']
const missingCrawlers = CRAWLERS.filter((c) => !robots.body.includes(`User-agent: ${c}`))
check('robots.txt 200', robots.status === 200)
check('robots.txt names every AI crawler', missingCrawlers.length === 0, missingCrawlers.join(', '))
check('robots.txt has absolute sitemap on the canonical host', robots.body.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))

/* 2 - sitemap */
const sitemap = await get('/sitemap.xml')
const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check('sitemap.xml 200', sitemap.status === 200)
check('sitemap.xml is well-formed', sitemap.body.trim().endsWith('</urlset>') && locs.length > 0, `${locs.length} urls`)
check('sitemap URLs have no trailing slash', locs.every((l) => !l.endsWith('/')))
check('sitemap URLs all use the canonical host', locs.every((l) => l.startsWith(`${SITE_URL}/`)),
  [...new Set(locs.map((l) => new URL(l).host))].join(', '))
/* Proven, not assumed: each lastmod has to equal the commit date of the files
   the page is built from. A build-date value would only match by coincidence,
   and would stop matching tomorrow. */
const lastmods = [...sitemap.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1])
let commitDate = null
try {
  commitDate = execFileSync('git', ['log', '-1', '--format=%cI', '--', 'src/i18n.jsx', 'src/App.jsx'],
    { encoding: 'utf8' }).trim().slice(0, 10)
} catch { /* no git history here */ }
check('sitemap lastmod is the content commit date, not the build date',
  lastmods.length === 0 ? commitDate === null : lastmods.every((d) => d === commitDate),
  lastmods.length === 0 ? 'omitted, no git history' : `sitemap ${[...new Set(lastmods)].join(',')} = commit ${commitDate}`)
for (const loc of locs) {
  const res = await get(new URL(loc).pathname)
  check(`sitemap url 200: ${loc}`, res.status === 200)
}
const alternateCount = [...sitemap.body.matchAll(/<xhtml:link/g)].length
check('sitemap has 4 alternates per url', alternateCount === locs.length * 4, `${alternateCount} links`)

/* 3 - llms.txt */
const llms = await get('/llms.txt')
check('llms.txt 200 as text/plain', llms.status === 200 && llms.type.startsWith('text/plain'), llms.type)
const llmsHosts = [...new Set([...llms.body.matchAll(/https?:\/\/([^/)\s]+)/g)].map((m) => m[1]))]
check('llms.txt uses only the canonical host', llmsHosts.every((h) => `https://${h}` === SITE_URL), llmsHosts.join(', '))
check('sitemap.xml served as application/xml', sitemap.type.startsWith('application/xml'), sitemap.type)

/* 4-7 - the documents */
const PAGES = { '/': 'en', '/en': 'en', '/fr': 'fr', '/it': 'it' }
const seen = { title: new Map(), description: new Map() }
for (const [path, lang] of Object.entries(PAGES)) {
  const page = await get(path)
  check(`${path} 200`, page.status === 200)

  const canonicals = [...page.body.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1])
  const expected = `${SITE_URL}/${lang}`
  check(`${path} exactly one canonical, self-referencing`,
    canonicals.length === 1 && canonicals[0] === expected, canonicals.join(', '))

  const hreflangs = [...page.body.matchAll(/rel="alternate" hreflang="([^"]+)"/g)].map((m) => m[1]).sort()
  check(`${path} has all four hreflang alternates`,
    hreflangs.join(',') === 'en,fr,it,x-default', hreflangs.join(','))

  check(`${path} <html lang> is ${lang}`, page.body.includes(`<html lang="${lang}">`))

  const title = page.body.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? ''
  const description = page.body.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/)?.[1] ?? ''
  const titles = [...page.body.matchAll(/<title[^>]*>/g)].length
  const descriptions = [...page.body.matchAll(/<meta[^>]+name="description"/g)].length
  check(`${path} one non-empty title (${title.length} chars)`, titles === 1 && title.length >= 50 && title.length <= 60)
  check(`${path} one non-empty description (${description.length} chars)`,
    descriptions === 1 && description.length >= 140 && description.length <= 160)
  seen.title.set(path, title)
  seen.description.set(path, description)

  const blocks = [...page.body.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  check(`${path} exactly one JSON-LD block`, blocks.length === 1)
  let graph = null
  try { graph = JSON.parse(blocks[0][1]) } catch (error) { check(`${path} JSON-LD parses`, false, error.message) }
  if (graph) {
    check(`${path} JSON-LD parses`, true)
    const ids = new Set(graph['@graph'].map((node) => node['@id']))
    const orphans = graph['@graph']
      .filter((node) => node.provider && !ids.has(node.provider['@id']))
      .map((node) => node['@id'])
    check(`${path} JSON-LD has no orphan provider references`, orphans.length === 0, orphans.join(', '))
    const empties = graph['@graph'].flatMap((node) => Object.entries(node)
      .filter(([, v]) => v === '' || v === null || v === undefined)
      .map(([k]) => `${node['@id']}.${k}`))
    check(`${path} JSON-LD has no empty fields`, empties.length === 0, empties.join(', '))
    check(`${path} JSON-LD localised`, graph['@graph'].some((n) => n['@type'] === 'Service'))
  }
}

/* Uniqueness across the language versions (/ and /en are the same document by
   design, so they are compared as one). */
const uniqueTitles = new Set([...seen.title.entries()].filter(([p]) => p !== '/').map(([, v]) => v))
const uniqueDescriptions = new Set([...seen.description.entries()].filter(([p]) => p !== '/').map(([, v]) => v))
check('each language has its own title', uniqueTitles.size === 3, `${uniqueTitles.size} distinct`)
check('each language has its own description', uniqueDescriptions.size === 3, `${uniqueDescriptions.size} distinct`)

server.close()

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  [${r.detail}]` : ''}`)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
