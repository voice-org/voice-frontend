"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User,
  MoreHorizontal,
  Image as ImageIcon,
  FileJson,
  BarChart2,
  Smile,
  Calendar,
  Search,
  Repeat,
  Heart,
  Share,
  MessageCircle,
  Pin,
  X,
  Menu,
  Settings,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import {
  dummyPosts,
  trendingTopics,
  followSuggestions,
  type Post,
  appState,
} from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
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
import InfiniteScroll from "react-infinite-scroll-component";

// Shared Components
import { ScallopedBadge } from "@/components/shared/ScallopedBadge";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { IconButton } from "@/components/shared/IconButton";
import { FeedItem } from "@/components/feed/FeedItem";

export default function FeedPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  // Infinite Scroll State
  const [posts, setPosts] = useState<Post[]>(dummyPosts.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  // Feature states
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPollActive, setIsPollActive] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);

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

  const fetchMoreData = () => {
    if (posts.length >= dummyPosts.length) {
      setHasMore(false);
      return;
    }

    // Simulate network delay
    setTimeout(() => {
      const nextBatch = dummyPosts.slice(posts.length, posts.length + 10);
      setPosts((prev) => [...prev, ...nextBatch]);
    }, 1000);
  };

  const handlePost = () => {
    if (!postContent.trim() && selectedImages.length === 0) return;

    toast({
      title: "VOICE Posted!",
      description: scheduledDate
        ? `Scheduled for ${scheduledDate}`
        : "Your voice has been shared with the world.",
    });

    setPostContent("");
    setSelectedImages([]);
    setIsPollActive(false);
    setScheduledDate(null);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const remainingSlots = 4 - selectedImages.length;
      const filesToProcess = filesArray.slice(0, remainingSlots);

      if (filesArray.length > remainingSlots) {
        toast({
          title: "Image Limit",
          description: "You can only upload up to 4 images per post.",
          variant: "destructive",
        });
      }

      filesToProcess.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePollToggle = () => {
    setIsPollActive(!isPollActive);
  };

  const handleCalendarClick = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    setScheduledDate(date.toLocaleDateString() + " at 12:00 PM");
    toast({
      title: "Post Scheduled",
      description: "Setting dummy schedule for tomorrow.",
    });
  };

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
                <SidebarLink icon={Home} label="Home" active href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
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
              <SidebarLink icon={Home} label="Home" active href="/feed" />
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
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
          <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-white/5 transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
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

        {/* Main Feed */}
        <main
          id="scrollableFeed"
          className="flex-1 max-w-2xl w-full border-r border-border dark:border-white/10 min-h-screen overflow-y-auto no-scrollbar"
        >
          <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10 px-4 py-3 hidden sm:block">
            <h2 className="text-xl font-bold">Home</h2>
          </div>

          <div className="px-4 py-3 border-b border-border dark:border-white/10 flex gap-4">
            <Link href="/profile" className="flex-shrink-0">
              <img
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
                src={user?.avatar}
              />
            </Link>
            <div className="flex-1 flex flex-col gap-3">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-xl placeholder-muted-foreground resize-none p-0 mt-2 outline-none"
                placeholder="What's happening?"
                rows={2}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
              />

              {selectedImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-border group shadow-sm"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isPollActive && (
                <div className="mt-2 p-4 rounded-2xl border border-border space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">Poll Options</span>
                    <button
                      onClick={() => setIsPollActive(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    className="w-full bg-background border border-border rounded-none px-3 py-2 text-sm"
                    placeholder="Choice 1"
                  />
                  <input
                    className="w-full bg-background border border-border rounded-none px-3 py-2 text-sm"
                    placeholder="Choice 2"
                  />
                </div>
              )}

              {scheduledDate && (
                <div className="mt-2 flex items-center gap-2 text-primary text-sm font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Will post on {scheduledDate}</span>
                  <button
                    onClick={() => setScheduledDate(null)}
                    className="text-muted-foreground"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center border-t border-border dark:border-white/10 pt-3 mt-1">
                <div className="flex gap-1 text-primary">
                  <IconButton
                    icon={ImageIcon}
                    onClick={handleImageClick}
                    title="Media"
                    active={selectedImages.length > 0}
                  />
                  <IconButton
                    icon={FileJson}
                    onClick={() =>
                      toast({
                        title: "GIF",
                        description: "GIF selection coming soon!",
                      })
                    }
                    title="GIF"
                  />
                  <IconButton
                    icon={BarChart2}
                    onClick={handlePollToggle}
                    title="Poll"
                    active={isPollActive}
                  />
                  <IconButton
                    icon={Smile}
                    onClick={() =>
                      toast({
                        title: "Emoji",
                        description: "Emoji picker coming soon!",
                      })
                    }
                    title="Emoji"
                  />
                  <IconButton
                    icon={Calendar}
                    onClick={handleCalendarClick}
                    title="Schedule"
                    active={!!scheduledDate}
                  />
                </div>
                <button
                  onClick={handlePost}
                  disabled={!postContent.trim() && selectedImages.length === 0}
                  className={cn(
                    "font-bold px-5 py-2 rounded-full text-sm transition-all shadow-md",
                    postContent.trim() || selectedImages.length > 0
                      ? "bg-primary hover:bg-primary-hover text-white cursor-pointer"
                      : "bg-primary/50 text-white cursor-not-allowed",
                  )}
                >
                  VOICE
                </button>
              </div>
            </div>
          </div>

          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="p-8 flex justify-center items-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            }
            endMessage={
              <div className="p-8 text-center text-muted-foreground font-medium">
                You've reached the end of the universe! ✨
              </div>
            }
            scrollableTarget="scrollableFeed"
          >
            <div className="pb-20">
              {posts.map((post) => (
                <FeedItem
                  key={post.id}
                  post={post}
                  currentUserHandle={user?.handle}
                />
              ))}
            </div>
          </InfiniteScroll>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary w-4 h-4" />
            <input
              className="w-full bg-secondary dark:bg-white/5 border-none rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary text-sm placeholder-muted-foreground outline-none"
              placeholder="Search VOICE"
              type="text"
            />
          </div>

          <div className="bg-secondary dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">
              Trending Truths
            </h3>
            {trendingTopics.map((topic) => (
              <div
                key={topic.id}
                className="hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 cursor-pointer transition-colors"
              >
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{topic.category}</span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm mt-0.5">{topic.topic}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {topic.postsCount}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Who to follow</h3>
            {followSuggestions.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Link
                    href={`/profile/${person.handle.replace("@", "")}`}
                    className="flex-shrink-0"
                  >
                    <img
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
                      src={person.avatar}
                    />
                  </Link>
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/profile/${person.handle.replace("@", "")}`}
                      className="font-bold text-sm hover:underline truncate"
                    >
                      {person.name}
                    </Link>
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
