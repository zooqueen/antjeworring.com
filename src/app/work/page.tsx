'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { allProjects, getAllYears, getAllCategories } from '@/data/projects'
import { VideoGallery, allVideos } from '@/components/VideoGallery'
import { Press } from '@/components/Press'

export default function WorkPage() {
  const [activeYear, setActiveYear] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')

  const years = ['All', ...getAllYears()]
  
  // Get unique categories but simplify them
  const categories = ['All', 'Fashion', 'Web3', 'NFT', 'Design', 'Gaming', 'Conservation']

  const filteredProjects = allProjects.filter(project => {
    const yearMatch = activeYear === 'All' || project.year === activeYear
    const categoryMatch = activeCategory === 'All' || 
      project.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
    return yearMatch && categoryMatch
  }).sort((a, b) => b.order - a.order)

  return (
    <div style={{ paddingTop: '15rem', paddingBottom: '8rem' }}>
      <section style={{ padding: '0 3rem' }}>
        <div style={{ maxWidth: '140rem', margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              fontSize: '7rem', 
              marginBottom: '2rem',
              fontFamily: 'var(--font-family-bold)'
            }}
          >
            All Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: '2rem', 
              color: '#666', 
              marginBottom: '6rem',
              fontFamily: 'var(--font-family-light)'
            }}
          >
            A decade of fashion, art, technology, and conservation (2015-2025)
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '4rem' }}
          >
            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '2rem',
              fontFamily: 'var(--font-family-bold)',
              letterSpacing: '0.1rem',
              textTransform: 'uppercase'
            }}>
              Filter by Year
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  style={{
                    padding: '1.2rem 2.4rem',
                    fontSize: '1.6rem',
                    fontFamily: 'var(--font-family-regular)',
                    border: activeYear === year ? '2px solid #000' : '1px solid #ddd',
                    background: activeYear === year ? '#000' : 'transparent',
                    color: activeYear === year ? '#fff' : '#000',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeYear !== year) {
                      e.currentTarget.style.background = '#f5f5f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeYear !== year) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {year}
                </button>
              ))}
            </div>

            <h3 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '2rem',
              fontFamily: 'var(--font-family-bold)',
              letterSpacing: '0.1rem',
              textTransform: 'uppercase'
            }}>
              Filter by Category
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '6rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '1.2rem 2.4rem',
                    fontSize: '1.6rem',
                    fontFamily: 'var(--font-family-regular)',
                    border: activeCategory === cat ? '2px solid #000' : '1px solid #ddd',
                    background: activeCategory === cat ? '#000' : 'transparent',
                    color: activeCategory === cat ? '#fff' : '#000',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = '#f5f5f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '5rem',
              marginBottom: '12rem'
            }}
            className="projects-grid"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.transform = 'scale(1.05)'
                    img.style.filter = 'contrast(1.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.transform = 'scale(1)'
                    img.style.filter = 'contrast(1.05)'
                  }
                }}
              >
                <div style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  border: '1px solid #f0f0f0'
                }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'contrast(1.05)'
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {project.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: '#000',
                      color: '#fff',
                      padding: '0.8rem 1.5rem',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      letterSpacing: '0.1rem',
                    }}>
                      FEATURED
                    </div>
                  )}
                </div>
                <div>
                  <p style={{
                    fontSize: '1.4rem',
                    color: '#999',
                    marginBottom: '0.8rem',
                    fontFamily: 'var(--font-family-regular)',
                    letterSpacing: '0.05rem',
                    textTransform: 'uppercase',
                  }}>
                    {project.category} · {project.year}
                  </p>
                  <h3 style={{ 
                    fontSize: '2.4rem', 
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-family-bold)',
                    lineHeight: '1.3'
                  }}>
                    {project.title}
                  </h3>
                  {project.description && (
                    <p style={{
                      fontSize: '1.4rem',
                      color: '#666',
                      lineHeight: '1.5',
                      marginBottom: '1.5rem',
                      fontFamily: 'var(--font-family-light)',
                    }}>
                      {project.description}
                    </p>
                  )}
                  {project.tags && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.8rem', 
                      flexWrap: 'wrap'
                    }}>
                      {project.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '1.1rem',
                            padding: '0.4rem 0.8rem',
                            background: '#f5f5f5',
                            color: '#666',
                            letterSpacing: '0.03rem'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '8rem 0',
                color: '#999',
                fontSize: '2rem'
              }}
            >
              No projects found for this filter combination.
            </motion.div>
          )}

          {/* Video Gallery Section */}
          <div style={{ marginTop: '12rem' }}>
            <VideoGallery videos={allVideos} />
          </div>

          {/* Press Section */}
          <div style={{ marginTop: '12rem' }}>
            <Press />
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 1200px) {
            .projects-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 868px) {
            .projects-grid {
              grid-template-columns: 1fr !important;
              gap: 4rem !important;
            }
            section {
              padding: 0 2rem !important;
            }
          }
        `}</style>
      </section>
    </div>
  )
}
