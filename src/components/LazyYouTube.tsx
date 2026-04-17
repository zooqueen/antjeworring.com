'use client'

import { useState, useRef, useEffect } from 'react'

interface LazyYouTubeProps {
  videoId: string
  title: string
  aspectRatio?: string
  style?: React.CSSProperties
}

export function LazyYouTube({ videoId, title, aspectRatio = '56.25%', style }: LazyYouTubeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        paddingBottom: aspectRatio,
        height: 0,
        overflow: 'hidden',
        border: '1px solid #000',
        background: '#000',
        ...style,
      }}
    >
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '68px',
              height: '48px',
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '18px solid #fff',
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                marginLeft: '4px',
              }}
            />
          </div>
        </div>
      )}
      {isVisible && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          style={{
            position: 'absolute',
            top: '-60px',
            left: 0,
            width: '100%',
            height: 'calc(100% + 120px)',
            border: 'none',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  )
}
