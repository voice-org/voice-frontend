'use client';

import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

/**
 * @fileOverview Notification Filters settings section.
 * Provides controls for filtering notifications based on quality and user preferences.
 */

export function NotificationFilters() {
  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="px-4 py-6 text-sm text-muted-foreground border-b">
        Choose which notifications you want to see—and which you don't.
      </div>

      <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
        <div className="flex flex-col pr-8">
          <span className="font-bold text-sm">Quality filter</span>
          <span className="text-xs text-muted-foreground mt-1">
            Filter lower-quality content from your notifications, such as duplicate posts or content that appears to be automated.
          </span>
        </div>
        <Switch defaultChecked />
      </div>

      <Separator className="mx-4 w-auto opacity-50" />

      <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
        <div className="flex flex-col pr-8">
          <span className="font-bold text-sm">Muted notifications</span>
          <span className="text-xs text-muted-foreground mt-1">
            Mute notifications from people you don't follow or who don't follow you.
          </span>
        </div>
        <Switch />
      </div>

      <Separator className="mx-4 w-auto opacity-50" />

      <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
        <div className="flex flex-col pr-8">
          <span className="font-bold text-sm">Hide mentions from blocked users</span>
          <span className="text-xs text-muted-foreground mt-1">
            Don't show notifications when someone you've blocked mentions you.
          </span>
        </div>
        <Switch defaultChecked />
      </div>

      <div className="mt-8 px-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">
          Advanced Filters
        </h4>
        <div className="p-4 rounded-2xl border border-border bg-secondary/10">
          <p className="text-xs leading-relaxed text-muted-foreground">
            You can further customize your notification experience by muting specific keywords or accounts in the Privacy settings.
          </p>
        </div>
      </div>
    </div>
  );
}
