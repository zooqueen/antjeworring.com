'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function About() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'start' }}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ lineHeight: '100%' }}
      >
        Merging technology, creativity & activism
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
      >
        <p style={{ color: '#555', fontSize: '2.2rem' }}>
          As a multi-disciplinary artist and researcher, I explore the intersections of AI, blockchain technology, 
          fashion innovation, and environmental conservation. My work challenges traditional boundaries between 
          art and technology, creating experiences that inspire action and change.
        </p>

        <p style={{ color: '#555', fontSize: '2.2rem' }}>
          Director of Zoo Labs Foundation—pioneering decentralized systems for wildlife protection. 
          Building the future of fashion through Web3. Creating metaverse architectures that bridge 
          physical and digital worlds. Advocating for ethical AI and sustainable innovation.
        </p>

        <Link
          href="/about"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            marginTop: '2rem',
            fontSize: '2.2rem',
            fontFamily: 'var(--font-family-bold)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Explore my work
          <Image src="/assets/arrowRight.png" alt="arrow" width={28} height={28} />
        </Link>
      </motion.div>

      <style jsx>{`
        @media (max-width: 868px) {
          section {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  )
}
