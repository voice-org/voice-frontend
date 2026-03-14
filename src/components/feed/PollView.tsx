"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PollViewProps {
  poll: {
    options: { id: string; label: string; votes: number }[];
    totalVotes: number;
    expiresAt: string;
    myVote?: string;
  };
}

export function PollView({ poll }: PollViewProps) {
  const [selectedVote, setSelectedVote] = useState(poll.myVote);
  const isVoted = !!selectedVote;

  return (
    <div
      className="mt-3 space-y-2 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {poll.options.map((option) => {
        const percentage =
          poll.totalVotes > 0
            ? Math.round((option.votes / poll.totalVotes) * 100)
            : 0;

        return (
          <button
            key={option.id}
            disabled={isVoted}
            onClick={() => setSelectedVote(option.id)}
            className="relative w-full text-left p-3 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors group overflow-hidden"
          >
            {isVoted && (
              <div
                className="absolute inset-y-0 left-0 bg-primary/20 transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            )}
            <div className="relative flex justify-between items-center z-10 font-medium">
              <span>{option.label}</span>
              {isVoted && <span className="text-sm">{percentage}%</span>}
            </div>
          </button>
        );
      })}
      <div className="flex gap-2 text-muted-foreground text-sm mt-1">
        <span>{poll.totalVotes} votes</span>
        <span>·</span>
        <span>Final results</span>
      </div>
    </div>
  );
}
