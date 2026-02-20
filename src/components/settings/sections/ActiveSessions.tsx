'use client';

import { SmartphoneNfc, Laptop } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ActiveSessions() {
  return (
    <div className="space-y-0">
      <div className="px-4 py-4 flex items-center gap-4 bg-secondary/5 border-b">
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          <SmartphoneNfc className="w-6 h-6" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold">iPhone 15 Pro</span>
          <span className="text-xs text-muted-foreground">San Francisco, CA · Current session</span>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="text-primary border-primary">Active</Badge>
        </div>
      </div>
      <div className="px-4 py-4 flex items-center gap-4 hover:bg-secondary/5 border-b cursor-pointer group">
        <div className="p-3 bg-muted rounded-full group-hover:bg-primary/5 transition-colors">
          <Laptop className="w-6 h-6" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold">MacBook Pro · Chrome</span>
          <span className="text-xs text-muted-foreground">New York, NY · 2 days ago</span>
        </div>
      </div>
      <button className="w-full text-center py-4 text-sm font-bold text-destructive hover:bg-destructive/5 transition-colors">
        Log out of all other sessions
      </button>
    </div>
  );
}
