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
  videoEmbed?: string
  hoverVideoId?: string
  imageStyle?: {
    objectFit?: 'cover' | 'contain'
    objectPosition?: string
    background?: string
    scale?: number
  }
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
        url: 'https://www.marinij.com/2016/04/08/fashion-lifestyle-site-epic-sky-promotes-teen-girls-epic-self/',
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
    image: '/assets/epic-sky.png',
    description: 'Early founder and designer who built a youth-driven swimwear brand centered on confidence and creativity.',
    tags: ['fashion', 'tween-fashion', 'epic-sky', 'design'],
    links: [
      {
        type: 'article',
        url: 'https://www.marinij.com/2016/04/08/fashion-lifestyle-site-epic-sky-promotes-teen-girls-epic-self/',
        title: 'Marin Independent Journal - Epic Sky',
      },
    ],
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
    videoEmbed: 'https://www.youtube-nocookie.com/embed/rMDadDkJTpo',
    description: 'Escape from COVID in your backyard - creative campaign during pandemic.',
    tags: ['campaign', 'video', 'covid', 'karma-bikinis', 'marketing'],
    links: [
      {
        type: 'video',
        url: 'https://youtu.be/rMDadDkJTpo?list=TLGGitEt5dQtzQMxMDAyMjAyNg',
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
    videoEmbed: 'https://www.youtube-nocookie.com/embed/R7lViwC91KM',
    description: 'Tropical-inspired fashion campaign celebrating island culture.',
    tags: ['campaign', 'photography', 'karma-bikinis', 'cultural'],
    links: [
      {
        type: 'campaign',
        url: '#', // Add actual URL
        title: 'Polynesian Princess Campaign',
      },
    ],
    order: 7,
  },
  {
    id: 'summer-of-love',
    title: 'Summer of Love Campaign',
    category: 'Campaign Video × Fashion',
    year: '2020',
    date: '2020-09',
    image: '/assets/project1.jpg',
    videoEmbed: 'https://www.youtube-nocookie.com/embed/UADnBO7Bzq4',
    description: 'Feel-good summer campaign celebrating connection and creativity.',
    tags: ['campaign', 'video', 'karma-bikinis', 'summer'],
    links: [
      {
        type: 'video',
        url: '#', // Add actual URL
        title: 'Summer of Love Campaign Video',
      },
    ],
    order: 6,
  },

  // 2021-2022: Web3 & Blockchain Era
  {
    id: 'dayna-x-karma-2022',
    title: 'Dayna x Karma Collaboration',
    category: 'Fashion Collaboration',
    year: '2022',
    date: '2022-03',
    image: '/assets/dayna-x-karma.png',
    hoverVideoId: 'UAT2yVOzm8s',
    imageStyle: { objectPosition: 'center top', scale: 1.3 },
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
    image: '/assets/startup-grind.jpeg',
    imageStyle: { objectFit: 'contain', background: '#3d5a3d' },
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
    image: '/assets/ai-bias-talk.jpg',
    description: 'Discussion on AI bias, ethics, and responsible development.',
    tags: ['speaking', 'ai', 'ethics', 'technology'],
    links: [
      {
        type: 'video',
        url: 'https://youtu.be/6EtEjToWWlc',
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
    image: '/assets/product-packaging.jpg',
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
    image: '/assets/lux-banking-app.jpeg',
    imageStyle: { objectPosition: 'right center', scale: 1.2 },
    description: 'Modern banking app design for Lux financial platform.',
    tags: ['ui-ux', 'fintech', 'lux', 'banking', 'crypto'],
    featured: true,
    order: 14,
  },
  {
    id: 'zoo-labs-foundation',
    title: 'Zoo Labs Foundation',
    category: 'Web3 × Impact',
    year: '2023',
    date: '2023-10',
    image: '/assets/zoo-labs-foundation.jpg',
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
    image: '/assets/nft-cricket-game.jpg',
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
    image: '/assets/slog-nft-gaming.jpg',
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
    image: '/assets/wildlifewander.png',
    imageStyle: { objectPosition: 'left center' },
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
    image: '/assets/digital-habitat-series.jpg',
    description: 'NFT art collection featuring digital habitats and endangered species.',
    tags: ['nft', 'art', 'conservation', 'digital-art', 'zoo'],
    order: 20,
  },

  // 2025: Latest Work - Dribbble Portfolio
  {
    id: 'zoo-ngo-illustration',
    title: 'Zoo NGO Branding',
    category: 'Illustration × Branding',
    year: '2025',
    date: '2025-01',
    image: '/assets/dribbble-zoo-ngo.jpg',
    description: 'Cute and engaging illustration work for Zoo NGO initiatives.',
    tags: ['illustration', 'zoo', 'ngo', 'branding', 'conservation'],
    featured: true,
    order: 21,
  },
  {
    id: 'animal-connection',
    title: 'Animal Connection',
    category: 'Illustration × Conservation',
    year: '2025',
    date: '2025-01',
    image: '/assets/dribbble-animal-connection.png',
    description: 'Illustrative work exploring the bond between humans and animals.',
    tags: ['illustration', 'conservation', 'animals', 'art'],
    order: 22,
  },
  {
    id: 'jungle-bikini-2025',
    title: 'Jungle Bikini Collection',
    category: 'Fashion Photography',
    year: '2025',
    date: '2025-01',
    image: '/assets/dribbble-jungle-bikini.jpg',
    description: 'Latest Karma Bikinis collection inspired by tropical jungle environments.',
    tags: ['fashion', 'photography', 'karma-bikinis', 'jungle', 'swimwear'],
    featured: true,
    order: 23,
  },
  {
    id: 'credit-card-design',
    title: 'Credit Card Design',
    category: 'Product Design × FinTech',
    year: '2024',
    date: '2024-06',
    image: '/assets/dribbble-credit-card.png',
    description: 'Modern credit card design for Lux financial products.',
    tags: ['product-design', 'fintech', 'lux', 'branding'],
    order: 24,
  },
  {
    id: 'karma-bikinis-dribbble-1',
    title: 'Karma Bikinis Editorial',
    category: 'Fashion Photography',
    year: '2025',
    date: '2025-01',
    image: '/assets/dribbble-karma-bikinis-1.jpg',
    description: 'Editorial photography for Karma Bikinis collection.',
    tags: ['fashion', 'photography', 'karma-bikinis', 'editorial'],
    order: 25,
  },
  {
    id: 'product-packaging-dribbble',
    title: 'Product Packaging Design',
    category: 'Packaging × Branding',
    year: '2024',
    date: '2024-08',
    image: '/assets/dribbble-product-packaging.jpg',
    description: 'Creative product packaging designs for various brands.',
    tags: ['packaging', 'design', 'branding', 'product-design'],
    order: 26,
  },
  {
    id: 'karma-bikinis-dribbble-2',
    title: 'Karma Bikinis Shoot',
    category: 'Fashion Photography',
    year: '2025',
    date: '2025-01',
    image: '/assets/dribbble-karma-bikinis-2.jpg',
    description: 'Fashion photography shoot for Karma Bikinis.',
    tags: ['fashion', 'photography', 'karma-bikinis'],
    order: 27,
  },
  {
    id: 'modern-routine-2025',
    title: 'Modern Routine Fashion',
    category: 'Fashion Collection',
    year: '2025',
    date: '2025-01',
    image: '/assets/fashion-collection-2025.jpg',
    imageStyle: { objectFit: 'contain', background: '#ffffff' },
    description: 'Contemporary fashion collection exploring daily rituals and modern lifestyle.',
    tags: ['fashion', 'collection', 'lifestyle', 'contemporary'],
    order: 28,
  },
  {
    id: 'lux-poker-tournament-dribbble',
    title: 'Lux Crypto Poker Tournament',
    category: 'Graphic Design × Event',
    year: '2023',
    date: '2023-11',
    image: '/assets/dribbble-lux-poker.jpg',
    description: 'Event branding and promotional design for Lux crypto poker tournament.',
    tags: ['graphic-design', 'event', 'crypto', 'lux', 'web3'],
    featured: true,
    order: 34,
  },
  {
    id: 'game-promo-design',
    title: 'Game Promo Design',
    category: 'Gaming × Marketing',
    year: '2024',
    date: '2024-02',
    image: '/assets/dribbble-game-promo.jpg',
    description: 'Promotional design for gaming projects.',
    tags: ['gaming', 'marketing', 'design', 'promo'],
    order: 35,
  },
  {
    id: 'ad-creative-design',
    title: 'Ad Creative',
    category: 'Advertising × Design',
    year: '2023',
    date: '2023-07',
    image: '/assets/dribbble-ad-creative.jpg',
    description: 'Creative advertising design and campaigns.',
    tags: ['advertising', 'design', 'marketing', 'creative'],
    order: 39,
  },
  {
    id: 'social-ads-design',
    title: 'Social Ads',
    category: 'Social Media × Advertising',
    year: '2023',
    date: '2023-06',
    image: '/assets/dribbble-social-ads.jpg',
    description: 'Social media advertising creative designs.',
    tags: ['social-media', 'advertising', 'design', 'marketing'],
    order: 40,
  },
  {
    id: 'art-basel-invite',
    title: 'Art Basel Invite',
    category: 'Event Design × Art',
    year: '2022',
    date: '2022-11',
    image: '/assets/dribbble-art-basel.png',
    description: 'Invitation design for Art Basel event.',
    tags: ['event', 'design', 'art', 'invitation'],
    order: 41,
  },
  {
    id: 'team-bios-design',
    title: 'Creative Team Bios',
    category: 'Social Media × Branding',
    year: '2023',
    date: '2023-04',
    image: '/assets/dribbble-team-bios.jpg',
    description: 'Instagram post designs for creative team bios.',
    tags: ['social-media', 'branding', 'team', 'instagram'],
    order: 42,
  },
  {
    id: 'nft-marketplace-design',
    title: 'NFT Marketplace',
    category: 'Web3 × UI/UX',
    year: '2022',
    date: '2022-08',
    image: '/assets/dribbble-nft-marketplace.png',
    description: 'UI/UX design for NFT marketplace platform.',
    tags: ['nft', 'ui-ux', 'web3', 'marketplace', 'crypto'],
    featured: true,
    order: 43,
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

export const getAllProjects = () =>
  allProjects.sort((a, b) => b.order - a.order)
