'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/work', label: 'work' },
  { href: '/press', label: 'press' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '2rem 4rem',
        background: 'transparent',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Logo / Name */}
          <Link
            href="/"
            style={{
              fontSize: '1.4rem',
              fontWeight: 500,
              color: 'var(--color-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            ANTJE WORRING
            <span style={{ color: 'var(--color-orange)' }}>★</span>
            CREATIVE DIRECTOR
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: 'var(--color-black)',
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
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              fontSize: '1.4rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-black)',
            }}
            className="mobile-menu"
          >
            menu
          </button>
        </div>
      </nav>

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
                background: 'var(--color-green)',
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
                  fontSize: '1.4rem',
                  marginBottom: '4rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                close
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      fontSize: '3rem',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
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
          nav {
            padding: 1.5rem 2rem !important;
          }
        }
      `}</style>
    </>
  )
}
