'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'

const TOTAL_FRAMES = 23

const sections = [
  {
    id: 'about',
    label: 'About',
    title: null,
    intro: 'When technology businesses face complex regulatory landscapes, intellectual property disputes, or the challenges of rapid digital transformation, the difference between a generalist and specialist counsel is the difference between risk and opportunity.',
    isAbout: true,
  },
  {
    id: 'ip',
    label: 'Intellectual Property',
    title: 'INTELLECTUAL PROPERTY',
    intro: 'In the technology sector, intellectual property is the primary asset. Protecting it demands counsel who understands both the legal frameworks and the technical realities of software, hardware, and data.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Drafting and negotiating software licensing agreements, open source compliance frameworks, and IP ownership structures' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%202.png', text: 'Advising on patent strategy, trade mark protection, and the enforcement of IP rights across international jurisdictions' },
      { img: '/images/Defence%20%26%20Procurement%20Contracts%203.png', text: 'Protecting trade secrets and confidential information in an environment where talent moves quickly and data travels faster' },
    ],
  },
  {
    id: 'software',
    label: 'Software Licensing',
    title: 'SOFTWARE LICENSING & IT LAW',
    intro: 'Technology contracts carry risk that general commercial lawyers routinely underestimate. Specialist counsel understands the technical specifics that determine whether a contract protects or exposes.',
    bullets: [
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Advising on SaaS agreements, platform terms, and enterprise software contracts where liability and service levels are commercially critical' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%202.png', text: 'Structuring IT outsourcing and managed service agreements with appropriate performance benchmarks and exit provisions' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%203.png', text: 'Advising on technology procurement, systems integration contracts, and dispute resolution where technical failure has commercial consequences' },
    ],
  },
  {
    id: 'fintech',
    label: 'Financial Technology',
    title: 'FINANCIAL TECHNOLOGY (FINTECH)',
    intro: 'FinTech operates at the intersection of financial services regulation and technology law. Businesses in this space require counsel who can navigate both with equal authority.',
    bullets: [
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on FCA authorisation, e-money licensing, and payment services regulation for businesses entering or scaling in regulated markets' },
      { img: '/images/Regulatory%20%26%20Compliance%202.png', text: 'Structuring partnerships between FinTech businesses and established financial institutions, including API access agreements and data sharing arrangements' },
      { img: '/images/Regulatory%20%26%20Compliance%203.png', text: 'Advising on open banking compliance, PSD2 obligations, and the evolving regulatory framework for digital assets and cryptocurrency' },
    ],
  },
  {
    id: 'dataprotection',
    label: 'Data Protection & GDPR',
    title: 'DATA PROTECTION & GDPR',
    intro: 'Data is the currency of the digital economy. The regulatory obligations surrounding its collection, processing, and transfer carry significant civil and criminal exposure for technology businesses.',
    bullets: [
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%201.png', text: 'Advising on GDPR compliance programmes, data processing agreements, and the lawful basis for processing personal data across complex technology architectures' },
      { img: '/images/Intellectual%20Property%20%26%20Trade%20Secrets%202.png', text: 'Representing clients in ICO investigations, regulatory inquiries, and data breach response where speed and precision are operationally critical' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on cross-border data transfers, standard contractual clauses, and the implications of international data sovereignty requirements' },
    ],
  },
  {
    id: 'connected',
    label: 'Connected Technologies',
    title: 'CONNECTED TECHNOLOGIES & SMART INFRASTRUCTURE',
    intro: 'The proliferation of connected devices and smart infrastructure creates legal complexity that spans product liability, data law, cybersecurity regulation, and commercial contract law simultaneously.',
    bullets: [
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%201.png', text: 'Advising on IoT product liability, software update obligations, and the regulatory framework governing connected devices in consumer and industrial contexts' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%202.png', text: 'Structuring smart city and infrastructure contracts between technology providers, public authorities, and private operators' },
      { img: '/images/Arbitration%20%26%20Dispute%20Resolution%203.png', text: 'Advising on cybersecurity obligations, incident response frameworks, and the legal consequences of infrastructure vulnerability' },
    ],
  },
  {
    id: 'telecom',
    label: 'Telecommunications',
    title: 'TELECOMMUNICATIONS',
    intro: 'Telecommunications businesses operate under some of the most complex regulatory frameworks in any sector. Specialist counsel provides the strategic guidance needed to operate, grow, and compete effectively.',
    bullets: [
      { img: '/images/Cross-Border%20Structuring%201.png', text: 'Advising on Ofcom licensing, spectrum rights, and the regulatory obligations affecting fixed line, mobile, and satellite operators' },
      { img: '/images/Cross-Border%20Structuring%202.png', text: 'Structuring infrastructure sharing agreements, roaming arrangements, and wholesale access contracts between network operators' },
      { img: '/images/Cross-Border%20Structuring%203.png', text: 'Advising on merger control and competition law in a sector where consolidation is commercially driven but regulatorily constrained' },
    ],
  },
  {
    id: 'ev',
    label: 'Electric Vehicles',
    title: 'ELECTRIC VEHICLES & CHARGING INFRASTRUCTURE',
    intro: 'The transition to electric mobility creates an entirely new legal landscape spanning energy regulation, planning law, consumer contracts, and technology licensing in a market moving faster than most regulatory frameworks.',
    bullets: [
      { img: '/images/Defence%20%26%20Procurement%20Contracts%201.png', text: 'Advising on charging network development, grid connection agreements, and the regulatory framework governing public EV infrastructure' },
      { img: '/images/Safety%20Legislation%20%26%20Liability%201.png', text: 'Structuring vehicle-to-grid agreements, energy storage contracts, and the commercial arrangements underpinning smart charging technology' },
      { img: '/images/Regulatory%20%26%20Compliance%201.png', text: 'Advising on product liability, software update obligations, and consumer rights in the context of connected and autonomous vehicle technology' },
    ],
  },
]

