'use client'

import { useState } from 'react'
import Nav from '../components/Nav'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [contactMethod, setContactMethod] = useState<string[]>([])

  const toggleMethod = (method: string) => {
    setContactMethod(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    )
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Nav />

      {/* Page header */}
      <div style={{ background: 'var(--navy)', paddingTop: '56px' }}>
        <div style={{ padding: '60px 24px 48px', maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--coral)', marginBottom: '16px' }}>
            HERBERT &amp; BALL LLP
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: '1.1', color: 'white', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Get in touch
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', maxWidth: '540px' }}>
            Tell us about your matter and we will be in touch to discuss how we can help.
          </p>
        </div>
      </div>

      {/* Split layout */}
      <div className="enquire-split">

        {/* Form column */}
        <div className="enquire-form" style={{ background: 'var(--coral)', padding: '48px 32px 56px' }}>

          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: '400px' }}>
              <p style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Thank you</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6' }}>
                We have received your enquiry and will be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '28px' }}>
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
                    fontWeight: 400, outline: 'none', WebkitTextFillColor: 'white', boxSizing: 'border-box',
                  }}
                />
              ))}

              <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, marginBottom: '16px', marginTop: '8px' }}>
                Ideal method of initial contact
              </p>

              {['Phone call', 'Mobile call', 'SMS / WhatsApp', 'Email'].map((option) => (
                <label key={option} onClick={() => toggleMethod(option)} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', cursor: 'pointer' }}>
                  <span style={{
                    width: '28px', height: '28px', minWidth: '28px', borderRadius: '6px',
                    border: '2px solid rgba(255,255,255,0.6)', background: contactMethod.includes(option) ? 'white' : 'transparent',
                    display: 'inline-block', transition: 'background 0.15s',
                  }} />
                  <span style={{ color: 'white', fontSize: '14px' }}>{option}</span>
                </label>
              ))}

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '16px', marginBottom: '8px', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '3px', minWidth: '18px', height: '18px', accentColor: 'white', cursor: 'pointer' }} />
                <span style={{ color: 'white', fontSize: '12px', lineHeight: '1.5' }}>
                  I agree to Herbert &amp; Ball LLP contacting me in response to this enquiry. My data will be handled in accordance with the{' '}
                  <a href="/legal/privacy-policy" style={{ color: 'white', textDecoration: 'underline' }}>privacy policy</a>.
                </span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  onClick={() => setSubmitted(true)}
                  style={{ background: 'white', border: 'none', borderRadius: '100px', padding: '14px 36px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--coral)', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}
                >
                  ENQUIRE
                </button>
              </div>
            </>
          )}
        </div>

        {/* Info column */}
        <div className="enquire-image" style={{ background: 'var(--navy)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px' }}>
          <img src="/footer-logo.svg" alt="Herbert & Ball" style={{ height: '48px', width: 'auto', marginBottom: '40px', filter: 'brightness(0) invert(1)' }} />

          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--coral)', marginBottom: '10px' }}>ADDRESS</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7' }}>
              International House<br />
              142 Cromwell Road<br />
              London<br />
              SW7 4EF
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--coral)', marginBottom: '10px' }}>TELEPHONE</p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)' }}>020 3897 0445</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--coral)', marginBottom: '10px' }}>SERVICES</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>
              Aerospace, Aviation &amp; Defence<br />
              Technology &amp; Innovation<br />
              Media, Entertainment &amp; Creative Industries<br />
              Regulated Industries<br />
              Commercial Law
            </p>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '32px' }} />

          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            &copy; 2026 Herbert &amp; Ball LLP
          </p>
        </div>

      </div>
    </div>
  )
}
