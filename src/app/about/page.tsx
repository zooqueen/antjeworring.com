'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-pink)' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-green)',
          borderRadius: '0 0 40px 40px',
          padding: '14rem 0 6rem',
        }}
      >
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              fontSize: '1.4rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2rem',
              marginBottom: '1rem',
            }}
          >
            Get to know
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: '#fff',
              textAlign: 'center',
              fontFamily: "'Hippie Vintage', cursive",
            }}
          >
            me
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6rem',
              alignItems: 'start',
            }}
            className="about-grid"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: '20px',
                overflow: 'hidden',
                maxWidth: '60%',
              }}
            >
              <Image
                src="https://secretmenusf.com/assets/chef-antje-DGBw0JvD.jpg"
                alt="Antje Worring"
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
                priority
                unoptimized
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8',
                  color: 'var(--color-black)',
                  marginBottom: '2rem',
                }}
              >
                Antje (she/her) is a San Francisco-based creative director and founder who creates work that&apos;s whimsical and weirdly honest.
              </p>

              <p
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8',
                  color: 'var(--color-black)',
                  marginBottom: '2rem',
                }}
              >
                She specializes in fashion, Web3, and conservation work. After ten years in the fashion industry starting at age 14, she brings an elevated approach to everything she creates.
              </p>

              <p
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8',
                  color: 'var(--color-black)',
                  marginBottom: '2rem',
                }}
              >
                As founder of Karma Bikinis, Director of Zoo Labs Foundation, and co-founder at LUX Network, she bridges the worlds of fashion, technology, and conservation.
              </p>

              <p
                style={{
                  fontSize: '1.8rem',
                  lineHeight: '1.8',
                  color: 'var(--color-black)',
                }}
              >
                Her work, designs, and companies have been featured in British Vogue, People Magazine, Elle, The Washington Post, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
