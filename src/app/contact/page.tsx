'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-name"
            style={{
              color: '#fff',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              fontSize: '2rem',
            }}
          >
            ( Let&apos;s create something together )
          </motion.p>
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
            className="contact-grid"
          >
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: 'var(--color-black)',
                  marginBottom: '2rem',
                  textTransform: 'lowercase',
                }}
              >
                get in touch
              </h2>

              <div style={{ marginBottom: '3rem' }}>
                <p
                  style={{
                    fontSize: '1.8rem',
                    lineHeight: '1.8',
                    color: 'var(--color-black)',
                    marginBottom: '1rem',
                  }}
                >
                  hello@antjeworring.com
                </p>
                <p
                  style={{
                    fontSize: '1.8rem',
                    lineHeight: '1.8',
                    color: 'var(--color-black)',
                    marginBottom: '1rem',
                  }}
                >
                  San Francisco, CA
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <a
                  href="https://instagram.com/antje_worring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button outline"
                  style={{ textTransform: 'lowercase' }}
                >
                  instagram
                </a>
                <a
                  href="https://github.com/zooqueen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button outline"
                  style={{ textTransform: 'lowercase' }}
                >
                  github
                </a>
                <a
                  href="https://twitter.com/zoo_labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button outline"
                  style={{ textTransform: 'lowercase' }}
                >
                  twitter
                </a>
                <a
                  href="https://linkedin.com/in/antje-worring"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button outline"
                  style={{ textTransform: 'lowercase' }}
                >
                  linkedin
                </a>
              </div>
            </motion.div>

            {/* Right - Areas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontSize: '4rem',
                  fontWeight: 700,
                  color: 'var(--color-black)',
                  marginBottom: '2rem',
                  textTransform: 'lowercase',
                }}
              >
                i can help with
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Fashion & Swimwear Design',
                  'Creative Direction',
                  'Brand Strategy',
                  'Web3 & NFT Projects',
                  'Conservation Initiatives',
                  'Speaking Engagements',
                ].map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      padding: '1.5rem 2rem',
                      background: 'rgba(255,255,255,0.5)',
                      borderRadius: '12px',
                      fontSize: '1.6rem',
                      color: 'var(--color-black)',
                    }}
                  >
                    {area}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
