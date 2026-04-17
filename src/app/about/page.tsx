'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const paragraphStyle = {
  fontSize: 'clamp(1.5rem, 0.9vw + 1.15rem, 1.75rem)',
  lineHeight: 1.75,
  color: 'var(--color-black)',
  marginBottom: '1.8rem',
}

const leadParagraphStyle = {
  fontSize: 'clamp(1.7rem, 1.1vw + 1.25rem, 2.05rem)',
  lineHeight: 1.6,
  color: 'var(--color-black)',
  marginBottom: '2.2rem',
  fontWeight: 500,
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-pink)' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-black)',
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
              gridTemplateColumns: 'minmax(260px, 380px) minmax(0, 1fr)',
              gap: 'clamp(3rem, 5vw, 5rem)',
              alignItems: 'start',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
            className="about-grid"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-image"
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: '20px',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Image
                src="https://secretmenusf.com/assets/chef-antje-DGBw0JvD.jpg"
                alt="Antje Worring"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 380px"
                unoptimized
                priority
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ maxWidth: '640px' }}
            >
              <p style={leadParagraphStyle}>
                I&apos;m Antje Worring — an AI scientist, researcher, and design engineer working at the intersection of frontier AI, public-good infrastructure, and human capability. I serve as Chief Scientist at <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>Zoo Labs Foundation</a>, a 501(c)(3) where I lead research and development of the Zoo and Zen model families.
              </p>

              <p style={paragraphStyle}>
                My research focuses on high-dimensional embedding spaces, decentralized semantic optimization, and efficient open-weight models. I co-authored <a href="https://zips.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>ZIP-002: Zen-Reranker</a> — the first embedding model with native 7680-dimensional output, achieving 68.4 MTEB and 31.87× BitDelta compression. Broader Zoo Labs research spans Proof of AI (PoAI) consensus, Agent NFTs, and training-free GRPO.
              </p>

              <p style={paragraphStyle}>
                Alongside research, I build. My work focuses on human-centered AI systems, responsible interfaces, and the underlying design frameworks that help complex technologies move safely from research into the real world. I specialize in the early stages of ambitious projects — where decisions about architecture, usability, and values matter most.
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
            style={{ maxWidth: '1200px', margin: '6rem auto 0' }}
          >
            <div style={{ maxWidth: '640px' }}>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 1.5vw + 1.4rem, 2.6rem)',
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
                      fontSize: 'clamp(1.5rem, 0.9vw + 1.15rem, 1.75rem)',
                      lineHeight: 1.75,
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
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
