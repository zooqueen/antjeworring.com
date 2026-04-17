'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const paragraphStyle = {
  fontSize: '1.8rem',
  lineHeight: '1.8',
  color: 'var(--color-black)',
  marginBottom: '2rem',
}

const sectionHeadingStyle = {
  fontSize: '2.4rem',
  fontWeight: 700,
  color: 'var(--color-black)',
  marginBottom: '2rem',
  fontFamily: "'Blauer Neue', sans-serif",
}

const itemStyle = {
  fontSize: '1.6rem',
  lineHeight: '1.7',
  color: 'var(--color-black)',
  paddingLeft: '1.5rem',
  position: 'relative' as const,
  marginBottom: '1.6rem',
}

const linkPillStyle = {
  fontSize: '1.3rem',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05rem',
  color: 'var(--color-black)',
  textDecoration: 'none',
  border: '1px solid var(--color-black)',
  borderRadius: '3rem',
  padding: '0.8rem 1.6rem',
}

const publications = [
  {
    tag: 'Foundation · Conservation · Education',
    title: 'Zoo Labs Foundation Mission',
    subtitle: 'AI-Blockchain Research for Conservation, Education, and Science',
    description: '501(c)(3) non-profit mission: Conservation AI, Educational AI, and Frontier AI research for the public good.',
    meta: 'Jan 2024 · Zoo Labs Foundation',
    pdf: '/papers/zoo-foundation-mission.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Architecture · L2 · Federated Learning',
    title: 'Zoo Network Architecture',
    subtitle: 'Decentralized AI Training and Inference Layer',
    description: 'L2 AI specialization layer with HLLM integration and federated learning for decentralized training and inference.',
    meta: 'Oct 2024 · Zoo Labs Foundation',
    pdf: '/papers/zoo-network-architecture.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Tokenomics · Airdrop · DAO Governance',
    title: 'Zoo Tokenomics',
    subtitle: '100% Airdrop Community-Owned AI Infrastructure',
    description: '100% airdrop tokenomics with zero VC/private sales and democratic validator participation for community-owned AI.',
    meta: 'Oct 2024 · Zoo Labs Foundation',
    pdf: '/papers/zoo-tokenomics.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Gym · Training · Open Source',
    title: 'Gym: Democratizing AI Model Training',
    subtitle: 'Open-Source Training Infrastructure',
    description: 'Comprehensive open-source platform supporting 100+ models and 8 training methods for democratized AI training.',
    meta: 'Sep 2024 · Zoo Labs Foundation',
    pdf: '/papers/gym-training-platform.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'HLLM · GRPO · Cost Reduction',
    title: 'HLLM: Hamiltonian LLMs with Training-Free GRPO',
    subtitle: '99.8% Cost Reduction via Semantic Optimization',
    description: '99.8% cost reduction ($18 vs $10,000+) and +2.7% accuracy via semantic optimization with Hamiltonian invariants.',
    meta: 'Aug 2024 · Zoo Labs Foundation',
    pdf: '/papers/hllm-training-free-grpo.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'DSO · Byzantine Robust · Decentralized',
    title: 'Zoo DSO: Decentralized Semantic Optimization',
    subtitle: 'Byzantine-Robust Prior Aggregation for Collective Intelligence',
    description: 'A decentralized protocol for aggregating AI model priors with Byzantine fault tolerance, enabling collective intelligence at network scale.',
    meta: 'Oct 2024 · ZIP-001 · Zoo Labs Foundation',
    pdf: '/papers/zoo-dso.pdf',
    source: 'https://github.com/zooai/papers',
    spec: 'https://github.com/zooai/zips/blob/main/ZIP-001-dso.md',
  },
  {
    tag: 'DSO · Experience Ledger · Byzantine Robust',
    title: 'Experience Ledger: Decentralized Semantic Optimization for LLMs',
    subtitle: 'Three-Layer Storage with 7680-Dim Embeddings',
    description: 'DSO with Byzantine-robust curation, three-layer storage, and 7680-dimensional embeddings for persistent learning.',
    meta: 'Sep 2024 · Zoo Labs Foundation',
    pdf: '/papers/experience-ledger-dso.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Experience Ledger · Semantic Memory',
    title: 'Zoo Experience Ledger',
    subtitle: 'Content-Addressable Semantic Memory',
    description: 'Content-addressable semantic memory system for decentralized AI with persistent learning across agents.',
    meta: 'Sep 2024 · Zoo Labs Foundation',
    pdf: '/papers/zoo-experience-ledger.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Experience Ledger · Human-AI',
    title: 'Experience Ledgers: Learning from Human-AI Interaction',
    subtitle: 'Persistent Semantic Memory',
    description: 'Persistent semantic memory from human-AI interaction for continuous learning and improvement.',
    meta: 'Aug 2024 · Zoo Labs Foundation',
    pdf: '/papers/experience-ledger.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'ZIP-002 · Zen-Reranker · BitDelta',
    title: 'ZIP-002: Zen-Reranker Integration',
    subtitle: 'Native 7680-Dimensional Embeddings with BitDelta',
    description: 'Native 7680-dimensional embeddings with BitDelta compression (31.87x ratio) for decentralized semantic optimization.',
    meta: 'Nov 2024 · Zoo Labs Foundation',
    pdf: '/papers/zip-002-zen-reranker.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'PoAI · Consensus · Verifiable Compute',
    title: 'Proof of AI: Consensus for Verifiable Compute',
    subtitle: 'Verifiable AI Compute Contribution',
    description: 'Consensus mechanism for verifying and rewarding AI compute contributions in decentralized networks.',
    meta: 'Nov 2024 · ZIP-002 · Zoo Labs Foundation',
    pdf: '/papers/zoo-poai-consensus.pdf',
    source: 'https://github.com/zooai/papers',
    spec: 'https://github.com/zooai/zips/blob/main/ZIP-002-poai.md',
  },
  {
    tag: 'PoAI · ML Consensus · Proof Systems',
    title: 'Proof of AI: Consensus Mechanisms for ML Workloads',
    subtitle: 'ML-Optimized Consensus',
    description: 'Consensus mechanisms designed specifically for machine learning workloads and verifiable AI computation.',
    meta: 'Nov 2024 · Zoo Labs Foundation',
    pdf: '/papers/poai-consensus.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Agent NFT · Token Standard · AI Agents',
    title: 'Agent NFTs: Token Standard for Autonomous AI Agents',
    subtitle: 'AI Agent Tokenization',
    description: 'Token standard for AI agents with economic agency, autonomous operation, and decentralized governance.',
    meta: 'Jul 2024 · Zoo Labs Foundation',
    pdf: '/papers/zoo-agent-nft.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'NFT · AI Ownership · Governance',
    title: 'Agent NFTs: Tokenized AI Ownership and Governance',
    subtitle: 'Governance Framework for AI Agents',
    description: 'Governance and ownership framework for tokenized AI agents with economic agency.',
    meta: 'Jul 2024 · Zoo Labs Foundation',
    pdf: '/papers/agent-nft.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Federated · Privacy · Distributed Learning',
    title: 'Federated DSO: Privacy-Preserving Distributed Learning',
    subtitle: 'Privacy-Preserving LLM Learning',
    description: 'Privacy-preserving distributed learning using federated DSO for LLMs across decentralized networks.',
    meta: 'Dec 2024 · Zoo Labs Foundation',
    pdf: '/papers/federated-dso.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Embeddings · 7680-Dim · Semantic Search',
    title: 'High-Dimensional Embedding Spaces for Semantic Search',
    subtitle: 'The Case for 7680 Dimensions',
    description: 'The case for 7680-dimensional embedding spaces in semantic search for optimal retrieval quality.',
    meta: 'Oct 2024 · Zoo Labs Foundation',
    pdf: '/papers/embedding-7680.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Conservation · Wildlife · AI',
    title: 'Conservation AI: Species Protection Systems',
    subtitle: 'AI for Wildlife Conservation',
    description: 'AI systems for wildlife conservation and species protection at scale.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-conservation-ai.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Wildlife · Tracking · Computer Vision',
    title: 'Wildlife Tracking with Computer Vision',
    subtitle: 'Real-Time Animal Detection and Monitoring',
    description: 'Computer vision systems for real-time wildlife tracking, detection, and monitoring.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-wildlife-tracking.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Habitat · Modeling · Prediction',
    title: 'AI Habitat Modeling',
    subtitle: 'Predictive Habitat Analysis and Restoration',
    description: 'AI-driven predictive habitat analysis and restoration planning for conservation efforts.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-habitat-modeling.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Classification · Deep Learning · Species',
    title: 'Deep Learning for Species Classification',
    subtitle: 'Multi-Modal Species Identification',
    description: 'Deep learning approaches for multi-modal species identification and classification.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-species-classification.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Impact Bonds · Conservation · DeFi',
    title: 'Conservation Impact Bonds',
    subtitle: 'Tokenized Environmental Impact Finance',
    description: 'Tokenized environmental impact bonds for conservation finance and DeFi composability.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-impact-bonds.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Carbon Credits · Verification · Climate',
    title: 'AI-Verified Carbon Credits',
    subtitle: 'Satellite-Validated Carbon Offset Protocol',
    description: 'AI-verified carbon credit protocol with satellite validation for transparent carbon offset markets.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-carbon-credits.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'DAO · Governance · Quadratic Voting',
    title: 'Zoo DAO Governance',
    subtitle: 'Quadratic Voting and Scientific Governance',
    description: 'DAO governance framework with quadratic voting for scientific research coordination.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-dao-governance.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Citizen Science · Crowdsourcing',
    title: 'Citizen Science Platform',
    subtitle: 'Crowdsourced Data Collection for Conservation',
    description: 'Platform for crowdsourced scientific data collection supporting conservation research.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-citizen-science.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Education · AI · Conservation',
    title: 'Educational AI for Conservation',
    subtitle: 'Adaptive Learning for Environmental Education',
    description: 'Adaptive learning systems for environmental education and conservation awareness.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-educational-ai.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Research · Coordination · Decentralized',
    title: 'Decentralized Research Coordination',
    subtitle: 'Multi-Institution Scientific Collaboration',
    description: 'Decentralized coordination framework for multi-institution scientific collaboration.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-research-coordination.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Data Commons · Open Data · Science',
    title: 'Open Data Commons for Conservation',
    subtitle: 'Shared Scientific Data Infrastructure',
    description: 'Open data commons infrastructure for shared scientific datasets supporting conservation research.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-data-commons.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Mobile · Inference · Edge AI',
    title: 'Mobile AI Inference for Field Research',
    subtitle: 'Edge AI for Wildlife Monitoring',
    description: 'Mobile AI inference for field research with edge deployment for wildlife monitoring.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-mobile-inference.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Federated Learning · Privacy · Wildlife',
    title: 'Federated Learning for Wildlife Data',
    subtitle: 'Privacy-Preserving Cross-Organization Learning',
    description: 'Federated learning for privacy-preserving cross-organization wildlife data analysis.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-federated-wildlife.pdf',
    source: 'https://github.com/zooai/papers',
  },
  {
    tag: 'Satellite · Ecology · Remote Sensing',
    title: 'Satellite Ecology with Deep Learning',
    subtitle: 'Remote Sensing for Ecosystem Monitoring',
    description: 'Deep learning applied to satellite remote sensing for ecosystem monitoring and ecological analysis.',
    meta: 'Feb 2025 · Zoo Labs Foundation',
    pdf: '/papers/zoo-satellite-ecology.pdf',
    source: 'https://github.com/zooai/papers',
  },
]

