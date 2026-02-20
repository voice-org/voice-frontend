"use client";

import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: any;
  onClick?: () => void;
  title?: string;
  active?: boolean;
  className?: string;
}

export function IconButton({
  icon: Icon,
  onClick,
  title,
  active = false,
  className,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "p-2 rounded-full transition-colors",
        active ? "bg-primary/20 text-primary" : "hover:bg-primary/10",
        className,
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