const panelContent: Record<string, { stat: string; label: string; quote: string }> = {
  ip: { stat: '$8.5tn', label: 'Global IP value in tech sector', quote: 'In technology, your IP is your company. Protecting it requires counsel who understands what they are protecting.' },
  software: { stat: '73%', label: 'Of enterprise software disputes involve unclear licensing terms', quote: 'A poorly drafted software contract is not a starting point for negotiation. It is a liability waiting to be triggered.' },
  fintech: { stat: '164bn', label: 'UK FinTech sector value', quote: 'FinTech moves at the speed of technology and is regulated at the pace of financial services. Navigating both requires specialist counsel.' },
  dataprotection: { stat: '17.5m', label: 'Maximum GDPR fine under UK law', quote: 'Data protection is not a compliance checkbox. It is a commercial risk that requires strategic legal management.' },
  connected: { stat: '75bn', label: 'Connected devices expected globally by 2025', quote: 'Every connected device is a potential liability. The legal architecture around IoT must be as sophisticated as the technology itself.' },
  telecom: { stat: '40bn+', label: 'UK telecommunications market value', quote: 'Telecommunications regulation is among the most technically complex in any sector. Generalist advice is not sufficient.' },
  ev: { stat: '300%', label: 'Growth in UK EV charging infrastructure 2020-2024', quote: 'The EV transition is creating legal complexity at a pace that most businesses are not yet equipped to manage.' },
}

