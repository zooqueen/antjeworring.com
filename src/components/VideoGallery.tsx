'use client'

import { motion } from 'framer-motion'

interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
  thumbnail?: string
  category: string
  year: string
}

interface VideoGalleryProps {
  videos: Video[]
  featured?: boolean
}

export function VideoGallery({ videos, featured = false }: VideoGalleryProps) {
  return (
    <section style={{ marginBottom: '10rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '6rem' }}
      >
        <h2 style={{ 
          fontSize: featured ? '6rem' : '4.5rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-family-bold)'
        }}>
          {featured ? 'Latest Fashion Videos' : 'Video Gallery'}
        </h2>
        <p style={{ 
          color: '#666', 
          fontSize: '1.8rem',
          fontFamily: 'var(--font-family-light)'
        }}>
          Campaign videos, interviews, and behind-the-scenes content
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: featured ? '1fr' : 'repeat(2, 1fr)',
        gap: '4rem'
      }}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            {/* Video Embed */}
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              marginBottom: '2rem',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              background: video.youtubeId ? '#000' : '#f5f5f5',
            }}
            onMouseEnter={(e) => {
              if (video.youtubeId) {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'
              }
            }}
            onMouseLeave={(e) => {
              if (video.youtubeId) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
            >
              {video.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  fontSize: '1.8rem',
                  fontFamily: 'var(--font-family-regular)',
                  padding: '2rem',
                  textAlign: 'center',
                }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '1.5rem' }}>
                    <path d="M10 8L16 12L10 16V8Z" fill="white"/>
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                  <div style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Video Coming Soon
                  </div>
                  <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    Add YouTube ID to display video
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div>
              <p style={{
                fontSize: '1.6rem',
                color: '#999',
                marginBottom: '1rem',
                fontFamily: 'var(--font-family-regular)',
                letterSpacing: '0.05rem',
                textTransform: 'uppercase',
              }}>
                {video.category} · {video.year}
              </p>
              <h3 style={{ 
                fontSize: featured ? '3.5rem' : '2.8rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-family-bold)'
              }}>
                {video.title}
              </h3>
              <p style={{
                fontSize: '1.6rem',
                color: '#666',
                lineHeight: '1.6',
                fontFamily: 'var(--font-family-light)',
              }}>
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 868px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  )
}

// Predefined video data
export const featuredVideos: Video[] = [
  {
    id: 'jungle-bikini-2025',
    title: 'Jungle Bikini Campaign 2025',
    description: 'Latest collection showcasing tropical-inspired designs in lush jungle settings.',
    youtubeId: 'dQw4w9WgXcQ', // REPLACE WITH YOUR VIDEO ID
    category: 'Fashion Campaign',
    year: '2025',
  },
  {
    id: 'summer-of-love',
    title: 'Summer of Love Campaign',
    description: 'Feel-good summer campaign celebrating connection, creativity, and coastal vibes.',
    youtubeId: 'jNQXAC9IVRw', // REPLACE WITH YOUR VIDEO ID
    category: 'Fashion Campaign',
    year: '2020',
  },
]

export const allVideos: Video[] = [
  ...featuredVideos,
  {
    id: 'miami-swim-week-interview',
    title: 'Miami Swim Week Interview',
    description: 'Interview at Miami Swim Week discussing Karma Bikinis journey and fashion entrepreneurship.',
    youtubeId: 'M7lc1UVf-VE', // REPLACE WITH YOUR VIDEO ID
    category: 'Interview',
    year: '2016',
  },
  {
    id: 'less-boring-summer',
    title: 'Less Boring Summer - Escape from COVID',
    description: 'Creative campaign video promoting outdoor fun during the pandemic.',
    youtubeId: '9bZkp7q19f0', // REPLACE WITH YOUR VIDEO ID
    category: 'Campaign',
    year: '2020',
  },
  {
    id: 'polynesian-princess',
    title: 'Polynesian Princess Campaign',
    description: 'Tropical campaign celebrating island culture and natural beauty.',
    youtubeId: 'YQHsXMglC9A', // REPLACE WITH YOUR VIDEO ID
    category: 'Campaign',
    year: '2020',
  },
  {
    id: 'dayna-karma-2022',
    title: 'Dayna x Karma Collaboration',
    description: 'Behind the scenes of the Dayna x Karma collaboration collection.',
    youtubeId: 'kJQP7kiw5Fk', // REPLACE WITH YOUR VIDEO ID
    category: 'Fashion Collaboration',
    year: '2022',
  },
  {
    id: 'ai-bias-discussion',
    title: 'AI Bias Discussion',
    description: 'Discussing AI bias, ethics, and the importance of responsible AI development.',
    youtubeId: '3-eo-khJMbk', // REPLACE WITH YOUR VIDEO ID
    category: 'Tech Talk',
    year: '2022',
  },
]
