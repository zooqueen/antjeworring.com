'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { allProjects, getAllYears, type Project } from '@/data/projects'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el || !project.hoverVideoId) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoReady(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [project.hoverVideoId])

  const firstLink = project.links?.[0]?.url && project.links[0].url !== '#' ? project.links[0].url : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => firstLink && window.open(firstLink, '_blank', 'noopener,noreferrer')}
        style={{
          display: 'block',
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          borderRadius: '1.5rem',
          border: 'none',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          background: project.imageStyle?.background || 'transparent',
          cursor: firstLink || project.hoverVideoId ? 'pointer' : 'default',
        }}
      >
        {project.localVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={project.localVideo} type="video/mp4" />
          </video>
        ) : project.videoEmbed ? (
          <iframe
            src={`${project.videoEmbed}?autoplay=1&mute=1&loop=1&playlist=${project.videoEmbed.split('/').pop()}&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3`}
            title={project.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '180%',
              height: '180%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
            }}
          />
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{
                objectFit: project.imageStyle?.objectFit || 'cover',
                objectPosition: project.imageStyle?.objectPosition || 'center',
                transform: project.imageStyle?.scale ? `scale(${project.imageStyle.scale})` : undefined,
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {project.hoverVideoId && videoReady && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.hoverVideoId}?autoplay=1&mute=1&loop=1&playlist=${project.hoverVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&playsinline=1`}
                title={project.title}
                allow="autoplay; encrypted-media"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '180%',
                  height: '180%',
                  transform: 'translate(-50%, -50%)',
                  border: 'none',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              />
            )}
          </>
        )}
        {project.featured && (
          <span
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'var(--color-orange)',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              fontSize: '1.2rem',
              fontWeight: 600,
              zIndex: 2,
            }}
          >
            featured
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: '1.3rem',
          color: 'var(--color-grey)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05rem',
        }}
      >
        {project.category} · {project.year}
      </p>
      <h3
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-black)',
          marginBottom: '0.5rem',
        }}
      >
        {project.title}
      </h3>
      {project.description && (
        <p
          style={{
            fontSize: '1.4rem',
            color: 'var(--color-grey)',
            lineHeight: '1.5',
          }}
        >
          {project.description}
        </p>
      )}
    </motion.article>
  )
}

export default function WorkPage() {
  const [activeYear, setActiveYear] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const years = ['all', ...getAllYears()]
  const categories = ['all', 'research', 'papers', 'proofs', 'standards', 'fashion', 'web3', 'nft', 'design', 'conservation']

  const filteredProjects = allProjects.filter(project => {
    const yearMatch = activeYear === 'all' || project.year === activeYear
    const categoryMatch = activeCategory === 'all' ||
      project.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
    return yearMatch && categoryMatch
  }).sort((a, b) => b.order - a.order)

  return (
    <div style={{ background: 'var(--color-cream)' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '49vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: 'none',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/assets/snakewave.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 58%' }}
          priority
        />
        <h1
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '8rem',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'lowercase',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          work
        </h1>
      </section>

      {/* Filters */}
      <section style={{ padding: '4rem 0 2rem', background: 'var(--color-cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pill-button ${activeCategory === cat ? 'primary' : 'outline'}`}
                style={{ textTransform: 'lowercase', fontSize: '1.4rem', padding: '0.8rem 2rem' }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-cream)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '3rem',
            }}
            className="work-grid"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '6rem 0',
                color: 'var(--color-grey)',
                fontSize: '1.8rem',
              }}
            >
              No projects found for this filter.
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
