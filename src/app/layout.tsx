import type { Metadata, Viewport } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { PipPlayer } from '@/components/PipPlayer'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Antje Worring | AI Scientist & Chief Scientist, Zoo Labs Foundation',
  description: 'Portfolio of Antje Worring — AI scientist, researcher, and design engineer. Chief Scientist at Zoo Labs Foundation, leading research on the Zoo and Zen model families.',
  keywords: ['Antje Worring', 'AI scientist', 'Zoo Labs', 'Zen models', 'embeddings', 'research', 'conservation', 'design'],
  authors: [{ name: 'Antje Worring', url: 'https://antjeworring.com' }],
  openGraph: {
    title: 'Antje Worring | AI Scientist & Chief Scientist, Zoo Labs Foundation',
    description: 'AI scientist, researcher, and design engineer. Chief Scientist at Zoo Labs Foundation.',
    url: 'https://antjeworring.com',
    siteName: 'Antje Worring',
    type: 'website',
    images: [
      {
        url: 'https://antjeworring.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Antje Worring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@antje_worring',
    creator: '@antje_worring',
    images: ['https://antjeworring.com/og-image.jpg'],
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
