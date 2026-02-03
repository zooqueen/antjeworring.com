import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Antje Worring | Multi-disciplinary Artist & Metaverse Architect',
  description: 'Portfolio of Antje Worring - Multi-disciplinary artist, designer, metaverse architect, and Director of Zoo Labs Foundation. Conservation through creativity.',
  keywords: ['Antje Worring', 'artist', 'designer', 'metaverse', 'Zoo Labs', 'conservation', 'architecture'],
  authors: [{ name: 'Antje Worring', url: 'https://antjeworring.com' }],
  openGraph: {
    title: 'Antje Worring | Multi-disciplinary Artist & Metaverse Architect',
    description: 'Portfolio of Antje Worring - Conservation through creativity',
    url: 'https://antjeworring.com',
    siteName: 'Antje Worring',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zoo_labs',
    creator: '@zoo_labs',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
