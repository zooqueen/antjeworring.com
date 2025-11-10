'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'antje@zoolabs.io',
    href: 'mailto:antje@zoolabs.io',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@zooqueen',
    href: 'https://github.com/zooqueen',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: '@zoo_labs',
    href: 'https://twitter.com/zoo_labs',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Antje Worring',
    href: 'https://linkedin.com/in/antje-worring',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Let's Create Something Meaningful
            </h1>
            <p className="text-xl md:text-2xl text-grey mb-16 max-w-2xl">
              Whether you're interested in collaboration, conservation projects, or
              metaverse architecture—I'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="group p-8 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                <method.icon
                  size={32}
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-bold mb-2">{method.label}</h3>
                <p className="text-grey group-hover:text-white/70 transition-colors flex items-center gap-2">
                  {method.value}
                  {method.href.startsWith('http') && (
                    <ExternalLink size={16} className="opacity-50" />
                  )}
                </p>
              </motion.a>
            ))}
          </div>

          <div className="horizontal-line" />

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Zoo Labs Foundation
            </h2>
            <p className="text-lg text-grey mb-6">
              For conservation initiatives, partnerships, or to learn more about our work
              protecting wildlife through technology and creativity.
            </p>
            <a
              href="https://zoolabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
            >
              Visit Zoo Labs Foundation
              <ExternalLink size={20} />
            </a>
          </motion.div>

          {/* Areas of Interest */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Collaboration Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Metaverse Architecture',
                'Conservation Technology',
                'NFT Collections for Impact',
                'Virtual Exhibitions',
                'Educational Experiences',
                'Decentralized Platforms',
              ].map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 bg-grey/10 rounded-lg"
                >
                  <p className="font-medium">{area}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
