import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const languages = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'it', short: 'IT', label: 'Italiano' },
]

export const DEFAULT_LANGUAGE = 'en'

// Flat dotted keys, one block per section. Add new sections here in all three
// languages; anything missing from fr/it falls back to the English string.
export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.experiences': 'Experiences',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',

    'hero.eyebrow': 'Authentic experiences in Kelibia, Cap Bon',
    'hero.title': 'Sea, sand and history. All in one day.',
    'hero.subtitle': 'Quad rides over the dunes, camels and horses on the beach, the Fort and the treasures of Kelibia. Small groups, local guides, memories that last.',
    'hero.cta_primary': 'Explore experiences',
    'hero.cta_secondary': 'Book on WhatsApp',

    'exp.eyebrow': 'Our activities',
    'exp.title': 'Choose your adventure',
    'exp.subtitle': 'Four ways to experience Kelibia, between land, sea and history. All experiences are guided, insured and beginner-friendly.',
    'exp.cta': 'Learn more',
    'exp.back': 'Back',
    'exp.from': 'From',
    'exp.duration': 'Duration',
    'exp.includes': 'Includes',

    // Camel and horse are presented as one card, so their copy is merged.
    'camel.title': 'Camel & horseback rides',
    'camel.tagline': 'The slow rhythm of tradition, along the shoreline',
    'camel.description': 'A caravan along El Mansoura beach at sunrise or sunset. Calm animals for families, longer routes for confident riders. Mint tea and photos included.',
    'camel.includes': 'Camel, horse, helmet, guide, mint tea, photos',
    'camel.duration': '30 min / 1h',
    'camel.price': 'XX € per person',

    'quad.title': 'Quad ride',
    'quad.tagline': 'Adrenaline between dunes and pine forest',
    'quad.description': 'Dunes, coastal trails and pine forest, with the Fort on the horizon. No experience needed — briefing, helmet and guide included.',
    'quad.includes': 'Quad, helmet, guide, water, souvenir photo',
    'quad.duration': '1h / 2h',
    'quad.price': 'XX € per person',

    'city.title': 'Kelibia city & museum tour',
    'city.tagline': '2,500 years of history by the sea',
    'city.description': 'Climb the Byzantine Fort, walk the old harbour, then the museum — Punic and Roman Kelibia with a guide. Kerkouane optional.',
    'city.includes': 'Guide, entrance fees, local transport',
    'city.duration': '3h / half day',
    'city.price': 'XX € per person',

    'banner.eyebrow': 'Between land and sea',
    'banner.title': 'One coast. Endless stories.',
    'banner.text': 'Combine two or more activities and build your perfect day in Kelibia. We arrange everything, from transport to the best time of day.',
    'banner.cta': 'Plan your day',

    'gallery.eyebrow': 'Our Kelibia',
    'gallery.title': 'Kelibia in pictures',
    'gallery.cta': 'See all photos',

    'gallery.caravan-waterline': 'Caravan on the shoreline · Kelibia beach',
    'gallery.quads-shipwreck-beach': 'Quads beside the wreck · Mansoura shore',
    'gallery.horse-dunes': 'Riding in the dunes · Kelibia coast',
    'gallery.kelibia-fort-group': 'The group at the fortress · Kelibia Fort',
    'gallery.caravan-rocky-coast': 'Caravan on the rocky coast · Cap Bon',
    'gallery.quads-eucalyptus': 'Quads on the forest trail · Inland Kelibia',
    'gallery.medina-blue-doors': 'Blue doors of the medina · Kelibia',
    'gallery.camels-dunes': 'Camels crossing the dunes · El Mansoura',
    'gallery.horseback-shoreline': 'Riding along the shore · El Mansoura',
    'gallery.camel-foal': 'A camel foal on white sand · Mansoura beach',
    'gallery.horse-cart': 'The blue cart ride · Kelibia',
    'gallery.quads-palms-sea': 'Quads under the palms · Kelibia coast',

    'footer.tagline': 'Authentic experiences between sea, sand and history in Kelibia, Cap Bon.',
    'footer.motto': 'Kelibia, for real.',
    'footer.links': 'Useful links',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 M’Caravane Kelibia. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Service',
    'footer.top': 'Back to top',
    'footer.address': 'Kelibia, Nabeul Governorate, Tunisia',
    'footer.directions': 'Get directions',
    'hero.image_alt': 'A caravan of camels and their riders walking along the shoreline on Kelibia beach',
    'camel.image_alt': 'Riders on camels crossing the sand beside the sea at El Mansoura',
    'quad.image_alt': 'A quad bike on a sandy coastal trail near Kelibia',
    'city.image_alt': 'The Byzantine fort above the old harbour of Kelibia',
    'footer.map_title': 'Map showing Kelibia, Nabeul Governorate, Tunisia',
  },

  fr: {
    'nav.home': 'Accueil',
    'nav.experiences': 'Expériences',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Contact',

    'hero.eyebrow': 'Expériences authentiques à Kélibia, Cap Bon',
    'hero.title': 'La mer, le sable et l’histoire. En une seule journée.',
    'hero.subtitle': 'Quad sur les dunes, dromadaires et chevaux sur la plage, le Fort et les trésors de Kélibia. Petits groupes, guides locaux, souvenirs qui restent.',
    'hero.cta_primary': 'Découvrir les expériences',
    'hero.cta_secondary': 'Réserver sur WhatsApp',

    'exp.eyebrow': 'Nos activités',
    'exp.title': 'Choisissez votre aventure',
    'exp.subtitle': 'Quatre façons de vivre Kélibia, entre terre, mer et histoire. Toutes les expériences sont guidées, assurées et accessibles aux débutants.',
    'exp.cta': 'En savoir plus',
    'exp.back': 'Retour',
    'exp.from': 'À partir de',
    'exp.duration': 'Durée',
    'exp.includes': 'Inclus',

    'camel.title': 'Balade à dos de dromadaire et à cheval',
    'camel.tagline': 'Le rythme lent de la tradition, au bord de la mer',
    'camel.description': 'Une caravane sur la plage d’El Mansoura, au lever ou au coucher du soleil. Montures calmes pour les familles, parcours plus longs pour les cavaliers confirmés. Thé à la menthe et photos inclus.',
    'camel.includes': 'Dromadaire, cheval, casque, guide, thé à la menthe, photos',
    'camel.duration': '30 min / 1h',
    'camel.price': 'XX € par personne',

    'quad.title': 'Sortie en quad',
    'quad.tagline': 'Adrénaline entre dunes et pinède',
    'quad.description': 'Dunes, sentiers côtiers et pinède, le Fort à l’horizon. Aucune expérience requise — briefing, casque et guide inclus.',
    'quad.includes': 'Quad, casque, guide, eau, photo souvenir',
    'quad.duration': '1h / 2h',
    'quad.price': 'XX € par personne',

    'city.title': 'Visite de Kélibia et du musée',
    'city.tagline': '2 500 ans d’histoire face à la mer',
    'city.description': 'Montée au Fort byzantin, le vieux port, puis le musée — Kélibia punique et romaine, avec guide. Kerkouane en option.',
    'city.includes': 'Guide, entrées, transport local',
    'city.duration': '3h / demi-journée',
    'city.price': 'XX € par personne',

    'banner.eyebrow': 'Entre terre et mer',
    'banner.title': 'Une côte. Mille histoires.',
    'banner.text': 'Combinez deux activités ou plus et composez votre journée idéale à Kélibia. Nous organisons tout, du transport au meilleur horaire.',
    'banner.cta': 'Planifier ma journée',

    'gallery.eyebrow': 'Notre Kélibia',
    'gallery.title': 'Kélibia en images',
    'gallery.cta': 'Voir toutes les photos',

    'gallery.caravan-waterline': 'Caravane au bord de l’eau · Plage de Kélibia',
    'gallery.quads-shipwreck-beach': 'Quads près de l’épave · Côte de Mansoura',
    'gallery.horse-dunes': 'À cheval dans les dunes · Côte de Kélibia',
    'gallery.kelibia-fort-group': 'Le groupe à la forteresse · Fort de Kélibia',
    'gallery.caravan-rocky-coast': 'Caravane sur la côte rocheuse · Cap Bon',
    'gallery.quads-eucalyptus': 'Quads sur le sentier forestier · Arrière-pays de Kélibia',
    'gallery.medina-blue-doors': 'Portes bleues de la médina · Kélibia',
    'gallery.camels-dunes': 'Dromadaires dans les dunes · El Mansoura',
    'gallery.horseback-shoreline': 'À cheval au bord de l’eau · El Mansoura',
    'gallery.camel-foal': 'Un jeune dromadaire sur le sable blanc · Plage de Mansoura',
    'gallery.horse-cart': 'La calèche bleue · Kélibia',
    'gallery.quads-palms-sea': 'Quads sous les palmiers · Côte de Kélibia',

    'footer.tagline': 'Expériences authentiques entre mer, sable et histoire à Kélibia, Cap Bon.',
    'footer.motto': 'Kélibia, pour de vrai.',
    'footer.links': 'Liens utiles',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 M’Caravane Kélibia. Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions d’utilisation',
    'footer.top': 'Retour en haut',
    'footer.address': 'Kélibia, gouvernorat de Nabeul, Tunisie',
    'footer.directions': 'Itinéraire',
    'hero.image_alt': 'Une caravane de dromadaires et leurs cavaliers longeant le rivage sur la plage de Kélibia',
    'camel.image_alt': 'Des cavaliers à dromadaire traversant le sable au bord de la mer à El Mansoura',
    'quad.image_alt': 'Un quad sur un sentier côtier sablonneux près de Kélibia',
    'city.image_alt': 'Le fort byzantin au-dessus du vieux port de Kélibia',
    'footer.map_title': 'Carte situant Kélibia, gouvernorat de Nabeul, Tunisie',
  },

  it: {
    'nav.home': 'Home',
    'nav.experiences': 'Esperienze',
    'nav.gallery': 'Galleria',
    'nav.contact': 'Contatti',

    'hero.eyebrow': 'Esperienze autentiche a Kelibia, Cap Bon',
    'hero.title': 'Il mare, la sabbia e la storia. In una sola giornata.',
    'hero.subtitle': 'Quad sulle dune, cammelli e cavalli sulla spiaggia, il Forte e i tesori di Kelibia. Piccoli gruppi, guide locali, ricordi che restano.',
    'hero.cta_primary': 'Scopri le esperienze',
    'hero.cta_secondary': 'Prenota su WhatsApp',

    'exp.eyebrow': 'Le nostre attività',
    'exp.title': 'Scegli la tua avventura',
    'exp.subtitle': 'Quattro modi di vivere Kelibia, tra terra, mare e storia. Tutte le esperienze sono guidate, assicurate e adatte a principianti.',
    'exp.cta': 'Scopri di più',
    'exp.back': 'Indietro',
    'exp.from': 'A partire da',
    'exp.duration': 'Durata',
    'exp.includes': 'Include',

    'camel.title': 'Passeggiata in cammello e a cavallo',
    'camel.tagline': 'Il ritmo lento della tradizione, sulla riva del mare',
    'camel.description': 'Una carovana sulla spiaggia di El Mansoura, all’alba o al tramonto. Animali docili per le famiglie, percorsi più lunghi per cavalieri esperti. Tè alla menta e foto inclusi.',
    'camel.includes': 'Cammello, cavallo, casco, guida, tè alla menta, foto',
    'camel.duration': '30 min / 1h',
    'camel.price': 'XX € a persona',

    'quad.title': 'Escursione in quad',
    'quad.tagline': 'Adrenalina tra dune e pinete',
    'quad.description': 'Dune, sentieri costieri e pineta, con il Forte all’orizzonte. Nessuna esperienza richiesta — briefing, casco e guida inclusi.',
    'quad.includes': 'Quad, casco, guida, acqua, foto ricordo',
    'quad.duration': '1h / 2h',
    'quad.price': 'XX € a persona',

    'city.title': 'Visita di Kelibia e del museo',
    'city.tagline': '2.500 anni di storia sul mare',
    'city.description': 'Salita al Forte bizantino, il vecchio porto, poi il museo — Kelibia punica e romana, con guida. Kerkouane in opzione.',
    'city.includes': 'Guida in italiano, ingressi, trasporto locale',
    'city.duration': '3h / mezza giornata',
    'city.price': 'XX € a persona',

    'banner.eyebrow': 'Tra terra e mare',
    'banner.title': 'Una costa. Mille storie.',
    'banner.text': 'Combina due o più attività e crea la tua giornata perfetta a Kelibia. Ti aiutiamo a organizzare tutto, dal trasporto all’orario migliore.',
    'banner.cta': 'Organizza la tua giornata',

    'gallery.eyebrow': 'La nostra Kelibia',
    'gallery.title': 'Kelibia in immagini',
    'gallery.cta': 'Vedi tutte le foto',

    'gallery.caravan-waterline': 'Carovana sulla riva · Spiaggia di Kelibia',
    'gallery.quads-shipwreck-beach': 'Quad accanto al relitto · Costa di Mansoura',
    'gallery.horse-dunes': 'A cavallo tra le dune · Costa di Kelibia',
    'gallery.kelibia-fort-group': 'Il gruppo alla fortezza · Forte di Kelibia',
    'gallery.caravan-rocky-coast': 'Carovana sulla costa rocciosa · Cap Bon',
    'gallery.quads-eucalyptus': 'Quad sul sentiero forestale · Entroterra di Kelibia',
    'gallery.medina-blue-doors': 'Porte blu della medina · Kelibia',
    'gallery.camels-dunes': 'Cammelli tra le dune · El Mansoura',
    'gallery.horseback-shoreline': 'A cavallo sulla riva · El Mansoura',
    'gallery.camel-foal': 'Un cucciolo di cammello sulla sabbia bianca · Spiaggia di Mansoura',
    'gallery.horse-cart': 'Il carretto blu · Kelibia',
    'gallery.quads-palms-sea': 'Quad sotto le palme · Costa di Kelibia',

    'footer.tagline': 'Esperienze autentiche tra mare, sabbia e storia a Kelibia, Cap Bon.',
    'footer.motto': 'Kelibia, vissuta davvero.',
    'footer.links': 'Link utili',
    'footer.contact': 'Contatti',
    'footer.rights': '© 2026 M’Caravane Kelibia. Tutti i diritti riservati.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Termini di servizio',
    'footer.top': 'Torna su',
    'footer.address': 'Kelibia, governatorato di Nabeul, Tunisia',
    'footer.directions': 'Come arrivare',
    'hero.image_alt': 'Una carovana di cammelli e i loro cavalieri lungo la riva sulla spiaggia di Kelibia',
    'camel.image_alt': 'Cavalieri in groppa ai cammelli sulla sabbia in riva al mare a El Mansoura',
    'quad.image_alt': 'Un quad su un sentiero costiero sabbioso vicino a Kelibia',
    'city.image_alt': 'Il forte bizantino sopra il vecchio porto di Kelibia',
    'footer.map_title': 'Mappa di Kelibia, governatorato di Nabeul, Tunisia',
  },
}

