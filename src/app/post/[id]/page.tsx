"use client";

import { useState, useEffect, use } from "react";
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
  Repeat,
  Heart,
  Share,
  MessageCircle,
  Pin,
  Menu,
  Settings,
  Image as ImageIcon,
  Smile,
  Bookmark,
  BadgeCheck,
} from "lucide-react";
import {
  dummyPosts,
  trendingTopics,
  followSuggestions,
  type Post,
  appState,
} from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { IconButton } from "@/components/shared/IconButton";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(savedUser));
      const foundPost = dummyPosts.find((p) => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      }
      appState.hasInitialLoaded = true;
      setIsLoading(false);
    }
  }, [id, router]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center custom-gradient relative z-50">
        <span className="text-primary font-black text-6xl tracking-tighter">
          VOICE<span className="text-[#2DD0B3]">.</span>
        </span>
      </div>
    );

  if (!post)
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link
          href="/feed"
          className="bg-primary text-white px-6 py-2 rounded-full font-bold"
        >
          Back to Home
        </Link>
      </div>
    );

  const isMe = currentUser?.handle === post.user.handle;
  const postUserHref = isMe
    ? "/profile"
    : `/profile/${post.user.handle.replace("@", "")}`;

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
      {/* Mobile Top Navigation */}
      <div className="sm:hidden sticky top-0 bg-background/80   backdrop-blur-md z-50 border-b border-border dark:border-[#2F3336] px-4 py-3 flex items-center justify-between">
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
                    src={currentUser?.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">
                      {currentUser?.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {currentUser?.handle}
                    </span>
                  </div>
                </div>
                <div className="h-px bg-border w-full mt-2"></div>
              </div>
              <nav className="space-y-1">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
                <SidebarLink
                  icon={Bell}
                  label="Notifications"
                  badge
                  href="/notifications"
                />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink icon={User} label="Profile" href="/profile" />
                <SidebarLink icon={Settings} label="Settings" href="#" />
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
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
              <SidebarLink
                icon={Bell}
                label="Notifications"
                badge
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="#" />
            </nav>
          </div>
          <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-[#16181C] transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
            <div className="flex items-center gap-3">
              <Link href="/profile" className="flex-shrink-0">
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border border-border hover:opacity-90 transition-opacity"
                  src={currentUser?.avatar}
                />
              </Link>
              <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
                <Link
                  href="/profile"
                  className="font-bold text-sm truncate hover:underline"
                >
                  {currentUser?.name}
                </Link>
                <span className="text-muted-foreground text-sm truncate">
                  {currentUser?.handle}
                </span>
              </div>
            </div>
            <MoreHorizontal className="hidden xl:block w-4 h-4 text-muted-foreground" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-background/80   backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336] px-4 py-3 flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">Post</h2>
          </div>

          <article className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Link href={postUserHref}>
                  <img
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
                    src={post.user.avatar}
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Link
                      href={postUserHref}
                      className="font-bold hover:underline cursor-pointer"
                    >
                      {post.user.name}
                    </Link>
                    <VerifiedBadge isMe={isMe} />
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {post.user.handle}
                  </span>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-primary p-2">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xl leading-relaxed break-words mt-4">
              {post.content}
            </div>

            {post.image && (
              <div className="rounded-2xl overflow-hidden border border-border dark:border-[#2F3336] mt-4">
                <img
                  alt="Post content"
                  className="w-full h-auto object-cover max-h-[700px]"
                  src={post.image}
                />
              </div>
            )}

            <div className="py-4 border-b border-border dark:border-[#2F3336] text-muted-foreground text-sm flex gap-1">
              <span>{post.timestamp}</span>
              <span>·</span>
              <span>Jan 28, 2024</span>
              <span>·</span>
              <span className="font-bold text-foreground">1.2M</span>
              <span>Views</span>
            </div>

            <div className="py-4 border-b border-border dark:border-[#2F3336] flex gap-4 text-sm">
              <div className="flex gap-1">
                <span className="font-bold text-foreground">
                  {post.stats.reposts}
                </span>
                <span className="text-muted-foreground">Reposts</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold text-foreground">42</span>
                <span className="text-muted-foreground">Quotes</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold text-foreground">
                  {post.stats.likes}
                </span>
                <span className="text-muted-foreground">Likes</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold text-foreground">15</span>
                <span className="text-muted-foreground">Bookmarks</span>
              </div>
            </div>

            <div className="flex justify-around items-center py-2 border-b border-border dark:border-[#2F3336] text-muted-foreground">
              <IconButton icon={MessageCircle} className="hover:text-primary" />
              <IconButton icon={Repeat} className="hover:text-green-500" />
              <IconButton icon={Heart} className="hover:text-pink-600" />
              <IconButton icon={Bookmark} className="hover:text-primary" />
              <IconButton icon={Share} className="hover:text-primary" />
            </div>

            {/* Reply Input */}
            <div className="flex gap-4 py-3">
              <Link href="/profile" className="flex-shrink-0">
                <img
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
                  src={currentUser?.avatar}
                />
              </Link>
              <div className="flex-1">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-muted-foreground resize-none p-0 mt-1 outline-none"
                  placeholder="Post your reply"
                  rows={1}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-1 text-primary">
                    <IconButton icon={ImageIcon} />
                    <IconButton icon={Smile} />
                  </div>
                  <button
                    disabled={!replyText.trim()}
                    className={cn(
                      "font-bold px-5 py-2 rounded-full text-sm transition-all shadow-md",
                      replyText.trim()
                        ? "bg-primary text-white"
                        : "bg-primary/50 text-white cursor-not-allowed",
                    )}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary w-4 h-4" />
            <input
              className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary text-sm placeholder-muted-foreground outline-none"
              placeholder="Search VOICE"
              type="text"
            />
          </div>

          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">
              Relevant people
            </h3>
            <div className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Link href={postUserHref}>
                  <img
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
                    src={post.user.avatar}
                  />
                </Link>
                <div className="flex flex-col min-w-0">
                  <Link
                    href={postUserHref}
                    className="font-bold text-sm hover:underline truncate"
                  >
                    {post.user.name}
                  </Link>
                  <span className="text-xs text-muted-foreground truncate">
                    {post.user.handle}
                  </span>
                </div>
              </div>
              <button className="bg-foreground text-background text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
                Follow
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
