import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { matchPath } from './routes.js'
import './styles.css'

const container = document.getElementById('root')

/* Which document this is. Navigation between pages is plain links to
   prerendered HTML, so the URL is read once at startup and there is no
   client-side router to keep in step with it. */
const match = matchPath(window.location.pathname)

const tree = (
  <React.StrictMode>
    {/* The language the document was prerendered as, so the first client
        render matches the served markup. The provider reconciles it with the
        visitor's own preference after mount. */}
    <App language={match?.code ?? document.documentElement.lang} pageId={match?.pageId ?? 'home'} />
  </React.StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, tree)
else createRoot(container).render(tree)
