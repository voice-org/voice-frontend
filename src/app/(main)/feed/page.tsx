"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Image as ImageIcon,
  FileJson,
  BarChart2,
  Smile,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import { dummyPosts, type Post, appState } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import InfiniteScroll from "react-infinite-scroll-component";

// Shared Components
import { IconButton } from "@/components/shared/IconButton";
import { FeedItem } from "@/components/feed/FeedItem";
import { useUser } from "@/components/providers/UserProvider";

export default function FeedPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [postContent, setPostContent] = useState("");

  // Infinite Scroll State
  const [posts, setPosts] = useState<Post[]>(dummyPosts.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  // Feature states
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isPollActive, setIsPollActive] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);

  useEffect(() => {
    appState.hasInitialLoaded = true;
  }, []);

  const fetchMoreData = () => {
    if (posts.length >= dummyPosts.length) {
      setHasMore(false);
      return;
    }

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

  return (
    <div id="scrollableFeed" className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10 px-4 py-3 hidden sm:block">
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      <div className="px-4 py-3 border-b border-border dark:border-white/10 flex gap-4">
        <Link href="/profile" className="flex-shrink-0">
          <img
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
            src={user?.avatar || "https://picsum.photos/seed/default/100/100"}
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
            <FeedItem key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
