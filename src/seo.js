/* Single source of truth for everything that goes in <head> and for the
   JSON-LD graph. Read at build time by scripts/prerender.mjs to write the
   static HTML each language is served as, and at runtime by useDocumentHead()
   so an in-page language switch updates the same tags. */
import { translations, languages, DEFAULT_LANGUAGE } from './i18n.jsx'

/* The canonical host, from NEXT_PUBLIC_SITE_URL so it is configured in one
   place rather than repeated across the sitemap, robots.txt, llms.txt and the
   tags below. The default is the apex's redirect target: https://multicaravane.com
   answers 308 -> https://www.multicaravane.com, so www is the host that
   actually serves, and the one every absolute URL here has to name. Any
   trailing slash is dropped so joins below cannot double up. */
export const SITE_URL =
  (import.meta.env?.NEXT_PUBLIC_SITE_URL || 'https://www.multicaravane.com').replace(/\/+$/, '')

/* Every public route, as a path under the language prefix. The site is one
   page per language today, so there is one entry; adding a route here puts it
   in the sitemap, in the hreflang set and in the prerender automatically.
   In-page anchors (#experiences, #gallery, #contact) are not routes and must
   not appear in a sitemap. */
export const ROUTES = [
  { path: '', changefreq: 'monthly' },
]

/* The hero photograph, the only image in the repo wide enough to serve as a
   social card. */
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

/* Path-prefixed URLs, no trailing slash. `/` serves the default language as
   the x-default entry point and canonicalises to that language's own URL. */
export const localeUrl = (code, path = '') => `${SITE_URL}/${code}${path ? `/${path}` : ''}`
export const X_DEFAULT_URL = `${SITE_URL}/`

/* The same route in all three languages plus x-default. Identical on every
   language version of a page, self-reference included. */
export const alternatesFor = (path = '') => [
  ...languages.map((item) => ({ hreflang: item.code, href: localeUrl(item.code, path) })),
  { hreflang: 'x-default', href: X_DEFAULT_URL },
]

/* 50-60 characters, native in each language, activity plus place. */
export const META = {
  en: {
    title: 'Quad, Camel and Horse Rides in Kélibia | M’Caravane',
    description:
      'Quad excursions over the dunes, camel and horse rides on El Mansoura beach, and guided tours of the Kélibia Fort. Small groups — book on WhatsApp.',
  },
  fr: {
    title: 'Quad, dromadaire et cheval à Kélibia | M’Caravane Kelibia',
    description:
      'Excursions en quad sur les dunes, balades à dromadaire et à cheval sur la plage d’El Mansoura, visite guidée du Fort. Petits groupes — réservez sur WhatsApp.',
  },
  it: {
    title: 'Quad, cammelli e cavalli a Kélibia | M’Caravane Kelibia',
    description:
      'Escursioni in quad tra le dune, giri in cammello e a cavallo sulla spiaggia di El Mansoura, visite guidate al Forte. Piccoli gruppi — prenota su WhatsApp.',
  },
}

/* The three activity cards the page actually renders. Camel and horse riding
   share one card, so they share one Service node - the graph has to describe
   what is visible. */
const SERVICES = [
  { id: 'camel', key: 'camel' },
  { id: 'quad', key: 'quad' },
  { id: 'city', key: 'city' },
]

const t = (code, key) =>
  translations[code]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key

/* No `geo` (not supplied), no `sameAs` entries (no social profile appears
   anywhere in the repo) and no `offers` (every price string in the content is
   still the placeholder "XX €"). Each of those is listed in the report rather
   than filled with a guess. */
export function buildJsonLd(code) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
      },
      ...SERVICES.map((service) => ({
        '@type': 'Service',
        '@id': `${SITE_URL}/#service-${service.id}`,
        name: t(code, `${service.key}.title`),
        description: t(code, `${service.key}.description`),
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: 'Kélibia, Tunisia',
      })),
    ],
  }
}

/* Everything <head> needs for one language, as data. The prerender serialises
   it to HTML; the runtime applies it to the live document. */
export function describeHead(code, path = '') {
  const canonical = localeUrl(code, path)
  const { title, description } = META[code]

  return {
    lang: code,
    title,
    canonical,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: OG_IMAGE },
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
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    /* The same four alternates on every language version, self-reference
       included, which is what Google requires for the set to be reciprocal. */
    alternates: alternatesFor(path),
    jsonLd: buildJsonLd(code),
  }
}
