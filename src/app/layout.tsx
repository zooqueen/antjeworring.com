import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { PipPlayer } from '@/components/PipPlayer'
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
    images: [
      {
        url: 'https://antjeworr.ing/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Antje Worring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zoo_labs',
    creator: '@zoo_labs',
    images: ['https://antjeworr.ing/og-image.jpg'],
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
          <PipPlayer />
        </SmoothScroll>
      </body>
    </html>
  )
}
