'use client';

import { Switch } from '@/components/ui/switch';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecuritySettingsProps {
  onNavigate?: (target: string) => void;
}

export function SecuritySettings({ onNavigate }: SecuritySettingsProps) {
  return (
    <div className="space-y-0">
      <div className="px-4 py-4 text-sm text-muted-foreground bg-secondary/10">
        Add an extra layer of security to your account by requiring more than just a password to log in.
      </div>
      
      <div className="px-4 py-4 flex items-center justify-between border-b hover:bg-secondary/5 transition-colors cursor-pointer">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Text message</span>
          <span className="text-xs text-muted-foreground">Use your phone to receive security codes</span>
        </div>
        <Switch />
      </div>

      <div className="px-4 py-4 flex items-center justify-between border-b hover:bg-secondary/5 transition-colors cursor-pointer">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Authentication app</span>
          <span className="text-xs text-muted-foreground">Get codes from an app like Google Authenticator</span>
        </div>
        <Switch defaultChecked />
      </div>

      <DeepAction 
        label="Security key" 
        description="Use a physical security key to log in" 
        onClick={() => onNavigate?.('Security Key')} 
      />
      
      <DeepAction 
        label="Additional password protection" 
        description="Requirement for personal information when logging in" 
        onClick={() => onNavigate?.('Additional Protection')} 
      />

      <div className="mt-8 px-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-1">
          Login Verification
        </h4>
        <p className="text-xs text-muted-foreground px-1 leading-relaxed">
          When you log in to VOICE, we'll send a notification to your connected devices to confirm it's really you.
        </p>
      </div>
    </div>
  );
}

function DeepAction({ label, description, onClick }: { label: string, description: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="px-4 py-4 flex items-center justify-between border-b hover:bg-secondary/5 transition-colors cursor-pointer group">
      <div className="flex flex-col">
        <span className="font-bold text-sm group-hover:text-primary transition-colors">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}
