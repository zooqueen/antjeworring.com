'use client'

/**
 * Minimal Markdown renderer — zero dependencies.
 *
 * Supports: # h1, ## h2, ### h3, paragraphs, blockquote (>), code fences
 * (```), inline `code`, **bold**, *italic*, [links](url), bulleted lists (-),
 * numbered lists, horizontal rule (---).
 *
 * Intentionally limited: no tables, no nested lists. The blog posts are
 * authored within these constraints.
 */

import React from 'react'

type Block =
  | { type: 'h1' | 'h2' | 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang: string; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'hr' }

const parse = (md: string): Block[] => {
  const lines = md.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip leading blank lines between blocks
    if (line.trim() === '') {
      i++
      continue
    }

    // Code fence
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      i++
      const buf: string[] = []
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      i++ // consume closing fence
      blocks.push({ type: 'code', lang, text: buf.join('\n') })
      continue
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2) })
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const buf: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        buf.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: 'quote', text: buf.join(' ').trim() })
      continue
    }

    // Bulleted list
    if (/^- /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^- /.test(lines[i])) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    // Paragraph (collect until blank or block-starter)
    const buf: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('> ') &&
      !/^- /.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i])
    ) {
      buf.push(lines[i])
      i++
    }
    blocks.push({ type: 'p', text: buf.join(' ') })
  }

  return blocks
}

/**
 * Render inline Markdown formatting: **bold**, *italic*, `code`, [link](url).
 * Returns React nodes. Order of regex matters; code spans win over emphasis.
 */
const renderInline = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = []
  let key = 0

  // Tokenize: split on the first matching pattern, recurse.
  const patterns: Array<[RegExp, (m: RegExpMatchArray) => React.ReactNode]> = [
    [
      /`([^`]+)`/,
      (m) => (
        <code
          key={key++}
          style={{
            background: 'rgba(0,0,0,0.06)',
            padding: '0.1em 0.35em',
            borderRadius: '0.3em',
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: '0.92em',
          }}
        >
          {m[1]}
        </code>
      ),
    ],
    [
      /\*\*([^*]+)\*\*/,
      (m) => (
        <strong key={key++} style={{ fontWeight: 700 }}>
          {m[1]}
        </strong>
      ),
    ],
    [
      /\*([^*]+)\*/,
      (m) => (
        <em key={key++} style={{ fontStyle: 'italic' }}>
          {m[1]}
        </em>
      ),
    ],
    [
      /\[([^\]]+)\]\(([^)]+)\)/,
      (m) => (
        <a
          key={key++}
          href={m[2]}
          target={m[2].startsWith('http') ? '_blank' : undefined}
          rel={m[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{
            color: '#e85d04',
            textDecoration: 'underline',
          }}
        >
          {m[1]}
        </a>
      ),
    ],
  ]

  let remaining = text
  while (remaining.length > 0) {
    let earliest: { idx: number; match: RegExpMatchArray; render: (m: RegExpMatchArray) => React.ReactNode } | null =
      null
    for (const [re, render] of patterns) {
      const m = remaining.match(re)
      if (m && m.index !== undefined) {
        if (earliest === null || m.index < earliest.idx) {
          earliest = { idx: m.index, match: m, render }
        }
      }
    }
    if (earliest === null) {
      nodes.push(remaining)
      break
    }
    if (earliest.idx > 0) {
      nodes.push(remaining.slice(0, earliest.idx))
    }
    nodes.push(earliest.render(earliest.match))
    remaining = remaining.slice(earliest.idx + earliest.match[0].length)
  }
  return nodes
}

const headingStyle: React.CSSProperties = {
  color: 'var(--color-black)',
  fontWeight: 700,
  lineHeight: 1.2,
}

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  const blocks = parse(markdown.trim())
  return (
    <div
      style={{
        fontSize: '1.15rem',
        lineHeight: 1.75,
        color: 'var(--color-black, #1a1a1a)',
      }}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                style={{
                  ...headingStyle,
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  marginTop: '4rem',
                  marginBottom: '1.5rem',
                  fontFamily: "'Hippie Vintage', cursive",
                }}
              >
                {renderInline(block.text)}
              </h1>
            )
          case 'h2':
            return (
              <h2
                key={idx}
                style={{
                  ...headingStyle,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  marginTop: '3rem',
                  marginBottom: '1rem',
                }}
              >
                {renderInline(block.text)}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={idx}
                style={{
                  ...headingStyle,
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)',
                  marginTop: '2.4rem',
                  marginBottom: '0.8rem',
                }}
              >
                {renderInline(block.text)}
              </h3>
            )
          case 'p':
            return (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>
                {renderInline(block.text)}
              </p>
            )
          case 'quote':
            return (
              <blockquote
                key={idx}
                style={{
                  borderLeft: '4px solid #e85d04',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  fontStyle: 'italic',
                  color: 'rgba(26,26,26,0.8)',
                }}
              >
                {renderInline(block.text)}
              </blockquote>
            )
          case 'code':
            return (
              <pre
                key={idx}
                style={{
                  background: '#1a1a1a',
                  color: '#fef6f0',
                  padding: '1.5rem',
                  borderRadius: '0.8rem',
                  overflowX: 'auto',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  margin: '2rem 0',
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <code>{block.text}</code>
              </pre>
            )
          case 'ul':
            return (
              <ul
                key={idx}
                style={{
                  paddingLeft: '1.8rem',
                  marginBottom: '1.5rem',
                  listStyle: 'disc',
                }}
              >
                {block.items.map((item, j) => (
                  <li key={j} style={{ marginBottom: '0.5rem' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol
                key={idx}
                style={{
                  paddingLeft: '1.8rem',
                  marginBottom: '1.5rem',
                  listStyle: 'decimal',
                }}
              >
                {block.items.map((item, j) => (
                  <li key={j} style={{ marginBottom: '0.5rem' }}>
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            )
          case 'hr':
            return (
              <hr
                key={idx}
                style={{
                  border: 'none',
                  borderTop: '1px solid rgba(0,0,0,0.15)',
                  margin: '3rem 0',
                }}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
