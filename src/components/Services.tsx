'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Service cards data
const serviceCards = [
  {
    category: "Creative Design",
    title: "Ad Creative",
    description: "Ads that actually convert. Digital campaigns across all platforms.",
    image: "/assets/services/ad creative.jpeg"
  },
  {
    category: "Creative Design",
    title: "Social Media Creative",
    description: "Scroll-stopping content for Instagram, TikTok, LinkedIn, and beyond.",
    image: "/assets/services/social media creative.jpeg"
  },
  {
    category: "Creative Design",
    title: "Presentation Design",
    description: "Pitch decks that tell your story and close the deal.",
    image: "/assets/services/presentation design.jpg"
  },
  {
    category: "Creative Design",
    title: "Illustration Design",
    description: "Custom icons, infographics, and artwork that make your brand memorable.",
    image: "/assets/services/illustration design.jpeg"
  },
  {
    category: "Creative Design",
    title: "Web Design",
    description: "Beautiful, fast websites that work on every device.",
    image: "/assets/services/web design.jpeg"
  },
  {
    category: "Creative Design",
    title: "Branding Services",
    description: "Logos, brand guidelines, and visual identity systems.",
    image: "/assets/services/branding services.jpeg"
  },
  {
    category: "Specialized Production",
    title: "Video Production",
    description: "From concept to final cut. Commercials, promos, and brand films.",
    image: "/assets/services/video production.jpeg"
  },
  {
    category: "Specialized Production",
    title: "Motion Design",
    description: "Animations, transitions, and kinetic typography that bring ideas to life.",
    image: "/assets/services/motion design.jpg"
  },
  {
    category: "Specialized Production",
    title: "3D & AR Design",
    description: "Product visualization, virtual spaces, and augmented reality experiences.",
    image: "/assets/services/3D and AR Design .jpeg"
  },
  {
    category: "AI Engineering",
    title: "RAG System Implementation",
    description: "Custom AI knowledge bases that actually understand your business.",
    image: "/assets/services/RAG system implementation.png"
  },
  {
    category: "AI Engineering",
    title: "LLM Fine-Tuning",
    description: "Train AI models on your data for your specific use case.",
    image: "/assets/services/LLM Fine Tuning.jpeg"
  },
  {
    category: "AI Engineering",
    title: "AI Pipeline Development",
    description: "Production-ready AI systems from data ingestion to deployment.",
    image: "/assets/services/ai pipeline development.jpeg"
  },
  {
    category: "AI Engineering",
    title: "AI-Enhanced Creative",
    description: "Creative work powered by AI. Better results, faster turnaround.",
    image: "/assets/services/ai enhanced creative .jpg"
  }
]

export function Services() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // Lazy load video when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Slow down video to 0.5x speed (16 second loop instead of 8)
  useEffect(() => {
    if (videoRef.current && isVideoLoaded) {
      videoRef.current.playbackRate = 0.5
    }
  }, [isVideoLoaded])

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
    <section ref={sectionRef} className="services-section" style={{ position: 'relative', width: '100%', paddingTop: '6rem', paddingBottom: '6rem', fontFamily: "'Blauer Neue', sans-serif", overflow: 'hidden' }}>
      {/* Background Video - Lazy Loaded */}
      {isVideoVisible && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <source src="/assets/services-bg-video.mp4" type="video/mp4" />
        </video>
      )}
      {/* Overlay for readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }} />
      {/* Section Header */}
      <div className="container" style={{ marginBottom: '3rem', position: 'relative', zIndex: 2 }}>
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
              color: '#fff',
              textTransform: 'lowercase',
              lineHeight: 1.1,
              fontFamily: "'Hippie Vintage', cursive"
            }}>
              solutions architect
            </h2>
            <p style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginTop: '1rem',
              opacity: 0.9
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
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', zIndex: 2 }}>
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
