'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const { scrollY } = useScroll()
  const backgroundShift = useTransform(scrollY, [0, 700], [0, 90])
  const photoShift = useTransform(scrollY, [0, 700], [0, -70])
  const glowShift = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <header
      style={{
        minHeight: '80vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '12rem',
        paddingBottom: '8rem',
        overflow: 'hidden',
      }}
    >
      {/* S-Curve Gradient Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          y: backgroundShift,
        }}
      >
        {/* Orange top section */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: '#e85d04',
          }}
        />

        {/* S-curve wave transition */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: '35%',
            left: 0,
            width: '100%',
            height: '30%',
          }}
        >
          <path
            fill="#e85d04"
            d="M0,0 L0,160 C360,260 540,60 720,160 C900,260 1080,60 1440,160 L1440,0 Z"
          />
        </svg>

        {/* Orange-to-pink gradient middle */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(180deg, #f48c06 0%, #f5c4c0 100%)',
          }}
        />

        {/* Second S-curve for pink transition */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '25%',
            transform: 'scaleX(-1)',
          }}
        >
          <path
            fill="#f48c06"
            d="M0,0 L0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120 L1440,0 Z"
          />
        </svg>

        {/* Pink bottom section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: '#f5c4c0',
            borderRadius: '0 0 40px 40px',
          }}
        />
      </motion.div>

      {/* Soft glow blobs */}
      <motion.div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: '38vw',
          height: '38vw',
          maxWidth: 520,
          maxHeight: 520,
          background: 'radial-gradient(circle at 30% 30%, rgba(255,214,165,0.85), rgba(255,214,165,0) 60%)',
          filter: 'blur(10px)',
          opacity: 0.9,
          zIndex: 1,
          y: glowShift,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          maxWidth: 620,
          maxHeight: 620,
          background: 'radial-gradient(circle at 40% 40%, rgba(255,146,183,0.7), rgba(255,146,183,0) 65%)',
          filter: 'blur(6px)',
          opacity: 0.85,
          zIndex: 1,
          y: glowShift,
        }}
      />

      {/* Hero photo */}
      <motion.div
        style={{
          position: 'absolute',
          right: '4%',
          bottom: 0,
          width: 'min(42vw, 520px)',
          height: 'min(60vh, 560px)',
          zIndex: 2,
          pointerEvents: 'none',
          y: photoShift,
        }}
      >
        <Image
          src="/images/me.png"
          alt="Antje in chair"
          fill
          sizes="(max-width: 900px) 70vw, 520px"
          style={{
            objectFit: 'contain',
            objectPosition: 'bottom right',
            filter: 'drop-shadow(0 40px 80px rgba(30, 10, 10, 0.25))',
          }}
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="display-name hero-offset"
          style={{
            marginBottom: '2rem',
          }}
        >
          antje
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="display-name hero-offset-right"
          style={{
            marginBottom: '3rem',
          }}
        >
          worring
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-offset"
          style={{
            fontSize: '2rem',
            color: 'var(--color-black)',
            opacity: 0.7,
          }}
        >
          ( Creative Director & Founder )
        </motion.p>
      </div>
    </header>
  )
}
