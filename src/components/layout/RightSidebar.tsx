"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { trendingTopics, followSuggestions } from "@/lib/dummy-data";
import { SearchBar } from "@/components/shared/SearchBar";

export function RightSidebar() {
  return (
    <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
      <SearchBar placeholder="Search VOICE" />

      <div className="bg-secondary dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 pt-3">
        <h3 className="font-extrabold text-xl px-4 mb-3">Trending Truths</h3>
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
        <button className="w-full text-left px-4 py-4 text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-bold">
          Show more
        </button>
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
            <button className="bg-foreground text-background hover:opacity-90 text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
              Follow
            </button>
          </div>
        ))}
        <button className="w-full text-left px-4 py-4 text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-bold rounded-b-2xl">
          Show more
        </button>
      </div>
    </aside>
  );
}
