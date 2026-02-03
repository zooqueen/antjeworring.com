'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimalCardProps {
  name: string
  frontVideo: string
  backVideo: string
  stats: {
    species: string
    status: string
    population: string
    habitat: string
  }
}

export function AnimalCard({ name, frontVideo, backVideo, stats }: AnimalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState({ front: false, back: false })
  const cardRef = useRef<HTMLDivElement>(null)
  const frontVideoRef = useRef<HTMLVideoElement>(null)
  const backVideoRef = useRef<HTMLVideoElement>(null)

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: '100px', threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Control video playback based on visibility
  useEffect(() => {
    if (isVisible) {
      // Play the visible side's video
      if (!isFlipped && frontVideoRef.current && videosLoaded.front) {
        frontVideoRef.current.play().catch(() => {})
      }
      if (isFlipped && backVideoRef.current && videosLoaded.back) {
        backVideoRef.current.play().catch(() => {})
      }
    } else {
      // Pause both videos when not visible
      frontVideoRef.current?.pause()
      backVideoRef.current?.pause()
    }
  }, [isVisible, isFlipped, videosLoaded])

  return (
    <div
      ref={cardRef}
      style={{
        perspective: '1000px',
        cursor: 'pointer',
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            background: '#1a1a1a',
          }}
        >
          {isVisible && (
            <video
              ref={frontVideoRef}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideosLoaded(prev => ({ ...prev, front: true }))}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: videosLoaded.front ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <source src={frontVideo} type="video/mp4" />
            </video>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: '#fff',
            }}
          >
            <h4 style={{ fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              {name}
            </h4>
            <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Tap to flip</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            background: '#1a1a1a',
          }}
        >
          {isVisible && (
            <video
              ref={backVideoRef}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setVideosLoaded(prev => ({ ...prev, back: true }))}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: videosLoaded.back ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <source src={backVideo} type="video/mp4" />
            </video>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
              color: '#fff',
            }}
          >
            <h4 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.8rem', textTransform: 'uppercase' }}>
              {name} Stats
            </h4>
            <div style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
              <p><strong>Species:</strong> {stats.species}</p>
              <p><strong>Status:</strong> {stats.status}</p>
              <p><strong>Population:</strong> {stats.population}</p>
              <p><strong>Habitat:</strong> {stats.habitat}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
