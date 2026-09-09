import { useEffect } from 'react'
import { describeHead } from './seo.js'

/* Keeps the tags written by the prerender in step with an in-page language
   switch. Every element it owns carries data-head, so a switch replaces the
   previous language's set rather than appending a second one. */
const OWNED = 'data-head'

function replaceOwned(selector, build) {
  document.head.querySelectorAll(`${selector}[${OWNED}]`).forEach((el) => el.remove())
  build().forEach((el) => {
    el.setAttribute(OWNED, '')
    document.head.appendChild(el)
  })
}

export function useDocumentHead(code) {
  useEffect(() => {
    const head = describeHead(code)

    document.documentElement.lang = head.lang
    document.title = head.title

    replaceOwned('meta', () => head.meta.map((entry) => {
      const el = document.createElement('meta')
      if (entry.name) el.setAttribute('name', entry.name)
      if (entry.property) el.setAttribute('property', entry.property)
      el.setAttribute('content', entry.content)
      return el
    }))

    replaceOwned('link', () => {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = head.canonical
      return [canonical, ...head.alternates.map((alt) => {
        const el = document.createElement('link')
        el.rel = 'alternate'
        el.hreflang = alt.hreflang
        el.href = alt.href
        return el
      })]
    })

    replaceOwned('script[type="application/ld+json"]', () => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.textContent = JSON.stringify(head.jsonLd)
      return [el]
    })
  }, [code])
}
