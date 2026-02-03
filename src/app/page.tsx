'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Services } from '@/components/Services'
import SeedOfLife from '@/components/SeedOfLife'
import { AnimalCard } from '@/components/AnimalCard'
import { LazyYouTube } from '@/components/LazyYouTube'
import { LazyYouTubeGrid } from '@/components/LazyVideo'

// Animal card video data
const animalCards = [
  { name: 'Elephant', frontVideo: '/assets/card-videos/Elephant_Card_Front.mp4', backVideo: '/assets/card-videos/Elephant_Card_Back.mp4' },
  { name: 'Tiger', frontVideo: '/assets/card-videos/TIGER_Card_front.mp4', backVideo: '/assets/card-videos/TIGER_Card_Back.mp4' },
  { name: 'Leopard', frontVideo: '/assets/card-videos/Leopard_Card_Front.mp4', backVideo: '/assets/card-videos/Leopard_Card_Back.mp4' },
  { name: 'Giraffe', frontVideo: '/assets/card-videos/GIRAFFE_Card_Front.mp4', backVideo: '/assets/card-videos/GIRAFFE_Card_Back.mp4' },
  { name: 'Red Wolf', frontVideo: '/assets/card-videos/Redwolf_Card_front.mp4', backVideo: '/assets/card-videos/Redwolf_Card_Back.mp4' },
  { name: 'Rhino', frontVideo: '/assets/card-videos/RHINO_Card_front.mp4', backVideo: '/assets/card-videos/RHINO_Card_back.mp4' },
]

// Magazine slideshow component - fills container completely, crossfade with no gap
function MagazineSlideshow({ images, interval = 1000 }: { images: string[], interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {images.map((src, index) => (
        <motion.div
          key={src}
          initial={false}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={src}
            alt="Magazine Cover"
            fill
            style={{ objectFit: 'cover' }}
            sizes="400px"
            quality={100}
            unoptimized
          />
        </motion.div>
      ))}
    </div>
  )
}


