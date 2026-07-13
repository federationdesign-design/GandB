'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '../components/Nav'

const LERP = 0.12
const CARD_WIDTH_VW = 38

const services = [
  { slug: 'aerospace', title: 'Aerospace, Aviation & Defence', tagline: 'Specialist counsel for one of the most heavily regulated and commercially complex sectors on earth.', frameDir: '/frames', frameCount: 30, href: '/', color: '#1a2340' },
  { slug: 'technology', title: 'Technology & Innovation', tagline: 'From IP protection to FinTech regulation, specialist counsel for businesses operating at the speed of the digital economy.', frameDir: '/tech-frames', frameCount: 23, href: '/technology', color: '#1a2340' },
  { slug: 'media', title: 'Media, Entertainment & Creative Industries', tagline: 'Rights, production, talent and disputes — specialist counsel where creative ambition meets commercial reality.', frameDir: '/media-frames', frameCount: 21, href: '/media', color: '#1a2340' },
  { slug: 'regulated', title: 'Regulated Industries', tagline: 'Financial services, energy, healthcare and beyond — specialist counsel for businesses operating under the most demanding frameworks.', frameDir: '/regulated-frames', frameCount: 31, href: '/regulated-industries', color: '#1a2340' },
  { slug: 'commercial', title: 'Commercial Law', tagline: 'M&A, contracts, disputes, finance and employment — direct, strategic counsel focused on outcomes.', frameDir: '/commercial-frames', frameCount: 12, href: '/commercial', color: '#1a2340' },
]

const testimonials = [
  { name: 'James T.', role: 'CEO, Aerospace Manufacturer', quote: 'The level of sector knowledge is genuinely impressive. They understand our business as well as our legal position.' },
  { name: 'Sarah K.', role: 'General Counsel, FinTech', quote: 'Fast, precise and commercially minded. Exactly what you need when regulatory timelines are tight.' },
  { name: 'Marcus L.', role: 'Managing Director, Media Group', quote: 'They navigated a complex rights dispute across three jurisdictions and delivered an outcome we did not think was achievable.' },
]

const logos = [
  { name: 'Clayton Hotel', src: 'https://www.lucyhallmassage.com/Clayton-img.png' },
  { name: 'University of Cambridge', src: 'https://www.lucyhallmassage.com/university-cambridge.png' },
  { name: 'Amazon', src: 'https://www.lucyhallmassage.com/amazon.png' },
  { name: 'Redgate', src: 'https://www.lucyhallmassage.com/redgate-logo.png' },
  { name: 'Speechmatics', src: 'https://www.lucyhallmassage.com/speechmatics.png' },
  { name: 'AstraZeneca', src: 'https://www.lucyhallmassage.com/astrazeneca-img.png' },
]

const BtnArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14, display: 'block' }}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ServiceCard({ s, i, activeIndex, cardVw, embedded, onClick, scrollProgress }: {
  s: typeof services[0]; i: number; activeIndex: number; cardVw: number; embedded: boolean; onClick: () => void; scrollProgress: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(false)
  const prevFrameRef = useRef(-1)
  const isActive = i === activeIndex

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    const imgs: HTMLImageElement[] = []
    for (let n = 1; n <= s.frameCount; n++) {
      const img = new Image()
      img.src = `${s.frameDir}/frame_${String(n).padStart(4, '0')}.jpg`
      img.onload = () => { framesRef.current = imgs }
      imgs.push(img)
    }
  }, [s])

  // Active card: play frames driven by scroll progress
  // Inactive cards: show first frame
  useEffect(() => {
    const canvas = canvasRef.current
    const frames = framesRef.current
    if (!canvas || !frames.length) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frameIdx: number
    if (isActive) {
      frameIdx = Math.max(0, Math.min(s.frameCount - 1, Math.round(scrollProgress * (s.frameCount - 1))))
    } else {
      frameIdx = 0
    }
    if (frameIdx === prevFrameRef.current) return
    prevFrameRef.current = frameIdx
    const frame = frames[frameIdx]
    if (!frame?.complete) return
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
  }, [isActive, scrollProgress, s])

  return (
    <div
      onClick={onClick}
      style={{ flexShrink: 0, width: `${cardVw}vw`, height: '100%', position: 'relative', overflow: 'hidden', borderRight: '5px solid var(--navy)', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, background: '#2A6AAA' }} />
      <canvas ref={canvasRef} width={1112} height={834}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.58 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B4EBA, #06275D)', opacity: 0.45, zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <h3 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 600, color: '#fff', marginBottom: 14, lineHeight: 1.15, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.title}</h3>
        <p style={{ fontSize: '1rem', fontWeight: 300, color: '#fff', lineHeight: 1.5, opacity: 0.92, marginBottom: 24, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.tagline}</p>
        <div style={{ height: 1, background: '#fff', opacity: 0.6, marginBottom: 18, width: '90%' }} />
        <a href={s.href} onClick={e => e.stopPropagation()} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#fff', textDecoration: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Learn more <BtnArrow />
        </a>
      </div>
    </div>
  )
}

