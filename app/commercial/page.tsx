'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'

const TOTAL_FRAMES = 12

const sections = [
  {
    id: 'about',
    label: 'About',
    title: null,
    intro: 'Commercial law underpins every transaction, partnership, and dispute that businesses encounter. Specialist counsel who understands both the legal framework and the commercial context delivers advice that is actionable, not merely accurate.',
    isAbout: true,
  },
  {
    id: 'corporate',
    label: 'Corporate & M&A',
    title: 'CORPORATE & M&A',
    intro: 'Mergers, acquisitions, and corporate restructuring require counsel who can move at the pace of a transaction while managing legal complexity across multiple workstreams simultaneously.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising on mergers, acquisitions, and disposals from heads of terms through to completion, including post-acquisition integration' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%202.png', text: 'Structuring management buyouts, private equity transactions, and leveraged acquisitions with appropriate warranty and indemnity protection' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%203.png', text: 'Advising on corporate governance, shareholder agreements, and the legal framework governing director duties and board decision-making' },
    ],
  },
  {
    id: 'contracts',
    label: 'Commercial Contracts',
    title: 'COMMERCIAL CONTRACTS',
    intro: 'A commercial contract is only as good as the counsel who drafted it. Specialist advice at the contract stage protects clients against risks that are rarely visible until they materialise.',
    bullets: [
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Drafting and negotiating complex commercial agreements, supply chain contracts, and long-term service arrangements' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%202.png', text: 'Advising on exclusion clauses, liability caps, and the allocation of commercial risk between contracting parties' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%203.png', text: 'Reviewing and advising on standard terms and conditions, framework agreements, and master service agreements across regulated and unregulated sectors' },
    ],
  },
  {
    id: 'disputes',
    label: 'Commercial Disputes',
    title: 'COMMERCIAL DISPUTES',
    intro: 'When commercial relationships break down, the quality of legal representation determines the outcome. Specialist counsel with litigation experience approaches disputes strategically, not defensively.',
    bullets: [
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Representing clients in High Court commercial litigation, including breach of contract, misrepresentation, and unjust enrichment claims' },
      { img: '/images/Regulatory%20%26%20Compliance%202.png', text: 'Advising on pre-litigation strategy, evidence preservation, and the commercial merits of proceeding versus settling' },
      { img: '/images/Regulatory%20%26%20Compliance%203.png', text: 'Managing multi-party disputes and coordinating expert evidence across complex commercial matters involving technical or financial issues' },
    ],
  },
  {
    id: 'finance',
    label: 'Banking & Finance',
    title: 'BANKING & FINANCE',
    intro: 'Financing transactions carry legal complexity that extends well beyond the term sheet. Specialist counsel ensures borrowers and lenders enter arrangements with a clear understanding of their obligations and protections.',
    bullets: [
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png', text: 'Advising borrowers and lenders on loan agreements, facility arrangements, and the security structures that underpin debt financing' },
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%202.png', text: 'Structuring mezzanine finance, unitranche arrangements, and the intercreditor agreements that govern complex capital structures' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on covenant compliance, event of default provisions, and the legal implications of financial distress in leveraged transactions' },
    ],
  },
  {
    id: 'property',
    label: 'Real Estate & Development',
    title: 'REAL ESTATE & DEVELOPMENT',
    intro: 'Commercial real estate transactions involve significant capital, long timescales, and substantial legal risk. Specialist counsel navigates planning, title, and development issues that generalist advisers routinely underestimate.',
    bullets: [
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%201.png', text: 'Advising on commercial property acquisition, disposal, and lease negotiation for investors, occupiers, and developers' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%202.png', text: 'Structuring development agreements, construction contracts, and the financing arrangements that support large-scale property projects' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%203.png', text: 'Advising on landlord and tenant disputes, dilapidations claims, and the enforcement of commercial lease obligations' },
    ],
  },
  {
    id: 'employment',
    label: 'Employment',
    title: 'EMPLOYMENT',
    intro: 'Employment law sits at the intersection of commercial risk and human consequence. Specialist counsel ensures businesses manage their people obligations effectively while protecting their commercial interests.',
    bullets: [
      { img: '/images/Cross-Border%20Structuring%201.png', text: 'Advising on senior executive appointments, service agreements, and the negotiation and enforcement of restrictive covenants' },
      { img: '/images/Cross-Border%20Structuring%202.png', text: 'Managing Employment Tribunal claims, ACAS conciliation, and the strategic options available to businesses facing employee litigation' },
      { img: '/images/Cross-Border%20Structuring%203.png', text: 'Advising on TUPE obligations, collective redundancy consultation requirements, and the employment law implications of business restructuring' },
    ],
  },
  {
    id: 'restructuring',
    label: 'Restructuring & Insolvency',
    title: 'RESTRUCTURING & INSOLVENCY',
    intro: 'Financial distress requires fast, expert legal advice. Whether advising companies, creditors, or officeholders, specialist counsel provides the clarity needed to make consequential decisions under pressure.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising directors on their duties in financial distress, including the risk of wrongful trading and the obligations that arise on insolvency' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Representing creditors, shareholders, and officeholders in administration, liquidation, and company voluntary arrangement proceedings' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on debt restructuring, standstill agreements, and the negotiation of consensual out-of-court solutions where formal insolvency is avoidable' },
    ],
  },
]
const panelContent: Record<string, { stat: string; label: string; quote: string }> = {
  corporate: {
    stat: '£1.1tn',
    label: 'UK M&A deal value 2023',
    quote: 'A transaction without the right legal architecture is not a deal. It is a liability that has not yet been triggered.',
  },
  contracts: {
    stat: '60%',
    label: 'Of commercial disputes arise from poorly drafted contracts',
    quote: 'The time to negotiate a contract is before you need it. By then, the leverage has gone.',
  },
  disputes: {
    stat: '£84bn',
    label: 'Estimated annual cost of commercial disputes in the UK',
    quote: 'Litigation is a last resort. But when it is necessary, the quality of your counsel is the single most important variable.',
  },
  finance: {
    stat: '£500bn+',
    label: 'UK commercial lending market',
    quote: 'A financing agreement that protects you on day one may not protect you when circumstances change. Specialist counsel reads the whole document.',
  },
  property: {
    stat: '£1.7tn',
    label: 'Value of UK commercial real estate market',
    quote: 'Commercial property is rarely straightforward. The complexity is usually in the detail that generalist advisers miss.',
  },
  employment: {
    stat: '33%',
    label: 'Rise in Employment Tribunal claims since 2020',
    quote: 'Employment disputes are rarely just legal problems. They are commercial and reputational risks that require strategic management.',
  },
  restructuring: {
    stat: '£50bn+',
    label: 'UK corporate debt restructured 2020-2024',
    quote: 'In financial distress, the difference between a good outcome and a catastrophic one is often the quality of advice received in the first 48 hours.',
  },
}
export default function CommercialPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)

  const [framesLoaded, setFramesLoaded] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('about')
  const heroSectionRef = useRef<HTMLDivElement>(null)

  // Preload all frames
  useEffect(() => {
    let loaded = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const num = String(i).padStart(4, '0')
      img.src = `/commercial-frames/frame_${num}.jpg`
      img.onload = () => {
        loaded++
        if (loaded === TOTAL_FRAMES) {
          setFramesLoaded(true)
          drawFrame(0, imgs)
        }
      }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  function drawFrame(index: number, imgs?: HTMLImageElement[]) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const frameList = imgs || framesRef.current
    const frame = frameList[index]
    if (!frame) return
    // Draw frame maintaining aspect ratio (cover - crop to fill, no distortion)
    const fw = frame.naturalWidth || frame.width
    const fh = frame.naturalHeight || frame.height
    const cw = canvas.width
    const ch = canvas.height
    const frameRatio = fw / fh
    const canvasRatio = cw / ch
    let sx = 0, sy = 0, sw = fw, sh = fh
    if (frameRatio > canvasRatio) {
      // Frame wider than canvas - crop sides
      sw = fh * canvasRatio
      sx = (fw - sw) / 2
    } else {
      // Frame taller than canvas - crop top/bottom
      sh = fw / canvasRatio
      sy = (fh - sh) / 2
    }
    ctx.drawImage(frame, sx, sy, sw, sh, 0, 0, cw, ch)
  }

  // Scroll scrub
  useEffect(() => {
    if (!framesLoaded) return

    const handleScroll = () => {
      const heroEl = heroSectionRef.current
      if (!heroEl) return
      const heroHeight = heroEl.offsetHeight
      const scrollY = window.scrollY
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1)
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )
      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex
        drawFrame(frameIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [framesLoaded])

  // Scroll-based panel update
  useEffect(() => {
    const nonAbout = sections.filter(s => !s.isAbout)
    const handleScroll = () => {
      for (let i = nonAbout.length - 1; i >= 0; i--) {
        const el = document.getElementById(nonAbout[i].id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.6) {
          setActiveSection(nonAbout[i].id)
          return
        }
      }
      setActiveSection(nonAbout[0]?.id ?? 'defence')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Card scroll handler - direct DOM manipulation, no React state
  useEffect(() => {
    const baseRects: Record<string, { left: number; width: number }> = {}

    const onScroll = () => {
      const nonAbout = sections.filter(s => !s.isAbout)

      if (window.innerWidth < 1024) {
        nonAbout.forEach(section => {
          const outerCard = document.querySelector(`[data-card="${section.id}"]`) as HTMLElement
          if (outerCard) {
            outerCard.style.position = ''
            outerCard.style.top = ''
            outerCard.style.left = ''
            outerCard.style.width = ''
            outerCard.style.padding = ''
            outerCard.style.zIndex = ''
          }
        })
        return
      }

      const navH = 56
      const enquireEl = document.querySelector('.enquire-split')
      const enquireTop = enquireEl ? enquireEl.getBoundingClientRect().top : Infinity

      for (let i = 0; i < nonAbout.length; i++) {
        const section = nonAbout[i]
        const row = document.getElementById('row-' + section.id)
        const outerCard = document.querySelector(`[data-card="${section.id}"]`) as HTMLElement
        const cardInner = document.getElementById('card-' + section.id)
        if (!row || !outerCard || !cardInner) continue

        const rowTop = row.getBoundingClientRect().top

        // Capture base rect ONCE while card is in flow
        if (!baseRects[section.id] && outerCard.style.position !== 'fixed') {
          const r = outerCard.getBoundingClientRect()
          if (r.width > 0) baseRects[section.id] = { left: r.left, width: r.width }
        }

        const base = baseRects[section.id]
        if (!base) continue

        const borderH = i === 0 ? 0 : 10
        const cardH = cardInner.offsetHeight + borderH

        const nextSection = nonAbout[i + 1]
        let nextBoundaryTop = enquireTop
        if (nextSection) {
          const nextRow = document.getElementById('row-' + nextSection.id)
          if (nextRow) nextBoundaryTop = nextRow.getBoundingClientRect().top
        }

        if (rowTop > navH) {
          // In flow
          if (outerCard.style.position === 'fixed') {
            outerCard.style.position = ''
            outerCard.style.top = ''
            outerCard.style.left = ''
            outerCard.style.width = ''
            outerCard.style.padding = ''
            outerCard.style.zIndex = ''
          }
        } else {
          // Fixed - always 10px below nav, clamped by next card
          const idealTop = navH + 10
          const maxTop = nextBoundaryTop - cardH - 10
          const top = Math.min(idealTop, maxTop)

          outerCard.style.position = 'fixed'
          outerCard.style.top = top + 'px'
          outerCard.style.left = base.left + 'px'
          outerCard.style.width = base.width + 'px'
          outerCard.style.padding = '0'
          outerCard.style.zIndex = String(i + 1)
          outerCard.style.display = 'flex'
          outerCard.style.flexDirection = 'column'
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      Object.keys(baseRects).forEach(k => delete baseRects[k])
      onScroll()
    }, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    setNavOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>

      <Nav />

      {/* Hero scroll-scrub section */}
      <div ref={heroSectionRef} style={{ height: '75vw', position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '75vw',
          overflow: 'hidden',
        }}>
        {/* Layer 1: Solid blue base */}
        <div style={{ position: 'absolute', inset: 0, background: '#2A6AAA' }} />

        {/* Layer 2: Video canvas at 58% opacity */}
        {!framesLoaded && (
          <img
            src="/commercial-hero-static.jpg"
            alt="Aerospace"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.58,
            }}
          />
        )}
        <canvas
          ref={canvasRef}
          width={834}
          height={1112}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.58,
            display: framesLoaded ? 'block' : 'none',
          }}
        />

        {/* Layer 3: Blue gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #0B4EBA, #06275D)',
          opacity: 0.45,
        }} />

        {/* Layer 4: Text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 24px 28px',
        }}>
          {/* Breadcrumb - tight below nav */}
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '11px', fontWeight: 400,
            letterSpacing: '0.06em',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            Home &rsaquo; Services &rsaquo; Commercial Law
          </p>

          {/* Title - centred horizontally, mid hero */}
          <h1 style={{
            color: 'white', fontSize: '42px', fontWeight: 700,
            lineHeight: '1.1',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
          }}>
            Commercial Law
          </h1>

          {/* Body - right aligned, 80% width, larger font */}
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '20px', fontWeight: 400,
            lineHeight: '1.3',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'right',
            width: '42%',
            alignSelf: 'flex-end',
          }}>
            Operating from <strong>Mayfair</strong> and instructed by businesses at every stage of their growth, we provide commercial legal counsel that is direct, strategic, and focused on outcomes rather than process.
          </p>
        </div>
        </div>
      </div>

      {/* In this section bar */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-2px' }}>
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{
            width: '100%',
            background: '#FF7B7B',
            border: 'none',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <span style={{
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            letterSpacing: '0.04em',
          }}>
            In this section
          </span>
          <span style={{
            color: 'white',
            fontSize: '10px',
            transform: navOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}>▼</span>
        </button>

        {/* Section nav dropdown - pill style */}
        <div style={{
            background: 'var(--coral)',
            maxHeight: navOpen ? '200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: navOpen ? '12px 20px 16px' : '0 20px' }}>
            {sections.filter(s => !s.isAbout).map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                style={{
                  display: 'inline-block',
                  background: 'var(--navy)',
                  border: '1.5px solid var(--navy)',
                  borderRadius: '100px',
                  padding: '8px 20px',
                  color: 'white',
                  fontSize: '10px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>{/* end in this section bar */}

      {/* About section - full width, outside two-column layout */}
      <div className="gandb-about-full">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--navy)' }} />
          {sections.filter(s => s.isAbout).map((section) => (
            <div key={section.id} id={section.id} style={{ position: 'relative', paddingTop: '40px' }}>
              {/* Horizontal connector - 2px weight */}
              <div style={{ position: 'absolute', left: '20px', top: '50px', width: '14px', height: '2px', background: 'var(--navy)', zIndex: 2 }} />
              {/* Circle offset right */}
              <div style={{ position: 'absolute', left: '34px', top: '43px', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--coral)', background: 'white', zIndex: 2 }} />
              <div className="gandb-about-inner" style={{ paddingLeft: '52px', paddingRight: '20px', paddingBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>ABOUT</p>
                <p style={{ fontSize: '26px', fontWeight: 400, lineHeight: '1.3', color: 'var(--text-dark)', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif', maxWidth: '90%' }}>
                  {section.intro}
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0px', paddingBottom: '0px' }}>
                  <button style={{ border: '2px solid #FF7B7B', background: '#ffffff', padding: '12px 32px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#1a2340', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>ENQUIRE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout for service sections */}
      <div className="gandb-outer">

        {/* Vertical timeline line - spans full outer */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--navy)',
          zIndex: 1,
        }} />

        {sections.filter(s => !s.isAbout).map((section, idx) => (
          <div key={section.id} id={'row-' + section.id} className="gandb-section-row">

            {/* Left: section content */}
            <div className="gandb-left" style={{ position: 'relative' }}>
          <div
            id={section.id}
            style={{ position: 'relative', paddingTop: idx === 0 ? '40px' : '48px', scrollSnapAlign: 'start', scrollMarginTop: '100px' }}
            data-section={section.id}
          >
            {/* Timeline node */}
            {/* Horizontal connector from vertical line to circle */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: idx === 0 ? '50px' : '58px',
              width: '14px',
              height: '2px',
              background: 'var(--navy)',
              zIndex: 2,
            }} />
            {/* Circle - sits to the right of the connector */}
            <div style={{
              position: 'absolute',
              left: '34px',
              top: idx === 0 ? '43px' : '51px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: '2px solid var(--coral)',
              background: 'white',
              zIndex: 2,
            }} />

            <div style={{ paddingLeft: '52px', paddingRight: '20px' }}>

              {/* Section label */}
              {!section.isAbout && (
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'var(--navy)',
                  marginBottom: '16px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  opacity: 1,
                  paddingTop: idx === 0 ? '2px' : '10px',
                }}>
                  {section.title}
                </p>
              )}

              {/* About label */}
              {section.isAbout && (
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'var(--navy)',
                  marginBottom: '16px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  ABOUT
                </p>
              )}

              {/* Intro paragraph */}
              <p style={{
                fontSize: section.isAbout ? '22px' : '17px',
                fontWeight: 400,
                lineHeight: '1.3',
                color: 'var(--text-dark)',
                marginBottom: section.isAbout ? '28px' : '24px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {section.intro}
              </p>

              {/* Enquire button on about section */}
              {section.isAbout && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                  <button style={{
                    border: '2px solid #FF7B7B',
                    background: 'white',
                    padding: '12px 32px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#1a2340',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    cursor: 'pointer',
                  }}>
                    ENQUIRE
                  </button>
                </div>
              )}

              {/* Bullet rows */}
              {'bullets' in section && section.bullets && (
                <div style={{ marginTop: '4px' }}>
                  {section.bullets.map((bullet, bi) => (
                    <div key={bi}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      paddingBottom: '12px',
                      paddingTop: '0',
                      position: 'relative',
                    }}>
                      {/* Timeline tick mark */}
                      <div style={{
                        position: 'absolute',
                        left: '-32px',
                        top: '50px',
                        width: '10px',
                        height: '1px',
                        background: 'var(--navy)',
                      }} />
                      {/* Thumbnail */}
                      <div style={{
                        width: '160px',
                        minWidth: '160px',
                        height: '120px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        background: 'var(--navy)',
                        opacity: 0.85,
                      }}>
                        <img
                          src={bullet.img}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                      {/* Text column with pink line at top */}
                      <div style={{ flex: 1, paddingTop: '0', maxWidth: '70%' }}>
                        <div style={{ height: '1px', background: '#FF7B7B', marginBottom: '10px' }} />
                      <p style={{
                        fontSize: '14px',
                        lineHeight: '1.3',
                        color: 'var(--text-body)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: 400,
                        paddingTop: '4px',
                      }}>
                        {bullet.text}
                      </p>
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>
            </div>{/* end gandb-left */}

            {/* Right: card alongside this section */}
            {panelContent[section.id] && (
              <div
                className="gandb-card"
                data-card={section.id}
              >
                <div
                  id={'card-' + section.id}
                  className="gandb-card-inner"
                  style={{
                    borderTop: idx === 0 ? 'none' : '10px solid white',
                    background: 'var(--navy)',
                    marginLeft: '32px',
                  }}
                >
                  <p style={{ color: 'var(--coral)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {panelContent[section.id].label}
                  </p>
                  <p style={{ color: 'white', fontSize: '64px', fontWeight: 700, lineHeight: '1', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                    {panelContent[section.id].stat}
                  </p>
                  <div style={{ width: '40px', height: '2px', background: 'var(--coral)', marginBottom: '24px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5', fontFamily: 'Plus Jakarta Sans, sans-serif', fontStyle: 'italic' }}>
                    &ldquo;{panelContent[section.id].quote}&rdquo;
                  </p>
                </div>
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Enquire Section - ANT-style split layout */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line continuation */}
        <div style={{ position: 'absolute', left: '20px', top: 0, height: '110px', width: '2px', background: 'var(--navy)', zIndex: 1 }} />
        {/* Horizontal connector */}
        <div style={{ position: 'absolute', left: '20px', top: '59px', width: '14px', height: '2px', background: 'var(--navy)', zIndex: 2 }} />
        {/* Circle */}
        <div style={{ position: 'absolute', left: '34px', top: '52px', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #FF7B7B', background: 'white', zIndex: 2 }} />

        <div style={{ paddingLeft: '52px', paddingRight: '20px', paddingTop: '48px', paddingBottom: '20px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--coral)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            ENQUIRE
          </p>
        </div>

        {/* Split: form left, image right */}
        <div className="enquire-split">
          {/* Form column */}
          <div className="enquire-form" style={{ background: 'var(--coral)', padding: '32px 24px 40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Enquire here
            </h2>

            {['Name', 'Email', 'Mobile', 'Company', 'Domain', 'Postcode'].map((field) => (
              <input
                key={field}
                type={field === 'Email' ? 'email' : field === 'Mobile' ? 'tel' : 'text'}
                placeholder={field}
                style={{
                  display: 'block', width: '100%', padding: '14px 20px', marginBottom: '12px',
                  borderRadius: '100px', border: '1.5px solid white', background: 'transparent',
                  color: 'white', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 400, outline: 'none', WebkitTextFillColor: 'white',
                }}
              />
            ))}

            <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, marginBottom: '16px', marginTop: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Ideal method of initial contact
            </p>

            {['Phone call', 'Mobile call', 'SMS/whatsapp', 'Email'].map((option) => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', cursor: 'pointer' }}>
                <span style={{ width: '28px', height: '28px', minWidth: '28px', borderRadius: '6px', border: '2px solid rgba(255,255,255,0.6)', background: 'transparent', display: 'inline-block' }} />
                <span style={{ color: 'white', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{option}</span>
              </label>
            ))}

            {/* GDPR consent */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '16px', marginBottom: '8px', cursor: 'pointer' }}>
              <input type="checkbox" required style={{ marginTop: '3px', minWidth: '18px', height: '18px', accentColor: 'white', cursor: 'pointer' }} />
              <span style={{ color: 'white', fontSize: '12px', lineHeight: '1.5', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                I agree to Herbert &amp; Ball LLP contacting me in response to this enquiry. My data will be handled in accordance with the{' '}
                <a href="/legal/privacy-policy" style={{ color: 'white', textDecoration: 'underline' }}>privacy policy</a>.
              </span>
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button style={{ background: 'white', border: 'none', borderRadius: '100px', padding: '14px 36px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--coral)', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
                ENQUIRE
              </button>
            </div>
          </div>

          {/* Image column */}
          <div className="enquire-image">
            <img
              src="/commercial-hero-static.jpg"
              alt="Herbert & Ball"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'white',
        padding: '40px 0 56px 24px',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}>
        <div style={{ flex: 1, paddingRight: '48px' }}>
          {/* H&B wordmark */}
          <img src="/footer-logo.svg" alt="Herbert & Ball" style={{ height: '60px', width: 'auto', marginBottom: '16px' }} />

          {/* Specialisms */}
          <p style={{
            color: 'var(--navy)',
            fontSize: '13px',
            lineHeight: '1.3',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            marginBottom: '24px',
            opacity: 0.7,
          }}>
            Aviation, Commercial, Corporate, Data Protection, Employment, Franchising, Information Technology, and Intellectual Property
          </p>

          {/* Address */}
          <p style={{
            color: 'var(--navy)',
            fontSize: '13px',
            lineHeight: '1.3',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            marginBottom: '20px',
          }}>
            International House,<br />
            142 Cromwell Rd,<br />
            London<br />
            SW7 4EF
          </p>

          {/* Phone */}
          <p style={{
            color: 'var(--navy)',
            fontSize: '13px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            marginBottom: '20px',
          }}>
            Call: 020 3897 0445
          </p>

        </div>

        {/* Vertical legal links on right edge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          background: 'white',
          padding: '24px 8px',
          width: '36px',
          minWidth: '36px',
        }}>
          {[
            { label: 'Cookies', href: '/legal/cookies' },
            { label: 'Privacy Policy', href: '/legal/privacy-policy' },
            { label: 'Certification.', href: '/legal/certification' },
            { label: 'Data Request', href: '/legal/data-request' },
          ].map(({ label: link, href }, i) => (
            <a
              key={link}
              href={href}
              style={{
                color: 'var(--navy)',
                fontSize: '10px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                textDecoration: 'none',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                letterSpacing: '0.06em',
                padding: '8px 0',
                borderTop: i > 0 ? '1px solid rgba(26,35,64,0.1)' : 'none',
                display: 'block',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {link}
            </a>
          ))}
        </div>
        {/* Copyright - pinned to bottom */}
        <p style={{
          position: 'absolute',
          bottom: '16px',
          left: '24px',
          color: 'var(--navy)',
          fontSize: '12px',
          opacity: 0.4,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          margin: 0,
        }}>
          &copy; 2026 Herbert &amp; Ball LLP
        </p>
      </footer>
    </div>
  )
}
