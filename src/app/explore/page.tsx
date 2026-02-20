"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User,
  MoreHorizontal,
  Search,
  Settings,
  Menu,
} from "lucide-react";
import { trendingTopics, followSuggestions, appState } from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ExplorePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("for-you");
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setUser(JSON.parse(savedUser));
      appState.hasInitialLoaded = true;
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center custom-gradient relative z-50">
        <span className="text-primary font-black text-6xl tracking-tighter">
          VOICE<span className="text-[#2DD0B3]">.</span>
        </span>
      </div>
    );

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
      {/* Mobile Top Navigation */}
      <div className="sm:hidden sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-50 border-b border-border dark:border-[#2F3336] px-4 py-3 flex items-center justify-between">
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
          <SheetContent
            side="left"
            className="w-72 p-0 bg-background border-r border-border dark:border-[#2F3336]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Access your profile and navigation links
            </SheetDescription>
            <div className="flex flex-col h-full p-4">
              <div className="mb-6 px-2 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{user?.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {user?.handle}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-border w-full mt-2"></div>
              </div>
              <nav className="space-y-1">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink
                  icon={Hash}
                  label="Explore"
                  active
                  href="/explore"
                />
                <SidebarLink
                  icon={Bell}
                  label="Notifications"
                  badge
                  href="/notifications"
                />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink icon={User} label="Profile" href="/profile" />
                <SidebarLink
                  icon={Settings}
                  label="Settings"
                  href="/settings"
                />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="container mx-auto max-w-7xl h-screen flex">
        {/* Sidebar Navigation */}
        <header className="w-20 xl:w-64 h-full flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-[#2F3336] overflow-y-auto hidden sm:flex z-50">
          <div className="flex flex-col items-center xl:items-start space-y-4 w-full">
            <Link
              href="/feed"
              className="p-3 mb-2 rounded-full hover:bg-primary/10 transition-colors cursor-pointer w-fit self-center xl:self-start"
            >
              <span className="text-primary font-black text-2xl tracking-tighter">
                <span className="xl:hidden">
                  V<span className="text-[#2DD0B3]">.</span>
                </span>
                <span className="hidden xl:inline">
                  VOICE<span className="text-[#2DD0B3]">.</span>
                </span>
              </span>
            </Link>
            <nav className="space-y-2 w-full flex flex-col items-center xl:items-start">
              <SidebarLink icon={Home} label="Home" href="/feed" />
              <SidebarLink icon={Hash} label="Explore" active href="/explore" />
              <SidebarLink
                icon={Bell}
                label="Notifications"
                badge
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="/settings" />
            </nav>
          </div>
          <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-[#16181C] transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
            <div className="flex items-center gap-3">
              <img
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-border"
                src={user?.avatar}
              />
              <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
                <span className="font-bold text-sm truncate">{user?.name}</span>
                <span className="text-muted-foreground text-sm truncate">
                  {user?.handle}
                </span>
              </div>
            </div>
            <MoreHorizontal className="hidden xl:block w-4 h-4 text-muted-foreground" />
          </div>
        </header>

        {/* Main Explore Content */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 sm:top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336]">
            {/* Desktop/Tablet Search */}
            <div className="hidden sm:flex items-center gap-4 px-4 pt-3 pb-1">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-3 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search VOICE"
                />
              </div>
              <Settings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>

            {/* Mobile Search - Inline below Logo */}
            <div className="sm:hidden px-4 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-2 pl-10 pr-4 text-xs outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search VOICE"
                />
              </div>
            </div>

            {/* Tabs - Mobile Friendly Scroll */}
            <div className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory">
              <ExploreTab
                label="For you"
                active={activeTab === "for-you"}
                onClick={() => setActiveTab("for-you")}
              />
              <ExploreTab
                label="Trending"
                active={activeTab === "trending"}
                onClick={() => setActiveTab("trending")}
              />
              <ExploreTab
                label="News"
                active={activeTab === "news"}
                onClick={() => setActiveTab("news")}
              />
              <ExploreTab
                label="Sports"
                active={activeTab === "sports"}
                onClick={() => setActiveTab("sports")}
              />
              <ExploreTab
                label="Entertainment"
                active={activeTab === "entertainment"}
                onClick={() => setActiveTab("entertainment")}
              />
            </div>
          </div>

          <div className="pb-20">
            {/* Hero Section */}
            <div className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer group">
              <img
                src="https://picsum.photos/seed/news_hero/800/450"
                alt="Breaking News"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white/80 text-sm font-medium mb-1">
                  Politics · Live
                </span>
                <h2 className="text-white text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                  Global Leaders Gather for the 2026 Innovation Summit in Dubai
                </h2>
              </div>
            </div>

            {/* Trends List */}
            <div className="border-b border-border dark:border-[#2F3336] py-3">
              <h3 className="text-xl font-black px-4 py-2">Trends for you</h3>
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 cursor-pointer transition-colors relative group"
                >
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{topic.category}</span>
                    <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="font-bold text-base mt-0.5">
                    {topic.topic}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {topic.postsCount}
                  </div>
                </div>
              ))}
              <button className="w-full text-left px-4 py-4 text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-bold">
                Show more
              </button>
            </div>

            {/* Dummy "What's Happening" Section */}
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-black">What's happening</h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 cursor-pointer group">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <span>Tech News</span>
                      <span>·</span>
                      <span>2h ago</span>
                    </div>
                    <h4 className="font-bold text-sm line-clamp-2 group-hover:underline">
                      New AI model breakthroughs show promise in early medical
                      diagnosis and treatment planning.
                    </h4>
                  </div>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={`https://picsum.photos/seed/tech_${item}/100/100`}
                      alt="News"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Who to follow</h3>
            {followSuggestions.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    src={person.avatar}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm hover:underline truncate">
                      {person.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {person.handle}
                    </span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div className="px-4 text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
            <a href="#" className="hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:underline">
              Ads info
            </a>
            <a href="#" className="hover:underline">
              More...
            </a>
            <span>© 2024 VOICE Corp.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ExploreTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 px-6 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative snap-start",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></div>
      )}
    </button>
  );
}
