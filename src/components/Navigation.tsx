'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/work', label: 'WORK' },
  { href: '/press', label: 'PRESS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.5s ease',
          ...(scrolled ? {
            background: 'rgba(255, 232, 251, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          } : {}),
        }}
      >
        {/* Floating bar container */}
        <div
          style={{
            margin: scrolled ? '0' : '1rem',
            borderRadius: scrolled ? '0' : '2rem',
            background: scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: scrolled ? 'none' : 'blur(10px)',
            transition: 'all 0.5s ease',
          }}
        >
          <nav
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '1.2rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo / Name */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--color-black)',
                }}
              >
                ANTJE WORRING
              </span>
              <span style={{ color: 'var(--color-orange)', fontSize: '1rem' }}>★</span>
            </Link>

            {/* Desktop Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    color: 'rgba(26, 26, 26, 0.7)',
                    padding: '0.8rem 1.2rem',
                    borderRadius: '2rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-black)'
                    e.currentTarget.style.background = scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(26, 26, 26, 0.7)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://instagram.com/zooqueen"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3.6rem',
                  height: '3.6rem',
                  borderRadius: '50%',
                  color: 'rgba(26, 26, 26, 0.7)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-black)'
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(26, 26, 26, 0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                cursor: 'pointer',
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--color-black)',
                padding: '0.8rem 1.2rem',
                borderRadius: '2rem',
              }}
              className="mobile-menu"
            >
              MENU
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 98,
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '70%',
                maxWidth: '320px',
                background: 'var(--color-orange)',
                padding: '3rem',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  alignSelf: 'flex-end',
                  color: '#fff',
                  fontSize: '1.2rem',
                  letterSpacing: '0.12em',
                  marginBottom: '4rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                CLOSE
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: '2.4rem',
                      color: '#fff',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
                <Link
                  href="https://instagram.com/zooqueen"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    color: '#fff',
                    fontSize: '1.2rem',
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @ZOOQUEEN
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
