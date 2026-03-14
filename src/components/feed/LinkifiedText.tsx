"use client";

import Link from "next/link";

interface LinkifiedTextProps {
  text: string;
  className?: string;
}

export function LinkifiedText({ text, className }: LinkifiedTextProps) {
  // Regex to find hashtags and mentions
  const regex = /([#@][\w]+)/g;
  const parts = text.split(regex);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("#")) {
          return (
            <Link
              key={i}
              href={`/explore?q=${encodeURIComponent(part)}`}
              className="text-primary hover:underline pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </Link>
          );
        } else if (part.startsWith("@")) {
          return (
            <Link
              key={i}
              href={`/profile/${part.replace("@", "")}`}
              className="text-primary hover:underline pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </Link>
          );
        }
        return part;
      })}
    </p>
  );
}
