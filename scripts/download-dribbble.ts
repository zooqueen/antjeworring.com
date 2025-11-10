/**
 * Dribbble Portfolio Download Helper
 * 
 * This script provides URLs for manual download of Dribbble shots.
 * Due to Dribbble's authentication requirements, automated download
 * would require an API token.
 * 
 * To use:
 * 1. Visit each URL below
 * 2. Right-click the image and "Save Image As"
 * 3. Save to /public/assets/dribbble/ directory
 * 4. Name files as: dribbble-{number}.jpg or dribbble-{number}.png
 */

export const dribbbleShots = [
  // Recent Works (May 2025)
  {
    title: 'Jungle Bikini',
    category: 'Fashion Photography',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-jungle-bikini.jpg',
    tags: ['fashion', 'photography', 'karma-bikinis'],
  },
  {
    title: 'ZOO NGO',
    category: 'Illustration',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-zoo-ngo.jpg',
    tags: ['illustration', 'zoo', 'ngo', 'giraffe'],
  },
  {
    title: 'Karma Bikinis Collection',
    category: 'Fashion Photography',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-karma-bikinis.jpg',
    tags: ['fashion', 'photography', 'karma-bikinis', 'swimwear'],
  },
  {
    title: 'Product Packaging',
    category: 'Packaging Design',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-product-packaging.jpg',
    tags: ['packaging', 'design', 'branding'],
  },
  {
    title: 'Animal Connection',
    category: 'Zoo Artwork',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-animal-connection.jpg',
    tags: ['illustration', 'zoo', 'conservation'],
  },
  
  // Fashion & Lifestyle Collection (January 2025)
  {
    title: 'Modern Routine',
    category: 'Fashion Collection',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-modern-routine.jpg',
    tags: ['fashion', 'collection', 'lifestyle'],
  },
  {
    title: 'Looks XII',
    category: 'Fashion Design',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-looks-xii.jpg',
    tags: ['fashion', 'design', 'collection'],
  },
  {
    title: 'Aykes Collection',
    category: 'Fashion Design',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-aykes.jpg',
    tags: ['fashion', 'design'],
  },
  {
    title: 'Website Landing Page',
    category: 'Web Design',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-website-landing.jpg',
    tags: ['web-design', 'ui', 'landing-page'],
  },
  {
    title: 'Runway Looks',
    category: 'Fashion Design',
    year: '2025',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-runway-looks.jpg',
    tags: ['fashion', 'runway', 'design'],
  },
  
  // Gaming & NFT Projects
  {
    title: 'Cricket Team Illustrations',
    category: 'Character Design',
    year: '2024',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-cricket-team.jpg',
    tags: ['illustration', 'character-design', 'gaming', 'cricket'],
  },
  {
    title: '$SLOG NFT Gaming',
    category: 'NFT × Gaming',
    year: '2024',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-slog-nft.jpg',
    tags: ['nft', 'gaming', 'crypto', 'web3'],
  },
  {
    title: 'NFT Cricket Game',
    category: 'Gaming Design',
    year: '2024',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-nft-cricket.jpg',
    tags: ['nft', 'gaming', 'cricket', 'web3'],
  },
  
  // Additional Projects
  {
    title: 'Lux Crypto Poker Tournament',
    category: 'Graphic Design × Illustration',
    year: '2023',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-lux-poker.jpg',
    tags: ['crypto', 'illustration', 'lux', 'poker', 'web3'],
  },
  {
    title: 'The Gift of Hearing',
    category: 'Advertisement',
    year: '2023',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-gift-of-hearing.jpg',
    tags: ['advertisement', 'design', 'social-impact'],
  },
  {
    title: 'Game Promo Poster',
    category: 'Gaming Poster',
    year: '2024',
    url: 'https://dribbble.com/antjekarina',
    filename: 'dribbble-game-promo.jpg',
    tags: ['gaming', 'poster', 'design'],
  },
]

// Function to generate download instructions
export function generateDownloadInstructions() {
  console.log('='.repeat(80))
  console.log('DRIBBBLE PORTFOLIO DOWNLOAD INSTRUCTIONS')
  console.log('='.repeat(80))
  console.log('\nTotal shots to download:', dribbbleShots.length)
  console.log('\n1. Create directory: mkdir -p /public/assets/dribbble')
  console.log('2. Visit https://dribbble.com/antjekarina')
  console.log('3. For each shot, right-click and "Save Image As"')
  console.log('4. Save with the filename specified below:\n')
  
  dribbbleShots.forEach((shot, index) => {
    console.log(`[${index + 1}/${dribbbleShots.length}] ${shot.title}`)
    console.log(`   Category: ${shot.category}`)
    console.log(`   Filename: ${shot.filename}`)
    console.log(`   Tags: ${shot.tags.join(', ')}`)
    console.log()
  })
  
  console.log('='.repeat(80))
  console.log('After downloading, run: npm run organize-portfolio')
  console.log('='.repeat(80))
}

if (require.main === module) {
  generateDownloadInstructions()
}
