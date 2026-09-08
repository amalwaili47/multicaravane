import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LanguageProvider, languages, useLanguage } from './i18n.jsx'

const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={diagonal ? 'M5 19 19 5M9 5h10v10' : 'M4 12h15M14 7l5 5-5 5'} />
  </svg>
)

const Chevron = ({ back = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={back ? 'M15 4 7 12l8 8' : 'M9 4l8 8-8 8'} />
  </svg>
)

const SunWave = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M18 38a14 14 0 0 1 28 0M32 15v7M14 23l5 5M50 23l-5 5M9 39h46M12 46c5-3 9-3 14 0s9 3 14 0 9-3 14 0M16 53c4-2 7-2 11 0s7 2 11 0 7-2 11 0" />
  </svg>
)

const Phone = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3 4 5c-1 1-1 3 0 5 2 5 5 8 10 10 2 1 4 1 5 0l2-3-5-3-2 2c-3-1-5-3-6-6l2-2-3-5Z"/></svg>
const Globe = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>
const Pin = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>

const activities = [
  { id: 'camel', className: 'camel', image: '/assets/camel-rides.jpg' },
  { id: 'quad', className: 'quad', image: '/assets/quad-ride.jpg' },
  { id: 'city', className: 'city', image: '/assets/city-museum.jpg' },
]


// EXIF capture dates; the month name is localised at render time via Intl.
const galleryItems = [
  { id: 'caravan-waterline', date: '2025-09-30' },
  { id: 'quads-shipwreck-beach', date: '2024-07-24' },
  { id: 'horse-dunes', date: '2025-08-20' },
  { id: 'kelibia-fort-group', date: '2025-09-04' },
  { id: 'caravan-rocky-coast', date: '2025-08-07' },
  { id: 'quads-eucalyptus', date: '2025-08-31' },
  { id: 'medina-blue-doors', date: '2025-09-05' },
  { id: 'camels-dunes', date: '2025-09-03' },
  { id: 'horseback-shoreline', date: '2026-06-24' },
  { id: 'camel-foal', date: '2024-05-30' },
  { id: 'horse-cart', date: '2024-07-24' },
  { id: 'quads-palms-sea', date: '2024-07-20' },
].map((item) => ({ ...item, image: `/assets/gallery/web/${item.id}.jpg` }))

const formatMonth = (iso, code) => {
  const [year, month] = iso.split('-')
  return new Intl.DateTimeFormat(code, { month: 'long', year: 'numeric' })
    .format(new Date(Number(year), Number(month) - 1, 1))
}



// Visible window of the fan: three cards either side of centre, plus a faded "shoulder"
// card at distance 4 sitting just outside each arrow — on the group's line, never under the icon.
const FAN_LEFT = 4
const FAN_RIGHT = 4
const SHOULDER = 4
const FAN_SCALE = [1, 0.82, 0.68, 0.56, 0.44]
const FAN_OPACITY = [1, 0.86, 0.66, 0.46, 0.28]

// TODO: replace with M’Caravane’s real WhatsApp number.
const WHATSAPP_URL = 'https://wa.me/21625434499'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Kelibia%2C%20Nabeul%20Governorate%2C%20Tunisia'
 
const navItems = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.experiences', href: '#experiences' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.contact', href: '#contact' },
]

