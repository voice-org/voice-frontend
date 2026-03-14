"use client";

import { cn } from "@/lib/utils";

interface ImageGridProps {
  images: string[];
}

export function ImageGrid({ images }: ImageGridProps) {
  const count = images.length;

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "mt-3 rounded-2xl overflow-hidden border border-border dark:border-white/10 grid gap-0.5",
        count === 1 ? "grid-cols-1" : "grid-cols-2",
        count === 3 ? "grid-rows-2" : "",
      )}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={cn(
            "relative overflow-hidden group",
            count === 3 && idx === 0 ? "row-span-2" : "",
            count === 1 ? "aspect-auto" : "aspect-[16/9] sm:aspect-square",
          )}
        >
          <img
            src={src}
            alt={`Post content ${idx + 1}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
