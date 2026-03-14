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
  Bookmark,
  Settings,
  MoreHorizontal,
  Search,
  Menu,
} from "lucide-react";
import { dummyPosts, appState } from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { FeedItem } from "@/components/feed/FeedItem";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function BookmarksPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  // Filter posts that have bookmarks (simulating saved posts)
  const bookmarkedPosts = dummyPosts.filter(
    (post) => (Number(post.stats.bookmarks) || 0) > 40,
  );

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
    <div className="bg-background text-foreground min-h-screen">
      {/* Mobile Top Navigation */}
      <div className="sm:hidden sticky top-0 bg-background backdrop-blur-md z-50 border-b border-border dark:border-white/10 px-4 py-3 flex items-center justify-between">
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
            className="w-72 p-0 bg-background border-r border-border dark:border-white/10"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Access your bookmarks and navigation links
            </SheetDescription>
            <div className="flex flex-col h-full p-4">
              <nav className="space-y-1">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
                <SidebarLink
                  icon={Bell}
                  label="Notifications"
                  href="/notifications"
                />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink
                  icon={Bookmark}
                  label="Bookmarks"
                  href="/bookmarks"
                  active
                />
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
        <header className="w-20 xl:w-64 h-full flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-white/10 overflow-y-auto hidden sm:flex z-50">
          <div className="flex flex-col items-center xl:items-start space-y-4 w-full">
            <Link
              href="/feed"
              className="p-3 mb-2 rounded-full hover:bg-primary/10 w-fit"
            >
              <span className="text-primary font-black text-2xl tracking-tighter">
                VOICE<span className="text-[#2DD0B3]">.</span>
              </span>
            </Link>
            <nav className="space-y-2 w-full flex flex-col items-center xl:items-start">
              <SidebarLink icon={Home} label="Home" href="/feed" />
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
              <SidebarLink
                icon={Bell}
                label="Notifications"
                badge
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink
                icon={Bookmark}
                label="Bookmarks"
                active
                href="/bookmarks"
              />
              <SidebarLink icon={User} label="Profile" href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="/settings" />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-white/10 min-h-screen">
          <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10 px-4 py-3">
            <h2 className="text-xl font-bold">Bookmarks</h2>
            <p className="text-xs text-muted-foreground">{user?.handle}</p>
          </div>

          <div className="pb-20">
            {bookmarkedPosts.length > 0 ? (
              bookmarkedPosts.map((post) => (
                <FeedItem
                  key={post.id}
                  post={post}
                  currentUserHandle={user?.handle}
                />
              ))
            ) : (
              <div className="p-12 text-center">
                <h3 className="text-2xl font-black mb-2">
                  Save VOICEs for later
                </h3>
                <p className="text-muted-foreground">
                  Don’t let the good ones get away! Bookmark VOICEs to easily
                  find them again in the future.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Simplified */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4">
          <div className="bg-secondary dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 p-4">
            <h3 className="font-extrabold text-xl mb-2">Bookmarks</h3>
            <p className="text-sm text-muted-foreground">
              You can find all your saved posts here. Only you can see your
              bookmarks.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
