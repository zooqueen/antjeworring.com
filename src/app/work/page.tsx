'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { allProjects, getAllYears } from '@/data/projects'

export default function WorkPage() {
  const [activeYear, setActiveYear] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const years = ['all', ...getAllYears()]
  const categories = ['all', 'fashion', 'web3', 'nft', 'design', 'conservation']

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
          background: 'var(--color-cream)',
          padding: '14rem 0 4rem',
          borderBottom: '1px solid #000',
        }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-name"
            style={{
              color: 'var(--color-black)',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'var(--color-grey)',
              textAlign: 'center',
              fontSize: '2rem',
            }}
          >
            ( A decade of fashion, art & technology )
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '4rem 0 2rem', background: 'var(--color-cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`pill-button ${activeYear === year ? 'primary' : 'outline'}`}
                style={{ textTransform: 'lowercase', fontSize: '1.4rem', padding: '0.8rem 2rem' }}
              >
                {year}
              </button>
            ))}
          </motion.div>

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
      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-cream)', borderTop: '1px solid #000' }}>
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
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    borderRadius: '1.5rem',
                    border: '1px solid #000',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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
