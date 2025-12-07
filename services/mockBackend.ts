import { Post, Trigger } from "../types";

/**
 * Feature B: The Smart Scheduler Logic (Simulation of scheduler_engine.py)
 */
export const calculateSmartSchedule = (mode: 'strict' | 'human', date?: Date): Date => {
  if (mode === 'strict' && date) {
    return date;
  }

  // Human Mode: "Tomorrow" between 09:00 and 17:00
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Random hour between 9 and 17 (5 PM)
  const randomHour = Math.floor(Math.random() * (17 - 9 + 1)) + 9;
  // Random minute
  const randomMinute = Math.floor(Math.random() * 60);

  tomorrow.setHours(randomHour, randomMinute, 0, 0);
  return tomorrow;
};

/**
 * Feature A: Carousel Generator Logic (Simulation of carousel_engine.py using Canvas)
 * Returns Data URLs representing the generated images.
 */
export const generateCarouselImages = async (
  slidesText: string[], 
  theme: 'dark' | 'light' = 'dark'
): Promise<string[]> => {
  // We use an off-screen canvas to generate images
  const canvas = document.createElement('canvas');
  const size = 1080;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return [];

  const images: string[] = [];

  for (let i = 0; i < slidesText.length; i++) {
    const text = slidesText[i];
    
    // Background
    ctx.fillStyle = theme === 'dark' ? '#1e293b' : '#f8fafc';
    ctx.fillRect(0, 0, size, size);

    // Text Styling
    ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#0f172a';
    ctx.font = 'bold 60px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Simple word wrap logic
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = size - 160; // Padding 80px each side
    const lineHeight = 80;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw lines
    const totalHeight = lines.length * lineHeight;
    let startY = (size - totalHeight) / 2;

    lines.forEach((l) => {
      ctx.fillText(l, size / 2, startY);
      startY += lineHeight;
    });

    // Page Number
    ctx.font = '40px Inter, sans-serif';
    ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#64748b';
    ctx.fillText(`${i + 1} / ${slidesText.length}`, size / 2, size - 60);

    images.push(canvas.toDataURL('image/png'));
  }

  return images;
};

// Mock Database Stores
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    contentText: 'The future of AI in marketing is not about replacement, it is about augmentation.',
    type: 'post',
    status: 'published',
    platform: 'linkedin',
    mediaUrls: []
  },
  {
    id: '2',
    userId: 'u1',
    contentText: '5 Ways to Improve React Performance',
    type: 'carousel',
    status: 'scheduled',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    platform: 'instagram',
    mediaUrls: ['https://picsum.photos/1080/1080', 'https://picsum.photos/1080/1080']
  }
];

export const MOCK_TRIGGERS: Trigger[] = [
  { id: 't1', keyword: 'PRICE', response: 'Hey! Our pricing starts at $29/mo. Check it out here: omnipost.ai/pricing', active: true },
  { id: 't2', keyword: 'GUIDE', response: 'Sent you the PDF guide to your DMs! 🚀', active: true }
];
