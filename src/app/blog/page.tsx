'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { getAllPosts } from '@/data/posts'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div style={{ background: 'var(--color-pink, #FFE8FB)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-green, #3d5a3d)',
          borderRadius: '0 0 40px 40px',
          padding: '14rem 0 6rem',
        }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: '#fff',
              textAlign: 'center',
              fontFamily: "'Hippie Vintage', cursive",
            }}
          >
            blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              textAlign: 'center',
              maxWidth: '720px',
              margin: '1.5rem auto 0',
              lineHeight: 1.5,
            }}
          >
            Writing on conservation, AI research, and the intersection of
            decentralized infrastructure with the natural world.
          </motion.p>
        </div>
      </section>

      {/* Post list */}
      <section style={{ padding: '6rem 0' }}>
        <div
          className="container"
          style={{ maxWidth: '880px', margin: '0 auto' }}
        >
          {posts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                marginBottom: '3rem',
                paddingBottom: '3rem',
                borderBottom:
                  idx === posts.length - 1
                    ? 'none'
                    : '1px solid rgba(0,0,0,0.12)',
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '0.6rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <time
                    style={{
                      fontSize: '0.95rem',
                      color: 'rgba(26,26,26,0.55)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.8rem',
                          color: '#e85d04',
                          background: 'rgba(232,93,4,0.08)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '1rem',
                          textTransform: 'lowercase',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    marginBottom: '0.8rem',
                    color: 'var(--color-black, #1a1a1a)',
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    color: 'rgba(26,26,26,0.7)',
                    marginBottom: '1rem',
                  }}
                >
                  {post.description}
                </p>
                <span
                  style={{
                    fontSize: '0.95rem',
                    color: '#e85d04',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}
                >
                  Read more →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
