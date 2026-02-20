
export interface UserData {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  verifiedColor?: string;
  bio?: string;
  location?: string;
  website?: string;
  cover?: string;
}

export interface Post {
  id: string;
  user: UserData;
  content: string;
  image?: string;
  link?: {
    url: string;
    display: string;
    title: string;
    description?: string;
  };
  timestamp: string;
  stats: {
    comments: number;
    reposts: number;
    likes: number;
  };
  isPinned?: boolean;
}

export interface TrendingTopic {
  id: string;
  category: string;
  topic: string;
  postsCount: string;
}

export interface FollowSuggestion {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  bio?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'repost' | 'follow' | 'mention' | 'verify' | 'reply';
  user: UserData;
  content?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: UserData;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}
