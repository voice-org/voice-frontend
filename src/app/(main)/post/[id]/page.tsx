"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MoreHorizontal,
  Repeat,
  Heart,
  Share,
  MessageCircle,
  Image as ImageIcon,
  Smile,
  Bookmark,
} from "lucide-react";
import { dummyPosts, type Post, appState } from "@/lib/dummy-data";
import { IconButton } from "@/components/shared/IconButton";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { LinkifiedText } from "@/components/feed/LinkifiedText";
import { ImageGrid } from "@/components/feed/ImageGrid";
import { PollView } from "@/components/feed/PollView";
import { FeedItem } from "@/components/feed/FeedItem";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(savedUser));
      const foundPost = dummyPosts.find((p) => p.id === id);
      if (foundPost) setPost(foundPost);
      appState.hasInitialLoaded = true;
    }
  }, [id, router]);

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
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10 px-4 py-3 flex items-center gap-6">
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

        <LinkifiedText
          className="text-xl leading-relaxed break-words mt-4 text-foreground"
          text={post.content}
        />

        {post.poll && <PollView poll={post.poll} />}
        {post.images && post.images.length > 0 && (
          <ImageGrid images={post.images} />
        )}
        {post.quotePost && (
          <div className="mt-4 border border-border rounded-2xl overflow-hidden">
            <FeedItem post={post.quotePost} isQuote />
          </div>
        )}

        <div className="py-4 border-b border-border dark:border-white/10 text-muted-foreground text-sm flex gap-1 items-center">
          <span>{post.timestamp}</span>
          <span>·</span>
          <span>Jan 28, 2024</span>
          <span>·</span>
          <span className="font-bold text-foreground">
            {post.stats.views || 0}
          </span>
          <span>Views</span>
        </div>

        <div className="py-4 border-b border-border dark:border-white/10 flex gap-4 text-sm">
          <div className="flex gap-1">
            <span className="font-bold text-foreground">
              {post.stats.reposts}
            </span>
            <span className="text-muted-foreground">Reposts</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold text-foreground">
              {post.stats.quotes || 0}
            </span>
            <span className="text-muted-foreground">Quotes</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold text-foreground">
              {post.stats.likes}
            </span>
            <span className="text-muted-foreground">Likes</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold text-foreground">
              {post.stats.bookmarks || 0}
            </span>
            <span className="text-muted-foreground">Bookmarks</span>
          </div>
        </div>

        <div className="flex justify-around items-center py-2 border-b border-border dark:border-white/10 text-muted-foreground">
          <IconButton icon={MessageCircle} className="hover:text-primary" />
          <IconButton icon={Repeat} className="hover:text-green-500" />
          <IconButton icon={Heart} className="hover:text-pink-600" />
          <IconButton icon={Bookmark} className="hover:text-primary" />
          <IconButton icon={Share} className="hover:text-primary" />
        </div>

        <div className="flex gap-4 py-3 pb-20">
          <Link href="/profile" className="flex-shrink-0">
            <img
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
              src={
                currentUser?.avatar ||
                "https://picsum.photos/seed/default/100/100"
              }
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
    </div>
  );
}
