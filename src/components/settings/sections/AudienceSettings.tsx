'use client';

import { Switch } from '@/components/ui/switch';
import { ChevronRight } from 'lucide-react';

export function AudienceSettings() {
  return (
    <div className="space-y-0">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Photo tagging</span>
          <span className="text-xs text-muted-foreground">Allow people to tag you in photos</span>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="px-4 py-4 border-b flex items-center justify-between hover:bg-secondary/5 cursor-pointer">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Tagging preferences</span>
          <span className="text-xs text-muted-foreground">Only people you follow can tag you</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
