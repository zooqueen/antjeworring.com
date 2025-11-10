'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const skills = {
  design: ['Web Design', 'App Design', 'Visual Design', 'Prototypes', 'Interactions', '3D Design'],
  development: ['React', 'Next.js', 'TypeScript', 'Blockchain', 'Web3', 'Node.js'],
  metaverse: ['Virtual Worlds', 'Unity', 'Unreal Engine', 'Spatial Design', 'VR/AR'],
  conservation: ['Wildlife Protection', 'Education', 'Community Building', 'Research'],
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            About Me
          </motion.h1>
        </div>
      </section>

      <div className="horizontal-line" />

      {/* Full Image */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] overflow-hidden rounded-lg"
          >
            <Image
              src="/assets/about.jpg"
              alt="Antje Worring"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>
      </section>

      <div className="horizontal-line" />

      {/* Who I Am */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              Who I Am
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-grey"
            >
              <p>
                I'm Antje Worring, a multi-disciplinary artist and designer working at the
                intersection of art, technology, and conservation. My practice spans physical
                installations, digital experiences, and metaverse architecture.
              </p>

              <p>
                As Director of Zoo Labs Foundation, I lead initiatives that harness technology
                for wildlife conservation. We're building decentralized networks, educational
                platforms, and creative campaigns that connect people with nature in meaningful
                ways.
              </p>

              <p>
                My work explores how emerging technologies—from blockchain to virtual reality—can
                create new pathways for environmental stewardship. I believe that immersive
                experiences and digital art can inspire deeper connections with the natural world
                and drive real-world conservation outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="horizontal-line" />

      {/* Skills */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            What I Do
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 capitalize">{category}</h3>
                <ul className="space-y-2">
                  {items.map((skill) => (
                    <li key={skill} className="text-grey">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="horizontal-line" />

      {/* Process */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            My Approach
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Research & Discovery',
                description: 'Deep exploration of context, audience, and impact potential. Understanding the ecosystem before intervention.',
              },
              {
                title: 'Conceptual Development',
                description: 'Collaborative ideation that bridges disciplines. Creating frameworks that serve both artistic and functional goals.',
              },
              {
                title: 'Iterative Creation',
                description: 'Building and testing with communities. Refining through feedback and real-world application.',
              },
              {
                title: 'Impact & Evolution',
                description: 'Measuring outcomes and iterating. Projects that grow and adapt with their communities.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-black pl-6 py-4"
              >
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-grey">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