const STORAGE_KEY = 'mcaravane.lang'
const LanguageContext = createContext(null)

const isKnown = (code) => languages.some((item) => item.code === code)

/* Each language is served from its own path - /fr, /en, /it - so it has a URL
   that can be canonicalised, linked as an hreflang alternate and listed in the
   sitemap. `/` serves the default language. */
export const languageFromPath = (pathname = '') => {
  const first = pathname.split('/').filter(Boolean)[0]
  return isKnown(first) ? first : null
}

// The path wins, then ?lang=fr - kept working so older shared links still land
// on the right language - then the visitor's last choice, then English.
const readInitial = () => {
  try {
    const fromPath = languageFromPath(window.location.pathname)
    if (fromPath) return fromPath
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (isKnown(fromUrl)) return fromUrl
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isKnown(stored)) return stored
  } catch { /* private mode or no window */ }
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children, initialLanguage }) {
  /* The prerender passes the language it is rendering; in the browser it is
     read off the URL. */
  const [code, setCode] = useState(() => (isKnown(initialLanguage) ? initialLanguage : readInitial()))

  /* The document arrives prerendered in one language, so that is what the
     first client render has to be. Once mounted, the visitor's own preference
     - their path, their ?lang=, their last choice - takes over. */
  useEffect(() => {
    const preferred = readInitial()
    if (preferred !== code) setCode(preferred)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.lang = code
    try { localStorage.setItem(STORAGE_KEY, code) } catch { /* private mode */ }

    /* Keep the address bar on the language being shown, so the page can be
       shared and so a reload serves the matching prerendered document. Only
       rewritten when it is already a language path or the bare root - a URL
       shape this code did not create is left alone. */
    try {
      const { pathname, search, hash } = window.location
      const current = languageFromPath(pathname)
      if (current !== code && (current || pathname === '/')) {
        const params = new URLSearchParams(search)
        params.delete('lang')
        const query = params.toString()
        window.history.replaceState(null, '', `/${code}${query ? `?${query}` : ''}${hash}`)
      }
    } catch { /* no history API */ }
  }, [code])

  const value = useMemo(() => ({
    code,
    setCode,
    // Falls back to English, then to the key itself, so a missing string is
    // visible in development rather than rendering as an empty element.
    t: (key) => translations[code]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key,
  }), [code])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}
