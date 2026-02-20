
import { UserData } from './types';

export const users: Record<string, UserData> = {
  creator: {
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://picsum.photos/seed/me/100/100',
    verified: true,
    bio: 'Creator & Maintainer of VOICE. Building the future of digital connection.',
    location: 'San Francisco, CA',
    website: 'voice.app/johndoe',
    cover: 'https://picsum.photos/seed/creator_cover/800/260'
  },
  tech: {
    name: 'Tech Insider',
    handle: '@techinsider',
    avatar: 'https://picsum.photos/seed/tech/100/100',
    verified: true,
    bio: 'Deep dives into AI, gadgets, and the future of tech. 💻',
    location: 'Silicon Valley',
    website: 'techinsider.io',
    cover: 'https://picsum.photos/seed/tech_cover/800/260'
  },
  artist: {
    name: 'Luna Ray',
    handle: '@lunar_art',
    avatar: 'https://picsum.photos/seed/art_user/100/100',
    bio: 'Digital artist focusing on surrealism and neon aesthetics. ✨',
    location: 'Tokyo, Japan',
    website: 'lunaray.art',
    cover: 'https://picsum.photos/seed/art_cover/800/260'
  },
  news: {
    name: 'Global Voice News',
    handle: '@global_voice',
    avatar: 'https://picsum.photos/seed/news_icon/100/100',
    verified: true,
    bio: 'Your source for unbiased world news and breaking stories. 🌍',
    location: 'London, UK',
    website: 'globalvoice.news',
    cover: 'https://picsum.photos/seed/news_cover/800/260'
  },
  chef: {
    name: 'Chef Marco',
    handle: '@marcos_kitchen',
    avatar: 'https://picsum.photos/seed/chef/100/100',
    bio: 'Sharing simple, delicious recipes for the modern home cook. 🍳',
    location: 'Rome, Italy',
    website: 'marco.cooks',
    cover: 'https://picsum.photos/seed/food_cover/800/260'
  },
  travel: {
    name: 'Nomad Sarah',
    handle: '@sarah_travels',
    avatar: 'https://picsum.photos/seed/traveler/100/100',
    bio: 'Exploring every corner of the world, one city at a time. ✈️',
    location: 'Everywhere',
    website: 'sarahnomad.com',
    cover: 'https://picsum.photos/seed/travel_cover/800/260'
  },
  sports: {
    name: 'SportZilla',
    handle: '@sportzilla',
    avatar: 'https://picsum.photos/seed/sports_man/100/100',
    verified: true,
    bio: 'Stats, highlights, and rumors from the world of sports. 🏀⚽️',
    location: 'New York, NY',
    website: 'sportzilla.com',
    cover: 'https://picsum.photos/seed/sports_cover/800/260'
  }
};
