'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimalCardProps {
  name: string
  frontVideo: string
  backVideo: string
}

export function AnimalCard({ name, frontVideo, backVideo }: AnimalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState({ front: false, back: false })
  const cardRef = useRef<HTMLDivElement>(null)
  const frontVideoRef = useRef<HTMLVideoElement>(null)
  const backVideoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    if (isVisible) {
      if (!isFlipped && frontVideoRef.current && videosLoaded.front) {
        frontVideoRef.current.play().catch(() => {})
      }
      if (isFlipped && backVideoRef.current && videosLoaded.back) {
        backVideoRef.current.play().catch(() => {})
      }
    } else {
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
            background: '#000',
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
                objectFit: 'contain',
                opacity: videosLoaded.front ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <source src={frontVideo} type="video/mp4" />
            </video>
          )}
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
            background: '#000',
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
                objectFit: 'contain',
                opacity: videosLoaded.back ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <source src={backVideo} type="video/mp4" />
            </video>
          )}
        </div>
      </motion.div>
    </div>
  )
}
