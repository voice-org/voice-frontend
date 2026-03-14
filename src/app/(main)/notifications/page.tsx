"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Repeat,
  UserPlus,
  AtSign,
  Settings,
  MessageCircle,
} from "lucide-react";
import {
  dummyNotifications,
  type Notification,
  appState,
} from "@/lib/dummy-data";
import { ScallopedBadge } from "@/components/shared/ScallopedBadge";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "verified" | "mentions">(
    "all",
  );

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setUser(JSON.parse(savedUser));
      appState.hasInitialLoaded = true;
    }
  }, [router]);

  const filteredNotifications = dummyNotifications.filter((n) => {
    if (activeTab === "mentions")
      return n.type === "mention" || n.type === "reply";
    if (activeTab === "verified") return n.type === "verify";
    return true;
  });

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10">
        <div className="items-center justify-between px-4 py-3 hidden sm:flex">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Settings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        </div>
        {/* Tabs */}
        <div className="flex w-full">
          <NotificationTab
            label="All"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />
          <NotificationTab
            label="Verified"
            active={activeTab === "verified"}
            onClick={() => setActiveTab("verified")}
          />
          <NotificationTab
            label="Mentions"
            active={activeTab === "mentions"}
            onClick={() => setActiveTab("mentions")}
          />
        </div>
      </div>

      <div className="pb-20">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div className="p-8 text-center mt-10">
            <h3 className="text-2xl font-black mb-2">
              Nothing to see here yet
            </h3>
            <p className="text-muted-foreground">
              When people mention you or interact with your VOICEs, you'll see
              it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative h-14",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full"></div>
      )}
    </button>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart className="w-8 h-8 text-pink-600 fill-pink-600" />;
      case "repost":
        return <Repeat className="w-8 h-8 text-green-500" />;
      case "follow":
        return <UserPlus className="w-8 h-8 text-primary fill-primary" />;
      case "mention":
        return <AtSign className="w-8 h-8 text-primary" />;
      case "reply":
        return <MessageCircle className="w-8 h-8 text-primary" />;
      case "verify":
        return (
          <div className="w-8 h-8 flex items-center justify-center text-primary">
            <ScallopedBadge className="w-6 h-6" color="#5A55F2" />
          </div>
        );
    }
  };

  const getMessage = () => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <b>{notification.user.name}</b> liked your VOICE
          </>
        );
      case "repost":
        return (
          <>
            <b>{notification.user.name}</b> reposted your VOICE
          </>
        );
      case "follow":
        return (
          <>
            <b>{notification.user.name}</b> followed you
          </>
        );
      case "mention":
        return (
          <>
            <b>{notification.user.name}</b> mentioned you in a VOICE
          </>
        );
      case "reply":
        return (
          <>
            <b>{notification.user.name}</b> replied to your VOICE
          </>
        );
      case "verify":
        return (
          <>
            <b>VOICE Support</b> verified your account
          </>
        );
    }
  };

  return (
    <div className="p-4 border-b border-border dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
      <div className="pt-1">{getIcon()}</div>
      <div className="flex-1 space-y-2">
        <img
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
          src={notification.user.avatar}
        />
        <div className="text-base leading-tight">{getMessage()}</div>
        {notification.content && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {notification.content}
          </p>
        )}
      </div>
      <div className="text-muted-foreground text-sm">
        {notification.timestamp}
      </div>
    </div>
  );
}
