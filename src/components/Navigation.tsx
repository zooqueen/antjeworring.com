'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav style={{
        width: '100%',
        height: '6rem',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '0 3rem'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '1.5px solid #1a1a1a',
          paddingBottom: '1rem'
        }}>
          <Link href="/" style={{ fontSize: '2rem', fontFamily: 'var(--font-family-bold)' }}>
            Antje Worring
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: '1.5rem' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="https://zoolabs.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.5rem' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            className="desktop-link"
          >
            Zoo Labs
          </Link>

          {/* Mobile Menu Button */}
          <p
            onClick={() => setIsOpen(!isOpen)}
            style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-family-bold)',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-menu"
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Menu
          </p>
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
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 98
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '60%',
                background: '#1a1a1a',
                padding: '2rem 3rem',
                zIndex: 99,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <p
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: '#fff',
                    textAlign: 'right',
                    fontSize: '1.5rem',
                    paddingBottom: '2rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  close
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{ fontSize: '2rem', color: '#fff' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="https://zoolabs.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '2rem', color: '#fff' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Zoo Labs
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 868px) {
          .desktop-nav, .desktop-link {
            display: none !important;
          }
          .mobile-menu {
            display: block !important;
          }
          nav {
            padding: 0 2rem !important;
          }
        }
      `}</style>
    </>
  )
}
