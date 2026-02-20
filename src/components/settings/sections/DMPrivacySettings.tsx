'use client';

import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function DMPrivacySettings() {
  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="px-4 py-6 text-sm text-muted-foreground border-b">
        Control who can send you direct messages and how you receive them on VOICE.
      </div>

      <div className="space-y-1">
        <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
          <div className="flex flex-col pr-8">
            <span className="font-bold text-sm">Allow message requests from everyone</span>
            <span className="text-xs text-muted-foreground mt-1">
              People you don't follow will be able to send you message requests.
            </span>
          </div>
          <Switch />
        </div>

        <Separator className="mx-4 w-auto opacity-50" />

        <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
          <div className="flex flex-col pr-8">
            <span className="font-bold text-sm">Filter low-quality messages</span>
            <span className="text-xs text-muted-foreground mt-1">
              Hide message requests that have been identified as potentially spam or low quality.
            </span>
          </div>
          <Switch defaultChecked />
        </div>

        <Separator className="mx-4 w-auto opacity-50" />

        <div className="px-4 py-4 flex items-center justify-between hover:bg-secondary/5 transition-colors">
          <div className="flex flex-col pr-8">
            <span className="font-bold text-sm">Show read receipts</span>
            <span className="text-xs text-muted-foreground mt-1">
              Let people you're messaging know when you've seen their messages.
            </span>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="mt-8 px-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">
          Direct Message History
        </h4>
        <div className="p-4 rounded-2xl border border-border bg-secondary/10">
          <p className="text-xs leading-relaxed text-muted-foreground italic">
            Your direct messages are private to you and the people you message. VOICE encrypts your messages in transit.
          </p>
        </div>
      </div>
    </div>
  );
}
