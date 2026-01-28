'use client'

import { motion } from 'framer-motion'

export function Hero() {
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
      </div>

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
