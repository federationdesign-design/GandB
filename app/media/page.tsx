'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'

const TOTAL_FRAMES = 17

const sections = [
  {
    id: 'about',
    label: 'About',
    title: null,
    intro: 'The media, entertainment and creative industries operate at the intersection of intellectual property, commercial contracts, and rapidly evolving distribution technology. Specialist counsel understands the creative process as well as the legal frameworks that protect and monetise it.',
    isAbout: true,
  },
  {
    id: 'rights',
    label: 'Rights & Licensing',
    title: 'RIGHTS & LICENSING',
    intro: 'Intellectual property is the foundation of every media business. Managing, protecting, and monetising rights across formats, territories, and platforms requires counsel who understands both the legal architecture and the commercial realities of the creative economy.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Structuring and negotiating rights acquisition and licensing agreements across film, television, music, publishing, and digital formats' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%202.png', text: 'Advising on copyright ownership, underlying rights clearance, and the management of complex rights chains in multi-party productions' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%203.png', text: 'Protecting clients against infringement and pursuing or defending claims across international jurisdictions where rights are most at risk' },
    ],
  },
  {
    id: 'production',
    label: 'Production & Finance',
    title: 'PRODUCTION & FINANCE',
    intro: 'Film and television production involves complex financing structures, multi-party agreements, and significant commercial risk. Specialist counsel ensures clients enter production with the legal architecture in place to protect their investment at every stage.',
    bullets: [
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Advising on co-production agreements, production service agreements, and the financing structures that underpin major film and television projects' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%202.png', text: 'Negotiating with broadcasters, streamers, and distributors on commission and acquisition terms that protect creative and commercial interests' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%203.png', text: 'Advising on completion bond requirements, gap financing, and the legal implications of production delay, abandonment, or dispute' },
    ],
  },
  {
    id: 'talent',
    label: 'Talent & Representation',
    title: 'TALENT & REPRESENTATION',
    intro: 'Talent agreements in the creative industries carry significant commercial and reputational stakes. Whether acting for talent or engaging it, specialist counsel ensures agreements are structured to reflect the true value of creative contribution.',
    bullets: [
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on talent agreements, presenter contracts, and on-screen and on-stage deals across broadcast, live performance, and digital platforms' },
      { img: '/images/Regulatory%20%26%20Compliance%202.png', text: 'Structuring management, agency, and representation agreements with appropriate termination provisions and post-term protections' },
      { img: '/images/Regulatory%20%26%20Compliance%203.png', text: 'Advising on merchandising rights, endorsement agreements, and the commercial exploitation of talent-associated intellectual property' },
    ],
  },
  {
    id: 'publishing',
    label: 'Publishing & Music',
    title: 'PUBLISHING & MUSIC',
    intro: 'The music and publishing industries have been transformed by digital distribution. Counsel who understands both the traditional structures and the emerging platforms is essential for clients navigating this shifting landscape.',
    bullets: [
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png', text: 'Advising on recording contracts, publishing agreements, and synchronisation licensing for placement in film, television, and advertising' },
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%202.png', text: 'Structuring catalogue acquisitions, artist services deals, and the increasingly complex agreements that govern streaming distribution' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on royalty disputes, collection society relationships, and the enforcement of mechanical and performance rights across territories' },
    ],
  },
  {
    id: 'digital',
    label: 'Digital & Streaming',
    title: 'DIGITAL PLATFORMS & STREAMING',
    intro: 'The shift to streaming and digital distribution has fundamentally changed the commercial relationships between content creators, rights holders, and platforms. Specialist counsel helps clients negotiate from a position of understanding in this rapidly evolving environment.',
    bullets: [
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%201.png', text: 'Advising on platform licensing agreements, SVOD and AVOD distribution deals, and the terms governing exclusivity and windowing' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%202.png', text: 'Structuring user-generated content policies, creator agreements, and the legal frameworks governing platform-hosted creative content' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%203.png', text: 'Advising on data rights, audience analytics agreements, and the emerging legal questions around AI-generated content in creative industries' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand & Advertising',
    title: 'BRAND, ADVERTISING & SPONSORSHIP',
    intro: 'Creative businesses depend on brand relationships for a significant portion of their commercial revenue. Specialist counsel ensures sponsorship, advertising, and brand partnership agreements are structured to protect creative integrity alongside commercial value.',
    bullets: [
      { img: '/images/Cross-Border%20Structuring%201.png', text: 'Negotiating brand partnership, sponsorship, and advertising agreements for broadcasters, events, talent, and digital platforms' },
      { img: '/images/Cross-Border%20Structuring%202.png', text: 'Advising on product placement obligations, advertising standards compliance, and the regulatory framework governing broadcast advertising' },
      { img: '/images/Cross-Border%20Structuring%203.png', text: 'Structuring influencer and creator agreements, ensuring compliance with ASA guidelines and the disclosure requirements that govern commercial content' },
    ],
  },
  {
    id: 'disputes',
    label: 'Disputes & Defamation',
    title: 'DISPUTES, DEFAMATION & REPUTATION',
    intro: 'Media businesses face unique litigation risk. Whether defending publication decisions, pursuing rights infringement, or resolving creative partnership disputes, specialist counsel with media litigation experience is essential.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising on defamation, privacy, and data protection claims arising from publication, broadcast, and digital distribution' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Representing clients in rights infringement disputes, passing off claims, and contractual disputes between creative collaborators' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on pre-publication legal review, injunctions, and the management of reputational risk in high-profile media matters' },
    ],
  },
]
const panelContent: Record<string, { stat: string; label: string; quote: string }> = {
  rights: {
    stat: '£29bn',
    label: 'UK creative industries annual export value',
    quote: 'Rights are the foundation of every media business. Without specialist counsel, they are also the most common source of commercial catastrophe.',
  },
  production: {
    stat: '£5.6bn',
    label: 'UK film and high-end TV production spend 2023',
    quote: 'A production without the right legal architecture is a liability masquerading as a creative opportunity.',
  },
  talent: {
    stat: '3x',
    label: 'Growth in creator economy contracts since 2019',
    quote: 'Talent agreements have become as commercially complex as any corporate transaction. They deserve the same level of specialist attention.',
  },
  publishing: {
    stat: '£5.2bn',
    label: 'UK music industry revenue 2023',
    quote: 'The streaming era has created new revenue opportunities and new legal complexity in equal measure.',
  },
  digital: {
    stat: '82%',
    label: 'Of UK adults now use at least one streaming service',
    quote: 'Platform agreements are among the most consequential contracts a content owner will ever sign. The terms are rarely neutral.',
  },
  brand: {
    stat: '£24bn',
    label: 'UK advertising market annual spend',
    quote: 'Brand partnerships that protect creative integrity require counsel who understands both commercial imperatives and the creative process.',
  },
  disputes: {
    stat: '340%',
    label: 'Increase in online defamation claims since 2018',
    quote: 'In media, reputation is commercial capital. Protecting it requires specialist counsel before matters escalate, not after.',
  },
}
export default function MediaPage() {
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
      img.src = `/media-frames/frame_${num}.jpg`
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
    <div style={{ background: 'white', minHeight: '100vh' }}>

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
            src="/media-hero-static.jpg"
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
          width={1112}
          height={834}
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
            Home &rsaquo; Services &rsaquo; Media, Entertainment &amp; Creative Industries
          </p>

          {/* Title - centred horizontally, mid hero */}
          <h1 style={{
            color: 'white', fontSize: '42px', fontWeight: 700,
            lineHeight: '1.1',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
          }}>
            Media, Entertainment &amp; Creative Industries
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
            Operating from <strong>Mayfair</strong> and retained by broadcasters, studios, talent and rights holders across three continents, we provide specialist counsel where creative ambition and commercial reality intersect.
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
              src="/media-hero-static.jpg"
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
