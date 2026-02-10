'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCalEmbed, setShowCalEmbed] = useState(false)

  // Ensure footer video plays and loops when visible
  useEffect(() => {
    const video = videoRef.current
    const footer = footerRef.current
    if (!video || !footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        }
      },
      { threshold: 0.1 }
    )

    // Also handle video ending (fallback if loop attr fails)
    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }
    video.addEventListener('ended', handleEnded)

    observer.observe(footer)
    return () => {
      observer.disconnect()
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const openCalEmbed = () => {
    setShowCalEmbed(true)
    document.body.style.overflow = 'hidden'
  }

  const closeCalEmbed = () => {
    setShowCalEmbed(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* Cal.com Fullscreen Embed */}
      {showCalEmbed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCalEmbed()
          }}
        >
          <button
            onClick={closeCalEmbed}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '3rem',
              cursor: 'pointer',
              zIndex: 10000,
              lineHeight: 1,
            }}
            aria-label="Close booking"
          >
            ×
          </button>
          <iframe
            src="https://cal.com/antje-worring/15min?embed=true&theme=dark"
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '90vh',
              border: 'none',
              borderRadius: '12px',
            }}
            title="Book a call with Antje"
          />
        </div>
      )}

      <footer
        id="contact"
        ref={footerRef}
        style={{
          position: 'relative',
          color: '#fff',
          padding: '8rem 0 4rem',
          borderTop: '1px solid #000',
          overflow: 'hidden',
        }}
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        >
          <source src="/assets/footer-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
                href="https://dribbble.com/antjekarina"
                target="_blank"
                rel="noopener noreferrer"
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
      </footer>
    </>
  )
}
