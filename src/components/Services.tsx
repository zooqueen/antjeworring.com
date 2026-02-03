'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Service cards data
const serviceCards = [
  {
    category: "Creative Design",
    title: "Ad Creative",
    description: "AI-powered designs that drive measurable performance across all digital platforms and campaigns",
    image: "/assets/services/ad creative.jpeg"
  },
  {
    category: "Creative Design",
    title: "Social Media Creative",
    description: "Algorithm-optimized assets for maximum engagement on Instagram, TikTok, LinkedIn, and more",
    image: "/assets/services/social media creative.jpeg"
  },
  {
    category: "Creative Design",
    title: "Presentation Design",
    description: "Strategic narratives that elevate your message with data visualization and compelling storytelling",
    image: "/assets/services/presentation design.jpg"
  },
  {
    category: "Creative Design",
    title: "Illustration Design",
    description: "Visual storytelling engineered for brand recognition through custom icons, infographics, and artwork",
    image: "/assets/services/illustration design.jpeg"
  },
  {
    category: "Creative Design",
    title: "Web Design",
    description: "User-centric experiences built for conversions with responsive layouts and intuitive navigation",
    image: "/assets/services/web design.jpeg"
  },
  {
    category: "Creative Design",
    title: "Branding Services",
    description: "Data-driven identity systems for market differentiation including logos, guidelines, and assets",
    image: "/assets/services/branding services.jpeg"
  },
  {
    category: "Specialized Production",
    title: "Video Production",
    description: "Streamlined production systems for cinematic quality at scale from concept to final delivery",
    image: "/assets/services/video production.jpeg"
  },
  {
    category: "Specialized Production",
    title: "Motion Design",
    description: "Dynamic visual systems for digital environments including animations, transitions, and effects",
    image: "/assets/services/motion design.jpg"
  },
  {
    category: "Specialized Production",
    title: "3D & AR Design",
    description: "Immersive experiences with practical implementation for products, spaces, and interactions",
    image: "/assets/services/3D and AR Design .jpeg"
  },
  {
    category: "AI Engineering",
    title: "RAG System Implementation",
    description: "Custom knowledge systems for specialized applications with enterprise-grade retrieval accuracy",
    image: "/assets/services/RAG system implementation.png"
  },
  {
    category: "AI Engineering",
    title: "LLM Fine-Tuning",
    description: "Precision model adaptation for domain-specific requirements with continuous optimization",
    image: "/assets/services/LLM Fine Tuning.jpeg"
  },
  {
    category: "AI Engineering",
    title: "AI Pipeline Development",
    description: "End-to-end architecture from ingestion to deployment with scalable infrastructure design",
    image: "/assets/services/ai pipeline development.jpeg"
  },
  {
    category: "AI Engineering",
    title: "AI-Enhanced Creative",
    description: "Human expertise multiplied by computational intelligence for unprecedented creative output",
    image: "/assets/services/ai enhanced creative .jpg"
  }
]

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll)
      return () => carousel.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="services-section" style={{ background: 'var(--color-cream)', width: '100%', paddingTop: '6rem', paddingBottom: '6rem', fontFamily: "'Blauer Neue', sans-serif" }}>
      {/* Section Header */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <p style={{
              color: 'var(--color-orange)',
              fontSize: '1.6rem',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              fontFamily: "'Blauer Neue', sans-serif"
            }}>
              Creative Services
            </p>
            <h2 style={{
              fontSize: 'clamp(3.5rem, 6vw, 6rem)',
              color: 'var(--color-black)',
              textTransform: 'lowercase',
              lineHeight: 1.1,
              fontFamily: "'Hippie Vintage', cursive"
            }}>
              solutions architect
            </h2>
            <p style={{
              color: 'var(--color-black)',
              fontSize: '1.8rem',
              marginTop: '1rem',
              opacity: 0.7
            }}>
              Rent my time, I share my mind and will be using AI about half of the time
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="carousel-nav-desktop" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: canScrollLeft ? 'var(--color-black)' : 'transparent',
                border: '1px solid var(--color-black)',
                color: canScrollLeft ? '#fff' : 'var(--color-black)',
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
                opacity: canScrollLeft ? 1 : 0.3,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: canScrollRight ? 'var(--color-black)' : 'transparent',
                border: '1px solid var(--color-black)',
                color: canScrollRight ? '#fff' : 'var(--color-black)',
                cursor: canScrollRight ? 'pointer' : 'not-allowed',
                opacity: canScrollRight ? 1 : 0.3,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}
            >
              →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel Container - Full Width */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div
          ref={carouselRef}
          className="services-carousel"
          style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingLeft: 'max(2rem, calc((100vw - 1400px) / 2 + 4rem))',
            paddingRight: '2rem',
            paddingBottom: '2rem',
            paddingTop: '1rem',
          }}
        >
          {serviceCards.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{
                flexShrink: 0,
                width: 'clamp(300px, 40vw, 380px)',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="service-card"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    sizes="(max-width: 768px) 300px, 380px"
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                  <p style={{
                    color: 'var(--color-orange)',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem',
                    marginBottom: '0.5rem',
                    fontFamily: "'Hippie Vintage', cursive",
                  }}>
                    {service.category}
                  </p>
                  <h3 style={{
                    fontSize: '2.2rem',
                    color: 'var(--color-black)',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                    fontFamily: "'Blauer Neue', sans-serif",
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '1.4rem',
                    color: 'var(--color-black)',
                    opacity: 0.7,
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      <style jsx>{`
        .services-carousel::-webkit-scrollbar {
          display: none;
        }
        .services-carousel {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .service-card:hover img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .carousel-nav-desktop {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Services
