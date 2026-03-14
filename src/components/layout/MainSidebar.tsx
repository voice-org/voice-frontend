"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User,
  Bookmark,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import { SidebarLink } from "@/components/shared/SidebarLink";

export function MainSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <header className="w-20 xl:w-64 h-full flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-white/10 overflow-y-auto hidden sm:flex z-50">
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
          <SidebarLink
            icon={Home}
            label="Home"
            active={pathname === "/feed"}
            href="/feed"
          />
          <SidebarLink
            icon={Hash}
            label="Explore"
            active={pathname === "/explore"}
            href="/explore"
          />
          <SidebarLink
            icon={Bell}
            label="Notifications"
            badge
            active={pathname === "/notifications"}
            href="/notifications"
          />
          <SidebarLink
            icon={Mail}
            label="Messages"
            active={pathname === "/messages"}
            href="/messages"
          />
          <SidebarLink
            icon={Bookmark}
            label="Bookmarks"
            active={pathname === "/bookmarks"}
            href="/bookmarks"
          />
          <SidebarLink
            icon={User}
            label="Profile"
            active={pathname === "/profile"}
            href="/profile"
          />
          <SidebarLink
            icon={Settings}
            label="Settings"
            active={pathname === "/settings"}
            href="/settings"
          />
        </nav>
      </div>
      <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-white/5 transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
        <div className="flex items-center gap-3">
          <img
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-border"
            src={user?.avatar || "https://picsum.photos/seed/default/100/100"}
          />
          <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
            <span className="font-bold text-sm truncate">
              {user?.name || "User"}
            </span>
            <span className="text-muted-foreground text-sm truncate">
              {user?.handle || "@user"}
            </span>
          </div>
        </div>
        <MoreHorizontal className="hidden xl:block w-4 h-4 text-muted-foreground" />
      </div>
    </header>
  );
}
