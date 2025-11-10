'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

// Dribbble icon component
const DribbbleIcon = ({ size = 24, color = '#fff' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm8.9 5.37c1.5 1.88 2.42 4.26 2.48 6.86-2.43-.52-4.73-.52-6.93-.01-.21-.52-.42-1.03-.66-1.52 2.42-1 4.42-2.45 5.11-5.33zm-8.9-3.87c2.67 0 5.1.97 6.98 2.57-1.03 2.55-2.88 3.83-5.08 4.73-1.3-2.38-2.73-4.42-4.28-6.13 1.42-.72 3.01-1.17 4.38-1.17zm-6.93 2.73c1.48 1.64 2.88 3.6 4.16 5.91-3.83 1.03-7.23 1-9.79.8.8-3.35 2.85-6.08 5.63-6.71zm-4.5 9.27c0-.31.01-.62.03-.93 2.88.24 6.63.24 10.73-.93.21.42.41.85.6 1.28-5.24 1.48-8.58 5.63-9.9 9.39-1.76-2.02-2.8-4.66-2.8-7.54.03-.09.03-.18.03-.27zm6.93 10.8c-2.03 0-3.91-.58-5.51-1.58 1.18-3.35 4.01-7.05 8.73-8.37 1.27 3.29 2.18 6.93 2.57 10.77-1.82.73-3.83 1.18-5.79 1.18zm7.81-2.03c-.36-3.6-1.24-7.05-2.45-10.16 1.97-.31 4.04-.24 6.17.28-.52 4.26-2.88 7.91-6.35 9.88h.63z" fill={color}/>
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: '#1a1a1a',
      color: '#fff',
      padding: '8rem 3rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6rem',
        marginBottom: '6rem'
      }} className="footer-grid">
        {/* About */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '2rem' }}>Antje Worring</h3>
          <p style={{ color: '#cccccc', fontSize: '1.4rem' }}>
            Multi-disciplinary artist, designer, and metaverse architect.
            Director of Zoo Labs Foundation - Conservation through creativity.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '2rem' }}>Navigate</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              href="/"
              style={{ color: '#cccccc', fontSize: '1.4rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cccccc'}
            >
              Home
            </Link>
            <Link
              href="/work"
              style={{ color: '#cccccc', fontSize: '1.4rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
            >
              Work
            </Link>
            <Link
              href="/about"
              style={{ color: '#cccccc', fontSize: '1.4rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cccccc'}
            >
              About
            </Link>
            <Link
              href="/contact"
              style={{ color: '#cccccc', fontSize: '1.4rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cccccc'}
            >
              Contact
            </Link>
            <a
              href="https://zoolabs.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cccccc', fontSize: '1.4rem' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#cccccc'}
            >
              Zoo Labs Foundation
            </a>
          </nav>
        </div>

        {/* Connect */}
        <div>
          <h3 style={{ color: '#fff', marginBottom: '2rem' }}>Connect</h3>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <a
              href="https://dribbble.com/antjekarina"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              aria-label="Dribbble"
            >
              <DribbbleIcon size={24} color="#fff" />
            </a>
            <a
              href="https://github.com/zooqueen"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              aria-label="GitHub"
            >
              <Github size={24} color="#fff" />
            </a>
            <a
              href="https://twitter.com/zoo_labs"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              aria-label="Twitter"
            >
              <Twitter size={24} color="#fff" />
            </a>
            <a
              href="https://linkedin.com/in/antje-worring"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              aria-label="LinkedIn"
            >
              <Linkedin size={24} color="#fff" />
            </a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(204, 204, 204, 0.2)',
        paddingTop: '3rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#cccccc', fontSize: '1.4rem' }}>
          © {currentYear} Antje Worring. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 868px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          footer {
            padding: 6rem 2rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
