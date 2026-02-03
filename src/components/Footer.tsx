'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export function Footer() {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const openCalEmbed = () => {
    // @ts-expect-error Cal is loaded from external script
    if (typeof window !== 'undefined' && window.Cal) {
      // @ts-expect-error Cal is loaded from external script
      window.Cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#daa520' } },
      })
      // @ts-expect-error Cal is loaded from external script
      window.Cal('modal', {
        calLink: 'antje-worring/15min',
      })
    }
  }

  return (
    <footer
      style={{
        background: '#000',
        color: '#fff',
        padding: '8rem 0 4rem',
        borderTop: '1px solid #000',
      }}
    >
      <div className="container">
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '6rem',
          }}
        >
          <h2
            style={{
              fontSize: '8rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '1rem',
              textTransform: 'lowercase',
            }}
          >
            contact
          </h2>
          <p style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.8)' }}>
            Let&apos;s work together
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            marginBottom: '6rem',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            hello@antjeworring.com
          </p>
          <p style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            San Francisco, CA
          </p>
          <p style={{ fontSize: '1.6rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>
            IG: @antje_worring
          </p>
          <button
            onClick={openCalEmbed}
            style={{
              fontSize: '1.6rem',
              fontWeight: 600,
              color: '#000',
              background: 'var(--color-orange)',
              border: 'none',
              borderRadius: '3rem',
              padding: '1.2rem 3rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(218, 165, 32, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Book a Call
          </button>
        </motion.div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
          className="footer-bottom"
        >
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>
            © ANTJE WORRING 2015–2025
            <br />
            ALL RIGHTS RESERVED
          </p>

          <div style={{ display: 'flex', gap: '3rem' }}>
            <Link
              href="/about"
              style={{
                fontSize: '1.6rem',
                color: '#fff',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              about
            </Link>
            <Link
              href="/work"
              style={{
                fontSize: '1.6rem',
                color: '#fff',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              work
            </Link>
            <button
              onClick={openCalEmbed}
              style={{
                fontSize: '1.6rem',
                color: '#fff',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              book a call
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 5rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
