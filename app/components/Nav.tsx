'use client'

import { useState } from 'react'

const services = [
  { label: 'Aerospace, Aviation & Defence', href: '/aerospace' },
  { label: 'Technology & Innovation', href: '/technology' },
  { label: 'Regulated Industries', href: '/regulated-industries' },
  { label: 'Media, Entertainment & Creative Industries', href: '/media' },
  { label: 'Commercial Law', href: '/commercial' },
]

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Services', href: null, children: services },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector('.enquire-split') as HTMLElement
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.location.href = '/#enquire'
    }, 300)
  }

  return (
    <>
      {/* Fixed nav bar */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        background: 'var(--navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: '56px',
      }}>
        <a href="/">
          <img src="/header-logo.svg" alt="Herbert & Ball" style={{ height: '14px', width: 'auto', display: 'block' }} />
        </a>
        <button
          onClick={() => { setOpen(!open); setServicesOpen(false) }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {open ? (
            /* X icon */
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="2" y1="2" x2="20" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="2" x2="2" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            /* Hamburger */
            <>
              {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'white', borderRadius: '1px' }} />)}
            </>
          )}
        </button>
      </nav>

      {/* Full screen overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 190,
        background: 'var(--navy)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 40px 60px',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        <nav>
          {navItems.map((item, idx) => (
            <div key={item.label}>
              {item.children ? (
                /* Services with sub-items */
                <div>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: 'clamp(28px, 6vw, 48px)',
                      fontWeight: 700,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.2',
                      padding: '8px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.4s ease ${idx * 0.07}s, transform 0.4s ease ${idx * 0.07}s`,
                    }}
                  >
                    Services
                    <svg
                      width="20" height="20" viewBox="0 0 20 20" fill="none"
                      style={{ transform: servicesOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', marginTop: '4px' }}
                    >
                      <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Sub-items with animated curly brace */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '16px',
                    maxHeight: servicesOpen ? '400px' : '0',
                    opacity: servicesOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    marginBottom: servicesOpen ? '8px' : '0',
                  }}>
                    {/* Curly brace SVG */}
                    <div style={{
                      width: '24px',
                      minWidth: '24px',
                      opacity: servicesOpen ? 1 : 0,
                      transform: servicesOpen ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top center',
                      transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                      display: 'flex',
                      alignItems: 'stretch',
                    }}>
                      <svg
                        viewBox="0 0 24 240"
                        preserveAspectRatio="none"
                        style={{ width: '24px', height: '100%', minHeight: '200px' }}
                      >
                        {/* Top arm */}
                        <path
                          d="M20,4 Q8,4 8,20 L8,108 Q8,120 2,120 Q8,120 8,132 L8,220 Q8,236 20,236"
                          fill="none"
                          stroke="#FF7B7B"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Links */}
                    <div style={{ flex: 1, paddingTop: '8px', paddingBottom: '8px' }}>
                      {item.children.map((child, ci) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: 'block',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 'clamp(13px, 2.2vw, 17px)',
                            fontWeight: 400,
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            padding: '8px 0',
                            textDecoration: 'none',
                            transition: 'color 0.15s',
                            opacity: servicesOpen ? 1 : 0,
                            transform: servicesOpen ? 'translateX(0)' : 'translateX(-8px)',
                            transitionDelay: servicesOpen ? `${0.2 + ci * 0.05}s` : '0s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.label === 'Contact' ? (
                <a
                  href="#"
                  onClick={handleContact}
                  style={{
                    display: 'block',
                    color: '#FF7B7B',
                    fontSize: 'clamp(28px, 6vw, 48px)',
                    fontWeight: 700,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2',
                    padding: '8px 0',
                    textDecoration: 'none',
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.4s ease ${idx * 0.07}s, transform 0.4s ease ${idx * 0.07}s`,
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  href={item.href ?? '#'}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    color: 'white',
                    fontSize: 'clamp(28px, 6vw, 48px)',
                    fontWeight: 700,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2',
                    padding: '8px 0',
                    textDecoration: 'none',
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.4s ease ${idx * 0.07}s, transform 0.4s ease ${idx * 0.07}s`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FF7B7B')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                >
                  {item.label}
                </a>
              )}

              {/* Divider */}
              {idx < navItems.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
              )}
            </div>
          ))}
        </nav>

        {/* Footer info inside overlay */}
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.06em' }}>
            HERBERT &amp; BALL LLP — MAYFAIR, LONDON
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontFamily: 'Plus Jakarta Sans, sans-serif', marginTop: '4px' }}>
            020 3897 0445
          </p>
        </div>
      </div>
    </>
  )
}
