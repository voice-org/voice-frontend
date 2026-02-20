
import { Notification } from './types';
import { users } from './users';

export const dummyNotifications: Notification[] = [
  { id: 'n1', type: 'like', user: users.tech, content: 'Generative AI is moving faster...', timestamp: '2m' },
  { id: 'n2', type: 'follow', user: users.news, timestamp: '10m' },
  { id: 'n3', type: 'mention', user: users.artist, content: 'Check out @johndoe for more updates!', timestamp: '15m' },
  { id: 'n4', type: 'repost', user: users.chef, content: 'Tonight\'s special: Handmade Fettuccine...', timestamp: '25m' },
  { id: 'n5', type: 'verify', user: users.creator, timestamp: '1h' },
  { id: 'n6', type: 'reply', user: users.sports, content: 'Great point! AI will change sports analytics.', timestamp: '2h' },
  { id: 'n7', type: 'like', user: users.travel, content: 'Waking up to this view...', timestamp: '3h' },
  { id: 'n8', type: 'follow', user: users.chef, timestamp: '4h' },
  { id: 'n9', type: 'mention', user: users.tech, content: 'New features in @johndoe project are lit.', timestamp: '5h' },
  { id: 'n10', type: 'like', user: users.news, content: 'Breaking: New breakthrough...', timestamp: '6h' },
  { id: 'n11', type: 'repost', user: users.artist, content: 'Inspired by the cyberpunk vibes...', timestamp: '7h' },
  { id: 'n12', type: 'follow', user: users.sports, timestamp: '8h' },
  { id: 'n13', type: 'reply', user: users.travel, content: 'I need to go there too!', timestamp: '9h' },
  { id: 'n14', type: 'like', user: users.tech, content: 'Building VOICE has been an incredible journey.', timestamp: '10h' },
  { id: 'n15', type: 'mention', user: users.news, content: 'A special report on @johndoe is out.', timestamp: '11h' },
  { id: 'n16', type: 'follow', user: users.artist, timestamp: '12h' },
  { id: 'n17', type: 'repost', user: users.travel, content: 'Santorini is a dream...', timestamp: '13h' },
  { id: 'n18', type: 'like', user: users.chef, content: 'The secret is in the pecorino.', timestamp: '14h' },
  { id: 'n19', type: 'reply', user: users.news, content: 'We should feature this on our site.', timestamp: '15h' },
  { id: 'n20', type: 'follow', user: users.travel, timestamp: '16h' },
  { id: 'n21', type: 'like', user: users.sports, content: 'What a game! Legend status.', timestamp: '17h' },
  { id: 'n22', type: 'mention', user: users.chef, content: '@johndoe you should try this recipe!', timestamp: '18h' },
  { id: 'n23', type: 'repost', user: users.tech, content: 'AI is moving faster than ever.', timestamp: '19h' }
];
