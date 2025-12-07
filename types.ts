export type Platform = 'linkedin' | 'instagram';

export type PostType = 'post' | 'carousel';

export type PostStatus = 'draft' | 'scheduled' | 'published';

export interface ViralCritique {
  score: number;
  critique: string;
  better_hook: string;
}

export interface Post {
  id: string;
  userId: string;
  contentText: string;
  mediaUrls: string[]; // For carousel images
  type: PostType;
  status: PostStatus;
  scheduledAt?: string;
  platform: Platform;
  viralScore?: ViralCritique;
}

export interface Trigger {
  id: string;
  keyword: string;
  response: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  tier: 'free' | 'pro';
}
