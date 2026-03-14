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
  Menu,
} from "lucide-react";
import { SidebarLink } from "@/components/shared/SidebarLink";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function MobileNav() {
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
    <div className="sm:hidden sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border dark:border-white/10 px-4 py-3 flex items-center justify-between">
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
            Access your profile and navigation links
          </SheetDescription>
          <div className="flex flex-col h-full p-4">
            <div className="mb-6 px-2 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    user?.avatar || "https://picsum.photos/seed/default/100/100"
                  }
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm">
                    {user?.name || "User"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {user?.handle || "@user"}
                  </span>
                </div>
              </div>
              <div className="h-px bg-border w-full mt-2"></div>
            </div>
            <nav className="space-y-1">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
