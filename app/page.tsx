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
        img: '/images/Defence & Procurement Contracts 1.png',
        text: 'Drafting and negotiating complex government and military procurement agreements under defence-specific legal frameworks',
      },
      {
        img: '/images/Defence & Procurement Contracts 2.png',
        text: 'Advising on export controls, security classifications, and ITAR compliance for clients operating across allied nations',
      },
      {
        img: '/images/Defence & Procurement Contracts 3.png',
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
        img: '/images/Safety Legislation & Liability 1.png',
        text: 'Advising on airworthiness obligations, safety management systems, and operator liability frameworks',
      },
      {
        img: '/images/Safety Legislation & Liability 2.png',
        text: 'Representing clients during accident investigations and inquests where criminal or civil exposure exists',
      },
      {
        img: '/images/Safety Legislation & Liability 3.png',
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
        img: '/images/Regulatory & Compliance 1.png',
        text: 'Navigating the overlapping requirements of the CAA, EASA, FAA, and ICAO across multiple operating territories',
      },
      {
        img: '/images/Regulatory & Compliance 2.png',
        text: 'Advising on regulatory change and ensuring business structures remain compliant as legislation evolves',
      },
      {
        img: '/images/Regulatory & Compliance 3.png',
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
        img: '/images/Intellectual Property & Trade Secrets 1.png',
        text: 'Protecting proprietary technology through patent strategy, licensing agreements, and trade secret protocols',
      },
      {
        img: '/images/Intellectual Property & Trade Secrets 2.png',
        text: 'Advising on IP ownership structures within consortium and joint development arrangements',
      },
      {
        img: '/images/Intellectual Property & Trade Secrets 1.png',
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
        img: '/images/Arbitration & Dispute Resolution 1.png',
        text: 'Representing clients before international arbitration tribunals including the ICC, LCIA, and UNCITRAL panels',
      },
      {
        img: '/images/Arbitration & Dispute Resolution 2.png',
        text: 'Advising on jurisdiction strategy and governing law clauses at the contract stage to protect clients before disputes arise',
      },
      {
        img: '/images/Arbitration & Dispute Resolution 3.png',
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
        img: '/images/Cross-Border Structuring 1.png',
        text: 'Structuring consortium and joint venture agreements between international partners on large-scale aerospace programmes',
      },
      {
        img: '/images/Cross-Border Structuring 2.png',
        text: 'Advising on the regulatory approvals, competition law considerations, and governance frameworks required at formation',
      },
      {
        img: '/images/Cross-Border Structuring 3.png',
        text: 'Protecting client interests when joint arrangements are restructured, wound down, or subject to dispute',
      },
    ],
  },
]

export default function AerospacePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
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

  const scrollToSection = (id: string) => {
    setNavOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'var(--blush)', minHeight: '100vh' }}>

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
        <span style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          HERBERT &amp; BALL<sup style={{ fontSize: '8px', marginLeft: '2px' }}>LC</sup>
        </span>
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
      <div ref={heroSectionRef} style={{ height: '200vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Fallback image while frames load */}
          {!framesLoaded && (
            <img
              src="/jetplane.jpg"
              alt="Aerospace"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <canvas
            ref={canvasRef}
            width={834}
            height={1112}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: framesLoaded ? 'block' : 'none',
            }}
          />
          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent, var(--blush))',
          }} />
        </div>
      </div>

      {/* In this section bar */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-2px' }}>
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{
            width: '100%',
            background: 'var(--coral)',
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

        {/* Section nav dropdown */}
        {navOpen && (
          <div style={{
            background: 'var(--navy)',
            padding: '8px 0',
          }}>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '12px 20px',
                  color: 'white',
                  fontSize: '13px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content sections with timeline */}
      <div style={{ position: 'relative', padding: '0 0 80px 0' }}>

        {/* Vertical timeline line */}
        <div style={{
          position: 'absolute',
          left: '28px',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'var(--navy)',
          opacity: 0.2,
        }} />

        {sections.map((section, idx) => (
          <div
            key={section.id}
            id={section.id}
            style={{ position: 'relative', paddingTop: idx === 0 ? '40px' : '48px' }}
          >
            {/* Timeline node */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: idx === 0 ? '44px' : '52px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '2px solid var(--navy)',
              background: 'var(--blush)',
              zIndex: 2,
            }} />

            <div style={{ paddingLeft: '52px', paddingRight: '20px' }}>

              {/* Section label */}
              {!section.isAbout && (
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'var(--coral)',
                  marginBottom: '16px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
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
                  opacity: 0.5,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  ABOUT
                </p>
              )}

              {/* Intro paragraph */}
              <p style={{
                fontSize: section.isAbout ? '20px' : '15px',
                fontWeight: section.isAbout ? 700 : 400,
                lineHeight: section.isAbout ? '1.4' : '1.6',
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
                    border: '1.5px solid var(--navy)',
                    background: 'transparent',
                    padding: '12px 32px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'var(--navy)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    cursor: 'pointer',
                  }}>
                    ENQUIRE
                  </button>
                </div>
              )}

              {/* Bullet rows */}
              {'bullets' in section && section.bullets && (
                <div style={{ marginTop: '8px' }}>
                  {section.bullets.map((bullet, bi) => (
                    <div key={bi} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      paddingTop: '16px',
                      borderTop: bi === 0 ? 'none' : '1px solid rgba(201,112,90,0.3)',
                      marginTop: bi === 0 ? '0' : '0',
                    }}>
                      {/* Thumbnail */}
                      <div style={{
                        width: '110px',
                        minWidth: '110px',
                        height: '80px',
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
                      {/* Text */}
                      <p style={{
                        fontSize: '13px',
                        lineHeight: '1.5',
                        color: 'var(--text-body)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: 400,
                        paddingTop: '4px',
                      }}>
                        {bullet.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section divider */}
            {idx < sections.length - 1 && (
              <div style={{
                marginLeft: '52px',
                marginRight: '20px',
                marginTop: '40px',
                height: '1px',
                background: 'rgba(26,35,64,0.12)',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--navy)',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          HERBERT &amp; BALL<sup style={{ fontSize: '7px' }}>LC</sup> — MAYFAIR, LONDON
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '10px',
          marginTop: '8px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        }}>
          Regulated by the Bar Standards Board
        </p>
      </footer>
    </div>
  )
}
