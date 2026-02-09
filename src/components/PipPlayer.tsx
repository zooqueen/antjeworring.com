'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
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

const AD_BREAK_MIN = 180
const AD_BREAK_MAX = 240
const STATIC_DURATION = 2200
const AD_FALLBACK_TIMEOUT = 90000

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
  const [showVideo, setShowVideo] = useState(false)
  const [apiReady, setApiReady] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const [musicList] = useState(() => shuffleArray(musicMixes))
  const [adList] = useState(() => shuffleArray([...tvAds, ...homeVideos]))

  // Stable random EQ bar config
  const eqBars = useMemo(() =>
    Array.from({ length: 28 }, () => ({
      max: 3 + Math.random() * 18,
      dur: 0.3 + Math.random() * 0.5,
      del: Math.random() * 0.6,
    })), [])

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

  const modeRef = useRef<Mode>('loading')
  const isMutedRef = useRef(true)
  const adIndexRef = useRef(0)
  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { isMutedRef.current = isMuted }, [isMuted])
  useEffect(() => { adIndexRef.current = adIndex }, [adIndex])

  // ── Load YouTube IFrame API ──
  useEffect(() => {
    if (window.YT?.Player) { setApiReady(true); return }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { prev?.(); setApiReady(true) }
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
  }, [])

  // ── Scroll trigger ──
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 600) setIsVisible(true) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Return to music ──
  const returnToMusic = useCallback(() => {
    if (adTimeoutRef.current) { clearTimeout(adTimeoutRef.current); adTimeoutRef.current = null }
    try { adPlayerRef.current?.pauseVideo?.() } catch {}
    setMode('static-to-music')
    staticTimeoutRef.current = setTimeout(() => {
      setShowAdLayer(false)
      setAdIndex(prev => (prev + 1) % adList.length)
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
    preMutedRef.current = isMutedRef.current
    try { musicPlayerRef.current?.mute?.() } catch {}
    setShowVideo(false)
    setMode('static-to-ad')
    staticTimeoutRef.current = setTimeout(() => {
      setShowAdLayer(true)
      setIsMuted(false)
      setMode('ad')
      const ad = adList[adIndexRef.current]
      if (adPlayerCreatedRef.current && adPlayerRef.current) {
        try { adPlayerRef.current.loadVideoById(ad.id); adPlayerRef.current.unMute() } catch {}
      } else {
        const el = document.getElementById('pip-ad-player')
        if (!el) return
        adPlayerCreatedRef.current = true
        adPlayerRef.current = new window.YT.Player('pip-ad-player', {
          width: '100%', height: '100%', videoId: ad.id,
          playerVars: { autoplay: 1, mute: 0, controls: 0, showinfo: 0, rel: 0, modestbranding: 1, playsinline: 1, iv_load_policy: 3, disablekb: 1 },
          events: { onStateChange: (e: any) => { if (e.data === window.YT.PlayerState.ENDED && modeRef.current === 'ad') returnToMusicRef.current() } },
        })
      }
      adTimeoutRef.current = setTimeout(() => { if (modeRef.current === 'ad') returnToMusicRef.current() }, AD_FALLBACK_TIMEOUT)
    }, STATIC_DURATION)
  }, [adList])
  const triggerAdBreakRef = useRef(triggerAdBreak)
  useEffect(() => { triggerAdBreakRef.current = triggerAdBreak }, [triggerAdBreak])

  // ── Create music player ──
  useEffect(() => {
    if (!apiReady || !isVisible || isDismissed || playerCreatedRef.current) return
    if (!window.YT?.Player) return
    const el = document.getElementById('pip-music-player')
    if (!el) return
    playerCreatedRef.current = true
    musicPlayerRef.current = new window.YT.Player('pip-music-player', {
      width: '100%', height: '100%', videoId: musicList[0].id,
      playerVars: { autoplay: 1, mute: 1, controls: 0, showinfo: 0, rel: 0, modestbranding: 1, playsinline: 1, iv_load_policy: 3, disablekb: 1 },
      events: {
        onReady: () => setMode('music'),
        onStateChange: (e: any) => {
          if (e.data === window.YT.PlayerState.ENDED && modeRef.current === 'music') {
            setMusicIndex(prev => { const next = (prev + 1) % musicList.length; try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}; return next })
          }
        },
      },
    })
  }, [apiReady, isVisible, isDismissed, musicList])

  // ── Music timer ──
  useEffect(() => {
    if (mode === 'music' && isVisible && !isDismissed && !isMinimized) {
      intervalRef.current = setInterval(() => {
        musicTimerRef.current += 1
        setElapsed(musicTimerRef.current)
        if (musicTimerRef.current >= breakThresholdRef.current) {
          musicTimerRef.current = 0
          triggerAdBreakRef.current()
        }
      }, 1000)
    }
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null } }
  }, [mode, isVisible, isDismissed, isMinimized])

  // ── Cleanup ──
  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current)
    if (staticTimeoutRef.current) clearTimeout(staticTimeoutRef.current)
    try { musicPlayerRef.current?.destroy?.() } catch {}
    try { adPlayerRef.current?.destroy?.() } catch {}
  }, [])

  // ── Controls ──
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev
      try {
        if (modeRef.current === 'music') { if (next) musicPlayerRef.current?.mute?.(); else musicPlayerRef.current?.unMute?.() }
        else if (modeRef.current === 'ad') { if (next) adPlayerRef.current?.mute?.(); else adPlayerRef.current?.unMute?.() }
      } catch {}
      return next
    })
  }, [])

  const nextMusic = useCallback(() => {
    if (modeRef.current !== 'music') return
    setMusicIndex(prev => { const next = (prev + 1) % musicList.length; try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}; return next })
    musicTimerRef.current = 0; setElapsed(0)
  }, [musicList])

  const prevMusic = useCallback(() => {
    if (modeRef.current !== 'music') return
    setMusicIndex(prev => { const next = (prev - 1 + musicList.length) % musicList.length; try { musicPlayerRef.current?.loadVideoById(musicList[next].id) } catch {}; return next })
    musicTimerRef.current = 0; setElapsed(0)
  }, [musicList])

  const skipAd = useCallback(() => { if (modeRef.current !== 'ad') return; returnToMusicRef.current() }, [])

  // ── Render ──
  if (isDismissed) return null

  const currentMusic = musicList[musicIndex]
  const currentAd = adList[adIndex]
  const isStatic = mode === 'static-to-ad' || mode === 'static-to-music'
  const isAdPlaying = mode === 'ad'
  const isMusic = mode === 'music'
  const adOrStatic = isAdPlaying || isStatic
  const pipWidth = size === 'medium' ? 380 : 300
  const vidHeight = size === 'medium' ? 214 : 170
  const shouldShow = isVisible && mode !== 'loading'
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const secs = String(elapsed % 60).padStart(2, '0')

  return (
    <>
      {/* ── Main PiP ── */}
      <motion.div
        className="pip-player"
        animate={{
          opacity: shouldShow && !isMinimized ? 1 : 0,
          y: shouldShow && !isMinimized ? 0 : 30,
          scale: shouldShow && !isMinimized ? 1 : 0.95,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 97,
          width: pipWidth,
          overflow: 'hidden',
          pointerEvents: shouldShow && !isMinimized ? 'auto' : 'none',
          borderRadius: (adOrStatic || showVideo) ? '0.8rem' : '4px',
          boxShadow: (adOrStatic || showVideo)
            ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
            : '2px 2px 8px rgba(0,0,0,0.6)',
        }}
      >
        {/* ════════ MUSIC VIDEO (toggleable popup above winamp) ════════ */}
        <div style={{
          height: isMusic && showVideo ? vidHeight : 0,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
          transition: 'height 0.25s ease',
        }}>
          <div className="pip-video-wrapper" style={{ position: 'absolute', inset: 0, overflow: 'hidden', minHeight: vidHeight }}>
            <div id="pip-music-player" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* ════════ AD VIDEO (ads + static transitions) ════════ */}
        <div style={{
          height: (isAdPlaying || isStatic) ? vidHeight : 0,
          overflow: 'hidden',
          position: 'relative',
          background: '#000',
          transition: 'height 0.15s ease',
        }}>
          <div className="pip-video-wrapper" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div id="pip-ad-player" style={{ width: '100%', height: '100%' }} />
          </div>

          {/* 80s TV Static */}
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

          {/* Ad badge */}
          {isAdPlaying && (
            <div style={{
              position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 5,
              background: 'rgba(61, 90, 61, 0.9)', color: '#fff',
              padding: '0.25rem 0.7rem', borderRadius: '2rem',
              fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em',
              textTransform: 'uppercase', backdropFilter: 'blur(4px)',
            }}>
              ▶ MY COMMERCIALS
            </div>
          )}
        </div>

        {/* Ad info bar */}
        {isAdPlaying && (
          <div style={{ padding: '0.6rem 0.8rem', background: '#111', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentAd?.title}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                {currentAd?.desc} · Adnexus
              </p>
            </div>
            <button onClick={toggleMute} style={{ ...w95Btn, width: 28, height: 24, fontSize: '1rem' }}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button onClick={skipAd} style={{ ...w95Btn, padding: '2px 8px', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
              SKIP ⏭
            </button>
          </div>
        )}

        {/* ════════ WINAMP MODE (music — audio only) ════════ */}
        <div className="w95-body" style={{ display: isMusic || mode === 'loading' ? 'block' : 'none' }}>
          {/* Title bar */}
          <div className="w95-titlebar">
            <span className="w95-title-text">ANTJE.FM</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              <button className="w95-title-btn" onClick={() => setSize(s => s === 'small' ? 'medium' : 'small')}>
                {size === 'small' ? '□' : '▫'}
              </button>
              <button className="w95-title-btn" onClick={() => setIsMinimized(true)}>─</button>
              <button className="w95-title-btn" onClick={() => setIsDismissed(true)}>✕</button>
            </div>
          </div>

          {/* Display panel */}
          <div className="w95-display">
            {/* Scrolling track name */}
            <div className="w95-marquee">
              <div className="w95-marquee-inner">
                {currentMusic?.title}&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;{currentMusic?.title}&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
              </div>
            </div>

            {/* Artist */}
            <div className="w95-artist">{currentMusic?.artist}</div>

            {/* Time + meta */}
            <div className="w95-info-row">
              <span className="w95-time">{mins}:{secs}</span>
              <span className="w95-meta">128kbps · 44kHz · stereo</span>
            </div>

            {/* EQ visualizer */}
            <div className={`w95-eq ${isMuted ? 'w95-eq-muted' : ''}`}>
              {eqBars.map((bar, i) => (
                <div
                  key={i}
                  className="w95-eq-bar"
                  style={{
                    '--eq-max': `${bar.max}px`,
                    animationDuration: `${bar.dur}s`,
                    animationDelay: `${bar.del}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Transport controls */}
          <div className="w95-controls">
            <button className="w95-btn" onClick={prevMusic} title="Previous mix">⏮</button>
            <button
              className={`w95-btn w95-mute-btn ${isMuted ? 'w95-mute-btn-off' : 'w95-mute-btn-on'}`}
              onClick={toggleMute}
              title={isMuted ? 'Turn on sound' : 'Mute'}
            >
              {isMuted ? '🔇 LISTEN' : '🔊 ON'}
            </button>
            <button className="w95-btn" onClick={nextMusic} title="Next mix">⏭</button>
            <button
              className={`w95-btn w95-vid-btn ${showVideo ? 'w95-vid-btn-on' : ''}`}
              onClick={() => setShowVideo(v => !v)}
              title={showVideo ? 'Hide video' : 'Show video'}
            >
              📺
            </button>
            <span className="w95-track-num">{musicIndex + 1} / {musicList.length}</span>
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
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 97,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#2a2a2a', border: '2px outset #555',
              color: '#00ff41', padding: '0.5rem 1rem', borderRadius: '3px',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
              fontFamily: "'Courier New', monospace", letterSpacing: '0.08em',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            ♪ ANTJE.FM — {currentMusic?.title?.slice(0, 22)}...
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

const w95Btn: React.CSSProperties = {
  background: 'linear-gradient(180deg, #555 0%, #3a3a3a 100%)',
  border: '1px outset #666',
  color: '#ccc',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  borderRadius: '2px',
  fontFamily: "'Courier New', monospace",
}
