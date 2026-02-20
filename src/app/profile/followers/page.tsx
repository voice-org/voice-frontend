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
  ArrowLeft,
  Search,
  Settings,
  Menu,
} from "lucide-react";
import { followSuggestions, appState } from "@/lib/dummy-data";
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

export default function FollowersPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers",
  );

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(savedUser));
      appState.hasInitialLoaded = true;
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-transparent relative z-50">
        <span className="text-primary font-black text-6xl tracking-tighter">
          VOICE<span className="text-[#2DD0B3]">.</span>
        </span>
      </div>
    );

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
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
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
              <SidebarLink
                icon={Bell}
                label="Notifications"
                badge
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" active href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="#" />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336]">
            <div className="px-4 py-1 flex items-center gap-6">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold leading-tight">
                  {currentUser?.name}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {currentUser?.handle}
                </span>
              </div>
            </div>

            <div className="flex w-full mt-2">
              <button
                onClick={() => setActiveTab("followers")}
                className={cn(
                  "flex-1 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative",
                  activeTab === "followers"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Followers
                {activeTab === "followers" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("following");
                  router.push("/profile/following");
                }}
                className={cn(
                  "flex-1 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative",
                  activeTab === "following"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                Following
                {activeTab === "following" && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            </div>
          </div>

          <div className="pb-20">
            {followSuggestions.map((user) => (
              <div
                key={user.id}
                className="p-4 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3"
              >
                <img
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  src={user.avatar}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold hover:underline truncate">
                          {user.name}
                        </span>
                        {user.verified && (
                          <VerifiedBadge isMe={user.handle === "@johndoe"} />
                        )}
                      </div>
                      <span className="text-muted-foreground text-sm truncate">
                        {user.handle}
                      </span>
                    </div>
                    <button className="bg-foreground text-background text-sm font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
                      Following
                    </button>
                  </div>
                  <p className="text-sm mt-1 leading-normal line-clamp-2">
                    Professional content creator and VOICE enthusiast. Love
                    exploring new trends!
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Who to follow</h3>
            {followSuggestions.slice(0, 3).map((person) => (
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
        </aside>
      </div>
    </div>
  );
}
