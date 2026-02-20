
import { Conversation } from './types';
import { users } from './users';

export const dummyConversations: Conversation[] = [
  { id: 'c1', user: users.tech, lastMessage: 'The new rockets are looking good. Discussion on timeline?', timestamp: '2h', unreadCount: 1 },
  { id: 'c2', user: users.artist, lastMessage: 'Loved your last post! The surrealist vibes were spot on.', timestamp: '4h' },
  { id: 'c3', user: users.news, lastMessage: 'Can we interview you for our tech segment next week?', timestamp: '6h', unreadCount: 2 },
  { id: 'c4', user: users.chef, lastMessage: 'I tried your suggestion on the pecorino, it worked wonders!', timestamp: '8h' },
  { id: 'c5', user: users.travel, lastMessage: 'Hey! Are you planning any trips to Japan soon?', timestamp: '10h' },
  { id: 'c6', user: users.sports, lastMessage: 'Did you catch the buzzer beater? Incredible game!', timestamp: '12h' },
  { id: 'c7', user: users.tech, lastMessage: 'The API documentation is updated. Check it out.', timestamp: '14h' },
  { id: 'c8', user: users.artist, lastMessage: 'Do you want to collaborate on a digital art piece?', timestamp: '16h' },
  { id: 'c9', user: users.news, lastMessage: 'Breaking news alert: You might want to see this.', timestamp: '18h', unreadCount: 1 },
  { id: 'c10', user: users.chef, lastMessage: 'Next cooking class is on Saturday. Hope to see you.', timestamp: '20h' },
  { id: 'c11', user: users.travel, lastMessage: 'Found a hidden gem in Kyoto. Sending photos!', timestamp: '22h' },
  { id: 'c12', user: users.sports, lastMessage: 'Stats for the season are out. You ranked high!', timestamp: '1d' },
  { id: 'c13', user: users.tech, lastMessage: 'Let\'s set up a meeting for the product roadmap.', timestamp: '1d' },
  { id: 'c14', user: users.artist, lastMessage: 'The neon aesthetics are trending now. Great timing.', timestamp: '2d' },
  { id: 'c15', user: users.news, lastMessage: 'Thanks for the quick response on the quote.', timestamp: '2d' }
];