const standards = [
  {
    title: 'ZIPs — Zoo Improvement Proposals',
    meta: 'Governance framework for the Zoo ecosystem',
    summary: 'Technical and research standards for Zoo Network, Zoo DAO, and the Zoo/Zen model families.',
    href: 'https://zips.zoo.ngo/',
    repo: 'https://github.com/zooai/ZIPs',
  },
  {
    title: 'HIPs — Hanzo Improvement Proposals',
    meta: 'Technical specifications for Hanzo AI infrastructure',
    summary: 'Standards for the Hanzo Network, HMM-based L1 blockchain, AI compute exchange, and agent protocols.',
    href: 'https://github.com/hanzoai/HIPs',
    repo: 'https://github.com/hanzoai/HIPs',
  },
]

const modelFamilies = [
  {
    name: 'Zen',
    tagline: 'Open-weight frontier models',
    summary: 'The Zen family includes Zen-Reranker-8B (native 7680-dim embeddings, 68.4 MTEB) and related retrieval/reranking models optimized for high-dimensional semantic search.',
    links: [
      { label: 'Hugging Face', href: 'https://huggingface.co/zoo' },
      { label: 'Zen-Reranker on HF', href: 'https://huggingface.co/zoo/zen-reranker-8b' },
      { label: 'zooai/gym', href: 'https://github.com/zooai/gym' },
    ],
  },
  {
    name: 'Zoo',
    tagline: 'Decentralized AI protocol',
    summary: 'Zoo Network, Zoo DAO, and the research infrastructure behind Zoo Labs Foundation (501c3). Decentralized semantic optimization, Proof of AI, and on-chain research funding.',
    links: [
      { label: 'zoolabs.io', href: 'https://zoolabs.io' },
      { label: 'zooai on GitHub', href: 'https://github.com/zooai' },
      { label: 'Zoo Labs Papers', href: 'https://github.com/zooai/papers' },
    ],
  },
  {
    name: 'Hanzo',
    tagline: 'AI-native infrastructure',
    summary: 'Hanzo Network L1, inference engine, and agentic developer tooling. The substrate for running Agent NFTs and Proof of AI consensus in production.',
    links: [
      { label: 'hanzo.ai', href: 'https://hanzo.ai' },
      { label: 'hanzoai on GitHub', href: 'https://github.com/hanzoai' },
      { label: 'Hanzo Papers', href: 'https://github.com/hanzoai/papers' },
    ],
  },
]

