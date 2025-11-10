# Replace Example Videos With Your Real Content

## 🎥 Videos Are Now Working!

I've added **example YouTube videos** to show you how the embeds work. Now you just need to replace them with your actual Karma Bikinis videos!

## 📝 Current Example Videos

These are currently showing on your site (REPLACE THESE):

### Featured Videos (Home Page Top)
1. **Jungle Bikini Campaign 2025**
   - Current ID: `dQw4w9WgXcQ` (Rick Astley example)
   - Replace with: Your actual Jungle Bikini campaign video

2. **Summer of Love Campaign**
   - Current ID: `jNQXAC9IVRw` (First YouTube video example)
   - Replace with: Your actual Summer of Love campaign

### Additional Videos (Work Page)
3. **Miami Swim Week Interview**
   - Current ID: `M7lc1UVf-VE` (Example)
   - Replace with: Your Miami Swim Week interview

4. **Less Boring Summer Campaign**
   - Current ID: `9bZkp7q19f0` (Example)
   - Replace with: Your actual Less Boring Summer video

5. **Polynesian Princess Campaign**
   - Current ID: `YQHsXMglC9A` (Example)
   - Replace with: Your Polynesian Princess campaign

6. **Dayna x Karma Collaboration**
   - Current ID: `kJQP7kiw5Fk` (Example)
   - Replace with: Your Dayna collaboration video

7. **AI Bias Discussion**
   - Current ID: `3-eo-khJMbk` (Example)
   - Replace with: Your AI bias talk video

## 🔄 How to Replace

### Step 1: Find Your YouTube Videos
Look for your videos on:
- Your YouTube channel
- Karma Bikinis YouTube (if you have one)
- Any channels that featured your work
- Videos you uploaded for campaigns

### Step 2: Get the Video ID
From a YouTube URL like:
```
https://www.youtube.com/watch?v=YOUR_VIDEO_ID_HERE
```
Copy just the `YOUR_VIDEO_ID_HERE` part

### Step 3: Edit the File
Open: `/src/components/VideoGallery.tsx`

Find the video you want to replace and change the ID:

```typescript
{
  id: 'jungle-bikini-2025',
  title: 'Jungle Bikini Campaign 2025',
  description: '...',
  youtubeId: 'dQw4w9WgXcQ', // ← CHANGE THIS
  category: 'Fashion Campaign',
  year: '2025',
}
```

Replace `dQw4w9WgXcQ` with your actual video ID!

### Step 4: Save and Refresh
The dev server will auto-reload with your real videos!

## 🎬 Don't Have All Videos Yet?

**No problem!** You can:

1. **Leave example videos** - They work fine as placeholders
2. **Remove videos you don't have** - Just delete the entry from the array
3. **Add more videos** - Copy the format and add new ones
4. **Change titles/descriptions** - Make them match your content

## 📱 Where to Find Your Videos

### Karma Bikinis Content
- Check Instagram @karma_bikinis - any video posts?
- Old campaign footage on your phone/computer
- Footage from Miami Swim Week events
- Interview recordings
- Behind-the-scenes content

### Upload New Videos
If you have raw footage but not on YouTube:
1. Upload to YouTube (can be unlisted if you want)
2. Get the video ID
3. Add it to the site

## 🎨 Customizing Videos

You can also change:
- **Titles** - Make them catchy
- **Descriptions** - Tell the story
- **Categories** - Fashion Campaign, Interview, etc.
- **Years** - Keep chronology accurate

## ✅ What's Working Now

The site shows:
- ✅ Working YouTube embeds
- ✅ Play buttons
- ✅ Responsive video players
- ✅ Beautiful layout
- ✅ Works on all devices

You just need to swap in your real content!

## 🚀 Quick Tip

Start with just 2-3 real videos on the home page (the featured ones). You can add more later. The site looks professional even with placeholder content!

---

**Questions?** Just open the file and change the `youtubeId` fields. That's it!
