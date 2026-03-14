"use client";

import { useState, useEffect } from "react";
import { dummyPosts, appState } from "@/lib/dummy-data";
import { FeedItem } from "@/components/feed/FeedItem";
import { useUser } from "@/components/providers/UserProvider";

export default function BookmarksPage() {
  const { user } = useUser();

  useEffect(() => {
    appState.hasInitialLoaded = true;
  }, []);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold">Bookmarks</h2>
          <p className="text-xs text-muted-foreground">
            @{user?.handle || "johndoe"}
          </p>
        </div>
      </div>

      <div className="pb-20">
        {dummyPosts.filter((p) => p.user.handle === "@lunar_art").length > 0 ? (
          dummyPosts
            .filter((p) => p.user.handle === "@lunar_art")
            .map((post) => <FeedItem key={post.id} post={post} />)
        ) : (
          <div className="p-8 text-center mt-10">
            <h3 className="text-3xl font-black mb-2 tracking-tighter">
              Save VOICEs for later
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Don't let the good ones get away! Bookmark VOICEs to easily find
              them again in the future.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