const ossProjects = [
  {
    title: 'Zen-Reranker-8B',
    meta: 'Hugging Face · Native 7680-dim embeddings',
    href: 'https://huggingface.co/zoo/zen-reranker-8b',
  },
  {
    title: 'zooai/zen-reranker',
    meta: 'GitHub · Reference implementation',
    href: 'https://github.com/zoolabs/zen-reranker',
  },
  {
    title: 'zooai/gym',
    meta: 'GitHub · Training infrastructure for Zoo & Zen',
    href: 'https://github.com/zooai/gym',
  },
  {
    title: 'hanzoai/node',
    meta: 'GitHub · Hanzo Network reference node',
    href: 'https://github.com/hanzoai/node',
  },
  {
    title: 'hanzoai/engine',
    meta: 'GitHub · Rust inference engine for LLMs & embeddings',
    href: 'https://github.com/hanzoai/engine',
  },
  {
    title: 'zooai/computer',
    meta: 'GitHub · Decentralized AI supercomputing',
    href: 'https://github.com/zooai/computer',
  },
]

export default function ResearchPage() {
  return (
    <div style={{ background: 'var(--color-pink)' }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-black)',
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
              textAlign: 'left',
              fontFamily: "'Hippie Vintage', cursive",
            }}
          >
            research
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '1.6rem',
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'left',
              maxWidth: '720px',
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            AI research, open-weight models, and protocol standards across the Hanzo, Zoo, and Zen ecosystems.
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '6rem 0 2rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: 0 }}
          >
            <p style={paragraphStyle}>
              I&apos;m Chief Scientist at <a href="https://zoolabs.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>Zoo Labs Foundation</a> (501c3), where I lead research and development on the Zoo and Zen model families. My work spans high-dimensional embedding spaces, decentralized semantic optimization, Proof of AI consensus, and autonomous agent protocols.
            </p>
            <p style={paragraphStyle}>
              Research flows across three ecosystems — <strong>Hanzo</strong> (infrastructure), <strong>Zoo</strong> (protocol & impact), and <strong>Zen</strong> (models). Papers live on <a href="https://papers.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>papers.zoo.ngo</a>, formal proofs on <a href="https://proofs.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>proofs.zoo.ngo</a>, and protocol standards on <a href="https://zips.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>zips.zoo.ngo</a>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://zips.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>ZIPs →</a>
              <a href="https://papers.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>Papers →</a>
              <a href="https://proofs.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>Proofs →</a>
              <a href="https://huggingface.co/zoo" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>Hugging Face →</a>
              <a href="https://github.com/zooai" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>Zoo on GitHub →</a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" style={linkPillStyle}>Hanzo on GitHub →</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Model Families */}
      <section style={{ padding: '6rem 0 2rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: '0 auto 3rem', textAlign: 'center' }}
          >
            <h2 style={sectionHeadingStyle}>Model families</h2>
            <p style={paragraphStyle}>
              Three research ecosystems, one mission: open-weight AI that&apos;s safe, efficient, and accountable to the public.
            </p>
          </motion.div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '3rem',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
            className="ventures-grid"
          >
            {modelFamilies.map((family, i) => (
              <motion.div
                key={family.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ border: '1px solid #000', borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--color-cream)' }}
              >
                <div style={{ padding: '2.5rem' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08rem', color: 'var(--color-orange)', marginBottom: '1rem' }}>
                    {family.tagline}
                  </p>
                  <h3 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-black)', fontFamily: "'Blauer Neue', sans-serif" }}>
                    {family.name}
                  </h3>
                  <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'var(--color-black)', marginBottom: '2rem' }}>
                    {family.summary}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {family.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)', textDecoration: 'none' }}
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section style={{ padding: '6rem 0 2rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: '0 0 4rem' }}
          >
            <h2 style={sectionHeadingStyle}>Publications</h2>
            <p style={paragraphStyle}>
              Selected papers and research outputs. Full archive on{' '}
              <a href="https://papers.zoo.ngo/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-black)', textDecoration: 'underline' }}>papers.zoo.ngo</a>.
            </p>
          </motion.div>

          <div
            className="research-publications-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6rem 5rem',
              maxWidth: '1200px',
              margin: 0,
            }}
          >
            {publications.map((pub, i) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <p
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: 'var(--color-black)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                  }}
                >
                  <span aria-hidden style={{ fontWeight: 700 }}>—</span>
                  {pub.tag}
                </p>
                <h3
                  style={{
                    fontSize: '2.4rem',
                    fontFamily: "'Blauer Neue', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: 'var(--color-black)',
                    marginBottom: '0.6rem',
                  }}
                >
                  {pub.title}
                </h3>
                {pub.subtitle && (
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      color: 'var(--color-black)',
                      opacity: 0.85,
                      marginBottom: '1rem',
                    }}
                  >
                    {pub.subtitle}
                  </p>
                )}
                <p
                  style={{
                    fontSize: '1.6rem',
                    lineHeight: 1.6,
                    color: 'var(--color-black)',
                    opacity: 0.75,
                    marginBottom: '1rem',
                  }}
                >
                  {pub.description}
                </p>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-grey)',
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem',
                  }}
                >
                  {pub.meta}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <a
                    href={pub.pdf}
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      background: 'var(--color-black)',
                      color: '#fff',
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      padding: '1.1rem 2rem',
                      borderRadius: '3rem',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    Download PDF
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '2.4rem',
                        height: '2.4rem',
                        borderRadius: '50%',
                        background: '#fff',
                        color: 'var(--color-black)',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </span>
                  </a>
                  {pub.source && (
                    <a
                      href={pub.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        background: 'transparent',
                        color: 'var(--color-black)',
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        padding: '1.1rem 2rem',
                        borderRadius: '3rem',
                        border: '1px solid var(--color-black)',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                      Source →
                    </a>
                  )}
                  {pub.spec && (
                    <a
                      href={pub.spec}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        background: 'transparent',
                        color: 'var(--color-black)',
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        padding: '1.1rem 2rem',
                        borderRadius: '3rem',
                        border: '1px solid var(--color-black)',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                      Spec →
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section style={{ padding: '6rem 0 2rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: 0 }}
          >
            <h2 style={sectionHeadingStyle}>Standards</h2>
            <p style={paragraphStyle}>
              Protocol standards that define how the Hanzo and Zoo ecosystems evolve. Improvement proposals are the primary research-into-production pipeline.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {standards.map((std) => (
                <li key={std.title} style={itemStyle}>
                  <span style={{ position: 'absolute', left: 0 }}>—</span>
                  <a
                    href={std.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-black)', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    {std.title}
                  </a>
                  <br />
                  <span style={{ fontSize: '1.3rem', color: 'var(--color-grey)' }}>{std.meta}</span>
                  <p style={{ fontSize: '1.5rem', lineHeight: 1.6, color: 'var(--color-black)', marginTop: '0.6rem' }}>
                    {std.summary}
                  </p>
                  <a
                    href={std.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '1.2rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-black)', textDecoration: 'none' }}
                  >
                    GitHub →
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section style={{ padding: '6rem 0 8rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: 0 }}
          >
            <h2 style={sectionHeadingStyle}>Open source</h2>
            <p style={paragraphStyle}>
              Everything above ships as open weights, open code, and open research. These are the primary repositories I lead or contribute to.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ossProjects.map((item) => (
                <li key={item.title} style={itemStyle}>
                  <span style={{ position: 'absolute', left: 0 }}>—</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-black)', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    {item.title}
                  </a>
                  <br />
                  <span style={{ fontSize: '1.3rem', color: 'var(--color-grey)' }}>{item.meta}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA back to Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: '720px', margin: '4rem 0 0', textAlign: 'left' }}
          >
            <p style={{ ...paragraphStyle, marginBottom: '1.5rem' }}>
              Research lives alongside everything else I build.
            </p>
            <Link
              href="/work"
              style={{ ...linkPillStyle, display: 'inline-block' }}
            >
              See all work →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
