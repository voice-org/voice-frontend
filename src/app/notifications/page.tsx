'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Hash, 
  Bell, 
  Mail, 
  User, 
  MoreHorizontal, 
  Search,
  Heart,
  Repeat,
  UserPlus,
  AtSign,
  Settings,
  Menu,
  MessageCircle
} from 'lucide-react';
import { trendingTopics, followSuggestions, dummyNotifications, type Notification, appState } from '@/lib/dummy-data';
import { SidebarLink } from '@/app/feed/page';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; handle: string; avatar: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'mentions'>('all');
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  useEffect(() => {
    const savedUser = localStorage.getItem('voice_user');
    if (!savedUser) {
      router.push('/');
    } else {
      setUser(JSON.parse(savedUser));
      appState.hasInitialLoaded = true;
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return (
    <div className="h-screen w-full flex items-center justify-center custom-gradient relative z-50">
      <span className="text-primary font-black text-6xl tracking-tighter">
        VOICE<span className="text-[#2DD0B3]">.</span>
      </span>
    </div>
  );

  const filteredNotifications = dummyNotifications.filter(n => {
    if (activeTab === 'mentions') return n.type === 'mention' || n.type === 'reply';
    if (activeTab === 'verified') return n.type === 'verify';
    return true;
  });

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
      {/* Mobile Top Navigation */}
      <div className="sm:hidden sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-50 border-b border-border dark:border-[#2F3336] px-4 py-3 flex justify-between items-center">
        <Link href="/feed">
          <span className="text-primary font-black text-xl tracking-tighter">
            VOICE<span className="text-[#2DD0B3]">.</span>
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-1">
              <Menu className="w-6 h-6 text-muted-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border dark:border-[#2F3336]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Access your profile and navigation links</SheetDescription>
            <div className="flex flex-col h-full p-4">
              <div className="mb-6 px-2 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img alt="User" className="w-10 h-10 rounded-full object-cover" src={user?.avatar} />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{user?.name}</span>
                    <span className="text-muted-foreground text-xs">{user?.handle}</span>
                  </div>
                </div>
                <div className="h-px bg-border w-full mt-2"></div>
              </div>
              <nav className="space-y-1">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
                <SidebarLink icon={Bell} label="Notifications" active badge href="/notifications" />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink icon={User} label="Profile" href="/profile" />
                <SidebarLink icon={Settings} label="Settings" href="/settings" />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="container mx-auto max-w-7xl h-screen flex">
        
        {/* Sidebar Navigation */}
        <header className="w-20 xl:w-64 h-full flex flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-[#2F3336] overflow-y-auto hidden sm:flex z-50">
          <div className="flex flex-col items-center xl:items-start space-y-4 w-full">
            <Link href="/feed" className="p-3 mb-2 rounded-full hover:bg-primary/10 transition-colors cursor-pointer w-fit self-center xl:self-start">
              <span className="text-primary font-black text-2xl tracking-tighter">
                <span className="xl:hidden">V<span className="text-[#2DD0B3]">.</span></span>
                <span className="hidden xl:inline">VOICE<span className="text-[#2DD0B3]">.</span></span>
              </span>
            </Link>
            <nav className="space-y-2 w-full flex flex-col items-center xl:items-start">
              <SidebarLink icon={Home} label="Home" href="/feed" />
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
              <SidebarLink icon={Bell} label="Notifications" active badge href="/notifications" />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="/settings" />
            </nav>
          </div>
          <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-[#16181C] transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
            <div className="flex items-center gap-3">
              <img alt="User" className="w-10 h-10 rounded-full object-cover border border-border" src={user?.avatar} />
              <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
                <span className="font-bold text-sm truncate">{user?.name}</span>
                <span className="text-muted-foreground text-sm truncate">{user?.handle}</span>
              </div>
            </div>
            <MoreHorizontal className="hidden xl:block w-4 h-4 text-muted-foreground" />
          </div>
        </header>

        {/* Main Notifications Feed */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336]">
            <div className="flex items-center justify-between px-4 py-3 hidden sm:flex">
              <h2 className="text-xl font-bold">Notifications</h2>
              <Settings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            </div>
            {/* Tabs */}
            <div className="flex w-full">
              <NotificationTab label="All" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
              <NotificationTab label="Verified" active={activeTab === 'verified'} onClick={() => setActiveTab('verified')} />
              <NotificationTab label="Mentions" active={activeTab === 'mentions'} onClick={() => setActiveTab('mentions')} />
            </div>
          </div>

          <div className="pb-20">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Nothing to see here yet.</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary w-4 h-4" />
            <input className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary text-sm placeholder-muted-foreground outline-none" placeholder="Search VOICE" type="text" />
          </div>

          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Trending Truths</h3>
            {trendingTopics.map(topic => (
              <div key={topic.id} className="hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 cursor-pointer transition-colors">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{topic.category}</span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm mt-0.5">{topic.topic}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{topic.postsCount}</div>
              </div>
            ))}
          </div>

          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Who to follow</h3>
            {followSuggestions.map(person => (
              <div key={person.id} className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <img alt="Avatar" className="w-10 h-10 rounded-full object-cover" src={person.avatar} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm hover:underline truncate">{person.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{person.handle}</span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">Follow</button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function NotificationTab({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
      {active && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full"></div>}
    </button>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like': return <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />;
      case 'repost': return <Repeat className="w-8 h-8 text-green-500" />;
      case 'follow': return <UserPlus className="w-8 h-8 text-primary fill-primary" />;
      case 'mention': return <AtSign className="w-8 h-8 text-primary" />;
      case 'reply': return <MessageCircle className="w-8 h-8 text-primary" />;
      case 'verify': return (
        <div className="w-8 h-8 flex items-center justify-center text-primary">
          <i className="fas fa-check-circle text-2xl"></i>
        </div>
      );
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case 'like': return <><b>{notification.user.name}</b> liked your VOICE</>;
      case 'repost': return <><b>{notification.user.name}</b> reposted your VOICE</>;
      case 'follow': return <><b>{notification.user.name}</b> followed you</>;
      case 'mention': return <><b>{notification.user.name}</b> mentioned you in a VOICE</>;
      case 'reply': return <><b>{notification.user.name}</b> replied to your VOICE</>;
      case 'verify': return <><b>VOICE Support</b> verified your account</>;
    }
  };

  return (
    <div className="p-4 border-b border-border dark:border-[#2F3336] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
      <div className="pt-1">{getIcon()}</div>
      <div className="flex-1 space-y-2">
        <img alt="User" className="w-8 h-8 rounded-full object-cover" src={notification.user.avatar} />
        <div className="text-base leading-tight">
          {getMessage()}
        </div>
        {notification.content && (
          <p className="text-muted-foreground text-sm line-clamp-2">{notification.content}</p>
        )}
      </div>
      <div className="text-muted-foreground text-sm">{notification.timestamp}</div>
    </div>
  );
}
