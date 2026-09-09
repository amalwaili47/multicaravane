/* Turns the SPA shell into one static document per language, and writes the
   sitemap from the same route list. Run after `vite build`; see package.json.

   Output, with cleanUrls in vercel.json serving each file without the
   extension:
     dist/index.html          ->  /            x-default, default language
     dist/en.html             ->  /en
     dist/en/activities.html  ->  /en/activities
     ... one file per page per language, 27 in all

   robots.txt and llms.txt are written here too, from scripts/templates, so the
   host in them comes from the same NEXT_PUBLIC_SITE_URL as everything else
   rather than being typed into a static file. */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { render, languages, DEFAULT_LANGUAGE, SITE_URL, pageUrl, alternatesFor, allRoutes, PAGES } from '../.ssr/entry-server.js'

const NL = '\n'
/* The files a page's content is built from, for the lastmod lookup. */
const CONTENT_SOURCES = ['src/i18n.jsx', 'src/App.jsx']
const DIST = resolve('dist')
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')

const escapeAttr = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const escapeText = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/* JSON-LD sits inside a script element, so the only sequence that has to be
   neutralised is one that could close it early. */
const escapeJsonLd = (value) => JSON.stringify(value).replaceAll('<', '\u003c')

function headHtml(head) {
  const lines = [
    `    <title data-head>${escapeText(head.title)}</title>`,
    `    <link data-head rel="canonical" href="${escapeAttr(head.canonical)}" />`,
    ...head.alternates.map((alt) =>
      `    <link data-head rel="alternate" hreflang="${escapeAttr(alt.hreflang)}" href="${escapeAttr(alt.href)}" />`),
    ...head.meta.map((entry) => {
      const key = entry.name ? `name="${escapeAttr(entry.name)}"` : `property="${escapeAttr(entry.property)}"`
      return `    <meta data-head ${key} content="${escapeAttr(entry.content)}" />`
    }),
    `    <script data-head type="application/ld+json">${escapeJsonLd(head.jsonLd)}</script>`,
  ]
  return lines.join('\n')
}

function document(code, pageId) {
  const { html, head } = render(code, pageId)
  return template
    .replace('<html lang="en">', `<html lang="${escapeAttr(head.lang)}">`)
    /* The shell's own title and description are replaced, not appended to, so
       each document carries exactly one of each. */
    .replace(/\n\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\n\s*<meta name="description"[^>]*>/, '')
    .replace('  </head>', `${headHtml(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

/* The date the content itself last changed, from the last commit that touched
   the files a page is built out of. Returns null - and the entry then carries
   no <lastmod> at all - when that cannot be established: a shallow clone with
   no history, or a build from outside git. A file mtime is not usable as a
   fallback because on a fresh checkout it is the build time, which is exactly
   the wrong answer to publish. */
function contentDate(sources) {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sources], { encoding: 'utf8' }).trim()
    return iso ? iso.slice(0, 10) : null
  } catch {
    return null
  }
}

function sitemap() {
  const entries = allRoutes().map(({ pageId, code }) => [
    '  <url>',
    `    <loc>${escapeAttr(pageUrl(pageId, code))}</loc>`,
    ...alternatesFor(pageId).map((alt) =>
      `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}" />`),
    ...(LASTMOD ? [`    <lastmod>${LASTMOD}</lastmod>`] : []),
    '    <changefreq>monthly</changefreq>',
    '  </url>',
  ].join(NL))

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join(NL)
}

/* Text files whose only variable is the host. */
function writeTemplate(name) {
  const body = readFileSync(resolve('scripts/templates', name), 'utf8').replaceAll('{{SITE_URL}}', SITE_URL)
  writeFileSync(resolve(DIST, name), body)
}

function write(file, body) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, body)
}

const LASTMOD = contentDate(CONTENT_SOURCES)

/* `/` is the default language, serving as the x-default entry point. */
write(resolve(DIST, 'index.html'), document(DEFAULT_LANGUAGE, 'home'))

const written = []
for (const { pageId, code, path } of allRoutes()) {
  write(resolve(DIST, `.${path}.html`), document(code, pageId))
  written.push(path)
}

writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap())
writeTemplate('robots.txt')
writeTemplate('llms.txt')

console.log(`prerendered ${SITE_URL}/ and ${written.length} routes across ${PAGES.length} pages;`
  + ` sitemap lastmod ${LASTMOD ?? '(omitted, no git history)'}`)
