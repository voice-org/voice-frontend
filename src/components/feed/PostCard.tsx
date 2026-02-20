"use client";

import { type Post } from "@/lib/dummy-data";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";

interface PostCardProps {
  post: Post;
  currentUserHandle?: string;
}

export function PostCard({ post, currentUserHandle }: PostCardProps) {
  const isMe = !!(
    post.user.handle === "@johndoe" ||
    (currentUserHandle && post.user.handle === currentUserHandle)
  );
  const profileHref = isMe
    ? "/profile"
    : `/profile/${post.user.handle.replace("@", "")}`;

  return (
    <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20 dark:border-white/10 transition-shadow cursor-pointer hover:shadow-md relative group">
      <Link
        href={`/post/${post.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View post by ${post.user.name}`}
      />

      <div className="relative z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={profileHref}
            className="pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              alt={`${post.user.name} Avatar`}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 object-cover hover:opacity-90 transition-opacity"
              src={post.user.avatar}
            />
          </Link>
          <div className="flex flex-col leading-tight">
            <Link
              href={profileHref}
              className="pointer-events-auto group/name flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-bold text-sm text-black dark:text-white group-hover/name:underline">
                {post.user.name}
              </span>
              {post.user.verified && <VerifiedBadge isMe={isMe} />}
            </Link>
            <span className="text-xs text-subtext-light dark:text-subtext-dark">
              {post.user.handle}
            </span>
          </div>
        </div>

        <p className="text-sm mb-3 leading-relaxed text-black dark:text-gray-200">
          {post.content}
        </p>

        {post.image && (
          <div className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden mb-3">
            <div className="bg-gray-100 dark:bg-gray-900 relative">
              <img
                alt="Post content"
                className="w-full h-auto object-cover max-h-[300px]"
                src={post.image}
              />
            </div>
          </div>
        )}

        {post.link && (
          <div className="flex gap-3 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden bg-white/40 dark:bg-black/20 p-2">
            <div className="flex flex-col justify-center min-w-0">
              <div className="text-[10px] text-subtext-light dark:text-subtext-dark mb-1 flex items-center gap-1 truncate">
                <i className="fas fa-link text-xs"></i> {post.link.display}
              </div>
              <div className="text-xs font-bold leading-tight text-black dark:text-white truncate">
                {post.link.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
