'use client';

import { ShieldCheck, FileArchive, Clock, ChevronRight, Download, History } from 'lucide-react';

export function DownloadData() {
  return (
    <div className="p-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-foreground tracking-tight">Download an archive of your data</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Get an archive of your account information, history, and activity. This includes your profile, VOICEs, Direct Messages, and media.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">Security Check</span>
            <p className="text-xs text-muted-foreground leading-tight">
              To keep your account secure, you must enter your password before you can request your archive.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-black dark:text-white ml-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input 
              id="confirm-password"
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-3 rounded-none bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark focus:border-primary focus:ring-primary dark:text-white shadow-sm transition-colors outline-none" 
            />
          </div>
          
          <button className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-lg text-base font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5 mt-4">
            Request Archive
          </button>
        </div>
      </div>

      <div className="h-px bg-border/50 w-full" />

      <div className="space-y-4">
        <h4 className="font-bold text-sm px-1 flex items-center gap-2">
          <FileArchive className="w-4 h-4 text-primary" />
          What's included in your archive?
        </h4>
        <div className="space-y-1">
          <ArchiveItem icon={FileArchive} label="Your Profile & Activity" description="Bio, location, VOICEs, and reposts" />
          <ArchiveItem icon={Clock} label="Messages & Media" description="Direct messages history and uploaded files" />
        </div>
        <p className="text-[10px] text-muted-foreground px-2 leading-tight">
          Once your archive is ready, we'll send a notification. You'll have 30 days to download it.
        </p>
      </div>

      <div className="h-px bg-border/50 w-full" />

      {/* Previous Downloads Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-bold text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            Previous archives
          </h4>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 border border-border rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">VOICE_archive_2024_01_15.zip</span>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>Size: 1.2 GB</span>
                  <span>•</span>
                  <span>Requested Jan 15, 2024</span>
                </div>
                <span className="text-[10px] text-primary font-medium mt-1">Expires in 12 days</span>
              </div>
              <button className="p-2.5 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 border border-border rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group opacity-60">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-sm">VOICE_archive_2023_11_02.zip</span>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>Size: 840 MB</span>
                  <span>•</span>
                  <span>Requested Nov 2, 2023</span>
                </div>
                <span className="text-[10px] text-destructive font-medium mt-1">Expired</span>
              </div>
              <button disabled className="p-2.5 bg-muted text-muted-foreground rounded-full cursor-not-allowed">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchiveItem({ icon: Icon, label, description }: { icon: any; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 cursor-default transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-lg">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{label}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-30" />
    </div>
  );
}