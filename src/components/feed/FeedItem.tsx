"use client";

import Link from "next/link";
import {
  Pin,
  Calendar,
  MoreHorizontal,
  MessageCircle,
  Repeat,
  Heart,
  Share,
} from "lucide-react";
import { type Post } from "@/lib/dummy-data";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

interface FeedItemProps {
  post: Post;
  currentUserHandle?: string;
}

export function FeedItem({ post, currentUserHandle }: FeedItemProps) {
  const isMe =
    currentUserHandle === post.user.handle || post.user.handle === "@johndoe";
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
            <p className="mt-1 text-base leading-snug break-words">
              {post.content}
            </p>
            {post.image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border dark:border-white/10">
                <img
                  alt="Post content"
                  className="w-full h-auto max-h-[512px] object-cover"
                  src={post.image}
                />
              </div>
            )}
            <div className="flex justify-between items-center mt-3 max-w-md pr-4 text-muted-foreground pointer-events-auto">
              <FeedAction
                icon={MessageCircle}
                count={post.stats.comments}
                hoverColor="hover:text-primary"
              />
              <FeedAction
                icon={Repeat}
                count={post.stats.reposts}
                hoverColor="hover:text-green-500"
              />
              <FeedAction
                icon={Heart}
                count={post.stats.likes}
                hoverColor="hover:text-pink-600"
              />
              <FeedAction icon={Share} hoverColor="hover:text-primary" />
            </div>
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
}: {
  icon: any;
  count?: number | string;
  hoverColor: string;
}) {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-2 group ${hoverColor} transition-colors`}
    >
      <div
        className={`p-2 rounded-full group-hover:bg-current/10 transition-colors`}
      >
        <Icon className="w-4 h-4" />
      </div>
      {count !== undefined && <span className="text-xs">{count}</span>}
    </button>
  );
}
