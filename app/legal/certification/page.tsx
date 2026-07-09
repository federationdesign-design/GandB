import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certification | Herbert & Ball LLP',
}

export default function Certification() {
  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a2340', minHeight: '100vh' }}>
      <nav style={{ background: '#1a2340', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/"><img src="/header-logo.svg" alt="Herbert & Ball" style={{ height: '14px' }} /></a>
        <a href="/" style={{ color: 'white', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', textDecoration: 'none', opacity: 0.7 }}>Back to site</a>
      </nav>

      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#FF7B7B', marginBottom: '16px' }}>LEGAL</p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '1.15', marginBottom: '12px' }}>Certification</h1>
        <p style={{ fontSize: '13px', color: '#1a2340', opacity: 0.5, marginBottom: '48px' }}>Regulatory status and professional accreditations</p>

        {[
          {
            title: 'Regulatory status',
            body: 'Herbert & Ball LLP is a limited liability partnership registered in England and Wales (registration number [LLP NUMBER]). We are authorised and regulated by the Bar Standards Board (BSB). Our BSB registration number is [BSB NUMBER]. You can verify our regulatory status at the Bar Standards Board website: barstandardsboard.org.uk.'
          },
          {
            title: 'Professional indemnity insurance',
            body: 'Herbert & Ball LLP holds professional indemnity insurance as required by the Bar Standards Board Handbook. Our insurance provides cover for claims arising from the professional services we provide. Details of our insurer and the territorial coverage of our policy are available on request.'
          },
          {
            title: 'Complaints procedure',
            body: 'We are committed to providing a high-quality legal service. If you are unhappy with any aspect of our service, please contact our Client Relations Partner at complaints@herbertandball.com. We will acknowledge your complaint within three working days and aim to resolve it within 28 days. If you are not satisfied with our response, you may be able to refer your complaint to the Legal Ombudsman at legalombudsman.org.uk.'
          },
          {
            title: 'Anti-money laundering',
            body: 'Herbert & Ball LLP is subject to the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017. As a result, we may be required to verify your identity and the source of funds in certain matters before we are able to act for you. We take our obligations under anti-money laundering legislation seriously and will always seek to carry out these checks in a manner that is as straightforward as possible for our clients.'
          },
          {
            title: 'Equality and diversity',
            body: 'Herbert & Ball LLP is committed to promoting equality and diversity in all aspects of our work. We comply with the equality and diversity obligations set out in the BSB Handbook and we publish our equality and diversity data in accordance with those requirements. A copy of our Equality and Diversity Policy is available on request.'
          },
          {
            title: 'VAT',
            body: 'Herbert & Ball LLP is registered for Value Added Tax. Our VAT registration number is [VAT NUMBER]. VAT is charged on our fees at the applicable rate where required by law.'
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.7', opacity: 0.75 }}>{section.body}</p>
          </div>
        ))}
      </div>

      <footer style={{ background: '#1a2340', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          &copy; 2026 Herbert &amp; Ball LLP
        </p>
      </footer>
    </div>
  )
}
