'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'


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

  const textY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div id="main">
      {/* Hero - Photo background */}
      <header
        ref={heroRef}
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '10rem',
          paddingBottom: '6rem',
          overflow: 'hidden',
        }}
      >
        {/* Photo Background with parallax */}
        <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, y: bgY }}>
          <Image
            src="/assets/hero-bg.jpg"
            alt="Antje Worring"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </motion.div>

        {/* Text content with parallax */}
        <motion.div className="container-wide" style={{ position: 'relative', zIndex: 1, y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-offset"
            style={{ fontSize: '1.8rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}
          >
            Founder • Designer • Visionary
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="display-name hero-offset"
            style={{ color: '#fff' }}
          >
            antje
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="display-name hero-offset-right"
            style={{ color: '#fff' }}
          >
            worring
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-offset"
            style={{ fontSize: '2.4rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px' }}
          >
            From child athlete to fashion founder at 14, to building a $3.4B NFT project, to changing the world through conservation.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
        >
          <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>scroll to explore</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '2rem', color: '#fff' }}>↓</motion.div>
        </motion.div>
      </header>

      {/* Press Logos Grid */}
      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', fontSize: '1.4rem', color: 'var(--color-grey)', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.15rem' }}
          >
            As Featured In
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="press-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {[
              { src: '/assets/logos/british-vogue.png', alt: 'British Vogue', width: 140 },
              { src: '/assets/logos/elle.svg', alt: 'Elle', width: 80 },
              { src: '/assets/logos/people.png', alt: 'People', width: 140 },
              { src: '/assets/logos/womens-health.png', alt: 'Womens Health', width: 160 },
              { src: '/assets/logos/sf-chronicle.jpg', alt: 'San Francisco Chronicle', width: 180 },
              { src: '/assets/logos/marin-ij.png', alt: 'Marin Independent Journal', width: 140 },
              { src: '/assets/logos/washington-post.webp', alt: 'Washington Post', width: 140 },
              { src: '/assets/logos/tmz.png', alt: 'TMZ', width: 100 },
              { src: '/assets/logos/cointelegraph.png', alt: 'Cointelegraph', width: 160 },
              { src: '/assets/logos/decrypt.png', alt: 'Decrypt', width: 140 },
              { src: '/assets/logos/tech-times.webp', alt: 'Tech Times', width: 120 },
            ].map((logo) => (
              <div
                key={logo.alt}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  minHeight: '80px',
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={50}
                  style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.8, transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.8' }}
                />
              </div>
            ))}
          </motion.div>
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
            <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>the athlete</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '2rem', maxWidth: '700px', lineHeight: '1.7' }}>
              Before the fashion empire, before the tech ventures — there was tennis. Training as a competitive athlete from childhood, I learned discipline, resilience, and the drive to be the best. These foundations shaped everything that came next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: Karma Bikinis - Photo Gallery */}
      <section style={{ padding: '6rem 0', background: 'var(--color-pink)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
            <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 02</p>
            <h2 style={{ fontSize: '6rem', color: 'var(--color-black)', textTransform: 'lowercase' }}>karma bikinis</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }} className="karma-gallery">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden' }}
              >
                <Image
                  src={`/assets/karma-${num}.jpg`}
                  alt={`Karma Bikinis ${num}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Karma Bikinis - Kickstarter Background Video */}
      <BackgroundVideo videoId="isKrNe8LIho" endTime={135}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>karma bikinis</h2>
          <p style={{ color: '#fff', fontSize: '2.4rem', maxWidth: '600px', lineHeight: '1.6', marginBottom: '1rem' }}>
            <strong>Started at 14. Worn by fashion models, celebrities and top influencers.</strong>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.8rem', maxWidth: '600px', lineHeight: '1.7' }}>
            Over 10 years of collections. 100+ products brought to market. Featured in major publications worldwide.
          </p>
        </motion.div>
      </BackgroundVideo>

      {/* Karma Videos Grid */}
      <section style={{ padding: '6rem 0', background: 'var(--color-pink)' }}>
        <div className="container">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '3rem', color: 'var(--color-black)', marginBottom: '3rem', textTransform: 'lowercase' }}
          >
            videos
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }} className="video-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <YouTubeEmbed videoId="dU0ndRpSS14" title="Karma Bikinis" />
              <p style={{ marginTop: '1rem', fontSize: '1.4rem', color: 'var(--color-grey)' }}>Karma Bikinis Journey</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <YouTubeEmbed videoId="0lp1eXOyywc" title="Fashion Show" />
              <p style={{ marginTop: '1rem', fontSize: '1.4rem', color: 'var(--color-grey)' }}>Miami Swim Week</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <YouTubeEmbed videoId="UAT2yVOzm8s" title="Collection" />
              <p style={{ marginTop: '1rem', fontSize: '1.4rem', color: 'var(--color-grey)' }}>Collection Showcase</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <YouTubeEmbed videoId="rMDadDkJTpo" title="Karma Feature" />
              <p style={{ marginTop: '1rem', fontSize: '1.4rem', color: 'var(--color-grey)' }}>Featured Story</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '4rem', textAlign: 'center' }}>
            <a href="https://www.facebook.com/KarmaBikinis/" target="_blank" rel="noopener noreferrer" className="pill-button primary">
              View Full Collection →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Zoo Labs - Background Video */}
      <BackgroundVideo videoId="6yYuYtMWgOU">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p style={{ color: 'var(--color-orange)', fontSize: '1.6rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1rem' }}>Chapter 03</p>
          <h2 style={{ color: '#fff', fontSize: '6rem', marginBottom: '2rem', textTransform: 'lowercase' }}>zoo labs</h2>
          <p style={{ color: '#fff', fontSize: '4rem', fontWeight: 700, marginBottom: '1rem' }}>$3.4 Billion</p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '2rem', maxWidth: '600px', lineHeight: '1.7', marginBottom: '3rem' }}>
            Co-founded an NFT project that reached a $3.4 billion market cap — one of the most successful Web3 ventures ever.
          </p>
          <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" className="pill-button white">
            Visit Zoo Labs →
          </a>
        </motion.div>
      </BackgroundVideo>

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
      <section style={{ padding: '8rem 0', position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Image
            src="/assets/healing-farm.jpg"
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem' }} className="ventures-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ padding: '3rem', background: 'var(--color-green)', borderRadius: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '1rem' }}>LUX Network</h3>
              <p style={{ fontSize: '1.4rem', opacity: 0.8, marginBottom: '1rem' }}>Co-Founder & Chief Design Officer</p>
              <p style={{ fontSize: '1.6rem', lineHeight: '1.6', marginBottom: '2rem' }}>Building the future of decentralized finance and blockchain technology.</p>
              <a href="https://lux.network" target="_blank" rel="noopener noreferrer" className="pill-button white">Visit LUX →</a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: '3rem', background: 'var(--color-orange)', borderRadius: '24px', color: '#fff' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '1rem' }}>LUX Credit</h3>
              <p style={{ fontSize: '1.4rem', opacity: 0.8, marginBottom: '1rem' }}>Co-Founder</p>
              <p style={{ fontSize: '1.6rem', lineHeight: '1.6', marginBottom: '2rem' }}>Revolutionary credit platform powered by blockchain technology.</p>
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
