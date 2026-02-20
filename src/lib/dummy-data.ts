
import { users } from './dummy-data/users';
import { dummyPosts } from './dummy-data/posts';
import { dummyNotifications } from './dummy-data/notifications';
import { dummyConversations } from './dummy-data/messages';
import { trendingTopics } from './dummy-data/trends';
import { followSuggestions } from './dummy-data/suggestions';
import { Post, Notification, Conversation, TrendingTopic, FollowSuggestion } from './dummy-data/types';

// Export everything for application use
export {
  users,
  dummyPosts,
  dummyNotifications,
  dummyConversations,
  trendingTopics,
  followSuggestions
};

export type { Post, Notification, Conversation, TrendingTopic, FollowSuggestion };

// Track if the app has performed its initial session check
export const appState = {
  hasInitialLoaded: false
};
