'use client';

import { Switch } from '@/components/ui/switch';

export function NotificationPreferences() {
  return (
    <div className="space-y-0">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Mentions and replies</span>
          <span className="text-xs text-muted-foreground">Notifications for new activity</span>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Reposts</span>
          <span className="text-xs text-muted-foreground">Notify when someone reposts you</span>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Likes</span>
          <span className="text-xs text-muted-foreground">Notify when someone likes your post</span>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">New followers</span>
          <span className="text-xs text-muted-foreground">Notify when you get a new follower</span>
        </div>
        <Switch />
      </div>
    </div>
  );
}
