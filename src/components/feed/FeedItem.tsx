"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Pin,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  Repeat,
  Heart,
  Share,
  BarChart3,
  Bookmark,
  MessageSquareQuote,
} from "lucide-react";
import { type Post } from "@/lib/dummy-data";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { LinkifiedText } from "./LinkifiedText";
import { ImageGrid } from "./ImageGrid";
import { PollView } from "./PollView";
import { cn } from "@/lib/utils";
import { useUser } from "@/components/providers/UserProvider";

interface FeedItemProps {
  post: Post;
  isQuote?: boolean;
}

export function FeedItem({ post, isQuote = false }: FeedItemProps) {
  const { user: currentUser } = useUser();
  const [showRepostMenu, setShowRepostMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showRepostMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowRepostMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showRepostMenu]);

  const isMe =
    currentUser?.handle === post.user.handle || post.user.handle === "@johndoe";
  const profileHref = isMe
    ? "/profile"
    : `/profile/${post.user.handle.replace("@", "")}`;

  return (
    <article className="border-b border-border dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer relative group">
      <Link href={`/post/${post.id}`} className="absolute inset-0 z-0" />
      <div className="p-4 relative z-10 pointer-events-none">
        {post.isPinned && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold mb-1 ml-12">
            <Pin className="w-3 h-3 rotate-45" />
            <span>Pinned VOICE</span>
          </div>
        )}
        <div className="flex gap-4">
          <Link
            href={profileHref}
            className="flex-shrink-0 avatar-link pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
              src={post.user.avatar}
            />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1 min-w-0">
                <Link
                  href={profileHref}
                  className="font-bold hover:underline truncate pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {post.user.name}
                </Link>
                {post.user.verified && <VerifiedBadge isMe={isMe} />}
                <span className="text-muted-foreground text-sm truncate">
                  {post.user.handle}
                </span>
                <span className="text-muted-foreground text-sm flex-shrink-0">
                  · {post.timestamp}
                </span>
              </div>
              <button
                className="text-muted-foreground hover:text-primary rounded-full p-1 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <LinkifiedText
              className={cn(
                "mt-1 leading-snug break-words text-foreground",
                isQuote ? "text-sm" : "text-base",
              )}
              text={post.content}
            />

            {post.poll && <PollView poll={post.poll} />}

            {post.images && post.images.length > 0 && (
              <ImageGrid images={post.images} />
            )}

            {post.quotePost && (
              <div
                className="mt-3 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <FeedItem post={post.quotePost} isQuote />
              </div>
            )}

            {!isQuote && (
              <div className="flex justify-between items-center mt-3 max-w-md pr-4 text-muted-foreground pointer-events-auto">
                <FeedAction
                  icon={MessageCircle}
                  count={post.stats.comments}
                  hoverColor="hover:text-primary"
                />
                <div className="relative" ref={menuRef}>
                  <FeedAction
                    icon={Repeat}
                    count={post.stats.reposts}
                    hoverColor="hover:text-green-500"
                    onClick={() => setShowRepostMenu(!showRepostMenu)}
                    active={showRepostMenu}
                  />
                  {showRepostMenu && (
                    <div className="absolute top-10 left-0 flex flex-col bg-background border border-border rounded-xl shadow-2xl z-50 py-2 w-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary text-sm font-bold text-foreground transition-colors">
                        <Repeat className="w-4 h-4" />
                        Repost
                      </button>
                      <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary text-sm font-bold text-foreground transition-colors">
                        <MessageSquareQuote className="w-4 h-4" />
                        Quote
                      </button>
                    </div>
                  )}
                </div>
                <FeedAction
                  icon={Heart}
                  count={post.stats.likes}
                  hoverColor="hover:text-pink-600"
                />
                <FeedAction
                  icon={BarChart3}
                  count={post.stats.views || "0"}
                  hoverColor="hover:text-primary"
                />
                <div className="flex gap-1">
                  <FeedAction
                    icon={Bookmark}
                    count={post.stats.bookmarks}
                    hoverColor="hover:text-primary"
                  />
                  <FeedAction icon={Share} hoverColor="hover:text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function FeedAction({
  icon: Icon,
  count,
  hoverColor,
  onClick,
  active = false,
}: {
  icon: any;
  count?: number | string;
  hoverColor: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      className={cn(
        "flex items-center gap-1 group transition-colors",
        active ? hoverColor.split(":")[1] : "text-muted-foreground",
        hoverColor,
      )}
    >
      <div
        className={cn(
          "p-2 rounded-full transition-colors",
          active ? "bg-current/10" : "group-hover:bg-current/10",
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      {count !== undefined && (
        <span className="text-xs font-medium">{count}</span>
      )}
    </button>
  );
}
