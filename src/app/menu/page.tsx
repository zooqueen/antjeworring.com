'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function MenuPage() {
  return (
    <main style={{ background: 'var(--color-pink)', minHeight: '100vh' }}>
      <Navigation />

      {/* Header */}
      <section style={{ paddingTop: '120px', paddingBottom: '2rem', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: 'var(--color-black)',
            marginBottom: '1rem',
          }}
        >
          Weekly Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.2rem',
            color: 'var(--color-black)',
            opacity: 0.7,
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0 1rem',
          }}
        >
          Chef-prepared meals delivered to your door. Order by Thursday for next week.
        </motion.p>
      </section>

      {/* Embedded Menu */}
      <section style={{ padding: '0 1rem 4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            background: '#fff',
          }}
        >
          <iframe
            src="https://secretmenusf.com/weekly/iframe"
            width="100%"
            height="1200"
            style={{
              border: 'none',
              display: 'block',
            }}
            title="SF Secret Menu - Weekly Menu"
            allow="clipboard-write"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: '3rem',
          }}
        >
          <a
            href="https://secretmenusf.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'var(--color-black)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '50px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Subscribe & Order →
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
