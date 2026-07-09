'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 30

const sections = [
  {
    id: 'about',
    label: 'About',
    title: null,
    intro: 'When aerospace businesses face high-stakes regulatory disputes, procurement negotiations, or cross-border liability exposure, the difference between a solicitor and specialist counsel is the difference between process and strategy.',
    isAbout: true,
  },
  {
    id: 'defence',
    label: 'Defence & Procurement',
    title: 'DEFENCE & PROCUREMENT CONTRACTS',
    intro: 'Military and government aerospace contracts operate under entirely different legal frameworks to commercial work. Specialist counsel navigates procurement law, security classifications, export controls, and the unique dispute resolution mechanisms that govern defence relationships.',
    bullets: [
      {
        img: '/images/Defence%20%26%20Procurement%20Contracts%201.png',
        text: 'Drafting and negotiating complex government and military procurement agreements under defence-specific legal frameworks',
      },
      {
        img: '/images/Defence%20%26%20Procurement%20Contracts%202.png',
        text: 'Advising on export controls, security classifications, and ITAR compliance for clients operating across allied nations',
      },
      {
        img: '/images/Defence%20%26%20Procurement%20Contracts%203.png',
        text: 'Managing disputes within the specialist resolution mechanisms that govern defence and public sector contracts',
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety Legislation',
    title: 'SAFETY LEGISLATION & LIABILITY',
    intro: 'From airworthiness directives to accident investigation protocols, safety law in aerospace carries criminal as well as civil exposure. Having counsel who understands the technical language of safety management systems means legal advice that is grounded in operational reality, not just statute.',
    bullets: [
      {
        img: '/images/Safety%20Legislation%20%26%20Liability%201.png',
        text: 'Advising on airworthiness obligations, safety management systems, and operator liability frameworks',
      },
      {
        img: '/images/Safety%20Legislation%20%26%20Liability%202.png',
        text: 'Representing clients during accident investigations and inquests where criminal or civil exposure exists',
      },
      {
        img: '/images/Safety%20Legislation%20%26%20Liability%203.png',
        text: 'Structuring contracts to allocate safety liability appropriately between manufacturers, operators, and maintainers',
      },
    ],
  },
  {
    id: 'regulatory',
    label: 'Regulatory & Compliance',
    title: 'REGULATORY & COMPLIANCE',
    intro: 'Aerospace is one of the most heavily regulated industries on earth, governed by bodies including the CAA, EASA, FAA, and ICAO. Specialist counsel understands how these frameworks interact across jurisdictions, ensuring clients remain compliant whether they operate domestically or across multiple territories.',
    bullets: [
      {
        img: '/images/Regulatory%20%26%20Compliance%201.png',
        text: 'Navigating the overlapping requirements of the CAA, EASA, FAA, and ICAO across multiple operating territories',
      },
      {
        img: '/images/Regulatory%20%26%20Compliance%202.png',
        text: 'Advising on regulatory change and ensuring business structures remain compliant as legislation evolves',
      },
      {
        img: '/images/Regulatory%20%26%20Compliance%203.png',
        text: 'Representing clients in enforcement proceedings and licence applications before aviation authorities',
      },
    ],
  },
  {
    id: 'ip',
    label: 'Intellectual Property',
    title: 'INTELLECTUAL PROPERTY & TRADE SECRETS',
    intro: 'Aerospace is driven by proprietary technology. Protecting patents, licensing agreements, and trade secrets across international borders requires counsel who understands both IP law and the sector\'s competitive dynamics.',
    bullets: [
      {
        img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png',
        text: 'Protecting proprietary technology through patent strategy, licensing agreements, and trade secret protocols',
      },
      {
        img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%202.png',
        text: 'Advising on IP ownership structures within consortium and joint development arrangements',
      },
      {
        img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png',
        text: 'Pursuing and defending infringement claims across international jurisdictions where aerospace IP is most at risk',
      },
    ],
  },
  {
    id: 'arbitration',
    label: 'Arbitration & Disputes',
    title: 'INTERNATIONAL ARBITRATION & DISPUTE RESOLUTION',
    intro: 'Aerospace disputes rarely stay within a single jurisdiction. Specialist counsel with experience in international arbitration ensures clients are represented effectively when commercial relationships break down across borders.',
    bullets: [
      {
        img: '/images/Arbitration%20%26%20Dispute%20Resolution%201.png',
        text: 'Representing clients before international arbitration tribunals including the ICC, LCIA, and UNCITRAL panels',
      },
      {
        img: '/images/Arbitration%20%26%20Dispute%20Resolution%202.png',
        text: 'Advising on jurisdiction strategy and governing law clauses at the contract stage to protect clients before disputes arise',
      },
      {
        img: '/images/Arbitration%20%26%20Dispute%20Resolution%203.png',
        text: 'Managing multi-party disputes involving manufacturers, insurers, governments, and operators across different legal systems',
      },
    ],
  },
  {
    id: 'crossborder',
    label: 'Cross-Border Structuring',
    title: 'JOINT VENTURES & CROSS-BORDER STRUCTURING',
    intro: 'Large aerospace programmes frequently involve consortium arrangements between manufacturers, governments, and suppliers across multiple countries. Getting the legal architecture right from the outset protects all parties when complexity increases.',
    bullets: [
      {
        img: '/images/Cross-Border%20Structuring%201.png',
        text: 'Structuring consortium and joint venture agreements between international partners on large-scale aerospace programmes',
      },
      {
        img: '/images/Cross-Border%20Structuring%202.png',
        text: 'Advising on the regulatory approvals, competition law considerations, and governance frameworks required at formation',
      },
      {
        img: '/images/Cross-Border%20Structuring%203.png',
        text: 'Protecting client interests when joint arrangements are restructured, wound down, or subject to dispute',
      },
    ],
  },
]

const panelContent: Record<string, { stat: string; label: string; quote: string }> = {
  about: {
    stat: 'Mayfair, London',
    label: 'Operating since 1998',
    quote: 'Not every legal matter requires a specialist. Yours does.',
  },
  defence: {
    stat: '£340bn+',
    label: 'Global defence procurement market',
    quote: 'Military and government contracts demand counsel who understands classification, export controls, and the full weight of sovereign liability.',
  },
  safety: {
    stat: '94%',
    label: 'Of aviation incidents involve regulatory non-compliance',
    quote: 'Safety law in aerospace carries criminal as well as civil exposure. The distinction matters enormously.',
  },
  regulatory: {
    stat: '4 bodies',
    label: 'CAA · EASA · FAA · ICAO',
    quote: 'Compliance is not a destination. It is a continuous process across every jurisdiction you operate in.',
  },
  ip: {
    stat: '$1.2tn',
    label: 'Estimated value of aerospace IP globally',
    quote: 'Proprietary technology is your competitive advantage. Protecting it across international borders requires more than a standard NDA.',
  },
  arbitration: {
    stat: 'ICC · LCIA · UNCITRAL',
    label: 'Tribunals where we have represented clients',
    quote: 'Aerospace disputes rarely stay within a single jurisdiction. Your counsel should not either.',
  },
  crossborder: {
    stat: '63%',
    label: 'Of large aerospace programmes involve 3+ national partners',
    quote: 'The legal architecture of a consortium determines what happens when things go wrong. Get it right from day one.',
  },
}

export default function AerospacePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [stickyCard, setStickyCard] = useState<string | null>(null)
  const [stickyRect, setStickyRect] = useState<{ top: number; left: number; width: number } | null>(null)
  const [frozenCards, setFrozenCards] = useState<Record<string, { top: number; left: number; width: number }>>({})
  const [activeSection, setActiveSection] = useState('about')
  const heroSectionRef = useRef<HTMLDivElement>(null)

  // Preload all frames
  useEffect(() => {
    let loaded = 0
    const imgs: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const num = String(i).padStart(4, '0')
      img.src = `/frames/frame_${num}.jpg`
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

  // Sticky card handler - cards stack on top of each other
  useEffect(() => {
    const knownRects: Record<string, { top: number; left: number; width: number }> = {}

    const onScroll = () => {
      if (window.innerWidth < 1024) {
        setStickyCard(null)
        setStickyRect(null)
        return
      }
      const navH = 56
      const nonAbout = sections.filter(s => !s.isAbout)

      // Capture rects for all cards while in flow
      for (const section of nonAbout) {
        const cardEl = document.getElementById('card-' + section.id)
        if (!cardEl) continue
        // Only capture when not currently fixed
        const isFixed = cardEl.style.position === 'fixed'
        if (!isFixed) {
          const cardRect = cardEl.getBoundingClientRect()
          if (cardRect.width > 0) {
            knownRects[section.id] = {
              top: navH,
              left: cardRect.left,
              width: cardRect.width,
            }
          }
        }
      }

      // Find active: most recent row whose top passed nav
      let active: string | null = null
      const enquireEl = document.querySelector('.enquire-split')
      const enquireTop = enquireEl ? enquireEl.getBoundingClientRect().top : Infinity

      for (const section of nonAbout) {
        const row = document.getElementById('row-' + section.id)
        if (!row) continue
        if (row.getBoundingClientRect().top <= navH + 10) {
          active = section.id
        }
      }

      // Build a map of all frozen cards
      const newFrozen: Record<string, { top: number; left: number; width: number }> = {}

      for (let i = 0; i < nonAbout.length; i++) {
        const section = nonAbout[i]
        const row = document.getElementById('row-' + section.id)
        if (!row) continue
        const rowRect = row.getBoundingClientRect()

        // Section has scrolled past nav
        if (rowRect.top <= navH + 10) {
          const cardEl = document.getElementById('card-' + section.id)
          const cardH = cardEl ? cardEl.offsetHeight : 300
          const nextSection = nonAbout[i + 1]
          let nextTop = enquireTop

          if (nextSection) {
            const nextRow = document.getElementById('row-' + nextSection.id)
            if (nextRow) nextTop = nextRow.getBoundingClientRect().top
          }

          // If the next boundary is close enough, freeze this card at rest
          if (nextTop <= navH + 16 + cardH + 15) {
            const frozenTop = nextTop - cardH - 15
            if (knownRects[section.id]) {
              newFrozen[section.id] = { top: frozenTop, left: knownRects[section.id].left, width: knownRects[section.id].width }
            }
            // If this was the active card, release it
            if (section.id === active) active = null
          }
        }
      }

      setFrozenCards(newFrozen)
      setStickyCard(active)
      if (active && knownRects[active]) {
        setStickyRect({ ...knownRects[active] })
      } else if (!active) {
        setStickyRect(null)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    setNavOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>

      {/* Fixed Nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'var(--navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '56px',
      }}>
        <img src="/header-logo.svg" alt="Herbert & Ball" style={{ height: '14px', width: 'auto' }} />
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          aria-label="Menu"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'white',
                borderRadius: '1px',
              }} />
            ))}
          </div>
        </button>
      </nav>

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
            src="/jetplane.jpg"
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
            Home &rsaquo; Specialisms &rsaquo; Aerospace, Aviation &amp; Defence
          </p>

          {/* Title - centred horizontally, mid hero */}
          <h1 style={{
            color: 'white', fontSize: '42px', fontWeight: 700,
            lineHeight: '1.1',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
          }}>
            Aerospace, Aviation &amp; Defence
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
            Operating from <strong>Mayfair</strong> and retained by multinationals across three continents, we bring decades of frontline experience to matters where the commercial and legal consequences are measured in the hundreds of millions.
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
                      <div style={{ flex: 1, paddingTop: '0' }}>
                        <div style={{ height: '1px', background: '#FF7B7B', marginBottom: '10px' }} />
                      <p style={{
                        fontSize: '13px',
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
              <div className="gandb-card">
                <div
                  id={'card-' + section.id}
                  className="gandb-card-inner"
                  style={
                    stickyCard === section.id && stickyRect ? {
                      position: 'fixed',
                      top: (stickyRect.top + 16) + 'px',
                      left: stickyRect.left + 'px',
                      width: stickyRect.width + 'px',
                      zIndex: 1,
                      boxShadow: idx === 0 ? 'none' : '0 -16px 0 0 white',
                    } : frozenCards[section.id] ? {
                      position: 'fixed',
                      top: frozenCards[section.id].top + 'px',
                      left: frozenCards[section.id].left + 'px',
                      width: frozenCards[section.id].width + 'px',
                      zIndex: 1,
                      boxShadow: idx === 0 ? 'none' : '0 -16px 0 0 white',
                    } : {
                      position: 'relative',
                      zIndex: 2,
                      boxShadow: idx === 0 ? 'none' : '0 -16px 0 0 white',
                      marginTop: idx === 0 ? '0' : '16px',
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button style={{ background: 'white', border: 'none', borderRadius: '100px', padding: '14px 36px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--coral)', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
                ENQUIRE
              </button>
            </div>
          </div>

          {/* Image column */}
          <div className="enquire-image">
            <img
              src="/jetplane.jpg"
              alt="Herbert & Ball"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'white',
        padding: '40px 0 40px 24px',
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

          {/* Copyright */}
          <p style={{
            color: 'var(--navy)',
            fontSize: '12px',
            opacity: 0.4,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            &copy; 2026 Herbert &amp; Ball LLP 2026
          </p>
        </div>

        {/* Vertical legal links on right edge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0',
          paddingRight: '0',
          height: '100%',
          alignSelf: 'stretch',
          background: 'white',
          padding: '24px 0',
          width: '36px',
          minWidth: '36px',
        }}>
          {['Cookies', 'Privacy Policy', 'Certification.', 'Data Request'].map((link, i) => (
            <a
              key={link}
              href="#"
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
      </footer>
    </div>
  )
}
