'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { getLatestProjects } from '@/data/projects'

export function Projects() {
  // Get latest 4 projects for home page
  const projects = getLatestProjects(4)

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6rem', flexWrap: 'wrap', gap: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 style={{ marginBottom: '1.5rem' }}>Selected Works</h1>
          <p style={{ color: '#666', fontSize: '2rem', fontFamily: 'var(--font-family-light)' }}>
            (2015 - 2025)
          </p>
        </motion.div>

        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '2rem',
            fontFamily: 'var(--font-family-bold)',
            paddingTop: '2rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          className="desktop-link"
        >
          View all projects
          <Image src="/assets/arrowRight.png" alt="arrow" width={26} height={26} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5rem' }}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img')
              if (img) {
                img.style.transform = 'scale(1.08)'
                img.style.filter = 'contrast(1.1) saturate(1.1)'
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
              marginBottom: '2.5rem',
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
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p style={{
                fontSize: '1.8rem',
                color: '#999',
                marginBottom: '1rem',
                fontFamily: 'var(--font-family-regular)',
                letterSpacing: '0.05rem',
                textTransform: 'uppercase'
              }}>
                {project.category} · {project.year}
              </p>
              <h3 style={{ marginBottom: '1rem', fontSize: '4rem' }}>{project.title}</h3>
              {project.description && (
                <p style={{
                  fontSize: '1.6rem',
                  color: '#666',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-family-light)'
                }}>
                  {project.description}
                </p>
              )}
              {project.tags && (
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginTop: '1.5rem',
                  flexWrap: 'wrap'
                }}>
                  {project.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '1.2rem',
                        padding: '0.5rem 1rem',
                        background: '#f5f5f5',
                        color: '#666',
                        letterSpacing: '0.05rem'
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
      </div>

      <style jsx>{`
        @media (max-width: 868px) {
          .desktop-link {
            display: none !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  )
}
