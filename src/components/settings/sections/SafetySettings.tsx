'use client';

import { ChevronRight, VolumeX, Ban, Type } from 'lucide-react';

interface SafetySettingsProps {
  onNavigate?: (target: string) => void;
}

export function SafetySettings({ onNavigate }: SafetySettingsProps) {
  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="px-4 py-6 text-sm text-muted-foreground border-b">
        Manage the accounts, words, and notifications that you’ve muted or blocked on VOICE.
      </div>
      
      <SafetyItem 
        icon={Ban} 
        label="Blocked accounts" 
        description="Manage the accounts that you’ve blocked" 
        onClick={() => onNavigate?.('Blocked accounts')}
      />
      <SafetyItem 
        icon={VolumeX} 
        label="Muted accounts" 
        description="Manage the accounts that you’ve muted" 
        onClick={() => onNavigate?.('Muted accounts')}
      />
      <SafetyItem 
        icon={Type} 
        label="Muted words" 
        description="Manage the specific words and phrases that you’ve muted" 
        onClick={() => onNavigate?.('Muted words')}
      />

      <div className="px-4 py-8 text-center bg-secondary/5">
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          When you mute or block someone, they won't be notified, and their content will be hidden from your timeline.
        </p>
      </div>
    </div>
  );
}

function SafetyItem({ icon: Icon, label, description, onClick }: { icon: any; label: string; description: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="px-4 py-4 border-b hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm group-hover:text-primary transition-colors">{label}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}
