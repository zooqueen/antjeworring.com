'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Humano Studios vinyl DJ sets (curated selection)
const musicMixes = [
  { id: 'f2JvlUiHPLI', title: 'Deep House, Acid House, Funky House', artist: 'Azmito' },
  { id: '_gUQwRKK9Wc', title: 'Smooth City Pop, Nostalgic Funk', artist: 'Bobby Ghanoush' },
  { id: 'bb0dkBihiKU', title: 'Feel-Good Disco, Nu-Funk, Disco House', artist: "Hot N' Spicy Disco" },
  { id: 'NWj8HQAgo6g', title: 'Neo Deep House, Minimal & Deep Tech', artist: 'YAMADAtheGIANT' },
  { id: 'hKwCRJfiHBo', title: 'Japanese Selections: City Pop, Jazz, Funk', artist: 'martinradio' },
  { id: 'at5OAMsybVA', title: 'Funk Archive - Funk, Soul, Boogie & Breaks', artist: 'DJ FUNKSCRIBE' },
  { id: 'sL9LfE5tpdY', title: 'Soulful Jazz Funk, Latin Funk & Soul', artist: 'Lefto Early Bird' },
  { id: 'G2C60JjhLfs', title: 'International Disco, House Disco Edits', artist: "Hot N' Spicy Disco" },
  { id: 'pJcDiKkkYyU', title: 'Soulful Grooves, 70s & 80s Funk & Disco', artist: 'El Mizell' },
  { id: '9TGhIqmpdgo', title: 'Retro Discoteca, Italo, Eurodance', artist: 'Abbie Gobeli' },
  { id: 'W9FfO0CZgqU', title: 'Smooth Breakbeat & Electro', artist: 'Noah Coinflip' },
  { id: 'Wh4Id5QBHEA', title: 'Cosmic Dub, Experimental Downtempo', artist: 'Apt E' },
]

// Adnexus TV commercials
const tvAds = [
  { id: 'rsda3VIuRxM', title: 'Bellabeat', desc: "Women's Health Wearable" },
  { id: 'TVExxxHKqF8', title: 'Damon Motorcycles', desc: '500x ROI Campaign' },
  { id: 'QEQpdYYYlhc', title: 'TrillerFest', desc: 'Virtual Music Festival' },
  { id: '7zQZmovxRNs', title: 'Casper Blockchain', desc: 'Enterprise Blockchain' },
  { id: 'zZwdjRw3w2w', title: 'Cover Build', desc: 'Prefab Housing' },
  { id: 'A43eWc8vddg', title: 'Myle Tap', desc: 'Wearable Technology' },
  { id: '8TbWsxiyKUE', title: 'Unikoin Gold', desc: 'Esports Betting' },
]

// Adnexus showreels
const homeVideos = [
  { id: 'uF3f2BEctdU', title: 'Adnexus Showreel', desc: 'Showreel' },
  { id: '3ymfbDqsQs0', title: 'Adnexus Showreel 2', desc: 'Showreel' },
  { id: 'o_McZxpeaEc', title: 'Adnexus Showreel 3', desc: 'Showreel' },
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Ad break every 3–4 minutes (randomized)
const AD_BREAK_MIN = 180
const AD_BREAK_MAX = 240
const STATIC_DURATION = 2200 // 2.2s of TV static
const AD_FALLBACK_TIMEOUT = 90000 // 90s fallback if end event doesn't fire

function randomBreakInterval() {
  return AD_BREAK_MIN + Math.floor(Math.random() * (AD_BREAK_MAX - AD_BREAK_MIN))
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady?: () => void
  }
}

type Mode = 'loading' | 'music' | 'static-to-ad' | 'ad' | 'static-to-music'

