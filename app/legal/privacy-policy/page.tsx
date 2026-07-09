'use client'
import Nav from '../../components/Nav'

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a2340', minHeight: '100vh' }}>
      <Nav />

      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#FF7B7B', marginBottom: '16px' }}>LEGAL</p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '1.15', marginBottom: '12px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '13px', color: '#1a2340', opacity: 0.5, marginBottom: '48px' }}>Last updated: July 2026</p>

        {[
          {
            title: '1. Who we are',
            body: 'Herbert & Ball LLP is a limited liability partnership registered in England and Wales. Our registered office is at International House, 142 Cromwell Road, London SW7 4EF. We are the data controller for the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. If you have any questions about how we handle your personal data, please contact us at privacy@herbertandball.com.'
          },
          {
            title: '2. What data we collect',
            body: 'When you use our contact or enquiry form, we collect the information you provide including your name, email address, mobile number, company name, domain, and postcode. We also collect information about how you prefer to be contacted. We may also collect technical data such as your IP address and browser type when you visit our website, which we use solely for security and analytical purposes.'
          },
          {
            title: '3. How we use your data',
            body: 'We use the information you provide to respond to your enquiry, to assess whether we are able to assist you, and to contact you regarding your matter. Where you have given consent, we may also contact you with information about our services that may be relevant to your enquiry. We do not use your data for automated decision-making or profiling.'
          },
          {
            title: '4. Legal basis for processing',
            body: 'We process your personal data on the basis of your consent, which you provide when you submit our enquiry form. You may withdraw your consent at any time by contacting us at privacy@herbertandball.com. Withdrawal of consent does not affect the lawfulness of processing carried out prior to that withdrawal. Where we are required to retain data for legal or regulatory reasons, we rely on our legitimate interests or legal obligations as the basis for continued processing.'
          },
          {
            title: '5. How long we keep your data',
            body: 'If you become a client of Herbert & Ball LLP, we retain your personal data for a minimum of six years from the end of our engagement, in accordance with our professional obligations and applicable limitation periods. If you enquire but do not instruct us, we will retain your data for twelve months from the date of your enquiry, after which it will be securely deleted unless you have asked us to retain it.'
          },
          {
            title: '6. Who we share your data with',
            body: 'We do not sell, rent or trade your personal data. We may share your data with trusted third-party service providers who assist us in operating our business, such as IT service providers and cloud storage providers, all of whom are contractually required to maintain the confidentiality and security of your data. We may also disclose your data where required to do so by law or by a regulatory authority.'
          },
          {
            title: '7. International transfers',
            body: 'We store and process your data within the United Kingdom and the European Economic Area. Where any transfer outside these territories is necessary, we ensure that appropriate safeguards are in place in accordance with UK GDPR requirements.'
          },
          {
            title: '8. Your rights',
            body: 'Under UK GDPR you have the right to access the personal data we hold about you; to request correction of inaccurate data; to request erasure of your data in certain circumstances; to object to or restrict our processing of your data; to data portability; and to withdraw consent at any time. You also have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk. To exercise any of these rights, please contact us using the details in the Data Request section of this website.'
          },
          {
            title: '9. Cookies',
            body: 'We use cookies on our website. For full information about the cookies we use and how to manage them, please see our Cookie Policy.'
          },
          {
            title: '10. Changes to this policy',
            body: 'We may update this Privacy Policy from time to time. The date at the top of this page indicates when it was last revised. We encourage you to review this policy periodically.'
          },
          {
            title: '11. Contact us',
            body: 'For any questions about this Privacy Policy or to exercise your data protection rights, please contact us at: Herbert & Ball LLP, International House, 142 Cromwell Road, London SW7 4EF. Email: privacy@herbertandball.com. Telephone: 020 3897 0445.'
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
