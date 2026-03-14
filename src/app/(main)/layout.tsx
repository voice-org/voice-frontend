"use client";

import { usePathname } from "next/navigation";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullWidthPage =
    pathname?.startsWith("/messages") || pathname?.startsWith("/settings");
  const showRightSidebar = !isFullWidthPage;

  return (
    <div className="bg-background text-foreground min-h-screen">
      <MobileNav />
      <div className="container mx-auto max-w-7xl h-screen flex">
        <MainSidebar />
        <main
          className={cn(
            "flex-1 w-full border-r border-border dark:border-white/10 min-h-screen custom-scrollbar overflow-y-auto",
            !isFullWidthPage && "max-w-2xl",
          )}
        >
          {children}
        </main>
        {showRightSidebar && <RightSidebar />}
      </div>
    </div>
  );
}
