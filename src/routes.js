/* The one place a URL is defined. Routing, hreflang, the sitemap, navigation,
   breadcrumbs and the prerender all read this; nothing else builds a path.

   Slugs are localised because a French visitor searches "balade dromadaire"
   and an Italian one "giro in cammello" - the slug is part of what they match
   against. `home` has an empty slug, so its URL is the bare language prefix. */

export const PAGES = [
  {
    id: 'home',
    slugs: { fr: '', en: '', it: '' },
  },
  {
    id: 'quad',
    /* GA4 event parameter for this page's booking clicks. */
    activity: 'quad',
    image: '/assets/quad-ride.jpg',
    photos: ['quads-shipwreck-beach', 'quads-eucalyptus', 'quads-palms-sea'],
    slugs: { fr: 'quad-kelibia', en: 'quad-biking-kelibia', it: 'escursione-quad-kelibia' },
  },
  {
    id: 'camel',
    activity: 'camel',
    image: '/assets/camel-rides.jpg',
    photos: ['camels-dunes', 'camel-foal', 'caravan-waterline'],
    slugs: { fr: 'balade-dromadaire', en: 'camel-ride-kelibia', it: 'giro-in-cammello' },
  },
  {
    id: 'horse',
    activity: 'horse',
    photos: ['horse-dunes', 'horseback-shoreline', 'horse-cart'],
    slugs: { fr: 'balade-a-cheval', en: 'horse-riding-kelibia', it: 'passeggiata-a-cavallo' },
  },
  {
    id: 'city',
    activity: 'city_tour',
    image: '/assets/city-museum.jpg',
    photos: ['kelibia-fort-group', 'medina-blue-doors', 'caravan-rocky-coast'],
    slugs: { fr: 'visite-ville-musee', en: 'kelibia-city-museum-tour', it: 'visita-citta-museo' },
  },
  {
    id: 'activities',
    slugs: { fr: 'activites', en: 'activities', it: 'attivita' },
  },
  {
    id: 'practical',
    slugs: { fr: 'infos-pratiques', en: 'practical-information', it: 'informazioni-pratiche' },
  },
  {
    id: 'about',
    slugs: { fr: 'a-propos', en: 'about-us', it: 'chi-siamo' },
  },
  {
    id: 'contact',
    slugs: { fr: 'contact', en: 'contact', it: 'contatti' },
  },
]

export const ACTIVITY_PAGES = PAGES.filter((page) => page.activity)

export const pageById = (id) => PAGES.find((page) => page.id === id)

/* Path only - the origin is added by src/seo.js, which owns the host. */
export const pagePath = (id, code) => {
  const slug = pageById(id)?.slugs?.[code] ?? ''
  return slug ? `/${code}/${slug}` : `/${code}`
}

/* Which page a URL is, in any language. Used by the client to hydrate the
   document it was served, and by nothing else - navigation is plain links to
   prerendered documents, so there is no client-side router to keep in step. */
export const matchPath = (pathname = '/') => {
  const [code, slug = ''] = pathname.split('/').filter(Boolean)
  const page = PAGES.find((item) => item.slugs[code] === slug)
  return page ? { code, pageId: page.id } : null
}

/* Header and footer order. Home is the logo, so it is not repeated here. */
export const NAV_ORDER = ['activities', 'practical', 'about', 'contact']
