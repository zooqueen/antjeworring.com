import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allPosts, getPostBySlug } from '@/data/posts'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Antje Worring`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Antje Worring'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div style={{ background: 'var(--color-pink, #FFE8FB)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-green, #3d5a3d)',
          borderRadius: '0 0 40px 40px',
          padding: '12rem 0 5rem',
        }}
      >
        <div
          className="container"
          style={{ maxWidth: '880px', margin: '0 auto' }}
        >
          <Link
            href="/blog"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              marginBottom: '2rem',
              display: 'inline-block',
            }}
          >
            ← All posts
          </Link>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <time
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                letterSpacing: '0.08em',
              }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.85)',
                    background: 'rgba(255,255,255,0.12)',
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
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              fontFamily: "'Hippie Vintage', cursive",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              lineHeight: 1.5,
              maxWidth: '720px',
            }}
          >
            {post.description}
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.95rem',
              marginTop: '2rem',
              fontStyle: 'italic',
            }}
          >
            By Antje Worring
          </p>
        </div>
      </section>

      {/* Body */}
      <article
        className="container"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '5rem 1.5rem 8rem',
        }}
      >
        <MarkdownRenderer markdown={post.body} />
      </article>
    </div>
  )
}
