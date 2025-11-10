'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Director & Founder',
    organization: 'Zoo Labs Foundation',
    period: '2020 - Present',
    description: 'Leading decentralized conservation initiatives. Building Web3 infrastructure for wildlife protection and environmental action.',
  },
  {
    role: 'Metaverse Architect',
    organization: 'Independent Practice',
    period: '2018 - Present',
    description: 'Designing immersive virtual worlds and fashion experiences. Creating bridges between physical and digital realities.',
  },
  {
    role: 'AI & Blockchain Researcher',
    organization: 'Multi-disciplinary Research',
    period: '2017 - Present',
    description: 'Exploring ethical AI applications, decentralized systems, and blockchain technology for creative and social impact.',
  },
  {
    role: 'Artist & Activist',
    organization: 'Studio Practice',
    period: '2015 - Present',
    description: 'Creating art at the intersection of technology, fashion, nature, and social justice. Using creativity as a tool for change.',
  },
]

export function Experience() {
  return (
    <section>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '6rem' }}
      >
        Journey
      </motion.h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            style={{
              borderLeft: '3px solid #1a1a1a',
              paddingLeft: '4rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem'
            }}
          >
            <p style={{ fontSize: '1.8rem', color: '#999', marginBottom: '1.5rem', letterSpacing: '0.05rem' }}>
              {exp.period}
            </p>
            <h3 style={{ marginBottom: '1rem', fontSize: '4.2rem' }}>{exp.role}</h3>
            <p style={{ fontSize: '2.4rem', color: '#666', marginBottom: '1.5rem', fontFamily: 'var(--font-family-regular)' }}>
              {exp.organization}
            </p>
            <p style={{ color: '#555', fontSize: '2rem', lineHeight: '150%' }}>{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