// Selecting a language sets <html lang> so the choice is real; the copy itself
// still needs a translation layer before the labels do anything visible.
function LanguageMenu() {
  const { code, setCode } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => { if (!ref.current?.contains(event.target)) setOpen(false) }
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = languages.find((item) => item.code === code)

  return (
    <div className={`lang-menu${open ? ' is-open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}. Change language`}
      >
        <Globe />
        <span>{current.short}</span>
        <i aria-hidden="true" />
      </button>
      <ul className="lang-list" role="listbox" aria-label="Select a language">
        {languages.map((item) => (
          <li key={item.code} role="option" aria-selected={item.code === code}>
            <button type="button" onClick={() => { setCode(item.code); setOpen(false) }}>
              <span>{item.short}</span>{item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="M'Caravane home">
      <img src="/assets/logo.png" alt="M’Caravane Kelibia" />
    </a>
  )
}

function ExperienceGallery() {
  const { t, code } = useLanguage()
  const count = galleryItems.length
  const [active, setActive] = useState(Math.floor(count / 2))
  const [paused, setPaused] = useState(false)
  const touchStart = useRef(null)

  const step = (direction) => setActive((current) => (current + direction + count) % count)

  const relativeOffset = (index) => {
    let offset = index - active
    if (offset > count / 2) offset -= count
    if (offset < -count / 2) offset += count
    return offset
  }

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setInterval(() => step(1), 5200)
    return () => clearInterval(timer)
  }, [paused, active])

  const onTouchStart = (event) => { touchStart.current = event.touches[0].clientX }
  const onTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 44) step(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading" data-reveal>
        <p className="gallery-eyebrow"><em>{t('gallery.eyebrow')}</em></p>
        <h2 id="gallery-title">{t('gallery.title')}</h2>
      </div>

      <div
        className="gallery-stage"
        data-reveal
        role="group"
        aria-roledescription="carousel"
        aria-label={t('gallery.title')}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button className="gallery-nav prev" type="button" onClick={() => step(-1)} aria-label="Previous experience"><Chevron back /></button>

        <div className="gallery-track">
          {galleryItems.map((item, index) => {
            const offset = relativeOffset(index)
            const distance = Math.abs(offset)
            const visible = offset >= -FAN_LEFT && offset <= FAN_RIGHT
            const scale = FAN_SCALE[distance] ?? 0.4
            const shoulder = distance === SHOULDER
            const x = shoulder ? `calc(var(--shoulder-x) * ${offset < 0 ? -1 : 1})` : `calc(var(--step) * ${offset})`
            const transform = `translateX(${x}) translateY(${distance * 5}px) scale(${scale})`
            return (
              <button
                key={item.id}
                type="button"
                className={`gallery-slide${offset === 0 ? ' is-active' : ''}${shoulder ? ' is-shoulder' : ''}`}
                style={{
                  transform,
                  zIndex: 10 - distance,
                  opacity: visible ? FAN_OPACITY[distance] ?? 0.8 : 0,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                onClick={() => setActive(index)}
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
                aria-label={t(`gallery.${item.id}`)}
              >
                <img src={item.image} alt={t(`gallery.${item.id}`)} loading={distance <= 1 ? 'eager' : 'lazy'} />
              </button>
            )
          })}
        </div>

        <button className="gallery-nav next" type="button" onClick={() => step(1)} aria-label="Next experience"><Chevron /></button>
      </div>

      <p className="gallery-caption" aria-live="polite">
        {t(`gallery.${galleryItems[active].id}`)}
        <span>{formatMonth(galleryItems[active].date, code)}</span>
      </p>

      <div className="ornament centered gallery-rule" aria-hidden="true"><i /></div>
    </section>
  )
}

const EASE = 'cubic-bezier(.16,1,.3,1)'

function ActivityCard({ activity, index, open, hidden, onToggle }) {
  const { t } = useLanguage()
  const title = t(`${activity.id}.title`)

  // The description no longer lives here: when a card is picked the grid hands it
  // to the shared .activity-detail panel on the right. The card is the toggle.
  return (
    <article
      className="activity-item"
      data-reveal
      data-id={activity.id}
      data-open={open ? '' : undefined}
      data-hidden={hidden ? '' : undefined}
      inert={hidden ? true : undefined}
      style={{ '--delay': `${index * 120}ms` }}
    >
      <div className={`activity-card ${activity.className}`}>
        <img src={activity.image} alt={title} />
        <button
          type="button"
          className="activity-toggle"
          aria-expanded={open}
          aria-controls="activity-detail"
          aria-label={`${open ? t('exp.back') : t('exp.cta')} — ${title}`}
          onClick={() => onToggle(activity.id)}
        />
        <div className="activity-card-content">
          <h3>{title}</h3>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t('hero.cta_secondary')}</a>
          <p className="activity-tagline">{t(`${activity.id}.tagline`)}</p>
        </div>
        <span className="activity-cue" aria-hidden="true"><Chevron /></span>
      </div>
    </article>
  )
}

function ActivityGrid() {
  const { t } = useLanguage()
  const [openId, setOpenId] = useState(null)
  const gridRef = useRef(null)
  // Rects captured on click, i.e. before React commits the new layout - the "first"
  // half of a FLIP. Without them the card would jump to the left column.
  const firstFrame = useRef(null)
  const openActivity = activities.find((item) => item.id === openId)

  const toggle = (id) => {
    const map = new Map()
    gridRef.current?.querySelectorAll('.activity-item').forEach((el) => {
      map.set(el.dataset.id, { rect: el.getBoundingClientRect(), hidden: el.dataset.hidden !== undefined })
    })
    firstFrame.current = map
    setOpenId((current) => (current === id ? null : id))
  }

  useLayoutEffect(() => {
    const first = firstFrame.current
    firstFrame.current = null
    const grid = gridRef.current
    if (!first || !grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const opening = openId !== null
    grid.querySelectorAll('.activity-item').forEach((el) => {
      const before = first.get(el.dataset.id)
      if (!before) return
      const nowHidden = el.dataset.hidden !== undefined
      // Drop whatever is still running - a half-finished slide, or the slow reveal
      // transition, which would otherwise take back control of opacity mid-sequence.
      el.getAnimations().forEach((animation) => animation.cancel())

      // Coming back into the grid: it was stacked in the left column, so a fade
      // and lift reads better than a FLIP from a position it never really held.
      if (before.hidden && !nowHidden) {
        el.animate(
          [{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }],
          { duration: 420, delay: 240, easing: EASE, fill: 'both' },
        )
        return
      }

      const after = el.getBoundingClientRect()
      const dx = before.rect.left - after.left
      const dy = before.rect.top - after.top
      const scale = after.width ? before.rect.width / after.width : 1
      const from = `translate(${dx}px, ${dy}px) scale(${scale})`

      if (nowHidden) {
        // Hold the card where it stood and fade it out - the layout has already
        // pulled it out of flow, so this is the only thing keeping it in place.
        el.animate([{ transform: from, opacity: 1 }, { transform: from, opacity: 0 }],
          { duration: 260, easing: 'ease', fill: 'both' })
      } else if (dx || dy || Math.abs(scale - 1) > 0.001) {
        // The slide. Delayed on open so the others have cleared out first.
        el.animate([{ transform: from }, { transform: 'none' }],
          { duration: 620, delay: opening ? 200 : 0, easing: EASE, fill: 'backwards' })
      }
    })
  }, [openId])

  return (
    <div
      className="activity-grid"
      ref={gridRef}
      data-detail={openId ? '' : undefined}
      onKeyDown={(event) => { if (event.key === 'Escape' && openId) setOpenId(null) }}
    >
      {activities.map((activity, index) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          index={index}
          open={activity.id === openId}
          hidden={openId !== null && activity.id !== openId}
          onToggle={toggle}
        />
      ))}

      {openActivity && (
        <aside className="activity-detail" id="activity-detail" key={openActivity.id}>
          <p className="activity-detail-eyebrow">{t(`${openActivity.id}.tagline`)}</p>
          <h3>{t(`${openActivity.id}.title`)}</h3>
          <p className="activity-text">{t(`${openActivity.id}.description`)}</p>
          <div className="activity-detail-actions">
            <a className="primary-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t('hero.cta_secondary')}</a>
            <button type="button" className="activity-back" onClick={() => toggle(openActivity.id)}>
              <i aria-hidden="true">&gt;</i> {t('exp.back')}
            </button>
          </div>
        </aside>
      )}
    </div>
  )
}

function App() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute('data-visible', '')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header" id="home">
        <Logo />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} onClick={closeMenu}>{t(item.key)}</a>
          ))}
        </nav>
        <LanguageMenu />
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1 id="hero-title">{t('hero.title')}</h1>
            <div className="ornament" aria-hidden="true"><i /></div>
            <p className="hero-text">{t('hero.subtitle')}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#experiences">{t('hero.cta_primary')}</a>
              <a className="secondary-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                {t('hero.cta_secondary')} <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="hero-visual" data-reveal>
            <svg className="hero-clip-defs" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
                  <path d="M .52 0 C .39 .07 .28 .19 .24 .36 C .20 .55 .18 .78 .14 1 L 1 1 L 1 0 Z" />
                </clipPath>
              </defs>
            </svg>
            <div className="hero-frame">
              <img src="public/assets/ca.png" alt="Placeholder for a camel caravan on Kelibia beach" />
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span>Scroll to discover</span><i /></div>
        </section>

        <section className="experiences" id="experiences" aria-labelledby="activities-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">{t('exp.eyebrow')}</p>
            <h2 id="activities-title">{t('exp.title')}</h2>
            <div className="ornament centered" aria-hidden="true"><i /></div>
            <p>{t('exp.subtitle')}</p>
          </div>
          <ActivityGrid />
        </section>

        <section className="destination-strip" id="destinations" aria-labelledby="banner-title" data-reveal>
          <div className="destination-copy">
            <p className="eyebrow">{t('banner.eyebrow')}</p>
            <h2 id="banner-title">{t('banner.title')}</h2>
            <p className="destination-text">{t('banner.text')}</p>
          </div>
          <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">{t('banner.cta')} <Arrow /></a>
        </section>

        <ExperienceGallery />
      </main>

      <footer className="footer" id="contact">
        {/* A single crest in the gallery's own colour, so the two sections read as one surface. */}
        <svg className="footer-waves" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
          <path className="swell-1" d="M0 0 H1440 V58 C1310 106 1190 96 1040 72 C850 42 690 88 492 92 C330 95 160 66 0 76 Z" />
        </svg>
        <div className="footer-grid">
          <section className="footer-brand" data-reveal>
            <h2>M’Caravane.</h2>
            <p>{t('footer.tagline')}</p>
            <span>{t('footer.motto')}</span>
          </section>

          <section className="footer-links" data-reveal>
            <h3>{t('footer.links')}</h3>
            <ul>
              {navItems.map((item) => <li key={item.key}><a href={item.href}>{t(item.key)}</a></li>)}
            </ul>
          </section>

          <section className="footer-panel" data-reveal>
            <h3>{t('footer.contact')}</h3>
            <ul>
              <li><Phone /><a href="tel:+21625434499">+216 25 434 499</a></li>
              <li><Pin /><address>
                <a href={MAPS_URL} target="_blank" rel="noreferrer">{t('footer.address')}</a>
              </address></li>
            </ul>
          </section>

          <section className="footer-social" data-reveal>
            <figure className="footer-map">
              <iframe
                title="Map of Kelibia, Nabeul Governorate, Tunisia"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.0637%2C36.8278%2C11.1237%2C36.8678&amp;layer=mapnik&amp;marker=36.8478%2C11.0937"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <figcaption>
                <Pin />
                <a href={MAPS_URL} target="_blank" rel="noreferrer">
                  {t('footer.directions')} <Arrow diagonal />
                </a>
              </figcaption>
            </figure>
          </section>
        </div>

        <div className="footer-bottom">
          <a className="footer-visit" href="#home">{t('footer.top')} <Arrow /></a>
          <p>{t('footer.rights')} <a href="#privacy">{t('footer.privacy')}</a> <span>|</span> <a href="#terms">{t('footer.terms')}</a></p>
        </div>
      </footer>
    </div>
  )
}

export default function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  )
}
