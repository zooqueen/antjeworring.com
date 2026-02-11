'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const paragraphStyle = {
  fontSize: '1.8rem',
  lineHeight: '1.8',
  color: 'var(--color-black)',
  marginBottom: '2rem',
}

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
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: '#fff',
              textAlign: 'center',
              fontFamily: "'Hippie Vintage', cursive",
            }}
          >
            about
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
              <p style={paragraphStyle}>
                I&apos;m Antje Worring, a multi-disciplinary designer working at the intersection of AI, design engineering, and public-good infrastructure.
              </p>

              <p style={paragraphStyle}>
                My work focuses on building human-centered AI systems, responsible interfaces, and the underlying design frameworks that help complex technologies move safely from research into the real world. I specialize in the early stages of ambitious projects — where decisions about architecture, usability, and values matter most.
              </p>

              <p style={paragraphStyle}>
                Before working in AI and emerging technology, I founded and ran an international fashion brand for over a decade. What began as a protest against fast fashion became a hands-on education in supply chains, community-driven design, ethical production, and building systems that scale under real constraints. That experience shaped how I approach technology today: grounded, iterative, and accountable to people beyond the screen.
              </p>

              <p style={paragraphStyle}>
                Over time, my practice expanded from visual and brand design into design engineering — collaborating closely with researchers, engineers, and founders to translate powerful ideas into tools people can actually use. My work spans AI-enhanced creative systems, LLM applications, RAG architectures, developer tools, and crypto-native products, with a consistent emphasis on clarity, safety, and usability.
              </p>

              <p style={paragraphStyle}>
                Alongside commercial work, I&apos;m deeply involved in public-goods and nonprofit initiatives. Through conservation, food security, and regenerative agriculture projects, I explore how technology, funding mechanisms, and design can support real-world outcomes — not abstraction, not speculation, but measurable impact.
              </p>
            </motion.div>
          </div>

          {/* How I Think */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: '6rem auto 0' }}
          >
            <h2
              style={{
                fontSize: '2.4rem',
                fontWeight: 700,
                color: 'var(--color-black)',
                marginBottom: '2rem',
                fontFamily: "'Blauer Neue', sans-serif",
              }}
            >
              How I think
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Design is infrastructure, not decoration',
                'Safety and usability are inseparable',
                'Systems should fail gracefully',
                'Technology should expand agency, not complexity',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '1.8rem',
                    lineHeight: '1.8',
                    color: 'var(--color-black)',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    marginBottom: '0.8rem',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0 }}>—</span>
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ ...paragraphStyle, marginTop: '3rem' }}>
              I&apos;m most interested in work that sits between disciplines — where design informs engineering, ethics inform product decisions, and long-term consequences are taken seriously.
            </p>

            <p style={{ ...paragraphStyle, marginBottom: 0 }}>
              If you&apos;re building something thoughtful, difficult, or quietly ambitious, I&apos;m always open to conversation.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
