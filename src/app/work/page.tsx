'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const allProjects = [
  {
    id: 1,
    title: 'Wildlife Wander Portal',
    category: 'Metaverse',
    year: '2024',
    image: '/assets/project1.jpg',
    description: 'Interactive virtual experience for wildlife conservation education',
  },
  {
    id: 2,
    title: 'Zoo Labs Foundation Platform',
    category: 'Web3',
    year: '2023',
    image: '/assets/project2.png',
    description: 'Decentralized network for conservation and research',
  },
  {
    id: 3,
    title: 'Digital Habitat Series',
    category: 'NFT',
    year: '2024',
    image: '/assets/project3.png',
    description: 'Generative art supporting conservation',
  },
  {
    id: 4,
    title: 'Metaverse Conservation Spaces',
    category: 'Metaverse',
    year: '2023',
    image: '/assets/project4.png',
    description: 'Educational experiences in virtual worlds',
  },
  {
    id: 5,
    title: 'Wildlife Data Visualization',
    category: 'Design',
    year: '2024',
    image: '/assets/project5.png',
    description: 'Interactive dashboards for conservation data',
  },
  {
    id: 6,
    title: 'Virtual Sanctuary',
    category: 'Metaverse',
    year: '2023',
    image: '/assets/project6.png',
    description: 'Immersive wildlife sanctuary experience',
  },
  {
    id: 7,
    title: 'Conservation DAO',
    category: 'Web3',
    year: '2024',
    image: '/assets/project7.png',
    description: 'Community-governed conservation funding',
  },
  {
    id: 8,
    title: 'Species Archive',
    category: 'Design',
    year: '2023',
    image: '/assets/project8.jpg',
    description: 'Digital archive of endangered species',
  },
]

const categories = ['All', 'Metaverse', 'Web3', 'NFT', 'Design']

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory)

  return (
    <div className="pt-32 pb-20">
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Selected Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-grey mb-12"
          >
            Projects at the intersection of art, technology, and conservation
          </motion.p>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-grey/20 text-black hover:bg-grey/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-grey">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="text-xl font-bold group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                  <p className="text-grey text-sm">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
