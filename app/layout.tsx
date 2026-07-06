import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Herbert & Ball — Aerospace Law',
  description: 'Senior specialist counsel for the aerospace industry, operating from Mayfair, London.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
