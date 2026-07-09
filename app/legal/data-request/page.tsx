'use client'
import { useState } from 'react'
import { Metadata } from 'next'

export default function DataRequest() {
  const [submitted, setSubmitted] = useState(false)
  const [requestType, setRequestType] = useState('')

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a2340', minHeight: '100vh' }}>
      <nav style={{ background: '#1a2340', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/"><img src="/header-logo.svg" alt="Herbert & Ball" style={{ height: '14px' }} /></a>
        <a href="/" style={{ color: 'white', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', textDecoration: 'none', opacity: 0.7 }}>Back to site</a>
      </nav>

      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#FF7B7B', marginBottom: '16px' }}>LEGAL</p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '1.15', marginBottom: '16px' }}>Data Request</h1>
        <p style={{ fontSize: '15px', lineHeight: '1.7', opacity: 0.75, marginBottom: '48px' }}>
          Under the UK General Data Protection Regulation (UK GDPR) you have the right to request access to the personal data we hold about you, to request its correction or erasure, and to object to or restrict its processing. Use the form below to submit a data request and we will respond within one calendar month.
        </p>

        {submitted ? (
          <div style={{ background: '#f0f7f0', border: '1px solid #4CAF50', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#1a2340' }}>Request received</p>
            <p style={{ fontSize: '15px', opacity: 0.7 }}>We will respond to your request within one calendar month. You will receive a confirmation by email shortly.</p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '8px', opacity: 0.6 }}>TYPE OF REQUEST</label>
              {['Subject Access Request (access to my data)', 'Erasure Request (right to be forgotten)', 'Correction Request (rectify inaccurate data)', 'Restriction Request (limit processing)', 'Portability Request (receive data in portable format)', 'Objection (object to processing)'].map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="requestType" value={type} onChange={e => setRequestType(e.target.value)} style={{ accentColor: '#FF7B7B' }} />
                  <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{type}</span>
                </label>
              ))}
            </div>

            {['Full name', 'Email address', 'Phone number'].map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '8px', opacity: 0.6 }}>{field.toUpperCase()}</label>
                <input type={field === 'Email address' ? 'email' : 'text'} placeholder={field} style={{ width: '100%', padding: '14px 16px', border: '1px solid rgba(26,35,64,0.2)', borderRadius: '8px', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '8px', opacity: 0.6 }}>ADDITIONAL DETAILS</label>
              <textarea placeholder="Please provide any additional information that may help us locate your data, such as the nature of your previous contact with us or the approximate date." rows={5} style={{ width: '100%', padding: '14px 16px', border: '1px solid rgba(26,35,64,0.2)', borderRadius: '8px', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '8px', opacity: 0.6 }}>PROOF OF IDENTITY</label>
              <p style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.65, marginBottom: '12px' }}>To protect your data, we are required to verify your identity before processing your request. Please email a copy of a photo ID (passport or driving licence) to privacy@herbertandball.com, quoting the reference number we will provide in our confirmation email.</p>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px', cursor: 'pointer' }}>
              <input type="checkbox" required style={{ marginTop: '3px', minWidth: '18px', height: '18px', accentColor: '#FF7B7B' }} />
              <span style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.75 }}>
                I confirm that the information I have provided is accurate and that I am submitting this request in relation to my own personal data or on behalf of someone I am legally authorised to represent.
              </span>
            </label>

            <button
              onClick={() => setSubmitted(true)}
              style={{ background: '#1a2340', border: 'none', borderRadius: '100px', padding: '14px 40px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}
            >
              SUBMIT REQUEST
            </button>
          </div>
        )}

        <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid rgba(26,35,64,0.12)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>What happens next</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.7', opacity: 0.75, marginBottom: '20px' }}>We will acknowledge your request within three working days and respond in full within one calendar month. In complex cases, or where we receive multiple requests, we may extend this by a further two months. We will notify you if this is necessary.</p>
          <p style={{ fontSize: '15px', lineHeight: '1.7', opacity: 0.75, marginBottom: '20px' }}>We do not charge a fee for processing data requests unless the request is manifestly unfounded or excessive. If we are unable to fulfil your request, we will explain why.</p>
          <p style={{ fontSize: '15px', lineHeight: '1.7', opacity: 0.75 }}>If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" style={{ color: '#FF7B7B', textDecoration: 'none' }}>ico.org.uk</a> or by calling 0303 123 1113.</p>
        </div>
      </div>

      <footer style={{ background: '#1a2340', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          &copy; 2026 Herbert &amp; Ball LLP
        </p>
      </footer>
    </div>
  )
}
