/* Turns the SPA shell into one static document per language, and writes the
   sitemap from the same route list. Run after `vite build`; see package.json.

   Output, with cleanUrls in vercel.json serving each file without the
   extension:
     dist/index.html  ->  /       x-default, default language, canonical /en
     dist/en.html     ->  /en
     dist/fr.html     ->  /fr
     dist/it.html     ->  /it     */
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, languages, DEFAULT_LANGUAGE, SITE_URL, X_DEFAULT_URL, localeUrl } from '../.ssr/entry-server.js'

const NL = '\n'
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

function document(code) {
  const { html, head } = render(code)
  return template
    .replace('<html lang="en">', `<html lang="${escapeAttr(head.lang)}">`)
    /* The shell's own title and description are replaced, not appended to, so
       each document carries exactly one of each. */
    .replace(/\n\s*<title>[\s\S]*?<\/title>/, '')
    .replace(/\n\s*<meta name="description"[^>]*>/, '')
    .replace('  </head>', `${headHtml(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

/* A real date for lastmod: the last commit that touched the content, falling
   back to the file's mtime outside a git checkout. */
function contentDate() {
  const sources = ['src/i18n.jsx', 'src/App.jsx']
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sources], { encoding: 'utf8' }).trim()
    if (iso) return iso.slice(0, 10)
  } catch { /* not a git checkout */ }
  return new Date(Math.max(...sources.map((f) => statSync(resolve(f)).mtimeMs))).toISOString().slice(0, 10)
}

function sitemap(lastmod) {
  const alternates = [
    ...languages.map((item) => ({ hreflang: item.code, href: localeUrl(item.code) })),
    { hreflang: 'x-default', href: X_DEFAULT_URL },
  ]
  const entries = languages.map((item) => [
    '  <url>',
    `    <loc>${localeUrl(item.code)}</loc>`,
    ...alternates.map((alt) =>
      `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}" />`),
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    '  </url>',
  ].join('\n')).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    '</urlset>',
    '',
  ].join(NL)
}

writeFileSync(resolve(DIST, 'index.html'), document(DEFAULT_LANGUAGE))
for (const item of languages) writeFileSync(resolve(DIST, `${item.code}.html`), document(item.code))

const lastmod = contentDate()
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap(lastmod))
console.log(`prerendered / ${languages.map((l) => `/${l.code}`).join(' ')} and sitemap.xml (lastmod ${lastmod}) at ${SITE_URL}`)
