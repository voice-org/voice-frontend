
import { Post } from './types';
import { users } from './users';

const basePosts: Post[] = [
  {
    id: '1',
    user: users.tech,
    content: 'Generative AI is moving faster than anyone predicted. The next 12 months will be wild. 🚀 #AI #FutureTech',
    image: 'https://picsum.photos/seed/ai_future/800/500',
    timestamp: '5m',
    stats: { comments: 124, reposts: 450, likes: 2300 }
  },
  {
    id: '2',
    user: users.artist,
    content: 'Just finished this new piece! Inspired by the cyberpunk vibes of Night City. What do you think? 🎨✨',
    image: 'https://picsum.photos/seed/cyberpunk_art/800/600',
    timestamp: '15m',
    stats: { comments: 45, reposts: 12, likes: 890 }
  },
  {
    id: '3',
    user: users.news,
    content: 'Breaking: New breakthrough in clean energy technology could power entire cities with zero emissions. 🌍⚡️ #GreenTech #BreakingNews',
    timestamp: '25m',
    stats: { comments: 560, reposts: 1200, likes: 5400 }
  },
  {
    id: '4',
    user: users.chef,
    content: 'Tonight\'s special: Handmade Fettuccine Carbonara. The secret is in the pecorino. 🍝😋 #ItalianFood #ChefLife',
    image: 'https://picsum.photos/seed/pasta_dish/800/500',
    timestamp: '45m',
    stats: { comments: 89, reposts: 34, likes: 1200 }
  },
  {
    id: '5',
    user: users.creator,
    content: 'Building VOICE has been an incredible journey. Thanks to everyone for the feedback! More features coming soon. 🛠️✨',
    timestamp: '1h',
    isPinned: true,
    stats: { comments: 230, reposts: 89, likes: 4500 }
  }
];

export const dummyPosts: Post[] = [
  ...basePosts,
  ...Array.from({ length: 120 }).map((_, i) => {
    const userKeys = Object.keys(users);
    const userKeyIndex = i % userKeys.length;
    const randomUser = users[userKeys[userKeyIndex]];
    
    const categories = ['Tech', 'Life', 'News', 'Art', 'Sports', 'Food', 'Nature', 'Space', 'Crypto', 'Gaming'];
    const category = categories[i % categories.length];
    
    const id = `dynamic-${i}`;
    
    return {
      id,
      user: randomUser,
      content: `Post #${i + 6} about ${category}. Explore the latest trends in ${category} only on VOICE.🗣️ #${category} #VOICE #Trending`,
      timestamp: `${(i % 23) + 2}h`,
      image: i % 5 === 0 ? `https://picsum.photos/seed/post_${id}/800/500` : undefined,
      stats: {
        comments: (i * 13) % 500,
        reposts: (i * 27) % 1000,
        likes: (i * 41) % 5000
      }
    };
  })
];
