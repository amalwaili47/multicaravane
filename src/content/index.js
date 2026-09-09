import en from './en.js'
import fr from './fr.js'
import it from './it.js'

/* Long-form page content, one module per language. Kept out of src/i18n.jsx -
   which holds flat dotted keys for the short UI strings - because a page is a
   tree of headings, paragraphs and Q&A pairs, not a string. */
export const content = { en, fr, it }

export const pageContent = (code, pageId) => content[code].pages[pageId]
export const ui = (code) => content[code].ui
export const navLabels = (code) => content[code].nav
