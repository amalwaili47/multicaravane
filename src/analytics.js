/* One entry point for GA4. Nothing here assumes the tag is present: with no
   measurement ID configured - local dev, preview builds - the script is never
   injected and every call is a no-op, so components can fire events
   unconditionally. */

export const GA_ID = import.meta.env?.NEXT_PUBLIC_GA_ID || ''

/* Loads gtag.js once, after hydration, from a <script async> so it is off the
   critical path and cannot block first paint. */
export function loadAnalytics() {
  if (!GA_ID || typeof document === 'undefined') return
  if (document.getElementById('ga4-src')) return

  const script = document.createElement('script')
  script.id = 'ga4-src'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

/* The single call site for events. `gtag` may be missing (no ID, blocked by a
   content blocker, still loading), so the guard is the point of the helper. */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

/* Which activity a booking click belongs to. The activity cards pass their own
   id; everything else - hero, banner, footer - is a general enquiry. */
export const ACTIVITY_EVENT_ID = {
  camel: 'camel',
  quad: 'quad',
  city: 'city_tour',
}

export function trackBooking(activity, language) {
  trackEvent('booking_whatsapp_click', { activity: activity || 'general', language })
}
