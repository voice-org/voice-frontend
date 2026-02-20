"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User as UserIcon,
  MoreHorizontal,
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Search,
  Settings,
  Menu,
  BadgeCheck,
} from "lucide-react";
import {
  dummyPosts,
  trendingTopics,
  followSuggestions,
  appState,
  type Post,
} from "@/lib/dummy-data";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const router = useRouter();
  const { handle } = use(params);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    let currentParsed = null;
    if (savedUser) {
      currentParsed = JSON.parse(savedUser);
      setCurrentUser(currentParsed);

      // If the handle matches current user, redirect to main profile
      if (
        currentParsed.handle.replace("@", "").toLowerCase() ===
        handle.toLowerCase()
      ) {
        router.push("/profile");
        return;
      }
    }

    // Find the dummy user
    const foundInPosts = dummyPosts.find(
      (p) =>
        p.user.handle.replace("@", "").toLowerCase() === handle.toLowerCase(),
    )?.user;
    const foundInSuggestions = followSuggestions.find(
      (s) => s.handle.replace("@", "").toLowerCase() === handle.toLowerCase(),
    );

    if (foundInPosts) {
      setUserProfile(foundInPosts);
    } else if (foundInSuggestions) {
      setUserProfile({
        ...foundInSuggestions,
        bio: (foundInSuggestions as any).bio || "Digital explorer on VOICE. 🚀",
        location: "Global",
        website: "voice.app/user",
        cover: "https://picsum.photos/seed/user_cover/800/260",
      });
    }

    setIsLoading(false);
  }, [handle, router]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-transparent">
        <span className="text-primary font-black text-6xl tracking-tighter">
          VOICE.
        </span>
      </div>
    );

  if (!userProfile)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <Link
          href="/feed"
          className="bg-primary text-white px-6 py-2 rounded-full font-bold"
        >
          Back to Home
        </Link>
      </div>
    );

  // Filter posts for this specific user
  const userPosts = dummyPosts.filter(
    (p) => p.user.handle.toLowerCase() === userProfile.handle.toLowerCase(),
  );

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
      <div className="container mx-auto max-w-7xl h-screen flex">
        {/* Sidebar Navigation */}
        <header className="w-20 xl:w-64 h-full flex flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-[#2F3336] overflow-y-auto hidden sm:flex z-50">
          <div className="flex flex-col items-center xl:items-start space-y-4 w-full">
            <Link
              href="/feed"
              className="p-3 mb-2 rounded-full hover:bg-primary/10 transition-colors w-fit"
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
              <SidebarLink icon={UserIcon} label="Profile" href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="#" />
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336] px-4 py-1 flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold leading-tight">
                {userProfile.name}
              </h2>
              <span className="text-xs text-muted-foreground">
                {userPosts.length} VOICEs
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="h-32 sm:h-48 w-full bg-muted overflow-hidden">
              <img
                src={
                  userProfile.cover ||
                  `https://picsum.photos/seed/${userProfile.handle}/800/260`
                }
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 relative pb-4">
              <div className="flex justify-between items-start">
                <div className="relative -mt-12 sm:-mt-16 mb-2">
                  <div className="border-4 border-background rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 bg-background shadow-sm">
                    <img
                      src={userProfile.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="border border-border hover:bg-secondary rounded-full p-2 h-fit transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  <button className="bg-foreground text-background font-bold px-6 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">
                    Follow
                  </button>
                </div>
              </div>

              <div className="mt-2 space-y-3">
                <div className="flex flex-col">
                  <h1 className="text-xl font-black flex items-center gap-1.5">
                    {userProfile.name}
                    {userProfile.verified && (
                      <VerifiedBadge
                        isMe={userProfile.handle === "@johndoe"}
                        className="w-5 h-5"
                      />
                    )}
                  </h1>
                  <p className="text-muted-foreground text-sm leading-none mt-0.5">
                    {userProfile.handle}
                  </p>
                </div>

                <p className="text-sm leading-normal mt-2">
                  {userProfile.bio || "Digital explorer on VOICE. 🚀"}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{userProfile.location || "Global"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href="#" className="text-primary hover:underline">
                      {userProfile.website || "voice.app"}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined 2024</span>
                  </div>
                </div>

                <div className="flex gap-4 text-sm pt-2">
                  <div className="flex gap-1 hover:underline cursor-pointer">
                    <span className="font-bold">281</span>
                    <span className="text-muted-foreground">Following</span>
                  </div>
                  <div className="flex gap-1 hover:underline cursor-pointer">
                    <span className="font-bold">14.2K</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border dark:border-[#2F3336]">
            <button
              onClick={() => setActiveTab("posts")}
              className={cn(
                "flex-1 py-4 text-sm font-bold hover:bg-secondary relative",
                activeTab === "posts"
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              VOICEs
              {activeTab === "posts" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full"></div>
              )}
            </button>
            <button className="flex-1 py-4 text-sm font-bold text-muted-foreground hover:bg-secondary">
              Replies
            </button>
            <button className="flex-1 py-4 text-sm font-bold text-muted-foreground hover:bg-secondary">
              Media
            </button>
            <button className="flex-1 py-4 text-sm font-bold text-muted-foreground hover:bg-secondary">
              Likes
            </button>
          </div>

          <div className="pb-20">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3"
                >
                  <img
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    src={userProfile.avatar}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-bold">{userProfile.name}</span>
                      <span className="text-muted-foreground">
                        {userProfile.handle} · {post.timestamp}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 rounded-2xl overflow-hidden border border-border">
                        <img
                          src={post.image}
                          alt="Content"
                          className="w-full h-auto max-h-80 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                No VOICEs posted yet.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
