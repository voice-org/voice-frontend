'use client';

import { Settings as SettingsIcon, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsFallbackProps {
  title: string;
  section: string;
  onBack: () => void;
}

export function SettingsFallback({ title, section, onBack }: SettingsFallbackProps) {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 h-full">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
        <SettingsIcon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">{title} Configuration</h3>
      <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
        The detailed configuration for <b>{title}</b> is currently under development. You will receive an update once it's available.
      </p>
      <div className="pt-4">
        <button 
          onClick={onBack} 
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      </div>
    </div>
  );
}
