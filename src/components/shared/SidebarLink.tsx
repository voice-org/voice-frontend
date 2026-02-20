"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  icon: any;
  label: string;
  active?: boolean;
  badge?: boolean;
  href?: string;
}

export function SidebarLink({
  icon: Icon,
  label,
  active = false,
  badge = false,
  href = "#",
}: SidebarLinkProps) {
  return (
    <Link
      className={cn(
        "flex items-center gap-4 p-3 rounded-full hover:bg-secondary dark:hover:bg-white/5 transition-colors group w-fit xl:w-full",
        active ? "font-bold" : "",
      )}
      href={href}
    >
      <div className="relative flex items-center justify-center">
        <Icon
          className={cn(
            "w-7 h-7",
            active ? "text-primary" : "group-hover:text-primary",
          )}
        />
        {badge && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full border-2 border-background"></span>
        )}
      </div>
      <span className="text-xl sm:hidden xl:block">{label}</span>
    </Link>
  );
}