// Parallax Image component for gallery images
function ParallaxImage({ src, alt, sizes = "25vw" }: { src: string; alt: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div style={{ y, position: 'absolute', inset: '-10%', width: '120%', height: '120%' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} sizes={sizes} loading="lazy" />
      </motion.div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const [meVisible, setMeVisible] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  // Sequenced hero animation: bg -> me pops in -> video plays
  useEffect(() => {
    const checkConnection = () => {
      const nav = navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; saveData?: boolean } }
      const connection = nav.connection
      if (connection?.saveData) return false
      // Show video on all devices - mobile browsers handle autoplay muted videos fine
      return true
    }

    // Step 1: After 300ms, pop in the "me" image
    const meTimer = setTimeout(() => {
      setMeVisible(true)
    }, 300)

    // Step 2: After me animation (800ms later), start video if good connection
    const videoTimer = setTimeout(() => {
      if (checkConnection()) {
        setShowVideo(true)
        setVideoPlaying(true)
      }
    }, 1100)

    return () => {
      clearTimeout(meTimer)
      clearTimeout(videoTimer)
    }
  }, [])

  return (
    <div id="main">
      {/* Hero - Photo background */}
      <header
        ref={heroRef}
        className="hero-header"
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Room background - Video or Image based on connection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          {/* Always render image as fallback/poster */}
          <Image
            src="/assets/hero-bg.jpg"
            alt="Studio room"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: showVideo ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
            priority
          />
          {/* Video for fast connections - fades in after me pops */}
          {showVideo && (
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: videoPlaying ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            >
              <source src="/assets/background-video.mp4" type="video/mp4" />
            </motion.video>
          )}
        </div>

        {/* Me photo - in front of title */}
        <motion.div
          className="hero-me-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={meVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.8,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            scale: photoScale,
            transformOrigin: 'center bottom',
          }}
        >
          {/* Ground shadow for grounding effect */}
          <div
            style={{
              position: 'absolute',
              bottom: '2%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: '8%',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(15px)',
              zIndex: -1,
            }}
          />
          <Image
            src="/images/me.png"
            alt="Antje"
            fill
            className="hero-me-image"
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.25)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))',
            }}
            priority
          />
        </motion.div>

        {/* Subtitle - always visible on top */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={meVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: '15%',
            left: 0,
            right: 0,
            zIndex: 4,
            fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.3rem',
            textTransform: 'uppercase',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          FOUNDER • DESIGNER • VISIONARY
        </motion.p>

        {/* Title image - behind me.png */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: 0,
            right: 0,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={meVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100 }}
            style={{
              width: 'clamp(280px, 60vw, 700px)',
              filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.3))',
            }}
          >
            <Image
              src="/assets/antje-worring-title.png"
              alt="antje worring"
              width={700}
              height={350}
              style={{
                width: '100%',
                height: 'auto',
              }}
              priority
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 3, maxWidth: '700px', padding: '0 2rem', pointerEvents: 'none' }}
        >
          <p className="scroll-indicator-text" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            From child athlete to fashion founder at 14, to AI research lab and public goods non-profit, to changing the world through conservation.
          </p>
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>scroll to explore</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '2rem', color: '#fff' }}>↓</motion.div>
        </motion.div>
      </header>

      {/* Press Bento Grid - Sophie Amoruso Style */}
      <section style={{ background: 'var(--color-pink)', width: '100%' }}>
        <div className="press-grid-desktop" style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          borderTop: '1px solid #000',
        }}>
          {/* Row 1: 4 logos */}
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/british-vogue.png" alt="British Vogue" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/people.png" alt="People" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/sf-chronicle.jpg" alt="SF Chronicle" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/washington-post.webp" alt="Washington Post" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          {/* Magazine 1 - spans 2 rows, 2 cols (4x size) */}
          <div style={{
            gridColumn: '5 / 7',
            gridRow: '1 / 3',
            position: 'relative',
            overflow: 'hidden',
            borderRight: '1px solid #000',
            borderBottom: '1px solid #000',
          }}>
            <MagazineSlideshow
              images={['/assets/magazine/1.jpg', '/assets/magazine/2.jpg', '/assets/magazine/3.jpg']}
              interval={2000}
            />
          </div>

          {/* Row 2: Magazine left starts + 2 logos */}
          {/* Magazine 2 - spans 2 rows, 2 cols (4x size) */}
          <div style={{
            gridColumn: '1 / 3',
            gridRow: '2 / 4',
            position: 'relative',
            overflow: 'hidden',
            borderRight: '1px solid #000',
            borderBottom: '1px solid #000',
          }}>
            <MagazineSlideshow
              images={['/assets/magazine/4.jpg', '/assets/magazine/5.jpg', '/assets/magazine/6.jpg']}
              interval={2000}
            />
          </div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/cointelegraph.png" alt="Cointelegraph" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/decrypt.png" alt="Decrypt" width={100} height={40} style={{ objectFit: 'contain' }} /></div>

          {/* Row 3: 4 logos */}
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/elle.svg" alt="Elle" width={60} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/tmz.png" alt="TMZ" width={80} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/tech-times.webp" alt="Tech Times" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
          <div className="press-cell" style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000' }}><Image src="/assets/logos/marin-ij.png" alt="Marin IJ" width={100} height={40} style={{ objectFit: 'contain' }} /></div>
        </div>
      </section>

      {/* Our Services Section */}
      <Services />

      {/* Editorial Story Sections - Magazine Style */}

      {/* Story 1: The Beginning - Athletic Foundation */}
      <section className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
                THE BEGINNING
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Before the fashion empire, before the tech ventures — there was tennis. Training as a competitive athlete from childhood taught me discipline, resilience, and an unwavering drive to be the best. Early mornings on the court, the mental fortitude required to compete, the understanding that success comes from consistent effort over time.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                These foundations shaped everything that came next. The athlete's mindset — always improving, never settling, seeing obstacles as opportunities — became the framework for building businesses and creating impact.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <Image src="/assets/tennis-bg.jpg" alt="Tennis Court" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 2: Karma Bikinis */}
      <section id="karma" className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', maxWidth: '60%' }}>
                <Image src="/assets/karma-hero.jpg" alt="Karma Bikinis" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
                KARMA BIKINIS
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                <strong>Started at 14. Worn by top models, celebrities and influencers worldwide.</strong> What began as a creative outlet became a decade-long journey in fashion design, manufacturing, and brand building.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                Over 10 years of collections. 100+ products brought to market. Featured in major publications including British Vogue, Elle, and People Magazine. Runway shows at Miami Swim Week. A successful Kickstarter campaign that proved the power of community-driven fashion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Karma Gallery - Full Width with Parallax */}
      <section style={{ background: 'var(--color-cream)', width: '100%' }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          {[1, 8, 4, 5, 6, 7, 2, 9, 11, 13, 14, 15].map((num, index) => (
            <div key={num} style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', borderRight: (index + 1) % 4 !== 0 ? '1px solid #000' : 'none', borderBottom: '1px solid #000' }}>
              <ParallaxImage src={`/assets/karma-${num}.jpg`} alt={`Karma Bikinis ${num}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Karma Bikinis - Kickstarter Video */}
      <section style={{ background: 'var(--color-cream)', padding: '6rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <LazyYouTube videoId="isKrNe8LIho" title="Karma Bikinis Kickstarter" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)', fontFamily: "'Blauer Neue', sans-serif" }}>
                humble beginnings
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                A successful crowdfunding campaign that proved the power of community-driven fashion. Backers from around the world helped bring our vision to life, validating the demand for sustainable, beautifully designed swimwear.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Karma Videos Grid - 1 row of 4 */}
      <section style={{ background: 'var(--color-cream)', width: '100%' }}>
        <div className="karma-videos-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          <LazyYouTubeGrid videoId="dU0ndRpSS14" title="Karma Bikinis" style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000' }} />
          <LazyYouTubeGrid videoId="0lp1eXOyywc" title="Karma Bikinis At Planet Fashion Swim Week" style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000' }} />
          <LazyYouTubeGrid videoId="UAT2yVOzm8s" title="Collection Showcase" style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000' }} />
          <LazyYouTubeGrid videoId="rMDadDkJTpo" title="Featured Story" style={{ borderBottom: '1px solid #000' }} />
        </div>
      </section>

      {/* Story 3: Zoo Labs */}
      <section className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
                ZOO LABS
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Co-founded an AI research lab and public goods non-profit. We build open-source tools and ship real products.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                Making AI accessible to everyone. Contributing to open source. Building tech that helps people.
              </p>
              <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                VISIT ZOO LABS →
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <LazyYouTube videoId="6yYuYtMWgOU" title="Zoo Labs" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zoo Trading Cards Gallery - Horizontal Scroll */}
      <section style={{ background: 'var(--color-black)', padding: '6rem 0', borderTop: '1px solid #000', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '3rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '1rem', color: '#fff', fontFamily: "'Blauer Neue', sans-serif" }}>
              ZOO TRADING CARDS
            </h3>
            <p style={{ fontSize: '1.6rem', color: '#fff', opacity: 0.7 }}>
              Tap to flip • Scroll to explore
            </p>
          </motion.div>
        </div>
        <div
          className="trading-cards-scroll"
          style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            paddingLeft: 'max(2rem, calc((100vw - 1400px) / 2 + 4rem))',
            paddingRight: '2rem',
            paddingBottom: '2rem',
            scrollSnapType: 'x mandatory',
          }}
        >
          {animalCards.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ flexShrink: 0, width: 'clamp(250px, 30vw, 320px)', scrollSnapAlign: 'start' }}
            >
              <AnimalCard {...card} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story 4: Zoo NGO */}
      <section className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <Image src="/assets/healing-farm.webp" alt="Zoo NGO Healing Farm" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
                ZOO NGO & THE HEALING FARM
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Founded a 501(c)(3) non-profit dedicated to making real impact. Our initiatives span preservation of endangered species, food security programs, and a holistic healing medicinal farm growing organic herbs and adaptogenic mushrooms.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                From lion's mane and reishi mushrooms to turmeric and ancient medicinal herbs — we cultivate nature's pharmacy to promote wellness, support local communities, and restore the land through regenerative agricultural practices.
              </p>
              <a href="https://zoo.ngo" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                EXPLORE ZOO NGO →
              </a>
              <br />
              <a href="https://secretmenusf.com/zoo-ngo" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                DONATE →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 5: Current Ventures */}
      <section className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
              BUILDING THE FUTURE
            </h3>
            <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', maxWidth: '700px' }}>
              Today, I'm focused on the intersection of design, technology, and impact. Working across multiple ventures that share a common thread — using creativity and innovation to solve meaningful problems.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', borderTop: '1px solid #000', paddingTop: '4rem' }} className="ventures-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)' }}>Hanzo AI</h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Techstars-Backed • Creative Agency & AI Tools</p>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Helped scale and operate its creative agency, designing and building cutting-edge AI tools for the future of work.
              </p>
              <a href="https://hanzo.ai" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)' }}>VISIT HANZO →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)' }}>Lux Network</h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Co-Founder & Chief Design Officer</p>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Private quantum-safe cryptography. Translating frontier research on fully homomorphic encryption for normal people.
              </p>
              <a href="https://lux.network" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)' }}>VISIT Lux →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)' }}>Lux Credit</h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Co-Founder • Shariah-Compliant Finance</p>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                The world's first Shariah law compliant credit card — empowering 800 million unbanked Muslims globally.
              </p>
              <a href="https://lux.credit" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)' }}>VISIT Lux Credit →</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 6: SF Secret Menu */}
      <section className="story-section" style={{ background: 'var(--color-cream)', padding: '12rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <SeedOfLife size={80} color="#daa520" />
            </div>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08rem', marginBottom: '2.5rem', color: 'var(--color-black)' }}>
              SF SECRET MENU
            </h3>
            <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
              Organic farm-to-table ghost kitchen bringing sustainable, chef-crafted meals to San Francisco. From our healing farm directly to your table — closing the loop between the food we grow and the communities we serve.
            </p>
            <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
              Every dish tells a story of regenerative agriculture, local sourcing, and culinary creativity. We believe that good food should nourish both people and planet.
            </p>
            <a href="https://sfsecretmenu.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              ORDER NOW →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Food Gallery with Parallax */}
      <section style={{ background: 'var(--color-cream)', width: '100%' }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          {[
            { src: '/assets/food-1.png', alt: 'Seared Duck Breast' },
            { src: '/assets/food-2.png', alt: 'Miso Glazed Cod' },
            { src: '/assets/food-3.jpg', alt: 'Chicken Picatta' },
            { src: '/assets/food-4.png', alt: 'Bulgur Salad' },
          ].map((food, index) => (
            <div key={food.alt} style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', borderRight: index < 3 ? '1px solid #000' : 'none', borderBottom: '1px solid #000' }}>
              <ParallaxImage src={food.src} alt={food.alt} />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .trading-cards-scroll::-webkit-scrollbar {
          display: none;
        }
        .trading-cards-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 1200px) {
          .karma-gallery,
          .food-gallery {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .press-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 868px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .ventures-grid {
            grid-template-columns: 1fr !important;
          }
          .karma-gallery,
          .food-gallery,
          .press-grid,
          .karma-videos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}
