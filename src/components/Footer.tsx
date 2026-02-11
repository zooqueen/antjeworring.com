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

          {/* Footer Navigation - mirrors header */}
          <div
            style={{
              paddingTop: '3rem',
              borderTop: '1px solid rgba(255,255,255,0.2)',
            }}
            className="footer-bottom"
          >
            {/* Nav Links */}
            <div className="footer-nav" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <Link href="/about" style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.6rem 1rem' }}>ABOUT</Link>
              <Link href="/contact" style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.6rem 1rem' }}>CONTACT</Link>
              <Link href="/press" style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.6rem 1rem' }}>PRESS</Link>
              <Link href="/work" style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.6rem 1rem' }}>WORK</Link>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <Link href="https://instagram.com/antje_worring" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.6rem', height: '3.6rem', borderRadius: '50%', color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="https://github.com/zooqueen" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.6rem', height: '3.6rem', borderRadius: '50%', color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link href="https://dribbble.com/antjekarina" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3.6rem', height: '3.6rem', borderRadius: '50%', color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
                </svg>
              </Link>
            </div>

            {/* Copyright */}
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              © ANTJE WORRING 2015–2025 • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