export function PipPlayer() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)
  const [mode, setMode] = useState<Mode>('loading')
  const [size, setSize] = useState<'small' | 'medium'>('small')
  const [musicIndex, setMusicIndex] = useState(0)
  const [adIndex, setAdIndex] = useState(0)
  const [showAdLayer, setShowAdLayer] = useState(false)
  const [apiReady, setApiReady] = useState(false)

  // Shuffled playlists (stable across renders)
  const [musicList] = useState(() => shuffleArray(musicMixes))
  const [adList] = useState(() => shuffleArray([...tvAds, ...homeVideos]))

  // Refs
  const musicPlayerRef = useRef<any>(null)
  const adPlayerRef = useRef<any>(null)
  const musicTimerRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const breakThresholdRef = useRef(randomBreakInterval())
  const preMutedRef = useRef(true)
  const adTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const staticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playerCreatedRef = useRef(false)
  const adPlayerCreatedRef = useRef(false)

  // Refs that mirror state (for use in timers/callbacks to avoid stale closures)
  const modeRef = useRef<Mode>('loading')
  const isMutedRef = useRef(true)
  const adIndexRef = useRef(0)
  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { isMutedRef.current = isMuted }, [isMuted])
  useEffect(() => { adIndexRef.current = adIndex }, [adIndex])

  // ── Load YouTube IFrame API ──
  useEffect(() => {
    if (window.YT?.Player) {
      setApiReady(true)
      return
    }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      setApiReady(true)
    }
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  }, [])

  // ── Scroll trigger (one-way: once visible, stays visible) ──
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 600) setIsVisible(true)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Return-to-music logic (ref to avoid circular deps) ──
  const returnToMusic = useCallback(() => {
    if (adTimeoutRef.current) {
      clearTimeout(adTimeoutRef.current)
      adTimeoutRef.current = null
    }
    // Pause ad
    try { adPlayerRef.current?.pauseVideo?.() } catch {}

    setMode('static-to-music')

    staticTimeoutRef.current = setTimeout(() => {
      setShowAdLayer(false)
      setAdIndex(prev => (prev + 1) % adList.length)

      // Restore pre-ad mute state
      const wasMuted = preMutedRef.current
      setIsMuted(wasMuted)
      try {
        if (wasMuted) musicPlayerRef.current?.mute?.()
        else musicPlayerRef.current?.unMute?.()
        musicPlayerRef.current?.playVideo?.()
      } catch {}

      musicTimerRef.current = 0
      breakThresholdRef.current = randomBreakInterval()
      setMode('music')
    }, STATIC_DURATION)
  }, [adList.length])

  const returnToMusicRef = useRef(returnToMusic)
  useEffect(() => { returnToMusicRef.current = returnToMusic }, [returnToMusic])

  // ── Trigger ad break ──
  const triggerAdBreak = useCallback(() => {
    if (modeRef.current !== 'music') return

    // Remember mute state, mute music
    preMutedRef.current = isMutedRef.current
    try { musicPlayerRef.current?.mute?.() } catch {}

    setMode('static-to-ad')

    staticTimeoutRef.current = setTimeout(() => {
      setShowAdLayer(true)
      setIsMuted(false)
      setMode('ad')

      const ad = adList[adIndexRef.current]

      // Create or reuse ad player
      if (adPlayerCreatedRef.current && adPlayerRef.current) {
        try {
          adPlayerRef.current.loadVideoById(ad.id)
          adPlayerRef.current.unMute()
        } catch {}
      } else {
        const el = document.getElementById('pip-ad-player')
        if (!el) return
        adPlayerCreatedRef.current = true
        adPlayerRef.current = new window.YT.Player('pip-ad-player', {
          width: '100%',
          height: '100%',
          videoId: ad.id,
          playerVars: {
            autoplay: 1, mute: 0, controls: 0, showinfo: 0,
            rel: 0, modestbranding: 1, playsinline: 1,
            iv_load_policy: 3, disablekb: 1,
          },
          events: {
            onStateChange: (e: any) => {
              if (e.data === window.YT.PlayerState.ENDED && modeRef.current === 'ad') {
                returnToMusicRef.current()
              }
            },
          },
        })
      }

      // Fallback timeout in case end event doesn't fire
      adTimeoutRef.current = setTimeout(() => {
        if (modeRef.current === 'ad') returnToMusicRef.current()
      }, AD_FALLBACK_TIMEOUT)
    }, STATIC_DURATION)
  }, [adList])

  const triggerAdBreakRef = useRef(triggerAdBreak)
  useEffect(() => { triggerAdBreakRef.current = triggerAdBreak }, [triggerAdBreak])

  // ── Create music player when API + visibility ready ──
  useEffect(() => {
    if (!apiReady || !isVisible || isDismissed || playerCreatedRef.current) return
    if (!window.YT?.Player) return
    const el = document.getElementById('pip-music-player')
    if (!el) return

    playerCreatedRef.current = true
    musicPlayerRef.current = new window.YT.Player('pip-music-player', {
      width: '100%',
      height: '100%',
      videoId: musicList[0].id,
      playerVars: {
        autoplay: 1, mute: 1, controls: 0, showinfo: 0,
        rel: 0, modestbranding: 1, playsinline: 1,
        iv_load_policy: 3, disablekb: 1,
      },
      events: {
        onReady: () => setMode('music'),
        onStateChange: (e: any) => {
          if (e.data === window.YT.PlayerState.ENDED && modeRef.current === 'music') {
            setMusicIndex(prev => {
              const next = (prev + 1) % musicList.length
              try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}
              return next
            })
          }
        },
      },
    })
  }, [apiReady, isVisible, isDismissed, musicList])

  // ── Music timer → triggers ad break ──
  useEffect(() => {
    if (mode === 'music' && isVisible && !isDismissed && !isMinimized) {
      intervalRef.current = setInterval(() => {
        musicTimerRef.current += 1
        if (musicTimerRef.current >= breakThresholdRef.current) {
          musicTimerRef.current = 0
          triggerAdBreakRef.current()
        }
      }, 1000)
    }
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    }
  }, [mode, isVisible, isDismissed, isMinimized])

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current)
      if (staticTimeoutRef.current) clearTimeout(staticTimeoutRef.current)
      try { musicPlayerRef.current?.destroy?.() } catch {}
      try { adPlayerRef.current?.destroy?.() } catch {}
    }
  }, [])

  // ── Controls ──
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev
      try {
        if (modeRef.current === 'music') {
          if (next) musicPlayerRef.current?.mute?.()
          else musicPlayerRef.current?.unMute?.()
        } else if (modeRef.current === 'ad') {
          if (next) adPlayerRef.current?.mute?.()
          else adPlayerRef.current?.unMute?.()
        }
      } catch {}
      return next
    })
  }, [])

  const nextMusic = useCallback(() => {
    if (modeRef.current !== 'music') return
    setMusicIndex(prev => {
      const next = (prev + 1) % musicList.length
      try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}
      return next
    })
    musicTimerRef.current = 0
  }, [musicList])

  const prevMusic = useCallback(() => {
    if (modeRef.current !== 'music') return
    setMusicIndex(prev => {
      const next = (prev - 1 + musicList.length) % musicList.length
      try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}
      return next
    })
    musicTimerRef.current = 0
  }, [musicList])

  const skipAd = useCallback(() => {
    if (modeRef.current !== 'ad') return
    returnToMusicRef.current()
  }, [])

  // ── Render ──
  if (isDismissed) return null

  const currentMusic = musicList[musicIndex]
  const currentAd = adList[adIndex]
  const isStatic = mode === 'static-to-ad' || mode === 'static-to-music'
  const isAdPlaying = mode === 'ad'
  const isMusic = mode === 'music'
  const pipWidth = size === 'medium' ? 420 : 320
  const pipHeight = size === 'medium' ? 236 : 180
  const shouldShow = isVisible && mode !== 'loading'

  return (
    <>
      {/* ── Full player (always in DOM to preserve YT iframes) ── */}
      <motion.div
        className="pip-player"
        animate={{
          opacity: shouldShow && !isMinimized ? 1 : 0,
          y: shouldShow && !isMinimized ? 0 : 40,
          scale: shouldShow && !isMinimized ? 1 : 0.9,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 97,
          width: pipWidth,
          borderRadius: '1.2rem',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
          background: '#111',
          pointerEvents: shouldShow && !isMinimized ? 'auto' : 'none',
        }}
      >
        {/* Video area */}
        <div style={{ position: 'relative', width: '100%', height: pipHeight, background: '#000', overflow: 'hidden' }}>
          {/* Music player (z-index 1, always playing) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div id="pip-music-player" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* Ad player (z-index 2, overlays music during ad) */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            visibility: showAdLayer ? 'visible' : 'hidden',
          }}>
            <div id="pip-ad-player" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* ── 80s TV Static overlay ── */}
          <AnimatePresence>
            {isStatic && (
              <motion.div
                className="tv-static-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
                style={{ position: 'absolute', inset: 0, zIndex: 10 }}
              >
                <div className="tv-static-flash" />
                <div className="tv-static-noise" />
                <div className="tv-static-scanlines" />
                <div className="tv-static-bar" />
                <div className="tv-static-text">
                  {mode === 'static-to-ad' ? 'SIGNAL INTERRUPT' : 'RESUMING'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode badge */}
          {!isStatic && (
            <div style={{
              position: 'absolute',
              top: '0.6rem',
              left: '0.6rem',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: isMusic ? 'rgba(232, 93, 4, 0.9)' : 'rgba(61, 90, 61, 0.9)',
              color: '#fff',
              padding: '0.3rem 0.8rem',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.3s',
            }}>
              {isMusic ? '♪ MUSIC' : '▶ MY COMMERCIALS'}
            </div>
          )}

          {/* Minimize button */}
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              zIndex: 5,
              width: '2.4rem',
              height: '2.4rem',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              border: 'none',
              color: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Controls bar */}
        <div style={{
          padding: '0.8rem 1rem',
          background: '#111',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}>
          {/* Now playing */}
          <div style={{ overflow: 'hidden' }}>
            <p style={{
              fontSize: '1.1rem', color: '#fff', fontWeight: 600,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              margin: 0, lineHeight: 1.3,
            }}>
              {isAdPlaying ? currentAd?.title : currentMusic?.title}
            </p>
            <p style={{
              fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)',
              margin: 0, lineHeight: 1.3,
            }}>
              {isAdPlaying
                ? `${currentAd?.desc} · via Adnexus`
                : `${currentMusic?.artist} · via Humano Studios`
              }
            </p>
          </div>

          {/* Buttons row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Prev (music only) */}
            {isMusic && (
              <button onClick={prevMusic} style={btnRound} title="Previous mix">⏮</button>
            )}

            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              style={{
                ...btnRound,
                background: isMuted ? 'var(--color-orange)' : 'rgba(255,255,255,0.15)',
                width: '3.6rem',
                height: '3.6rem',
                fontSize: '1.6rem',
                transition: 'all 0.2s ease',
              }}
              title={isMuted ? 'Turn on sound' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Next / Skip Ad */}
            {isMusic && (
              <button onClick={nextMusic} style={btnRound} title="Next mix">⏭</button>
            )}
            {isAdPlaying && (
              <button onClick={skipAd} style={btnRound} title="Skip ad">⏭</button>
            )}

            <div style={{ flex: 1 }} />

            {/* Size toggle */}
            <button
              onClick={() => setSize(s => s === 'small' ? 'medium' : 'small')}
              style={btnPill}
              title="Toggle size"
            >
              {size === 'small' ? '⤢' : '⤡'}
            </button>

            {/* Dismiss */}
            <button onClick={() => setIsDismissed(true)} style={btnPill} title="Dismiss player">
              ✕
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Minimized pill ── */}
      <AnimatePresence>
        {isMinimized && isVisible && mode !== 'loading' && (
          <motion.button
            className="pip-minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMinimized(false)}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 97,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: isMusic ? 'var(--color-orange)' : 'var(--color-green)',
              color: '#fff',
              border: 'none',
              padding: '0.8rem 1.4rem',
              borderRadius: '3rem',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}
          >
            {isMusic ? '♪' : '▶'}{' '}
            {(isAdPlaying ? currentAd?.title : currentMusic?.title)?.slice(0, 20)}...
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Shared button styles ──
const btnRound: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  border: 'none',
  color: '#fff',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const btnPill: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  padding: '0.4rem 0.8rem',
  borderRadius: '2rem',
  cursor: 'pointer',
  fontSize: '0.95rem',
}
