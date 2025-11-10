'use client'

import { motion } from 'framer-motion'
import { Newspaper, ExternalLink } from 'lucide-react'

interface PressItem {
  id: string
  title: string
  publication: string
  date: string
  url?: string
  description: string
  category: 'feature' | 'interview' | 'mention'
}

const pressItems: PressItem[] = [
  {
    id: 'sf-chronicle',
    title: 'Teen Entrepreneur Makes Waves in Fashion',
    publication: 'San Francisco Chronicle',
    date: '2015',
    description: 'Featured article on Karma Bikinis launch and teenage entrepreneurship in fashion industry.',
    category: 'feature',
  },
  {
    id: 'marin-ij',
    title: 'Local Teen Designer Shows at Miami Swim Week',
    publication: 'Marin Independent Journal',
    date: '2016',
    description: 'Coverage of Miami Swim Week debut and the journey of a young fashion entrepreneur.',
    category: 'feature',
  },
  {
    id: 'pacific-sun',
    title: 'Karma Bikinis: Fashion with Purpose',
    publication: 'Pacific Sun',
    date: '2016',
    description: 'In-depth feature on the philosophy and mission behind Karma Bikinis.',
    category: 'interview',
  },
  {
    id: 'startup-grind',
    title: 'COO of Lux Partners on Web3 & Fashion',
    publication: 'Startup Grind',
    date: '2022',
    description: 'Panel discussion on blockchain technology, NFTs, and the future of fashion.',
    category: 'interview',
  },
  {
    id: 'ssw-panel',
    title: 'Blockchain & NFTs in Fashion Industry',
    publication: 'Swim Show Week',
    date: '2022',
    description: 'Panelist discussing the intersection of blockchain technology and fashion at SSW 2022.',
    category: 'interview',
  },
]

export function Press() {
  return (
    <section style={{ marginBottom: '10rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '6rem' }}
      >
        <h2 style={{ 
          fontSize: '4.5rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-family-bold)'
        }}>
          Press & Media
        </h2>
        <p style={{ 
          color: '#666', 
          fontSize: '1.8rem',
          fontFamily: 'var(--font-family-light)'
        }}>
          Featured in publications and speaking engagements
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid',
        gap: '3rem'
      }}>
        {pressItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              display: 'flex',
              gap: '3rem',
              padding: '3rem',
              background: '#fafafa',
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s ease',
              cursor: item.url ? 'pointer' : 'default',
            }}
            onMouseEnter={(e) => {
              if (item.url) {
                e.currentTarget.style.transform = 'translateX(5px)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
              }
            }}
            onMouseLeave={(e) => {
              if (item.url) {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
            onClick={() => {
              if (item.url) window.open(item.url, '_blank')
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '6rem',
              height: '6rem',
              background: '#fff',
              border: '1px solid #e0e0e0',
            }}>
              <Newspaper size={32} color="#666" />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '1.4rem',
                  padding: '0.5rem 1rem',
                  background: item.category === 'feature' ? '#e3f2fd' : 
                              item.category === 'interview' ? '#f3e5f5' : '#fff3e0',
                  color: item.category === 'feature' ? '#1976d2' :
                         item.category === 'interview' ? '#7b1fa2' : '#f57c00',
                  letterSpacing: '0.05rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  {item.category}
                </span>
                <span style={{
                  fontSize: '1.6rem',
                  color: '#999',
                  fontFamily: 'var(--font-family-regular)',
                }}>
                  {item.date}
                </span>
              </div>

              <h3 style={{ 
                fontSize: '2.4rem',
                marginBottom: '1rem',
                fontFamily: 'var(--font-family-bold)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                {item.title}
                {item.url && <ExternalLink size={20} />}
              </h3>

              <p style={{
                fontSize: '1.8rem',
                color: '#666',
                marginBottom: '1rem',
                fontFamily: 'var(--font-family-regular)',
                fontStyle: 'italic',
              }}>
                {item.publication}
              </p>

              <p style={{
                fontSize: '1.6rem',
                color: '#666',
                lineHeight: '1.6',
                fontFamily: 'var(--font-family-light)',
              }}>
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 868px) {
          article {
            flex-direction: column !important;
            padding: 2rem !important;
          }
          article > div:first-child {
            min-width: 100% !important;
            height: 8rem !important;
          }
        }
      `}</style>
    </section>
  )
}
