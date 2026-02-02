'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { FallingFlowers } from '@/components/FallingFlowers'
import { Services } from '@/components/Services'

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


// Clean YouTube embed - no controls, no branding, autoplay muted
function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        border: '1px solid #000',
        background: '#000',
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '-60px',
          left: 0,
          width: '100%',
          height: 'calc(100% + 120px)',
          border: 'none',
        }}
      />
      {/* Overlay to hide YouTube logo in corner */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '150px', height: '40px', background: 'linear-gradient(to right, transparent, #000)' }} />
    </div>
  )
}

// Background video - fullscreen, autoplay, no controls
function BackgroundVideo({ videoId, children, endTime }: { videoId: string; children: React.ReactNode; endTime?: number }) {
  const endParam = endTime ? `&end=${endTime}` : ''
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1${endParam}`}
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '180%',
            height: '180%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const healingFarmRef = useRef<HTMLElement>(null)

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
        {/* Room background */}
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
          <Image
            src="/assets/hero-bg.jpg"
            alt="Studio room"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Me photo - behind text */}
        <motion.div
          className="hero-me-container"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            scale: photoScale,
            transformOrigin: 'center bottom',
          }}
        >
          <Image
            src="/images/me.png"
            alt="Antje"
            fill
            className="hero-me-image"
            style={{
              objectFit: 'contain',
              objectPosition: 'center bottom',
              filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3))',
            }}
            priority
          />
        </motion.div>

        {/* Text overlay - in front of me.png */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '40%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            y: textY,
          }}
        >
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.4rem)',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.3rem',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}>
            FOUNDER • DESIGNER • VISIONARY
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            color: '#fff',
            textTransform: 'lowercase',
            lineHeight: 1,
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}>
            antje worring
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 3, maxWidth: '700px', padding: '0 2rem' }}
        >
          <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            From child athlete to fashion founder at 14, to AI research lab and public goods non-profit, to changing the world through conservation.
          </p>
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>scroll to explore</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '2rem', color: '#fff' }}>↓</motion.div>
        </motion.div>
      </header>

      {/* Press Bento Grid - Sophie Amoruso Style */}
      <section style={{ background: 'var(--color-pink)', width: '100%' }}>
        {/* Desktop Grid */}
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
          {/* Magazine right - spans 2 rows, 2 cols */}
          <div className="press-magazine-right" style={{
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
          {/* Magazine left - spans 2 rows, 2 cols */}
          <div className="press-magazine-left" style={{
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
      <section style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
                THE BEGINNING
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Before the fashion empire, before the tech ventures — there was tennis. Training as a competitive athlete from childhood taught me discipline, resilience, and an unwavering drive to be the best. Early mornings on the court, the mental fortitude required to compete, the understanding that success comes from consistent effort over time.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                These foundations shaped everything that came next. The athlete's mindset — always improving, never settling, seeing obstacles as opportunities — became the framework for building businesses and creating impact.
              </p>
              <a href="#karma" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                EXPLORE STORY →
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid #000' }}>
                <Image src="/assets/tennis-bg.jpg" alt="Tennis Court" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 2: Karma Bikinis */}
      <section id="karma" style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid #000' }}>
                <Image src="/assets/karma-1.jpg" alt="Karma Bikinis" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
                KARMA BIKINIS
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                <strong>Started at 14. Worn by top models, celebrities and influencers worldwide.</strong> What began as a creative outlet became a decade-long journey in fashion design, manufacturing, and brand building.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                Over 10 years of collections. 100+ products brought to market. Featured in major publications including British Vogue, Elle, and People Magazine. Runway shows at Miami Swim Week. A successful Kickstarter campaign that proved the power of community-driven fashion.
              </p>
              <a href="https://www.facebook.com/KarmaBikinis/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                VIEW COLLECTION →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Karma Gallery - Full Width */}
      <section style={{ background: '#f5f0e8', width: '100%' }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          {[1, 8, 4, 5, 6, 7, 2, 9, 11, 13, 14, 15].map((num, index) => (
            <div key={num} style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', borderRight: (index + 1) % 4 !== 0 ? '1px solid #000' : 'none', borderBottom: '1px solid #000' }}>
              <Image src={`/assets/karma-${num}.jpg`} alt={`Karma Bikinis ${num}`} fill style={{ objectFit: 'cover' }} sizes="25vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Karma Bikinis - Kickstarter Video */}
      <section style={{ background: '#f5f0e8', padding: '6rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <YouTubeEmbed videoId="isKrNe8LIho" title="Karma Bikinis Kickstarter" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
                THE KICKSTARTER CAMPAIGN
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                A successful crowdfunding campaign that proved the power of community-driven fashion. Backers from around the world helped bring our vision to life, validating the demand for sustainable, beautifully designed swimwear.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Karma Videos Grid - 1 row of 4 */}
      <section style={{ background: '#f5f0e8', width: '100%' }}>
        <div className="karma-videos-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          <div style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/dU0ndRpSS14?autoplay=1&mute=1&loop=1&playlist=dU0ndRpSS14&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Karma Bikinis"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '180%', height: '180%', transform: 'translate(-50%, -50%)', border: 'none' }}
            />
          </div>
          <div style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/0lp1eXOyywc?list=TLGGc-UaUEdnfGgwMjAyMjAyNg&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Karma Bikinis At Planet Fashion Swim Week at SLS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '180%', height: '180%', transform: 'translate(-50%, -50%)', border: 'none' }}
            />
          </div>
          <div style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/UAT2yVOzm8s?autoplay=1&mute=1&loop=1&playlist=UAT2yVOzm8s&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Collection Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '180%', height: '180%', transform: 'translate(-50%, -50%)', border: 'none' }}
            />
          </div>
          <div style={{ aspectRatio: '1/1', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/rMDadDkJTpo?autoplay=1&mute=1&loop=1&playlist=rMDadDkJTpo&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Featured Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '180%', height: '180%', transform: 'translate(-50%, -50%)', border: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* Story 3: Zoo Labs */}
      <section style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
                ZOO LABS
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Co-founded an AI research lab and public goods non-profit dedicated to building open-source technology for the future. Zoo Labs represents a shift from fashion to technology — applying the same creative problem-solving approach to frontier AI development.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                Our mission is democratizing access to cutting-edge AI tools, contributing to the open-source ecosystem, and building technology that serves humanity rather than exploiting it.
              </p>
              <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                VISIT ZOO LABS →
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', border: '1px solid #000' }}>
                <YouTubeEmbed videoId="6yYuYtMWgOU" title="Zoo Labs" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 4: Zoo NGO */}
      <section style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid #000' }}>
                <Image src="/assets/healing-farm.webp" alt="Zoo NGO Healing Farm" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
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
      <section style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
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
              <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)' }}>LUX Network</h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Co-Founder & Chief Design Officer</p>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Private quantum-safe cryptography. Translating frontier research on fully homomorphic encryption for normal people.
              </p>
              <a href="https://lux.network" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)' }}>VISIT LUX →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)' }}>LUX Credit</h4>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Co-Founder • Shariah-Compliant Finance</p>
              <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Designed the world's first Shariah law compliant credit card — serving 800 million unbanked Muslims globally.
              </p>
              <a href="https://lux.credit" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)' }}>VISIT LUX CREDIT →</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story 6: SF Secret Menu */}
      <section style={{ background: '#f5f0e8', padding: '8rem 0', borderTop: '1px solid #000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }} className="story-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05rem', marginBottom: '2rem', color: 'var(--color-black)' }}>
                SF SECRET MENU
              </h3>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '2rem' }}>
                Organic farm-to-table ghost kitchen bringing sustainable, chef-crafted meals to San Francisco. From our healing farm directly to your table — closing the loop between the food we grow and the communities we serve.
              </p>
              <p style={{ fontSize: '1.6rem', lineHeight: 1.8, color: 'var(--color-black)', marginBottom: '3rem' }}>
                Every dish tells a story of regenerative agriculture, local sourcing, and culinary creativity. We believe that good food should nourish both people and planet.
              </p>
              <a href="https://sfsecretmenu.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--color-black)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                ORDER NOW →
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', border: '1px solid #000' }}>
                <Image src="/assets/food-1.png" alt="SF Secret Menu" fill style={{ objectFit: 'cover' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food Gallery */}
      <section style={{ background: '#f5f0e8', width: '100%' }}>
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #000' }}>
          {[
            { src: '/assets/food-1.png', alt: 'Seared Duck Breast' },
            { src: '/assets/food-2.png', alt: 'Miso Glazed Cod' },
            { src: '/assets/food-3.jpg', alt: 'Chicken Picatta' },
            { src: '/assets/food-4.png', alt: 'Bulgur Salad' },
          ].map((food, index) => (
            <div key={food.alt} style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', borderRight: index < 3 ? '1px solid #000' : 'none', borderBottom: '1px solid #000' }}>
              <Image src={food.src} alt={food.alt} fill style={{ objectFit: 'cover' }} sizes="25vw" />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
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
