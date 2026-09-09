import { renderToString } from 'react-dom/server'
import Root from './App.jsx'
import { describeHead } from './seo.js'

/* Re-exported so scripts/prerender.mjs has a single entry point it can load:
   plain Node cannot import the .jsx sources these come from. */
export { languages, DEFAULT_LANGUAGE } from './i18n.jsx'
export { SITE_URL, X_DEFAULT_URL, ROUTES, localeUrl, alternatesFor } from './seo.js'

/* Renders one language to a static document. Effects do not run here, so the
   markup is the first paint - what a crawler that does not execute JavaScript
   sees - and the client hydrates it afterwards. */
export function render(code, path = '') {
  return { html: renderToString(<Root language={code} />), head: describeHead(code, path) }
}
