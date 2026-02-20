"use client";

import { Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScallopedBadge } from "./ScallopedBadge";

interface VerifiedBadgeProps {
  isMe?: boolean;
  className?: string;
  verifiedSince?: string;
}

export function VerifiedBadge({
  isMe = false,
  className = "w-3.5 h-3.5",
  verifiedSince,
}: VerifiedBadgeProps) {
  const color = isMe ? "#FFD700" : "#5A55F2";
  const label = isMe ? "Creator & Maintainer" : "Verified Account";
  const description = isMe
    ? "This account is the official Creator and Maintainer of VOICE. It holds high authority within the platform ecosystem."
    : "This account is verified because it is notable in government, news, entertainment, or another designated category.";
  const date = verifiedSince || (isMe ? "June 2023" : "December 2021");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help flex items-center justify-center">
            <ScallopedBadge className={className} color={color} />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground border border-border p-4 rounded-xl shadow-2xl max-w-[280px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ScallopedBadge className="w-5 h-5" color={color} />
              <p className="font-bold text-sm">{label}</p>
            </div>
            <p className="text-xs leading-relaxed opacity-80">{description}</p>
            <div className="h-px bg-border my-1" />
            <div className="flex items-center gap-1.5 text-xs opacity-60">
              <Calendar className="w-3.5 h-3.5" />
              <span>Verified since {date}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
