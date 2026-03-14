"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Search, Settings } from "lucide-react";
import {
  trendingTopics,
  followSuggestions,
  appState,
  dummyPosts,
} from "@/lib/dummy-data";
import { FeedItem } from "@/components/feed/FeedItem";
import { SearchBar } from "@/components/shared/SearchBar";
import { useUser } from "@/components/providers/UserProvider";

export default function ExplorePage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("for-you");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTab, setSearchTab] = useState("top");

  useEffect(() => {
    appState.hasInitialLoaded = true;
  }, []);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 px-4 py-3 border-b border-border dark:border-white/10 box-border">
        <div className="flex items-center gap-4 pt-1 mb-3">
          <SearchBar
            className="flex-1"
            placeholder="Search VOICE"
            initialValue={searchQuery}
            onSearch={setSearchQuery}
          />
          <Settings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>

        <div className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory -mb-px">
          {!searchQuery ? (
            <>
              <ExploreTab
                label="For you"
                active={activeTab === "for-you"}
                onClick={() => setActiveTab("for-you")}
              />
              <ExploreTab
                label="Trending"
                active={activeTab === "trending"}
                onClick={() => setActiveTab("trending")}
              />
              <ExploreTab
                label="News"
                active={activeTab === "news"}
                onClick={() => setActiveTab("news")}
              />
              <ExploreTab
                label="Sports"
                active={activeTab === "sports"}
                onClick={() => setActiveTab("sports")}
              />
              <ExploreTab
                label="Entertainment"
                active={activeTab === "entertainment"}
                onClick={() => setActiveTab("entertainment")}
              />
            </>
          ) : (
            <>
              <ExploreTab
                label="Top"
                active={searchTab === "top"}
                onClick={() => setSearchTab("top")}
              />
              <ExploreTab
                label="Latest"
                active={searchTab === "latest"}
                onClick={() => setSearchTab("latest")}
              />
              <ExploreTab
                label="People"
                active={searchTab === "people"}
                onClick={() => setSearchTab("people")}
              />
              <ExploreTab
                label="Media"
                active={searchTab === "media"}
                onClick={() => setSearchTab("media")}
              />
            </>
          )}
        </div>
      </div>

      <div className="pb-20">
        {searchQuery ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {searchTab === "people" ? (
              <div className="divide-y divide-border dark:divide-white/10">
                {followSuggestions
                  .filter(
                    (p) =>
                      p.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      p.handle
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between px-4 py-4 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          alt="Avatar"
                          className="w-12 h-12 rounded-full object-cover"
                          src={person.avatar}
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-base hover:underline truncate">
                            {person.name}
                          </span>
                          <span className="text-sm text-muted-foreground truncate">
                            {person.handle}
                          </span>
                        </div>
                      </div>
                      <button className="bg-foreground text-background hover:opacity-90 text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
                        Follow
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div>
                {dummyPosts
                  .filter(
                    (p) =>
                      p.content
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      (searchTab === "media"
                        ? p.images && p.images.length > 0
                        : true),
                  )
                  .slice(0, 10)
                  .map((post) => (
                    <FeedItem key={post.id} post={post} />
                  ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer group">
              <img
                src="https://picsum.photos/seed/news_hero/800/450"
                alt="Breaking News"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white/80 text-sm font-medium mb-1">
                  Politics · Live
                </span>
                <h2 className="text-white text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                  Global Leaders Gather for the 2026 Innovation Summit in Dubai
                </h2>
              </div>
            </div>
            <div className="border-b border-border dark:border-[#2F3336] py-3">
              <h3 className="text-xl font-black px-4 py-2">Trends for you</h3>
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="hover:bg-black/5 dark:hover:bg-white/5 px-4 py-3 cursor-pointer transition-colors relative group"
                >
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{topic.category}</span>
                    <MoreHorizontal className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="font-bold text-base mt-0.5">
                    {topic.topic}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {topic.postsCount}
                  </div>
                </div>
              ))}
              <button className="w-full text-left px-4 py-4 text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-bold">
                Show more
              </button>
            </div>
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-black">What's happening</h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 cursor-pointer group">
                  <div className="flex-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <span>Tech News</span>
                      <span>·</span>
                      <span>2h ago</span>
                    </div>
                    <h4 className="font-bold text-sm line-clamp-2 group-hover:underline">
                      New AI model breakthroughs show promise in early medical
                      diagnosis and treatment planning.
                    </h4>
                  </div>
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={`https://picsum.photos/seed/tech_${item}/100/100`}
                      alt="News"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ExploreTab({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 min-w-fit px-6 hover:bg-secondary/50 transition-colors relative h-12 flex items-center justify-center snap-start"
    >
      <div className="h-full flex flex-col justify-center relative">
        <span
          className={
            active
              ? "font-bold text-foreground"
              : "text-muted-foreground font-medium"
          }
        >
          {label}
        </span>
        {active && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
        )}
      </div>
    </button>
  );
}
