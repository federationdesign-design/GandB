'use client'
import Nav from '../../components/Nav'

export default function CookiePolicy() {
  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#1a2340', minHeight: '100vh' }}>
      <Nav />

      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#FF7B7B', marginBottom: '16px' }}>LEGAL</p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, lineHeight: '1.15', marginBottom: '12px' }}>Cookie Policy</h1>
        <p style={{ fontSize: '13px', color: '#1a2340', opacity: 0.5, marginBottom: '48px' }}>Last updated: July 2026</p>

        {[
          {
            title: '1. What are cookies',
            body: 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners. Cookies do not contain personally identifiable information, but personal data that we store about you may be linked to information stored in and obtained from cookies.'
          },
          {
            title: '2. How we use cookies',
            body: 'Our website uses cookies to distinguish you from other users and to improve your experience. Some cookies are essential for the website to function correctly. Others help us understand how visitors interact with our site so we can improve it. We do not use cookies for advertising or to track you across other websites.'
          },
          {
            title: '3. Types of cookies we use',
            body: 'Strictly necessary cookies are required for the website to operate and cannot be switched off. They are usually set in response to actions you take such as setting your privacy preferences or filling in forms. Performance cookies allow us to count visits and understand how visitors move around the site so we can improve it. All information these cookies collect is anonymous. Functionality cookies enable the website to remember choices you make and provide enhanced features.'
          },
          {
            title: '4. Third-party cookies',
            body: 'We do not currently use third-party cookies for advertising or tracking purposes. If this changes, we will update this policy and seek your consent where required under the Privacy and Electronic Communications Regulations (PECR).'
          },
          {
            title: '5. Managing cookies',
            body: 'You can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. For more information about managing cookies, visit aboutcookies.org or allaboutcookies.org. To opt out of being tracked by Google Analytics across all websites, visit tools.google.com/dlpage/gaoptout.'
          },
          {
            title: '6. Changes to this policy',
            body: 'We may update this Cookie Policy from time to time to reflect changes in technology or legislation. We will notify you of any significant changes by updating the date at the top of this page.'
          },
          {
            title: '7. Contact us',
            body: 'If you have any questions about our use of cookies, please contact us at privacy@herbertandball.com or write to us at Herbert & Ball LLP, International House, 142 Cromwell Road, London SW7 4EF.'
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
