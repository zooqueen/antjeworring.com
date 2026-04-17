'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollScrubVideoProps {
  src: string
  poster?: string
  className?: string
  style?: React.CSSProperties
}

export function ScrollScrubVideo({ src, poster, className, style }: ScrollScrubVideoProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration)
        setReady(true)
      }
    }

    if (video.readyState >= 1) handleLoaded()
    video.addEventListener('loadedmetadata', handleLoaded)
    video.addEventListener('durationchange', handleLoaded)
    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded)
      video.removeEventListener('durationchange', handleLoaded)
    }
  }, [])

  useEffect(() => {
    if (!ready || !duration) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const tick = () => {
      const cur = video.currentTime
      const target = targetTimeRef.current
      const diff = target - cur
      if (Math.abs(diff) > 0.01) {
        video.currentTime = cur + diff * 0.25
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const total = rect.height + viewportH
      const scrolled = viewportH - rect.top
      const progress = Math.min(1, Math.max(0, scrolled / total))
      targetTimeRef.current = progress * duration
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [ready, duration])

  return (
    <div ref={sectionRef} className={className} style={style}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}
