'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  '/assets/project1.jpg',
  '/assets/project2.png',
  '/assets/project3.png',
  '/assets/project4.png',
  '/assets/project5.png',
]

export function Hero() {
  return (
    <header style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '10rem', paddingBottom: '6rem' }}>
      <div style={{ width: '100%' }}>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-heading"
          style={{ marginBottom: '8rem', maxWidth: '140rem' }}
        >
          Artist<span style={{ margin: '0 2rem', opacity: 0.4, display: 'inline-block', transform: 'translateY(0.2em)' }}>·</span>Designer<span style={{ margin: '0 2rem', opacity: 0.4, display: 'inline-block', transform: 'translateY(0.2em)' }}>·</span>Activist
          <span style={{
            display: 'block',
            marginTop: '3rem',
            color: '#666',
            fontSize: '6.4rem',
            fontFamily: 'var(--font-family-light)',
            letterSpacing: '-0.2rem',
            lineHeight: '110%'
          }}>
            AI × Blockchain × Fashion × Conservation
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', borderRadius: '0' }}
            >
              <Image
                src={src}
                alt={`Project ${index + 1}`}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s', filter: 'contrast(1.05)' }}
                sizes="(max-width: 768px) 50vw, 20vw"
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </header>
  )
}
