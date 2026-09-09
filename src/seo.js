/* Single source of truth for everything that goes in <head> and for the
   JSON-LD graph. Read at build time by scripts/prerender.mjs to write the
   static document each URL is served as, and at runtime by useDocumentHead()
   so an in-page language switch updates the same tags. */
import { languages } from './i18n.jsx'
import { PAGES, ACTIVITY_PAGES, pagePath, pageById } from './routes.js'
import { content, pageContent } from './content/index.js'

/* The canonical host, from NEXT_PUBLIC_SITE_URL so it is configured in one
   place rather than repeated across the sitemap, robots.txt, llms.txt and the
   tags below. Any trailing slash is dropped so the joins below cannot double
   up.

   NOTE: the apex currently answers 308 -> https://www.multicaravane.com. The
   brief specifies the apex as canonical, so that is the default here; Vercel's
   primary domain has to be switched to the apex to match, or every canonical
   points at a redirect. This is the only line to change either way. */
export const SITE_URL =
  (import.meta.env?.NEXT_PUBLIC_SITE_URL || 'https://multicaravane.com').replace(/\/+$/, '')

/* The hero photograph, the only image in the repo wide enough to serve as a
   social card at full width. */
export const OG_IMAGE = `${SITE_URL}/assets/ca.png`

export const OG_LOCALES = { fr: 'fr_FR', en: 'en_GB', it: 'it_IT' }

export const BUSINESS = {
  name: "M'Caravane Kelibia",
  email: 'hello@mcaravane.tn',
  telephone: '+21625434499',
  streetAddress: 'Hotel Kelibia Beach',
  addressLocality: 'Kélibia',
  addressCountry: 'TN',
}

export const pageUrl = (pageId, code) => `${SITE_URL}${pagePath(pageId, code)}`
export const X_DEFAULT_URL = `${SITE_URL}/`

/* The same page in all three languages plus x-default. Identical on every
   language version of a page, self-reference included, which is what Google
   requires for the set to be reciprocal. */
export const alternatesFor = (pageId) => [
  ...languages.map((item) => ({ hreflang: item.code, href: pageUrl(pageId, item.code) })),
  { hreflang: 'x-default', href: X_DEFAULT_URL },
]

/* The image a page leads with, when it has one of its own. */
const pageImage = (pageId) => {
  const image = pageById(pageId)?.image
  return image ? `${SITE_URL}${image}` : OG_IMAGE
}

/* Visible breadcrumb trail, mirrored one-for-one by the BreadcrumbList node.
   The homepage shows none, so it emits none. */
export const breadcrumbFor = (code, pageId) => {
  if (pageId === 'home') return []
  return [
    { name: content[code].ui.breadcrumbHome, url: pageUrl('home', code) },
    { name: pageContent(code, pageId).h1, url: pageUrl(pageId, code) },
  ]
}

/* No `geo` and no `openingHours` (not supplied), no `sameAs` entries (no social
   profile appears anywhere in the repo) and no `offers` (every price string in
   the content is still the placeholder "XX €"). Each is listed in the report
   rather than filled with a guess. */
function businessNode() {
  return {
    '@type': 'TouristAttraction',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry,
    },
    availableLanguage: ['fr', 'en', 'it'],
    image: OG_IMAGE,
    sameAs: [],
  }
}

function breadcrumbNode(code, pageId) {
  const trail = breadcrumbFor(code, pageId)
  if (!trail.length) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(pageId, code)}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/* One TouristTrip per activity page, described in that page's language and
   linked to the business that provides it. */
function activityNode(code, pageId) {
  const page = pageContent(code, pageId)
  if (!page?.schema) return null
  return {
    '@type': 'TouristTrip',
    '@id': `${pageUrl(pageId, code)}#trip`,
    name: page.schema.name,
    description: page.schema.description,
    touristType: page.schema.touristType,
    areaServed: 'Kélibia, Tunisia',
    provider: { '@id': `${SITE_URL}/#business` },
    inLanguage: code,
    url: pageUrl(pageId, code),
  }
}

/* Built from the same array the page renders, so the schema can never contain
   an answer that is not visible on the page. */
function faqNode(code, pageId) {
  const page = pageContent(code, pageId)
  if (!page?.faq) return null
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl(pageId, code)}#faq`,
    inLanguage: code,
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
    })),
  }
}

export function buildJsonLd(code, pageId) {
  const nodes = [businessNode(), breadcrumbNode(code, pageId), activityNode(code, pageId), faqNode(code, pageId)]

  /* The homepage lists every activity, so it carries all four trip nodes -
     each one matching a card that is visible on it. */
  if (pageId === 'home' || pageId === 'activities') {
    nodes.push(...ACTIVITY_PAGES.map((page) => activityNode(code, page.id)))
  }

  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }
}

/* Everything <head> needs for one page in one language, as data. The prerender
   serialises it to HTML; the runtime applies it to the live document. */
export function describeHead(code, pageId = 'home') {
  const canonical = pageUrl(pageId, code)
  const { title, description } = pageContent(code, pageId)
  const image = pageImage(pageId)

  return {
    lang: code,
    title,
    canonical,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: BUSINESS.name },
      { property: 'og:locale', content: OG_LOCALES[code] },
      ...languages
        .filter((item) => item.code !== code)
        .map((item) => ({ property: 'og:locale:alternate', content: OG_LOCALES[item.code] })),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    alternates: alternatesFor(pageId),
    jsonLd: buildJsonLd(code, pageId),
  }
}

/* Every URL the site publishes, for the sitemap and the prerender. */
export const allRoutes = () =>
  PAGES.flatMap((page) => languages.map((item) => ({ pageId: page.id, code: item.code, path: pagePath(page.id, item.code) })))
