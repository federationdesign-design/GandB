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
      <div ref={heroSectionRef} style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
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
          opacity: 0.72,
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
            color: 'white', fontSize: '36px', fontWeight: 700,
            lineHeight: '1.15',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'center',
          }}>
            Aerospace, Aviation &amp; Defence
          </h1>

          {/* Body - right aligned, 80% width, larger font */}
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '16px', fontWeight: 400,
            lineHeight: '1.3',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textAlign: 'right',
            marginLeft: '20%',
          }}>
            Operating from <strong>Mayfair</strong> and retained by multinationals across three continents, we bring decades of frontline experience to matters where the commercial and legal consequences are measured in the hundreds of millions.
          </p>
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

        {/* Section nav dropdown */}
        {navOpen && (
          <div style={{
            background: 'var(--coral)',
            padding: '12px 20px 20px',
          }}>
            {sections.filter(s => !s.isAbout).map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '4px 0',
                  color: 'var(--navy)',
                  fontSize: '11px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                — {s.title || s.label.toUpperCase()}
              </button>
            ))}
            <div style={{
              marginTop: '16px',
              height: '1px',
              background: 'rgba(26,35,64,0.2)',
            }} />
          </div>
        )}
      </div>

      {/* Content sections with timeline */}
      <div style={{ position: 'relative', padding: '0 0 80px 0', background: 'linear-gradient(to bottom, #FF7B7B 0px, #FF7B7B 40px, #ffcece 250px, #ffffff 550px)' }}>

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
              left: '19px',
              top: idx === 0 ? '44px' : '52px',
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
                <div style={{ marginTop: '4px' }}>
                  {section.bullets.map((bullet, bi) => (
                    <div key={bi}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      paddingBottom: '16px',
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
                        background: 'rgba(26,35,64,0.2)',
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '156px',
                        width: '50%',
                        height: '1px',
                        background: '#FF7B7B',
                      }} />
                      {/* Thumbnail */}
                      <div style={{
                        width: '140px',
                        minWidth: '140px',
                        height: '105px',
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
                        lineHeight: '1.3',
                        color: 'var(--text-body)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: 400,
                        paddingTop: '15px',
                        flex: 1,
                        maxWidth: '55%',
                      }}>
                        {bullet.text}
                      </p>
                    </div>
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

      {/* Enquire Section */}
      <div style={{ position: 'relative' }}>
        {/* Timeline node for enquire */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '52px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: '2px solid var(--navy)',
          background: 'var(--blush)',
          zIndex: 2,
        }} />
        {/* Vertical line above */}
        <div style={{
          position: 'absolute',
          left: '28px',
          top: 0,
          height: '52px',
          width: '1px',
          background: 'var(--navy)',
          opacity: 0.2,
        }} />

        <div style={{ paddingLeft: '52px', paddingRight: '20px', paddingTop: '48px', paddingBottom: '0' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'var(--coral)',
            marginBottom: '0',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            ENQUIRE
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--coral)',
          marginTop: '20px',
          padding: '32px 24px 40px',
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'white',
            marginBottom: '24px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            Enquire here
          </h2>

          {/* Input fields */}
          {['Name', 'Email', 'Mobile', 'Company', 'Domain', 'Postcode'].map((field) => (
            <input
              key={field}
              type={field === 'Email' ? 'email' : field === 'Mobile' ? 'tel' : 'text'}
              placeholder={field}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 20px',
                marginBottom: '12px',
                borderRadius: '100px',
                border: '1.5px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 400,
                outline: 'none',
                WebkitTextFillColor: 'white',
              }}
            />
          ))}

          {/* Contact preference */}
          <p style={{
            color: 'white',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '16px',
            marginTop: '8px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            Ideal method of initial contact
          </p>

          {['Phone call', 'Mobile call', 'SMS/whatsapp', 'Email'].map((option) => (
            <label key={option} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
              cursor: 'pointer',
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                minWidth: '28px',
                borderRadius: '6px',
                border: '2px solid rgba(255,255,255,0.6)',
                background: 'transparent',
                display: 'inline-block',
              }} />
              <span style={{
                color: 'white',
                fontSize: '14px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {option}
              </span>
            </label>
          ))}

          {/* Submit button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button style={{
              background: 'white',
              border: 'none',
              borderRadius: '100px',
              padding: '14px 36px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--coral)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              cursor: 'pointer',
            }}>
              ENQUIRE
            </button>
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