export default function TechnologyPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)
  const [framesLoaded, setFramesLoaded] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [stickyCard, setStickyCard] = useState<string | null>(null)
  const [stickyRect, setStickyRect] = useState<{ top: number; left: number; width: number } | null>(null)

  useEffect(() => {
    let loaded = 0
    const imgs: HTMLImageElement[] = []
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/tech-frames/frame_${String(i).padStart(4, '0')}.jpg`
      img.onload = () => { loaded++; if (loaded === TOTAL_FRAMES) { setFramesLoaded(true); drawFrame(0, imgs) } }
      imgs.push(img)
    }
    framesRef.current = imgs
  }, [])

  function drawFrame(index: number, imgs?: HTMLImageElement[]) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const frame = (imgs || framesRef.current)[index]
    if (frame) ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    const heroEl = document.getElementById('tech-hero')
    if (!framesLoaded || !heroEl) return
    const handleScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / heroEl.offsetHeight, 0), 1)
      const fi = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
      if (fi !== frameIndexRef.current) { frameIndexRef.current = fi; drawFrame(fi) }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [framesLoaded])

  useEffect(() => {
    const knownRects: Record<string, { top: number; left: number; width: number }> = {}
    const onScroll = () => {
      if (window.innerWidth < 1024) { setStickyCard(null); setStickyRect(null); return }
      const navH = 56
      const nonAbout = sections.filter(s => !s.isAbout)
      let active: string | null = null
      for (const section of nonAbout) {
        const row = document.getElementById('row-' + section.id)
        const cardEl = document.getElementById('card-' + section.id)
        if (!row || !cardEl) continue
        const cardRect = cardEl.getBoundingClientRect()
        if (stickyCard !== section.id) knownRects[section.id] = { top: navH, left: cardRect.left, width: cardRect.width }
        if (row.getBoundingClientRect().top <= navH + 10) active = section.id
      }
      setStickyCard(active)
      if (active && knownRects[active]) setStickyRect(knownRects[active])
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [stickyCard])

  const scrollToSection = (id: string) => { setNavOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Nav />

      <div id="tech-hero" style={{ height: '180vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '80vh', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#1a2340' }} />
          <canvas ref={canvasRef} width={1112} height={834} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.58, display: framesLoaded ? 'block' : 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B4EBA, #06275D)', opacity: 0.45 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(56px, 8vw, 80px) clamp(24px, 7vw, 100px) 28px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Home &rsaquo; Specialisms &rsaquo; Technology &amp; Innovation</p>
            <h1 style={{ color: 'white', fontSize: '42px', fontWeight: 700, lineHeight: '1.1', fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center' }}>Technology &amp; Innovation</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', fontWeight: 400, lineHeight: '1.3', fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'right', width: '42%', alignSelf: 'flex-end' }}>
              Operating from <strong>Mayfair</strong> and retained by technology businesses across three continents, we provide specialist counsel for the digital economy.
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, marginTop: '-2px' }}>
        <button onClick={() => setNavOpen(!navOpen)} style={{ width: '100%', background: '#FF7B7B', border: 'none', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ color: 'white', fontSize: '13px', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>In this section</span>
          <span style={{ color: 'white', fontSize: '10px', transform: navOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', display: 'inline-block' }}>▼</span>
        </button>
        <div style={{ background: 'var(--coral)', maxHeight: navOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: navOpen ? '12px 20px 16px' : '0 20px' }}>
            {sections.filter(s => !s.isAbout).map(s => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} style={{ background: 'transparent', border: '1.5px solid var(--navy)', borderRadius: '100px', padding: '5px 14px', color: 'var(--navy)', fontSize: '10px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, letterSpacing: '0.08em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {s.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gandb-about-full">
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--navy)' }} />
          {sections.filter(s => s.isAbout).map(section => (
            <div key={section.id} id={section.id} style={{ position: 'relative', paddingTop: '40px' }}>
              <div style={{ position: 'absolute', left: '20px', top: '47px', width: '14px', height: '2px', background: 'var(--navy)', zIndex: 2 }} />
              <div style={{ position: 'absolute', left: '34px', top: '40px', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--coral)', background: 'white', zIndex: 2 }} />
              <div className="gandb-about-inner" style={{ paddingLeft: '52px', paddingRight: '20px', paddingBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>ABOUT</p>
                <p style={{ fontSize: '26px', fontWeight: 400, lineHeight: '1.3', color: 'var(--text-dark)', marginBottom: '28px', fontFamily: 'Plus Jakarta Sans, sans-serif', maxWidth: '90%' }}>{section.intro}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0px' }}>
                  <button style={{ border: '2px solid #FF7B7B', background: '#ffffff', padding: '12px 32px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#1a2340', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>ENQUIRE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gandb-outer">
        <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--navy)', zIndex: 1 }} />
        {sections.filter(s => !s.isAbout).map((section, idx) => (
          <div key={section.id} id={'row-' + section.id} className="gandb-section-row">
            <div className="gandb-left" style={{ position: 'relative' }}>
              <div id={section.id} style={{ position: 'relative', paddingTop: idx === 0 ? '40px' : '48px' }}>
                <div style={{ position: 'absolute', left: '20px', top: '55px', width: '14px', height: '2px', background: 'var(--navy)', zIndex: 2 }} />
                <div style={{ position: 'absolute', left: '34px', top: '48px', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--coral)', background: 'white', zIndex: 2 }} />
                <div style={{ paddingLeft: '52px', paddingRight: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{section.title}</p>
                  <p style={{ fontSize: '17px', fontWeight: 400, lineHeight: '1.3', color: 'var(--text-dark)', marginBottom: '24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{section.intro}</p>
                  {'bullets' in section && section.bullets && (
                    <div style={{ marginTop: '4px' }}>
                      {section.bullets.map((bullet, bi) => (
                        <div key={bi}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '12px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-32px', top: '60px', width: '8px', height: '2px', background: 'var(--navy)' }} />
                            <div style={{ position: 'absolute', top: '8px', left: '176px', right: '0', height: '1px', background: '#FF7B7B' }} />
                            <div style={{ width: '160px', minWidth: '160px', height: '120px', borderRadius: '4px', overflow: 'hidden', background: 'var(--navy)' }}>
                              <img src={bullet.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            </div>
                            <p style={{ fontSize: '17px', lineHeight: '1.3', color: 'var(--text-body)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, paddingTop: '4px', flex: 1 }}>{bullet.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {panelContent[section.id] && (
              <div className="gandb-card">
                <div id={'card-' + section.id} className="gandb-card-inner"
                  style={stickyCard === section.id && stickyRect ? { position: 'fixed', top: stickyRect.top + 'px', left: stickyRect.left + 'px', width: stickyRect.width + 'px', zIndex: 0, borderTop: '10px solid white' } : { position: 'relative', zIndex: 1 }}>
                  <p style={{ color: 'var(--coral)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '12px', textTransform: 'uppercase' }}>{panelContent[section.id].label}</p>
                  <p style={{ color: 'white', fontSize: '64px', fontWeight: 700, lineHeight: '1', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '24px', letterSpacing: '-0.02em' }}>{panelContent[section.id].stat}</p>
                  <div style={{ width: '40px', height: '2px', background: 'var(--coral)', marginBottom: '24px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5', fontFamily: 'Plus Jakarta Sans, sans-serif', fontStyle: 'italic' }}>&ldquo;{panelContent[section.id].quote}&rdquo;</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer style={{ background: 'white', padding: '40px 0 40px 24px', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, paddingRight: '48px' }}>
          <img src="/footer-logo.svg" alt="Herbert & Ball" style={{ height: '60px', width: 'auto', marginBottom: '16px' }} />
          <p style={{ color: 'var(--navy)', fontSize: '13px', lineHeight: '1.6', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '24px', opacity: 0.7 }}>Aviation, Commercial, Corporate, Data Protection, Employment, Franchising, Information Technology, and Intellectual Property</p>
          <p style={{ color: 'var(--navy)', fontSize: '13px', lineHeight: '1.7', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '20px' }}>International House,<br />142 Cromwell Rd,<br />London<br />SW7 4EF</p>
          <p style={{ color: 'var(--navy)', fontSize: '13px', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '20px' }}>Call: 020 3897 0445</p>
          <p style={{ color: 'var(--navy)', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: 0.4 }}>&copy; 2026 Herbert &amp; Ball LLP 2026</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 0', width: '36px', minWidth: '36px' }}>
          {['Cookies', 'Privacy Policy', 'Certification.', 'Data Request'].map((link, i) => (
            <a key={link} href="#" style={{ color: 'var(--navy)', fontSize: '10px', fontFamily: 'Plus Jakarta Sans, sans-serif', textDecoration: 'none', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.06em', padding: '8px 0', borderTop: i > 0 ? '1px solid rgba(26,35,64,0.1)' : 'none', display: 'block', width: '100%', textAlign: 'center' }}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
