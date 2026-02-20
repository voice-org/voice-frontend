
import { FollowSuggestion } from './types';
import { users } from './users';

export const followSuggestions: FollowSuggestion[] = [
  { id: '1', name: users.tech.name, handle: users.tech.handle, avatar: users.tech.avatar, verified: true, bio: users.tech.bio },
  { id: '2', name: users.news.name, handle: users.news.handle, avatar: users.news.avatar, verified: true, bio: users.news.bio },
  { id: '3', name: users.artist.name, handle: users.artist.handle, avatar: users.artist.avatar, bio: users.artist.bio },
  { id: '4', name: users.chef.name, handle: users.chef.handle, avatar: users.chef.avatar, bio: users.chef.bio },
  { id: '5', name: users.travel.name, handle: users.travel.handle, avatar: users.travel.avatar, bio: users.travel.bio },
  { id: '6', name: users.sports.name, handle: users.sports.handle, avatar: users.sports.avatar, verified: true, bio: users.sports.bio }
];
