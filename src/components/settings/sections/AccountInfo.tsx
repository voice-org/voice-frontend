'use client';

import { ChevronRight } from 'lucide-react';

interface AccountInfoProps {
  user: { handle: string } | null;
}

export function AccountInfo({ user }: AccountInfoProps) {
  return (
    <div className="space-y-0">
      <InfoItem label="Username" value={user?.handle || '@johndoe'} />
      <InfoItem label="Phone" value="+1 (555) •••-••90" />
      <InfoItem label="Email" value={user?.handle.replace('@', '') + '@voice.app'} />
      <InfoItem label="Country" value="United States" />
      <InfoItem label="Gender" value="Not specified" />
      <InfoItem label="Birth date" value="January 1, 1990" />
      <div className="px-4 py-8 text-center">
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Your account information is visible only to you. We use this to keep your account secure.
        </p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-4 border-b hover:bg-secondary/5 transition-colors cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{label}</span>
          <span className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">{value}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
