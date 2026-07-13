'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'

const TOTAL_FRAMES = 31

const sections = [
  {
    id: 'about',
    label: 'About',
    title: null,
    intro: 'Regulated industries operate under frameworks that impose obligations, restrict conduct, and create liability exposure that general commercial counsel is not equipped to manage. Specialist advice transforms regulatory complexity from a cost of doing business into a source of competitive advantage.',
    isAbout: true,
  },
  {
    id: 'financial',
    label: 'Financial Services',
    title: 'FINANCIAL SERVICES REGULATION',
    intro: 'The FCA and PRA regulate with increasing intensity. Financial services businesses require counsel who understands the regulatory framework as thoroughly as the commercial environment in which their clients operate.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising on FCA authorisation, variation of permissions, and the regulatory requirements governing new market entrants and established firms' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%202.png', text: 'Representing clients in FCA and PRA investigations, enforcement proceedings, and supervisory reviews where regulatory relationships are at risk' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%203.png', text: 'Advising on Senior Managers and Certification Regime obligations, conduct rules, and the personal liability exposure of regulated individuals' },
    ],
  },
  {
    id: 'energy',
    label: 'Energy & Utilities',
    title: 'ENERGY & UTILITIES',
    intro: 'The energy transition has created a regulatory environment of extraordinary complexity. Businesses operating in generation, distribution, supply, and storage require counsel who can navigate Ofgem, planning, and environmental frameworks simultaneously.',
    bullets: [
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Advising on Ofgem licensing, network access agreements, and the regulatory framework governing electricity and gas supply and distribution' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%202.png', text: 'Structuring renewable energy project agreements, grid connection contracts, and the power purchase arrangements that underpin energy transition investment' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%203.png', text: 'Advising on environmental permits, water discharge consents, and the regulatory obligations arising from infrastructure operation near protected environments' },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Pharma',
    title: 'HEALTHCARE & PHARMACEUTICALS',
    intro: 'Healthcare and pharmaceutical businesses operate under regulatory frameworks that govern product approval, clinical conduct, and market access. The legal and commercial consequences of non-compliance are among the most severe in any sector.',
    bullets: [
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on MHRA regulatory submissions, product licensing, and the legal framework governing the development and commercialisation of medicines and medical devices' },
      { img: '/images/Regulatory%20%26%20Compliance%202.png', text: 'Structuring clinical trial agreements, research collaborations, and the IP arrangements that govern the ownership of innovation in regulated healthcare settings' },
      { img: '/images/Regulatory%20%26%20Compliance%203.png', text: 'Representing clients in regulatory investigations, product recall proceedings, and the management of liability arising from adverse events in clinical or commercial settings' },
    ],
  },
  {
    id: 'environment',
    label: 'Environmental & Planning',
    title: 'ENVIRONMENTAL & PLANNING',
    intro: 'Environmental regulation has become one of the most significant sources of legal risk for businesses operating physical infrastructure. Specialist counsel navigates the intersection of planning law, environmental permitting, and civil liability.',
    bullets: [
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png', text: 'Advising on environmental impact assessment, planning obligations, and the regulatory consents required for major infrastructure and development projects' },
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%202.png', text: 'Managing regulatory investigations, Environment Agency enforcement, and the civil liability arising from pollution incidents and environmental damage' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on net zero obligations, carbon reporting requirements, and the emerging legal framework governing corporate environmental disclosure' },
    ],
  },
  {
    id: 'telecoms',
    label: 'Telecoms & Broadcasting',
    title: 'TELECOMS & BROADCASTING REGULATION',
    intro: 'Ofcom regulates with increasing reach across telecommunications and broadcasting. Licence holders, platform operators, and content providers require counsel who understands both the technical and regulatory dimensions of their obligations.',
    bullets: [
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%201.png', text: 'Advising on Ofcom licensing, spectrum allocation, and the regulatory requirements governing electronic communications networks and services' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%202.png', text: 'Representing clients in Ofcom investigations, content standards proceedings, and appeals against regulatory decisions before the Competition Appeal Tribunal' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%203.png', text: 'Advising on Online Safety Act obligations, age verification requirements, and the evolving regulatory framework governing digital platforms and online content' },
    ],
  },
  {
    id: 'competition',
    label: 'Competition & Antitrust',
    title: 'COMPETITION & ANTITRUST',
    intro: 'The CMA has become one of the most interventionist competition authorities in the world. Businesses operating in concentrated markets, undertaking acquisitions, or facing investigation require specialist competition counsel.',
    bullets: [
      { img: '/images/Cross-Border%20Structuring%201.png', text: 'Advising on CMA merger control filings, phase investigations, and the remedies process in transactions that raise substantive competition concerns' },
      { img: '/images/Cross-Border%20Structuring%202.png', text: 'Representing clients in CMA cartel investigations, Chapter I and II prohibition proceedings, and dawn raid response where speed and precision are critical' },
      { img: '/images/Cross-Border%20Structuring%203.png', text: 'Advising on competition compliance programmes, dominance risk management, and the design of commercial arrangements that withstand regulatory scrutiny' },
    ],
  },
  {
    id: 'dataprotection',
    label: 'Data & Privacy',
    title: 'DATA PROTECTION & PRIVACY REGULATION',
    intro: 'The ICO enforces with increasing rigour. Regulated businesses face data protection obligations that intersect with sector-specific frameworks, creating compliance complexity that requires specialist advice across both dimensions.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising regulated firms on the intersection of UK GDPR obligations with sector-specific data requirements under FCA, MHRA, and Ofgem frameworks' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Representing clients in ICO investigations, enforcement notices, and the management of data breach incidents with multi-regulator notification obligations' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on data sharing in regulated contexts, including patient data in healthcare, financial data under open banking, and personal data in consumer-facing regulated services' },
    ],
  },
]
const panelContent: Record<string, { stat: string; label: string; quote: string }> = {
  financial: {
    stat: '£3.4tn',
    label: 'Assets under management in UK financial services',
    quote: 'FCA enforcement is not a remote risk. It is a near-certainty for firms that treat regulation as a compliance exercise rather than a strategic one.',
  },
  energy: {
    stat: '£200bn',
    label: 'Required UK energy transition investment by 2035',
    quote: 'The energy transition is the greatest regulatory restructuring of any sector in a generation. The legal complexity is proportionate to the scale.',
  },
  healthcare: {
    stat: '£2.4bn',
    label: 'MHRA regulatory fees and penalties issued since 2020',
    quote: 'In healthcare, regulatory failure is not merely a legal problem. It is a patient safety issue and a reputational catastrophe simultaneously.',
  },
  environment: {
    stat: '£700m+',
    label: 'Environment Agency penalties issued 2020-2024',
    quote: 'Environmental liability does not begin with enforcement. It begins the moment an obligation is created and ignored.',
  },
  telecoms: {
    stat: '£29.4m',
    label: 'Largest single Ofcom fine issued to date',
    quote: "Ofcom's enforcement appetite has grown significantly. Licence holders who treat compliance as optional are learning this at considerable cost.",
  },
  competition: {
    stat: '£500m+',
    label: 'CMA fines and remedies issued in 2023 alone',
    quote: 'The CMA is no longer a permissive regulator. Businesses that structure transactions or commercial arrangements without competition counsel do so at real risk.',
  },
  dataprotection: {
    stat: '£17.5m',
    label: 'Maximum ICO fine for serious data breaches',
    quote: 'In regulated industries, a data breach is never just a data protection problem. It triggers obligations across every regulator with jurisdiction over your sector.',
  },
}
export default function RegulatedIndustriesPage() {
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
      img.src = `/regulated-frames/frame_${num}.jpg`
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
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
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
    <div style={{ background: 'white', minHeight: '100vh', overflowX: 'clip' }}>

      <Nav />

      {/* Hero scroll-scrub section */}
      <div ref={heroSectionRef} style={{ height: '80vh', position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '80vh',
          overflow: 'hidden',
        }}>
        {/* Layer 1: Solid blue base */}
        <div style={{ position: 'absolute', inset: 0, background: '#2A6AAA' }} />

        {/* Layer 2: Video canvas at 58% opacity */}
        {!framesLoaded && (
          <img
            src="/regulated-hero-static.jpg"
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
          width={1920}
          height={1080}
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
            Home &rsaquo; Services &rsaquo; Regulated Industries
          </p>

          {/* Title - centred horizontally, mid hero */}
          <h1 style={{
            color: 'white', fontSize: '42px', fontWeight: 700,
            lineHeight: '1.1',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
          }}>
            Regulated Industries
          </h1>

          {/* Body - right aligned, 80% width, larger font */}
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '20px', fontWeight: 400,
            lineHeight: '1.3',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'right',
            width: 'clamp(65%, 42%, 42%)',
            alignSelf: 'flex-end',
          }}>
            Operating from <strong>Mayfair</strong> and instructed by businesses operating under the most demanding regulatory frameworks, we provide specialist counsel that treats compliance as a commercial advantage, not an administrative burden.
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
              <div style={{ position: 'absolute', left: '20px', top: '40px', width: '14px', height: '2px', background: 'var(--navy)', zIndex: 2 }} />
              {/* Circle offset right */}
              <div style={{ position: 'absolute', left: '34px', top: '34px', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--coral)', background: 'white', zIndex: 2 }} />
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
              top: idx === 0 ? '41px' : '57px',
              width: '14px',
              height: '2px',
              background: 'var(--navy)',
              zIndex: 2,
            }} />
            {/* Circle - sits to the right of the connector */}
            <div style={{
              position: 'absolute',
              left: '34px',
              top: idx === 0 ? '35px' : '52px',
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
              src="/regulated-hero-static.jpg"
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
