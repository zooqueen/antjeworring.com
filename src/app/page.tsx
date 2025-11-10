'use client'

import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'

export default function Home() {
  return (
    <div id="main">
      <Hero />
      <div className="horizontal-line" />
      <About />
      <div className="horizontal-line" />
      <Projects />
      <div className="horizontal-line" />
      <Experience />
    </div>
  )
}
