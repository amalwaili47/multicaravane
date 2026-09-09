import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    {/* The language the document was prerendered as, so the first client render
        matches the served markup. The provider reconciles it with the visitor's
        own preference after mount. */}
    <App language={document.documentElement.lang} />
  </React.StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, tree)
else createRoot(container).render(tree)
