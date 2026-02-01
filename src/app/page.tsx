'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { FallingFlowers } from '@/components/FallingFlowers'

// Magazine slideshow component - fills container completely
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={images[currentIndex]}
            alt="Magazine Cover"
            fill
            style={{ objectFit: 'cover' }}
            sizes="400px"
            quality={100}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
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
        borderRadius: '20px',
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
      <section style={{ background: '#fff', width: '100%' }}>
        <div className="press-grid-container" style={{
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
          {/* Magazine left - spans 2 rows, 2 cols */}
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

      {/* Chapter 1: The Athlete */}
      <section style={{ padding: '10rem 0', position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        {/* Tennis Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Image
            src="/assets/tennis-bg.jpg"
            alt="Tennis court"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 01</p>
            <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>the beginning</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '2rem', maxWidth: '700px', lineHeight: '1.7' }}>
              Before the fashion empire, before the tech ventures — there was tennis. Training as a competitive athlete from childhood, I learned discipline, resilience, and the drive to be the best. These foundations shaped everything that came next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: Karma Bikinis - Photo Gallery */}
      <section style={{ background: 'var(--color-pink)', width: '100%' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 02</p>
            <h2 style={{ fontSize: '6rem', color: 'var(--color-black)', textTransform: 'lowercase' }}>karma bikinis</h2>
          </motion.div>
        </div>
        {/* 4x2 Photo Grid - full width with black lines */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid #000',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
            <div
              key={num}
              style={{
                aspectRatio: '1/1',
                position: 'relative',
                overflow: 'hidden',
                borderRight: (index + 1) % 4 !== 0 ? '1px solid #000' : 'none',
                borderBottom: '1px solid #000',
              }}
            >
              <Image
                src={`/assets/karma-${num}.jpg`}
                alt={`Karma Bikinis ${num}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="25vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Karma Bikinis - Video + Text Side by Side */}
      <section style={{ padding: '6rem 0', background: 'var(--color-black)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="karma-split">
            {/* Video on left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <YouTubeEmbed videoId="isKrNe8LIho" title="Karma Bikinis Kickstarter" />
            </motion.div>

            {/* Text on right, left-aligned */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ textAlign: 'left' }}>
              <h2 style={{ color: '#fff', fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '2rem', textTransform: 'lowercase' }}>karma bikinis</h2>
              <p style={{ color: '#fff', fontSize: 'clamp(1.6rem, 2vw, 2.4rem)', lineHeight: '1.6', marginBottom: '1rem' }}>
                <strong>Started at 14. Worn by fashion models, celebrities and top influencers.</strong>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.4rem, 1.6vw, 1.8rem)', lineHeight: '1.7' }}>
                Over 10 years of collections. 100+ products brought to market. Featured in major publications worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Karma Videos Grid - 2x2 full-width with black lines */}
      <section style={{ background: 'var(--color-pink)', width: '100%' }}>
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          borderTop: '1px solid #000',
        }}>
          <div style={{ aspectRatio: '1/1', borderRight: '1px solid #000', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/dU0ndRpSS14?autoplay=1&mute=1&loop=1&playlist=dU0ndRpSS14&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Karma Bikinis"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ position: 'absolute', top: '50%', left: '50%', width: '180%', height: '180%', transform: 'translate(-50%, -50%)', border: 'none' }}
            />
          </div>
          <div style={{ aspectRatio: '1/1', borderBottom: '1px solid #000', position: 'relative', overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/0lp1eXOyywc?autoplay=1&mute=1&loop=1&playlist=0lp1eXOyywc&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1"
              title="Miami Swim Week"
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
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
          <a href="https://www.facebook.com/KarmaBikinis/" target="_blank" rel="noopener noreferrer" className="pill-button primary">
            View Full Collection →
          </a>
        </div>
      </section>

      {/* Chapter 3: Zoo Labs - Video + Text Side by Side */}
      <section style={{ padding: '6rem 0', background: 'var(--color-black)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="zoolabs-split">
            {/* Video on left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <YouTubeEmbed videoId="6yYuYtMWgOU" title="Zoo Labs" />
            </motion.div>

            {/* Text on right, left-aligned */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ textAlign: 'left' }}>
              <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 03</p>
              <h2 style={{ color: '#fff', fontSize: 'clamp(3rem, 6vw, 6rem)', marginBottom: '2rem', textTransform: 'lowercase' }}>zoo labs</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.4rem, 1.8vw, 2rem)', lineHeight: '1.7', marginBottom: '3rem' }}>
                Co-founded an AI research lab and public goods non-profit dedicated to building open-source technology for the future.
              </p>
              <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" className="pill-button white">
                Visit Zoo Labs →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 4: Zoo NGO */}
      <section style={{ padding: '8rem 0', background: 'var(--color-green)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 04</p>
            <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>zoo ngo</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '2rem', maxWidth: '800px', lineHeight: '1.7', marginBottom: '3rem' }}>
              Founded a 501(c)(3) non-profit dedicated to making real impact:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '800px' }} className="initiatives-grid">
              {[
                'Preservation of endangered animals & plant species',
                'Food security programs',
                'Holistic healing medicinal farm',
                'Blockchain for underprivileged communities',
              ].map((initiative, index) => (
                <motion.div
                  key={initiative}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '1.6rem' }}
                >
                  {initiative}
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '4rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="https://zoo.ngo" target="_blank" rel="noopener noreferrer" className="pill-button primary">Visit Zoo NGO →</a>
              <a href="https://secretmenusf.com/zoo-ngo" target="_blank" rel="noopener noreferrer" className="pill-button outline" style={{ borderColor: '#fff', color: '#fff' }}>Healing Farm →</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 5: Regenerative Healing Farm */}
      <section ref={healingFarmRef} style={{ padding: '8rem 0', position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <FallingFlowers containerRef={healingFarmRef} />
        {/* Background Image */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Image
            src="/assets/healing-farm.webp"
            alt="Regenerative Healing Farm"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 05</p>
            <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>regenerative healing farm</h2>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '2rem', maxWidth: '700px', lineHeight: '1.7', marginBottom: '2rem' }}>
              A holistic medicinal farm dedicated to growing organic herbs, adaptogenic mushrooms, and healing plants using regenerative agricultural practices.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.8rem', maxWidth: '700px', lineHeight: '1.7', marginBottom: '3rem' }}>
              From lion's mane and reishi mushrooms to turmeric, lemongrass, and ancient medicinal herbs — we cultivate nature's pharmacy to promote wellness, support local communities, and restore the land.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem', maxWidth: '800px' }} className="healing-features">
            {[
              { title: 'Adaptogenic Mushrooms', desc: 'Lion\'s mane, reishi, and chaga grown in optimal conditions' },
              { title: 'Medicinal Herbs', desc: 'Turmeric, lemongrass, ashwagandha, and traditional healing plants' },
              { title: 'Regenerative Practices', desc: 'Soil restoration, biodiversity, and sustainable cultivation' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
              >
                <h4 style={{ color: 'var(--color-orange)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.4rem', lineHeight: '1.5' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 6: Current Ventures */}
      <section style={{ padding: '8rem 0', background: 'var(--color-pink)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 06</p>
            <h2 style={{ color: 'var(--color-black)', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>building the future</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }} className="ventures-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '3rem', background: 'var(--color-black)', borderRadius: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>Hanzo AI</h3>
              <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '1rem' }}>Techstars-Backed • Creative Agency & AI Tools</p>
              <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '2rem' }}>Helped scale and operate its creative agency, designing and building cutting-edge AI tools for the future of work.</p>
              <a href="https://hanzo.ai" target="_blank" rel="noopener noreferrer" className="pill-button white">Visit Hanzo →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: '3rem', background: 'var(--color-green)', borderRadius: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>LUX Network</h3>
              <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '1rem' }}>Co-Founder & Chief Design Officer</p>
              <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '2rem' }}>Private quantum-safe cryptography. Translating frontier research on fully homomorphic encryption for normal people.</p>
              <a href="https://lux.network" target="_blank" rel="noopener noreferrer" className="pill-button white">Visit LUX →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ padding: '3rem', background: 'var(--color-orange)', borderRadius: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>LUX Credit</h3>
              <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '1rem' }}>Co-Founder • Shariah-Compliant Finance</p>
              <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '2rem' }}>Designed the world's first Shariah law compliant credit card — serving 800 million unbanked Muslims globally.</p>
              <a href="https://lux.credit" target="_blank" rel="noopener noreferrer" className="pill-button white">Visit LUX Credit →</a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Chapter 7: SF Secret Menu */}
      <section style={{ padding: '8rem 0', background: 'var(--color-green)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '4rem' }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 07</p>
            <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>sf secret menu</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '2rem', maxWidth: '700px', lineHeight: '1.7', marginBottom: '3rem' }}>
              Organic farm-to-table ghost kitchen bringing sustainable, chef-crafted meals to San Francisco. From our farm to your table.
            </p>
          </motion.div>

          {/* Food Gallery */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }} className="food-gallery">
            {[
              { src: '/assets/food-1.png', alt: 'Seared Duck Breast' },
              { src: '/assets/food-2.png', alt: 'Miso Glazed Cod' },
              { src: '/assets/food-3.jpg', alt: 'Chicken Picatta' },
              { src: '/assets/food-4.png', alt: 'Bulgur Salad' },
            ].map((food, index) => (
              <motion.div
                key={food.alt}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden' }}
              >
                <Image
                  src={food.src}
                  alt={food.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <a href="https://sfsecretmenu.com" target="_blank" rel="noopener noreferrer" className="pill-button primary">Order Now →</a>
          </motion.div>
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
          .video-grid,
          .initiatives-grid,
          .ventures-grid,
          .healing-features {
            grid-template-columns: 1fr !important;
          }
          .karma-gallery,
          .food-gallery,
          .press-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}
