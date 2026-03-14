"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export function SearchBar({
  placeholder = "Search VOICE",
  className,
  onSearch,
  initialValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(query);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, onSearch]);

  return (
    <div className={cn("relative group w-full", className)}>
      <Search
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
          isFocused ? "text-primary" : "text-muted-foreground",
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-secondary dark:bg-white/5 border border-transparent rounded-full py-2.5 pl-11 pr-10 text-sm outline-none transition-all duration-200",
          isFocused
            ? "ring-2 ring-primary/20 border-primary/30 bg-background shadow-sm"
            : "hover:bg-secondary/80 dark:hover:bg-white/10",
        )}
      />
      {query && (
        <button
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors"
        >
          <X className="w-3 h-3 text-background dark:text-foreground" />
        </button>
      )}
    </div>
  );
}
