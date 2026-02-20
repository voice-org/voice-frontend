'use client';

import { ExternalLink, ShieldAlert, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Connected Apps settings section.
 * Displays a list of third-party applications authorized to access the user's VOICE account.
 */

export function ConnectedApps() {
  const { toast } = useToast();

  const apps = [
    { id: '1', name: 'VOICE for Web', permissions: ['Read and Write'], icon: 'globe' },
    { id: '2', name: 'VOICE API Explorer', permissions: ['Read', 'Write', 'Direct Messages'], icon: 'code' },
    { id: '3', name: 'Third Party Login (Firebase)', permissions: ['Profile Info'], icon: 'shield' },
  ];

  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="px-4 py-6 text-sm text-muted-foreground border-b">
        These are the applications that have access to your VOICE account information. You can revoke access at any time.
      </div>

      {apps.map((app) => (
        <div key={app.id} className="px-4 py-4 border-b hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/5 rounded-2xl text-primary">
                {app.icon === 'globe' && <ExternalLink className="w-6 h-6" />}
                {app.icon === 'code' && <ExternalLink className="w-6 h-6" />}
                {app.icon === 'shield' && <ShieldAlert className="w-6 h-6" />}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm group-hover:text-primary transition-colors">{app.name}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Permissions: {app.permissions.join(', ')}
                </span>
              </div>
            </div>
            <button 
              onClick={() => toast({ title: "Access Revoked", description: `${app.name} can no longer access your account.` })}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
              title="Revoke access"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="p-8 text-center bg-secondary/5">
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          Authorized apps can see your public profile information and perform actions on your behalf based on the permissions granted.
        </p>
      </div>
    </div>
  );
}
