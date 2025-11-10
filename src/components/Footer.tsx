'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

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
