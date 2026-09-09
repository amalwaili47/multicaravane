import { renderToString } from 'react-dom/server'
import Root from './App.jsx'
import { describeHead } from './seo.js'

/* Re-exported so scripts/prerender.mjs has a single entry point it can load:
   plain Node cannot import the .jsx sources these come from. */
export { languages, DEFAULT_LANGUAGE } from './i18n.jsx'
export { SITE_URL, X_DEFAULT_URL, pageUrl, alternatesFor, allRoutes } from './seo.js'
export { PAGES, ACTIVITY_PAGES, pagePath } from './routes.js'

/* Renders one language to a static document. Effects do not run here, so the
   markup is the first paint - what a crawler that does not execute JavaScript
   sees - and the client hydrates it afterwards. */
export function render(code, pageId) {
  return { html: renderToString(<Root language={code} pageId={pageId} />), head: describeHead(code, pageId) }
}
