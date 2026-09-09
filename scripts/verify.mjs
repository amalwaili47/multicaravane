/* Serves dist/ the way Vercel will - cleanUrls, no trailing slash - and checks
   the search-visibility contract end to end. Run after `npm run build`. */
import { execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, resolve } from 'node:path'

const DIST = resolve('dist')
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://multicaravane.com').replace(/\/+$/, '')
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

const { pagePath: pagePathOf, DEFAULT_LANGUAGE: DEFAULT_LANG } = await import('../.ssr/entry-server.js')
const linkGraph = new Map()
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

/* 4-7 - every document */
const { allRoutes } = await import('../.ssr/entry-server.js')
const routes = allRoutes()
check('27 routes in the config', routes.length === 27, `${routes.length}`)

const seen = { title: new Map(), description: new Map() }
const langOf = { fr: /[àâçéèêëîïôùûœ]|de la |et |sur |vous /i, it: /[àèéìòù]|della |degli |sulla |prenota/i }

for (const { pageId, code, path } of [{ pageId: 'home', code: DEFAULT_LANG, path: '/' }, ...routes]) {
  const page = await get(path)
  if (page.status !== 200) { check(`${path} 200`, false, String(page.status)); continue }

  const canonicals = [...page.body.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1])
  const expected = `${SITE_URL}${pagePathOf(pageId, code)}`
  check(`${path} one self-referencing canonical`,
    canonicals.length === 1 && canonicals[0] === expected, canonicals.join(', ') || 'none')

  const hreflangs = [...page.body.matchAll(/rel="alternate" hreflang="([^"]+)"/g)].map((m) => m[1]).sort()
  check(`${path} four hreflang alternates`, hreflangs.join(',') === 'en,fr,it,x-default', hreflangs.join(','))
  const selfRef = page.body.includes(`hreflang="${code}" href="${expected}"`)
  check(`${path} hreflang includes its own self-reference`, selfRef)

  check(`${path} html lang=${code}`, page.body.includes(`<html lang="${code}">`))

  const title = page.body.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? ''
  const description = page.body.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/)?.[1] ?? ''
  check(`${path} one title, 50-60 chars`,
    [...page.body.matchAll(/<title[^>]*>/g)].length === 1 && title.length >= 50 && title.length <= 60, `${title.length}`)
  check(`${path} one description, 140-160 chars`,
    [...page.body.matchAll(/<meta[^>]+name="description"/g)].length === 1
      && description.length >= 140 && description.length <= 160, `${description.length}`)
  if (path !== '/') { seen.title.set(path, title); seen.description.set(path, description) }

  const blocks = [...page.body.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  check(`${path} exactly one JSON-LD block`, blocks.length === 1)
  let graph = null
  try { graph = JSON.parse(blocks[0][1]) } catch (error) { check(`${path} JSON-LD parses`, false, error.message) }
  if (graph) {
    const nodes = graph['@graph']
    const ids = new Set(nodes.map((node) => node['@id']).filter(Boolean))
    const dangling = nodes.flatMap((node) =>
      (node.provider && !ids.has(node.provider['@id'])) ? [`${node['@id']} -> ${node.provider['@id']}`] : [])
    check(`${path} JSON-LD no dangling @id references`, dangling.length === 0, dangling.join(', '))
    /* sameAs is deliberately [] - no social profile exists in the repo to put
       in it - so an empty array there is the correct output, not a gap. */
    const empties = nodes.flatMap((node) => Object.entries(node)
      .filter(([k, v]) => k !== 'sameAs'
        && (v === '' || v === null || v === undefined || (Array.isArray(v) && v.length === 0)))
      .map(([k]) => `${node['@id']}.${k}`))
    check(`${path} JSON-LD no empty required fields`, empties.length === 0, empties.join(', '))

    /* Every FAQ answer in the schema has to be text a visitor can see. */
    const faq = nodes.find((node) => node['@type'] === 'FAQPage')
    if (faq) {
      const visible = page.body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')
      const missing = faq.mainEntity.filter((q) => !visible.includes(q.name.slice(0, 30)))
      check(`${path} every FAQ question is visible on the page`, missing.length === 0, `${missing.length} missing`)
    }
    const crumb = nodes.find((node) => node['@type'] === 'BreadcrumbList')
    /* The homepage shows no breadcrumb trail, so it emits no BreadcrumbList. */
    check(`${path} breadcrumb node matches the page`, pageId === 'home' ? !crumb : Boolean(crumb))
  }

  /* Reachability: every page is linked from the homepage or from a page the
     homepage links to. */
  linkGraph.set(path, [...page.body.matchAll(/href="(\/[a-z]{2}(?:\/[a-z0-9-]+)?)"/g)].map((m) => m[1]))
}

/* 12 - two clicks from the homepage, in each language */
for (const code of ['fr', 'en', 'it']) {
  const home = `/${code}`
  const first = new Set(linkGraph.get(home) ?? [])
  const second = new Set([...first].flatMap((p) => linkGraph.get(p) ?? []))
  const reachable = new Set([home, ...first, ...second])
  const missing = routes.filter((r) => r.code === code).map((r) => r.path).filter((p) => !reachable.has(p))
  check(`every ${code} page is within two clicks of ${home}`, missing.length === 0, missing.join(', '))
}

/* Uniqueness across all 27 */
check('all 27 titles unique', new Set(seen.title.values()).size === 27, `${new Set(seen.title.values()).size}`)
check('all 27 descriptions unique', new Set(seen.description.values()).size === 27, `${new Set(seen.description.values()).size}`)

/* 8 - exactly one GA installation */
const bundles = readdirSync(resolve(DIST, 'assets')).filter((f) => f.endsWith('.js'))
const bundleSource = bundles.map((f) => readFileSync(resolve(DIST, 'assets', f), 'utf8')).join('')
const gaLoaders = [...bundleSource.matchAll(/googletagmanager\.com\/gtag\/js/g)].length
check('exactly one GA4 loader in the bundle', gaLoaders === 1, `${gaLoaders}`)
const inlineGa = (await get('/en')).body.includes('googletagmanager')
check('no second GA tag hardcoded in the HTML', inlineGa === false)

server.close()

const failed = results.filter((r) => !r.ok)
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  [${r.detail}]` : ''}`)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
