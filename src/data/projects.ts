/**
 * Comprehensive Portfolio Data
 * Organized chronologically from earliest to most recent work
 */

export interface Project {
  id: string
  title: string
  category: string
  year: string
  date?: string
  image: string
  description?: string
  tags: string[]
  links?: {
    type: 'video' | 'article' | 'campaign' | 'review' | 'interview' | 'website'
    url: string
    title: string
  }[]
  press?: {
    publication: string
    url?: string
  }[]
  featured?: boolean
  order: number
}

export const allProjects: Project[] = [
  // 2015-2016: Karma Bikinis Launch
  {
    id: 'karma-bikinis-launch',
    title: 'Karma Bikinis - First Collection',
    category: 'Fashion × Entrepreneurship',
    year: '2015',
    date: '2015-06',
    image: '/assets/project5.png',
    description: 'Founded Karma Bikinis at age 14. First fundraising campaign and initial collection launch.',
    tags: ['fashion', 'entrepreneurship', 'swimwear', 'startup'],
    links: [
      {
        type: 'campaign',
        url: '#', // Add actual URL
        title: 'First Fundraising Campaign',
      },
    ],
    press: [
      {
        publication: 'San Francisco Chronicle',
      },
      {
        publication: 'Marin Independent Journal',
      },
      {
        publication: 'Pacific Sun',
      },
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'karma-bikinis-miami-swim-week',
    title: 'Miami Swim Week Debut',
    category: 'Fashion Show × Event',
    year: '2016',
    date: '2016-07',
    image: '/assets/project6.png',
    description: 'First appearance at Miami Swim Week as a teenage designer.',
    tags: ['fashion', 'miami-swim-week', 'runway', 'karma-bikinis'],
    links: [
      {
        type: 'interview',
        url: '#', // Add actual URL
        title: 'Miami Swim Week Interview Video',
      },
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'FLL Fashion Show',
      },
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'karma-crowdfunding',
    title: 'Karma Crowdfunding Campaign',
    category: 'Fundraising × Marketing',
    year: '2017',
    date: '2017-03',
    image: '/assets/project7.png',
    description: 'Successfully raised $80k through crowdfunding campaign for Karma Bikinis expansion.',
    tags: ['fundraising', 'crowdfunding', 'startup', 'karma-bikinis'],
    featured: true,
    order: 3,
  },

  // 2017-2018: Epic Sky
  {
    id: 'epic-sky-teen-designer',
    title: 'Epic Sky - Teen Designer in Residence',
    category: 'Fashion × Tween Brand',
    year: '2017',
    date: '2017-09',
    image: '/assets/project9.png',
    description: 'Teen Designer in Residence for Epic Sky tween brand. Founding team composed of ex-executives from Gap and Everlane.',
    tags: ['fashion', 'tween-fashion', 'epic-sky', 'design'],
    featured: true,
    order: 4,
  },

  // 2020: COVID Era Campaigns
  {
    id: 'less-boring-summer',
    title: 'Less Boring Summer Campaign',
    category: 'Campaign Video × Marketing',
    year: '2020',
    date: '2020-06',
    image: '/assets/project10.png',
    description: 'Escape from COVID in your backyard - creative campaign during pandemic.',
    tags: ['campaign', 'video', 'covid', 'karma-bikinis', 'marketing'],
    links: [
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'Less Boring Summer Campaign Video',
      },
    ],
    order: 5,
  },
  {
    id: 'polynesian-princess',
    title: 'Polynesian Princess Campaign',
    category: 'Campaign × Photography',
    year: '2020',
    date: '2020-08',
    image: '/assets/project2_2.png',
    description: 'Tropical-inspired fashion campaign celebrating island culture.',
    tags: ['campaign', 'photography', 'karma-bikinis', 'cultural'],
    links: [
      {
        type: 'campaign',
        url: '#', // Add actual URL
        title: 'Polynesian Princess Campaign',
      },
    ],
    order: 6,
  },
  {
    id: 'summer-of-love',
    title: 'Summer of Love Campaign',
    category: 'Campaign Video × Fashion',
    year: '2020',
    date: '2020-09',
    image: '/assets/project1.jpg',
    description: 'Feel-good summer campaign celebrating connection and creativity.',
    tags: ['campaign', 'video', 'karma-bikinis', 'summer'],
    links: [
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'Summer of Love Campaign Video',
      },
    ],
    order: 7,
  },

  // 2021-2022: Web3 & Blockchain Era
  {
    id: 'dayna-x-karma-2022',
    title: 'Dayna x Karma Collaboration',
    category: 'Fashion Collaboration',
    year: '2022',
    date: '2022-03',
    image: '/assets/project8.jpg',
    description: 'Special collaboration collection featuring unique design elements.',
    tags: ['collaboration', 'fashion', 'karma-bikinis'],
    links: [
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'Dayna x Karma 2022 Video',
      },
    ],
    order: 8,
  },
  {
    id: 'startup-grind-panel',
    title: 'Startup Grind Panel - COO Lux Partners',
    category: 'Speaking × Web3',
    year: '2022',
    date: '2022-05',
    image: '/assets/project3.png',
    description: 'Panel discussion as COO of Lux Partners discussing blockchain and entrepreneurship.',
    tags: ['speaking', 'web3', 'lux', 'blockchain', 'startup'],
    featured: true,
    order: 9,
  },
  {
    id: 'ssw-blockchain-nfts',
    title: 'SSW 2022 - Blockchain & NFTs Panel',
    category: 'Speaking × Web3',
    year: '2022',
    date: '2022-07',
    image: '/assets/project2.png',
    description: 'Panelist discussing blockchain technology and NFTs at Swim Week 2022.',
    tags: ['speaking', 'web3', 'nfts', 'blockchain', 'miami-swim-week'],
    featured: true,
    order: 10,
  },
  {
    id: 'ai-bias-talk',
    title: 'AI Bias Discussion',
    category: 'Speaking × AI Ethics',
    year: '2022',
    date: '2022-10',
    image: '/assets/project4.png',
    description: 'Discussion on AI bias, ethics, and responsible development.',
    tags: ['speaking', 'ai', 'ethics', 'technology'],
    links: [
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'Video of me talking about AI Bias',
      },
    ],
    order: 11,
  },

  // 2022-2023: Product Design & Packaging
  {
    id: 'product-packaging-design',
    title: 'Product Packaging Series',
    category: 'Packaging Design × Branding',
    year: '2022',
    date: '2022-12',
    image: '/assets/project5.png',
    description: 'Comprehensive product packaging designs for various brands.',
    tags: ['packaging', 'design', 'branding', 'product-design'],
    order: 12,
  },
  {
    id: 'mens-designs',
    title: 'Mens Design Collection',
    category: 'Fashion × Menswear',
    year: '2023',
    date: '2023-02',
    image: '/assets/project6.png',
    description: 'Expansion into mens fashion and swimwear design.',
    tags: ['fashion', 'menswear', 'design', 'swimwear'],
    order: 13,
  },

  // 2023: Lux & Crypto Projects
  {
    id: 'lux-banking-app',
    title: 'Lux Banking App',
    category: 'UI/UX × FinTech',
    year: '2023',
    date: '2023-06',
    image: '/assets/project7.png',
    description: 'Modern banking app design for Lux financial platform.',
    tags: ['ui-ux', 'fintech', 'lux', 'banking', 'crypto'],
    featured: true,
    order: 14,
  },
  {
    id: 'lux-poker-tournament',
    title: 'Lux Crypto Poker Tournament',
    category: 'Graphic Design × Illustration',
    year: '2023',
    date: '2023-08',
    image: '/assets/project4.png', // Using existing asset
    description: 'Brand identity and promotional materials for Lux crypto poker tournament.',
    tags: ['graphic-design', 'illustration', 'crypto', 'lux', 'web3'],
    order: 15,
  },
  {
    id: 'zoo-labs-foundation',
    title: 'Zoo Labs Foundation',
    category: 'Web3 × Impact',
    year: '2023',
    date: '2023-10',
    image: '/assets/project2.png', // Using existing asset
    description: 'Director role at Zoo Labs Foundation - Conservation through creativity and Web3 technology.',
    tags: ['web3', 'conservation', 'foundation', 'zoo', 'deai', 'desci'],
    featured: true,
    order: 16,
  },

  // 2024: Gaming, NFTs & Metaverse
  {
    id: 'nft-cricket-game',
    title: 'NFT Cricket Game',
    category: 'Gaming × NFT',
    year: '2024',
    date: '2024-01',
    image: '/assets/project9.png',
    description: 'Character design and game assets for blockchain-based cricket game.',
    tags: ['gaming', 'nft', 'character-design', 'web3', 'cricket'],
    order: 17,
  },
  {
    id: 'slog-nft-gaming',
    title: '$SLOG NFT Gaming Project',
    category: 'NFT × Gaming',
    year: '2024',
    date: '2024-03',
    image: '/assets/project10.png',
    description: 'NFT gaming project featuring unique character designs and gameplay mechanics.',
    tags: ['nft', 'gaming', 'crypto', 'web3', 'character-design'],
    order: 18,
  },
  {
    id: 'wildlife-wander-portal',
    title: 'Wildlife Wander Portal',
    category: 'Metaverse × Conservation',
    year: '2024',
    date: '2024-06',
    image: '/assets/project1.jpg', // Using existing asset
    description: 'Immersive metaverse experience connecting people with wildlife conservation.',
    tags: ['metaverse', 'conservation', 'web3', 'vr', 'zoo'],
    featured: true,
    order: 19,
  },
  {
    id: 'digital-habitat-series',
    title: 'Digital Habitat Series',
    category: 'NFT × Art',
    year: '2024',
    date: '2024-09',
    image: '/assets/project3.png', // Using existing asset
    description: 'NFT art collection featuring digital habitats and endangered species.',
    tags: ['nft', 'art', 'conservation', 'digital-art', 'zoo'],
    order: 20,
  },

  // 2025: Latest Work
  {
    id: 'zoo-ngo-illustration',
    title: 'Zoo NGO Branding',
    category: 'Illustration × Branding',
    year: '2025',
    date: '2025-01',
    image: '/assets/project2.png',
    description: 'Cute and engaging illustration work for Zoo NGO initiatives.',
    tags: ['illustration', 'zoo', 'ngo', 'branding', 'conservation'],
    order: 21,
  },
  {
    id: 'jungle-bikini-2025',
    title: 'Jungle Bikini Collection',
    category: 'Fashion Photography',
    year: '2025',
    date: '2025-05',
    image: '/assets/project1.jpg',
    description: 'Latest Karma Bikinis collection inspired by tropical jungle environments.',
    tags: ['fashion', 'photography', 'karma-bikinis', 'jungle', 'swimwear'],
    order: 22,
  },
  {
    id: 'modern-routine-2025',
    title: 'Modern Routine Fashion',
    category: 'Fashion Collection',
    year: '2025',
    date: '2025-05',
    image: '/assets/project8.jpg',
    description: 'Contemporary fashion collection exploring daily rituals and modern lifestyle.',
    tags: ['fashion', 'collection', 'lifestyle', 'contemporary'],
    order: 23,
  },
]

// Helper functions
export const getFeaturedProjects = () => 
  allProjects.filter(p => p.featured).sort((a, b) => b.order - a.order)

export const getProjectsByYear = (year: string) => 
  allProjects.filter(p => p.year === year).sort((a, b) => b.order - a.order)

export const getProjectsByCategory = (category: string) => 
  allProjects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))

export const getProjectsByTag = (tag: string) => 
  allProjects.filter(p => p.tags.includes(tag))

export const getLatestProjects = (count: number = 6) => 
  allProjects.sort((a, b) => b.order - a.order).slice(0, count)

export const getAllYears = () => 
  Array.from(new Set(allProjects.map(p => p.year))).sort().reverse()

export const getAllCategories = () => 
  Array.from(new Set(allProjects.map(p => p.category))).sort()

export const getAllTags = () => 
  Array.from(new Set(allProjects.flatMap(p => p.tags))).sort()
