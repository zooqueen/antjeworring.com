'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getLatestProjects, getAllProjects, type Project } from '@/data/projects'

const categories = ['all', 'fashion', 'tech', 'ngo']

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const allProjects = getAllProjects()

  const filteredProjects = activeCategory === 'all'
    ? allProjects.slice(0, 6)
    : allProjects.filter(p =>
        p.category.toLowerCase().includes(activeCategory) ||
        p.tags?.some(t => t.toLowerCase().includes(activeCategory))
      ).slice(0, 6)

  return (
    <section style={{ padding: '6rem 0' }}>
      <div className="container">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '5rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pill-button ${activeCategory === cat ? 'primary' : 'outline'}`}
              style={{
                textTransform: 'lowercase',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4rem',
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="project-card"
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          borderRadius: '16px',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{
            objectFit: 'cover',
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <h3
        style={{
          fontSize: '2.4rem',
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