function HeroPanel({ frameDir, frameCount, canvasW, canvasH }: {
  frameDir: string; frameCount: number; canvasW: number; canvasH: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const rafRef = useRef<number>(0)
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)

  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    for (let n = 1; n <= frameCount; n++) {
      const img = new Image()
      img.src = `${frameDir}/frame_${String(n).padStart(4, '0')}.jpg`
      img.onload = () => { framesRef.current = imgs }
      imgs.push(img)
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawFrame = (idx: number) => {
      const frame = framesRef.current[idx]
      if (frame?.complete) ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current
      if (Math.abs(diff) > 0.5) {
        currentFrameRef.current += diff * 0.08
        drawFrame(Math.round(currentFrameRef.current))
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const handleScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)))
      targetFrameRef.current = p * (frameCount - 1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [frameDir, frameCount])

  return (
    <canvas ref={canvasRef} width={canvasW} height={canvasH}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.58 }} />
  )
}

function ServicesRail({ cardVw = CARD_WIDTH_VW, embedded = false }: { cardVw?: number; embedded?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const currentXRef = useRef(0)
  const targetXRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, LERP)
      track.style.transform = `translateX(-${currentXRef.current}px)`
      const cardPx = (cardVw / 100) * window.innerWidth
      const current = Math.min(Math.round(currentXRef.current / cardPx), services.length - 1)
      if (current !== activeIndexRef.current) { activeIndexRef.current = current; setActiveIndex(current) }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    if (embedded) {
      const container = sectionRef.current
      if (!container) return

      // Snap to nearest card
      const snapToNearest = () => {
        const cardPx = (cardVw / 100) * window.innerWidth
        const nearest = Math.round(targetXRef.current / cardPx)
        targetXRef.current = Math.max(0, Math.min(services.length - 1, nearest)) * cardPx
      }

      let snapTimer: ReturnType<typeof setTimeout>

      // Track scroll within active card for frame playback
      let cardScrollAccum = 0
      const SCROLL_PER_CARD = 300 // px of wheel delta to play through all frames

      const handleWheel = (e: WheelEvent) => {
        const cardPx = (cardVw / 100) * window.innerWidth
        const maxX = (services.length - 1) * cardPx
        const atEnd = targetXRef.current >= maxX - 1
        const atStart = targetXRef.current <= 1

        if ((atEnd && e.deltaY > 0) || (atStart && e.deltaY < 0)) return

        e.preventDefault()

        // Accumulate scroll for frame playback on active card
        cardScrollAccum += e.deltaY
        const p = Math.max(0, Math.min(1, cardScrollAccum / SCROLL_PER_CARD))
        setScrollProgress(p)

        // Once fully scrolled through frames, advance to next card
        if (cardScrollAccum >= SCROLL_PER_CARD) {
          cardScrollAccum = 0
          targetXRef.current = Math.max(0, Math.min(maxX, targetXRef.current + cardPx))
          setScrollProgress(0)
        } else if (cardScrollAccum <= 0) {
          cardScrollAccum = 0
          targetXRef.current = Math.max(0, Math.min(maxX, targetXRef.current - cardPx))
          setScrollProgress(0)
        }

        clearTimeout(snapTimer)
        snapTimer = setTimeout(snapToNearest, 60)
      }

      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        container.removeEventListener('wheel', handleWheel)
        clearTimeout(snapTimer)
        cancelAnimationFrame(rafRef.current)
      }
    } else {
      // Scroll-driven when standalone
      const section = sectionRef.current
      if (!section) return
      const handleScroll = () => {
        const p = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / (section.offsetHeight - window.innerHeight)))
        targetXRef.current = p * (track.scrollWidth - window.innerWidth)
        setScrollProgress(p)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafRef.current) }
    }
  }, [embedded])

  const height = embedded ? '100%' : 'calc(100vh - 56px)'
  const top = embedded ? 0 : 56

  return (
    <div ref={sectionRef} style={ embedded ? { height: '100%', position: 'relative', overflow: 'hidden' } : { height: `${services.length * 110}vh`, position: 'relative' }}>
      <div style={{ position: embedded ? 'relative' : 'sticky', top, height, overflow: 'hidden' }}>
        <div ref={trackRef} style={{ display: 'flex', height: '100%', willChange: 'transform' }}>
          {services.map((s, i) => (
            <ServiceCard
              key={s.slug}
              s={s} i={i}
              activeIndex={activeIndex}
              cardVw={cardVw}
              embedded={embedded}
              scrollProgress={i === activeIndex ? scrollProgress : 0}
              onClick={() => {
                if (embedded) {
                  const cardPx = (cardVw / 100) * window.innerWidth
                  const next = Math.min(services.length - 1, activeIndexRef.current + 1)
                  targetXRef.current = next * cardPx
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileServicesCarousel() {
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const wheelLockRef = useRef(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(services.length - 1, i))), [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 5) return
      e.preventDefault()
      if (wheelLockRef.current) return
      wheelLockRef.current = true
      setTimeout(() => { wheelLockRef.current = false }, 500)
      goTo(index + (delta > 0 ? 1 : -1))
    }
    wrapper.addEventListener('wheel', handleWheel, { passive: false })
    return () => wrapper.removeEventListener('wheel', handleWheel)
  }, [index, goTo])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: 'calc(100dvh - 56px)', overflow: 'hidden', background: 'var(--navy)' }}>
      <div style={{ display: 'flex', height: '100%', width: `${services.length * 100}vw`, transform: `translateX(-${index * 100}vw)`, transition: 'transform 0.4s ease' }}
        onTouchStart={e => { startX.current = e.touches[0].clientX }}
        onTouchEnd={e => { const dx = startX.current - e.changedTouches[0].clientX; if (Math.abs(dx) > 40) goTo(index + (dx > 0 ? 1 : -1)) }}>
        {services.map((s, i) => (
          <div key={s.slug} style={{ flexShrink: 0, width: '100vw', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <img src={`${s.frameDir}/frame_0001.jpg`} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
            <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, padding: '0 32px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>{String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: 14, lineHeight: 1.15 }}>{s.title}</h3>
              <p style={{ fontSize: '0.88rem', color: '#fff', opacity: 0.85, lineHeight: 1.45, marginBottom: 22 }}>{s.tagline}</p>
              <a href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#fff', textDecoration: 'none', border: '1px solid #fff', padding: '11px 22px' }}>
                Learn more <BtnArrow />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function useIsMobile(): boolean | null {
  const [val, setVal] = useState<boolean | null>(null)
  useEffect(() => {
    const check = () => setVal(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return val
}

export default function HomePage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [choice, setChoice] = useState<'corporate' | null>(null)
    const mobileSectionRef = useRef<HTMLDivElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const mobilePrivateRef = useRef<HTMLDivElement>(null)
  const mobilePrivateTextRef = useRef<HTMLDivElement>(null)
  const mobileCorporateTextRef = useRef<HTMLDivElement>(null)
  const f = 'Plus Jakarta Sans, sans-serif'

  useEffect(() => {
    if (isMobile === false) return
    const section = mobileSectionRef.current
    const track = mobileTrackRef.current
    const privateFrame = mobilePrivateRef.current
    const privateText = mobilePrivateTextRef.current
    const corporateText = mobileCorporateTextRef.current
    if (!section || !track) return
    let raf = 0
    const handleScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const p = Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / (section.offsetHeight - window.innerHeight)) / 0.4)
        track.style.transform = `translateX(-${p * 100}vw)`
        if (privateFrame) privateFrame.style.opacity = String(1 - p)
        if (privateText) privateText.style.opacity = String(1 - p * 0.3)
        if (corporateText) corporateText.style.opacity = String(0.7 + p * 0.3)
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(raf) }
  }, [isMobile])

  const navigate = (side: 'corporate' | 'private') => {
    if (side === 'corporate') {
      setChoice('corporate')
      return
    }
    // Private - view transition to contact page
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => { router.push('/contact') })
    } else {
      router.push('/contact')
    }
  }

  return (
    <div style={{ background: '#1a2340', minHeight: '100vh', fontFamily: f }}>
      <Nav />

      {/* ── DESKTOP ─────────────────────────────────────────── */}
      {isMobile === false && (
        <div>

          {/* ── Hero container ── */}
          <div style={{ position: 'relative', height: '80dvh', marginTop: 56, overflow: 'hidden' }}>

            {/* Spine */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(255,255,255,0.6)', transform: 'translateX(-50%)', zIndex: 3, pointerEvents: 'none' }} />

            {/* Private panel - left */}
            <button onClick={() => navigate('private')}
              style={{ position: 'absolute', top: 0, left: 0, width: 'calc(50% - 25px)', height: '100%', border: 'none', padding: 0, cursor: 'pointer', overflow: 'hidden', background: '#1a2340' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#2A6AAA' }} />
              <HeroPanel frameDir="/regulated-frames" frameCount={31} canvasW={1920} canvasH={1080} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B4EBA, #06275D)', opacity: 0.45, zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '60px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', fontFamily: f }}>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 600, color: '#fff', margin: '0 0 14px', lineHeight: 1.15, fontFamily: f }}>Private Client &amp; Pro Bono</h2>
                <p style={{ fontSize: '1.1rem', fontWeight: 300, color: '#fff', opacity: 0.92, margin: '0 0 28px', lineHeight: 1.5, maxWidth: '36ch', textAlign: 'right', fontFamily: f }}>Individual representation and pro bono work for those who need specialist counsel most</p>
                <div style={{ height: 1, background: '#fff', opacity: 0.6, marginBottom: 18, width: '90%' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#fff', fontFamily: f }}>&lt;&lt;&nbsp;Private</div>
              </div>
            </button>

            {/* Gutter */}
            <div style={{ position: 'absolute', top: 0, left: 'calc(50% - 25px)', width: 50, height: '100%', background: '#1a2340' }} />

            {/* Corporate panel - right */}
            <button onClick={() => navigate('corporate')}
              style={{ position: 'absolute', top: 0, right: 0, width: 'calc(50% - 25px)', height: '100%', border: 'none', padding: 0, cursor: 'pointer', overflow: 'hidden', background: '#1a2340' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#2A6AAA' }} />
              <HeroPanel frameDir="/commercial-frames" frameCount={12} canvasW={1112} canvasH={834} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B4EBA, #06275D)', opacity: 0.45, zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '60px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', fontFamily: f }}>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 600, color: '#fff', margin: '0 0 14px', lineHeight: 1.15, fontFamily: f }}>Corporations &amp; Institutions</h2>
                <p style={{ fontSize: '1.1rem', fontWeight: 300, color: '#fff', opacity: 0.92, margin: '0 0 28px', lineHeight: 1.5, maxWidth: '36ch', fontFamily: f }}>Specialist legal counsel for businesses operating in complex, high-stakes environments</p>
                <div style={{ height: 1, background: '#fff', opacity: 0.6, marginBottom: 18, width: '90%' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#fff', fontFamily: f }}>Corporate&nbsp;&gt;&gt;</div>
              </div>
            </button>

            {/* Rail — same absolute bounds as corporate panel */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 'calc(50% - 25px)', height: '100%',
              transform: choice === 'corporate' ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.8s cubic-bezier(0.62, 0.92, 0, 1)',
              willChange: 'transform', zIndex: 10, overflow: 'hidden', background: '#1a2340',
            }}>
              <ServicesRail cardVw={48} embedded={true} />
            </div>

          </div>{/* end 78vh hero */}

          {/* Elaboration */}
          <div style={{ padding: '80px 60px 60px', background: '#1a2340' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 1fr', maxWidth: 1600, margin: '0 auto' }}>
              <div style={{ paddingRight: 50, textAlign: 'right' }}>
                <button onClick={() => navigate('corporate')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: f, fontSize: '1.5rem', marginBottom: 40, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end', width: '100%' }}>
                  &lt;&lt; Corporations &amp; Institutions
                </button>
                <p style={{ fontSize: '2.2rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 28, letterSpacing: '-0.01em', fontFamily: f }}>Specialist counsel for businesses where legal complexity is a constant.</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 300, color: '#fff', opacity: 0.85, lineHeight: 1.5, marginBottom: 32, fontFamily: f }}>From aerospace procurement to FinTech regulation, from media rights to commercial restructuring, we provide expert legal advice to institutions that cannot afford generalist counsel.</p>
                <button onClick={() => navigate('corporate')} style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '22px 32px', border: '1px solid rgba(255,255,255,0.4)', background: 'none', cursor: 'pointer', fontFamily: f }}>
                  View our services
                </button>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', width: 1, margin: '0 auto' }} />
              <div style={{ paddingLeft: 50 }}>
                <button onClick={() => navigate('private')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: f, fontSize: '1.5rem', marginBottom: 40, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 12 }}>
                  Private Client &amp; Pro Bono &gt;&gt;
                </button>
                <p style={{ fontSize: '2.2rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 28, letterSpacing: '-0.01em', fontFamily: f }}>Expert legal representation for individuals and those who need it most.</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 300, color: '#fff', opacity: 0.85, lineHeight: 1.5, marginBottom: 32, fontFamily: f }}>We take on a limited number of private client matters each year, and we reserve capacity for pro bono work for individuals facing complex legal challenges without the means to meet them.</p>
                <button onClick={() => navigate('private')} style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '22px 32px', border: '1px solid rgba(255,255,255,0.4)', background: 'none', cursor: 'pointer', fontFamily: f }}>
                  Get in touch
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

            {/* ── MOBILE ──────────────────────────────────────────── */}
      {isMobile === true && (
        <>
          {choice === null ? (
            <div ref={mobileSectionRef} style={{ position: 'relative', height: '250dvh', background: '#1a2340' }}>
              <div style={{ position: 'sticky', top: 0, height: '100dvh', overflow: 'hidden' }}>
                <div ref={mobileTrackRef} style={{ position: 'absolute', inset: 0, width: '200vw', display: 'flex', willChange: 'transform' }}>
                  <div ref={mobilePrivateRef} style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0 }}>
                    <img src="/commercial-frames/frame_0001.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  </div>
                  <div style={{ position: 'relative', width: '100vw', height: '100%', flexShrink: 0 }}>
                    <img src="/regulated-frames/frame_0001.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,78,186,0.2) 0%, rgba(6,39,93,0.45) 50%, rgba(6,39,93,0.82) 100%)', zIndex: 2, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3, padding: '0 24px 40px', color: '#fff' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 16, marginBottom: 24 }}>
                    <div ref={mobilePrivateTextRef} style={{ textAlign: 'right', paddingRight: 16, transition: 'opacity 0.1s linear' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.15 }}>Corporations &amp; Institutions</h2>
                      <p style={{ fontSize: '0.9rem', fontWeight: 300, margin: 0, lineHeight: 1.45, opacity: 0.92 }}>Specialist legal counsel</p>
                    </div>
                    <div style={{ background: '#fff', alignSelf: 'stretch' }} />
                    <div ref={mobileCorporateTextRef} style={{ paddingLeft: 16, opacity: 0.7, transition: 'opacity 0.1s linear' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.15 }}>Private Client &amp; Pro Bono</h2>
                      <p style={{ fontSize: '0.9rem', fontWeight: 300, margin: 0, lineHeight: 1.45, opacity: 0.92 }}>Individual representation</p>
                    </div>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.7)', marginBottom: 14 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => navigate('corporate')} style={{ background: 'none', border: 'none', color: '#fff', fontFamily: f, fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', padding: 0 }}>&lt;&lt; Corporate</button>
                    <button onClick={() => navigate('private')} style={{ background: 'none', border: 'none', color: '#fff', fontFamily: f, fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', padding: 0 }}>Private &gt;&gt;</button>
                  </div>
                </div>
                <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <button onClick={() => navigate('corporate')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} aria-label="Corporate" />
                  <button onClick={() => navigate('private')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} aria-label="Private" />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ paddingTop: 56 }}>
              <MobileServicesCarousel />
            </div>
          )}
        </>
      )}

      {isMobile === null && <div style={{ height: '100vh' }} />}

      {/* ── Logo strip ──────────────────────────────────────── */}
      <section style={{ padding: '48px 0', background: '#1a2340', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 32, fontFamily: f }}>Trusted by leading organisations</p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 120, width: 'max-content', animation: 'gandb-marquee 30s linear infinite', alignItems: 'center' }}>
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} style={{ flexShrink: 0, height: 50, display: 'flex', alignItems: 'center' }}>
                <img src={logo.src} alt={logo.name} style={{ maxHeight: 40, maxWidth: 140, objectFit: 'contain', opacity: 1, filter: 'brightness(0) invert(1)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#1a2340', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 48, fontFamily: f }}>What our clients say</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ border: '1px solid rgba(255,255,255,0.12)', padding: '40px 32px' }}>
              <div style={{ fontSize: '3rem', color: '#FF7B7B', lineHeight: 1, marginBottom: 16, fontWeight: 300, fontFamily: f }}>&ldquo;</div>
              <p style={{ fontSize: '1.15rem', fontWeight: 300, color: '#fff', lineHeight: 1.6, marginBottom: 24, opacity: 0.9, fontFamily: f }}>{t.quote}</p>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FF7B7B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontFamily: f }}>{t.name}</p>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontFamily: f }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - matching service pages */}
      <footer style={{ background: 'white', padding: '40px 0 56px 24px', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, paddingRight: '48px' }}>
          <img src="/footer-logo.svg" alt="Herbert & Ball" style={{ height: '60px', width: 'auto', marginBottom: '16px' }} />
          <p style={{ color: 'var(--navy)', fontSize: '13px', lineHeight: '1.3', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '24px', opacity: 0.7 }}>
            Aviation, Commercial, Corporate, Data Protection, Employment, Franchising, Information Technology, and Intellectual Property
          </p>
          <p style={{ color: 'var(--navy)', fontSize: '13px', lineHeight: '1.3', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '20px' }}>
            International House,<br />142 Cromwell Rd,<br />London<br />SW7 4EF
          </p>
          <p style={{ color: 'var(--navy)', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '20px' }}>Call: 020 3897 0445</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', background: 'white', padding: '24px 8px', width: '36px', minWidth: '36px' }}>
          {[{ label: 'Cookies', href: '/legal/cookies' }, { label: 'Privacy Policy', href: '/legal/privacy-policy' }, { label: 'Certification.', href: '/legal/certification' }, { label: 'Data Request', href: '/legal/data-request' }].map(({ label: link, href }, i) => (
            <a key={link} href={href} style={{ color: 'var(--navy)', fontSize: '10px', fontFamily: 'Plus Jakarta Sans, sans-serif', textDecoration: 'none', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.06em', padding: '8px 0', borderTop: i > 0 ? '1px solid rgba(26,35,64,0.1)' : 'none', display: 'block', width: '100%', textAlign: 'center' }}>
              {link}
            </a>
          ))}
        </div>
        <p style={{ position: 'absolute', bottom: '16px', left: '24px', color: 'var(--navy)', fontSize: '12px', opacity: 0.4, fontFamily: 'Plus Jakarta Sans, sans-serif', margin: 0 }}>
          &copy; 2026 Herbert &amp; Ball LLP
        </p>
      </footer>

      <style>{`
        @keyframes gandb-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (min-width: 1024px) { .gandb-testimonials { flex-direction: row; } }
      `}</style>
    </div>
  )
}
