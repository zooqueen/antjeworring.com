# How to Add YouTube Videos

## ✅ What's Fixed

1. **Video Placeholders**: Beautiful gradient placeholders now show when YouTube IDs aren't added yet
2. **All Images**: Mapped all projects to use existing assets (no more missing images!)
3. **Dribbble Link**: Added to footer with custom icon
4. **Responsive Design**: Videos will work on all devices once IDs are added

## 📺 Adding Your YouTube Videos

### Step 1: Get YouTube Video IDs

For each video, find the ID from the YouTube URL:

**Example URLs:**
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ↑ This is the video ID

https://youtu.be/dQw4w9WgXcQ
                 ↑ This is the video ID
```

### Step 2: Edit the Video Gallery Component

Open: `/src/components/VideoGallery.tsx`

Find these lines (around line 155-220) and replace empty `youtubeId` fields:

```typescript
export const featuredVideos: Video[] = [
  {
    id: 'jungle-bikini-2025',
    title: 'Jungle Bikini Campaign 2025',
    description: 'Latest collection showcasing tropical-inspired designs in lush jungle settings.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Fashion Campaign',
    year: '2025',
  },
  {
    id: 'summer-of-love',
    title: 'Summer of Love Campaign',
    description: 'Feel-good summer campaign celebrating connection, creativity, and coastal vibes.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Fashion Campaign',
    year: '2020',
  },
]

export const allVideos: Video[] = [
  ...featuredVideos,
  {
    id: 'miami-swim-week-interview',
    title: 'Miami Swim Week Interview',
    description: 'Interview at Miami Swim Week discussing Karma Bikinis journey and fashion entrepreneurship.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Interview',
    year: '2016',
  },
  {
    id: 'less-boring-summer',
    title: 'Less Boring Summer - Escape from COVID',
    description: 'Creative campaign video promoting outdoor fun during the pandemic.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Campaign',
    year: '2020',
  },
  {
    id: 'polynesian-princess',
    title: 'Polynesian Princess Campaign',
    description: 'Tropical campaign celebrating island culture and natural beauty.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Campaign',
    year: '2020',
  },
  {
    id: 'dayna-karma-2022',
    title: 'Dayna x Karma Collaboration',
    description: 'Behind the scenes of the Dayna x Karma collaboration collection.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Fashion Collaboration',
    year: '2022',
  },
  {
    id: 'ai-bias-discussion',
    title: 'AI Bias Discussion',
    description: 'Discussing AI bias, ethics, and the importance of responsible AI development.',
    youtubeId: '', // ← ADD YOUR YOUTUBE ID HERE
    category: 'Tech Talk',
    year: '2022',
  },
]
```

### Step 3: Replace with Your Video IDs

**Example:**
```typescript
{
  id: 'jungle-bikini-2025',
  title: 'Jungle Bikini Campaign 2025',
  description: 'Latest collection showcasing tropical-inspired designs...',
  youtubeId: 'dQw4w9WgXcQ', // ← Like this!
  category: 'Fashion Campaign',
  year: '2025',
},
```

### Step 4: Save and Refresh

The dev server will automatically reload and your videos will appear!

## 🎬 Your Videos to Add

Based on your content, you need YouTube IDs for:

1. **Jungle Bikini Campaign 2025** (latest fashion video)
2. **Summer of Love Campaign** (2020)
3. **Miami Swim Week Interview** (2016)
4. **Less Boring Summer Campaign** (2020)
5. **Polynesian Princess Campaign** (2020)
6. **Dayna x Karma Collaboration** (2022)
7. **AI Bias Discussion** (2022)

## 📸 Where Videos Appear

### Home Page (Featured Videos at Top)
- Shows first 2 videos from `featuredVideos` array
- Large display with full descriptions
- Appears right after the hero section

### Work Page (Full Video Gallery)
- Shows ALL videos from `allVideos` array
- Grid layout (2 columns on desktop)
- Appears at bottom of work page after projects and press

## 🎨 Video Placeholder Features

Until you add YouTube IDs, visitors see:
- Beautiful purple gradient background
- Play button icon
- "Video Coming Soon" message
- Professional, polished look

## 🔧 Advanced: Adding More Videos

To add a new video, add to the `allVideos` array:

```typescript
{
  id: 'unique-video-id',
  title: 'Your Video Title',
  description: 'Description of the video...',
  youtubeId: 'YOUR_YOUTUBE_ID',
  category: 'Fashion Campaign', // or 'Interview', 'Campaign', etc.
  year: '2025',
}
```

## 🚀 Quick Start

1. Find your YouTube videos
2. Copy the video IDs
3. Edit `/src/components/VideoGallery.tsx`
4. Replace empty `youtubeId: ''` with `youtubeId: 'YOUR_ID'`
5. Save file
6. Videos will automatically appear!

## ✅ Testing

Once you add a YouTube ID:
1. The placeholder disappears
2. YouTube iframe loads
3. Video is playable directly on your site
4. Works on all devices
5. No page reload needed

---

**Need Help?** If you need to change video titles, descriptions, or order, just edit the same file!
