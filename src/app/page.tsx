'use client'

import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { VideoGallery, featuredVideos } from '@/components/VideoGallery'
import { InstagramFeed } from '@/components/InstagramFeed'

export default function Home() {
  return (
    <div id="main">
      <Hero />
      <div className="horizontal-line" />
      <VideoGallery videos={featuredVideos} featured={true} />
      <div className="horizontal-line" />
      <About />
      <div className="horizontal-line" />
      <Projects />
      <div className="horizontal-line" />
      <InstagramFeed />
      <div className="horizontal-line" />
      <Experience />
    </div>
  )
}
