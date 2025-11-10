'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

export function InstagramFeed() {
  return (
    <section style={{ marginBottom: '10rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '4rem', textAlign: 'center' }}
      >
        <h2 style={{ 
          fontSize: '4.5rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-family-bold)'
        }}>
          Follow the Journey
        </h2>
        <p style={{ 
          color: '#666', 
          fontSize: '1.8rem',
          fontFamily: 'var(--font-family-light)',
          marginBottom: '3rem'
        }}>
          Behind the scenes, campaigns, and daily inspiration
        </p>
        <a
          href="https://instagram.com/karma_bikinis"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '2rem',
            fontFamily: 'var(--font-family-bold)',
            color: '#000',
            padding: '1.5rem 3rem',
            border: '2px solid #000',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#000'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#000'
          }}
        >
          <Instagram size={24} />
          @karma_bikinis
        </a>
      </motion.div>

      {/* Instagram Embed Widget */}
      <div style={{
        maxWidth: '100rem',
        margin: '0 auto',
        padding: '2rem',
        background: '#fafafa',
        border: '1px solid #e0e0e0',
      }}>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        />
        {/* 
          To use this component:
          1. Go to https://elfsight.com/instagram-feed-instashow/
          2. Create a free widget for @karma_bikinis
          3. Copy the widget code and replace the div below
          
          Alternative: Use Instagram's official embed
          https://developers.facebook.com/docs/instagram/embedding
        */}
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          color: '#666',
        }}>
          <Instagram size={48} style={{ margin: '0 auto 2rem' }} />
          <p style={{ fontSize: '1.8rem' }}>
            Instagram feed will appear here
          </p>
          <p style={{ fontSize: '1.4rem', marginTop: '1rem' }}>
            Add your Instagram embed widget code to display latest posts
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 868px) {
          section {
            padding: 0 2rem;
          }
        }
      `}</style>
    </section>
  )
}
