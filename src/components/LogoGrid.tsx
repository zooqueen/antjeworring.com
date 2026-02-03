'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface LogoItem {
  name: string
  displayName: string // How it appears visually
  logo?: string
  style?: 'serif' | 'sans' | 'script' | 'bold' | 'light'
  ext?: string // file extension
}

const publications: LogoItem[] = [
  // Row 1
  { name: 'british-vogue', displayName: 'VOGUE', style: 'serif', ext: 'png' },
  { name: 'people', displayName: 'People', style: 'bold', ext: 'png' },
  { name: 'elle', displayName: 'ELLE', style: 'light', ext: 'svg' },
  { name: 'womens-health', displayName: "Women's Health", style: 'sans', ext: 'png' },
  // Row 2
  { name: 'sf-chronicle', displayName: 'San Francisco Chronicle', style: 'serif', ext: 'jpg' },
  { name: 'marin-ij', displayName: 'Marin IJ', style: 'sans', ext: 'png' },
  { name: 'washington-post', displayName: 'The Washington Post', style: 'script', ext: 'webp' },
  { name: 'cointelegraph', displayName: 'COINTELEGRAPH', style: 'sans', ext: 'png' },
  // Row 3
  { name: 'decrypt', displayName: 'DECRYPT', style: 'bold', ext: 'webp' },
  { name: 'tech-times', displayName: 'Tech Times', style: 'sans', ext: 'webp' },
  { name: 'tmz', displayName: 'TMZ', style: 'bold', ext: 'png' },
]

function LogoCell({ item, index, total }: { item: LogoItem; index: number; total: number }) {
  const [imgError, setImgError] = useState(false)
  const logoPath = `/assets/logos/${item.name}.${item.ext || 'png'}`

  const cols = 4
  const isLastInRow = (index + 1) % cols === 0
  const rowsNeeded = Math.ceil(total / cols)
  const currentRow = Math.floor(index / cols)
  const isLastRow = currentRow === rowsNeeded - 1

  const getTextStyle = () => {
    const baseStyle: React.CSSProperties = {
      textAlign: 'center',
      color: '#222',
      transition: 'opacity 0.3s ease',
    }

    switch (item.style) {
      case 'serif':
        return {
          ...baseStyle,
          fontFamily: 'Times New Roman, Georgia, serif',
          fontSize: item.displayName.length > 10 ? '1.6rem' : '2.4rem',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
        }
      case 'script':
        return {
          ...baseStyle,
          fontFamily: 'Georgia, Times New Roman, serif',
          fontSize: '1.6rem',
          fontStyle: 'italic',
          fontWeight: 400,
        }
      case 'bold':
        return {
          ...baseStyle,
          fontFamily: 'Arial Black, Helvetica, sans-serif',
          fontSize: item.displayName.length > 10 ? '1.6rem' : '2.2rem',
          fontWeight: 900,
          letterSpacing: '0.05em',
        }
      case 'light':
        return {
          ...baseStyle,
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
          fontSize: '2.4rem',
          fontWeight: 300,
          letterSpacing: '0.4em',
          textTransform: 'uppercase' as const,
        }
      case 'sans':
      default:
        return {
          ...baseStyle,
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
          fontSize: item.displayName.length > 15 ? '1.3rem' : '1.6rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
        }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 2.5rem',
        borderRight: !isLastInRow ? '1px solid #e0e0e0' : 'none',
        borderBottom: !isLastRow ? '1px solid #e0e0e0' : 'none',
        background: '#fff',
        minHeight: '120px',
        transition: 'background 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{ backgroundColor: '#f9f9f9' }}
    >
      {!imgError ? (
        <Image
          src={logoPath}
          alt={item.displayName}
          width={140}
          height={50}
          style={{
            objectFit: 'contain',
            filter: 'grayscale(100%)',
            opacity: 0.75,
            transition: 'all 0.3s ease',
            maxWidth: '100%',
            height: 'auto',
          }}
          onError={() => setImgError(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'grayscale(0%)'
            e.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'grayscale(100%)'
            e.currentTarget.style.opacity = '0.75'
          }}
        />
      ) : (
        <span style={getTextStyle()}>
          {item.displayName}
        </span>
      )}
    </motion.div>
  )
}

export function LogoGrid() {
  return (
    <section style={{
      padding: '6rem 0 10rem',
      background: '#fff',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 4rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
          }}
        >
          <p style={{
            fontSize: '1.2rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-family-regular)',
          }}>
            As Seen In
          </p>
          <h2 style={{
            fontSize: '3.5rem',
            fontFamily: 'var(--font-family-bold)',
            color: '#111',
          }}>
            Press & Media
          </h2>
        </motion.div>

        {/* Logo Grid */}
        <div
          className="logo-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid #e0e0e0',
            background: '#fff',
          }}
        >
          {publications.map((item, index) => (
            <LogoCell
              key={item.name}
              item={item}
              index={index}
              total={publications.length}
            />
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '3rem',
          fontSize: '1.4rem',
          color: '#999',
          fontFamily: 'var(--font-family-light)',
        }}>
          For press inquiries, please <a href="/contact" style={{ color: '#333', textDecoration: 'underline' }}>contact me</a>
        </p>
      </div>
    </section>
  )
}
