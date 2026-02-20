'use client';

import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeactivateAccountProps {
  user: { handle: string } | null;
}

export function DeactivateAccount({ user }: DeactivateAccountProps) {
  return (
    <div className="p-4 space-y-6">
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-destructive">Wait! Read this first</span>
          <p className="text-xs leading-relaxed opacity-80">
            Deactivating your account will hide your profile, VOICEs, and activity until you log back in. Your data will be kept for 30 days before permanent deletion.
          </p>
        </div>
      </div>
      <Button variant="destructive" className="w-full h-12 rounded-full font-bold text-base shadow-lg text-white border-none">
        Deactivate {user?.handle}
      </Button>
    </div>
  );
}
