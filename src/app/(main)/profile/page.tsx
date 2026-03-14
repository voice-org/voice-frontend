"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  MoreHorizontal,
  Camera,
  Heart,
  MessageCircle,
} from "lucide-react";
import { dummyPosts, appState } from "@/lib/dummy-data";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
    cover?: string;
    bio?: string;
    location?: string;
    website?: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form states for editing
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editCover, setEditCover] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setEditName(parsedUser.name || "");
      setEditBio(
        parsedUser.bio ||
          "Digital product designer, tech enthusiast, and professional VOICEr. Building the future of social connection. 🚀",
      );
      setEditLocation(parsedUser.location || "San Francisco, CA");
      setEditWebsite(parsedUser.website || "voice.app/me");
      setEditAvatar(parsedUser.avatar || "");
      setEditCover(
        parsedUser.cover || "https://picsum.photos/seed/cover/800/260",
      );
      appState.hasInitialLoaded = true;
    }
  }, [router]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") setEditAvatar(reader.result as string);
        else setEditCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      name: editName,
      bio: editBio,
      location: editLocation,
      website: editWebsite,
      avatar: editAvatar,
      cover: editCover,
    };
    localStorage.setItem("voice_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditModalOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  if (!user) return null;

  const displayCover = user.cover || editCover;
  const isCreator = user.handle === "@johndoe";

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border dark:border-white/10 px-4 py-1 flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-black">{user.name}</h2>
          <span className="text-xs text-muted-foreground">1,240 VOICEs</span>
        </div>
      </div>

      <div className="relative">
        <div className="h-32 sm:h-48 bg-secondary overflow-hidden">
          <img
            alt="Cover"
            className="w-full h-full object-cover"
            src={displayCover}
          />
        </div>
        <div className="px-4 flex justify-between items-end -mt-12 sm:-mt-16 mb-4">
          <div className="relative group">
            <img
              alt="Avatar"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-background object-cover bg-background"
              src={user.avatar}
            />
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-5 py-2 border border-border rounded-full font-bold text-sm hover:bg-secondary transition-colors mb-2"
          >
            Edit profile
          </button>
        </div>

        <div className="px-4 space-y-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-black">{user.name}</h1>
              <VerifiedBadge isMe={isCreator} />
            </div>
            <span className="text-muted-foreground">{user.handle}</span>
          </div>

          <p className="text-sm leading-relaxed">{user.bio || "No bio yet."}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {user.location}
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1 text-primary hover:underline cursor-pointer">
                <LinkIcon className="w-4 h-4" /> {user.website}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Joined December 2021
            </div>
          </div>

          <div className="flex gap-4 text-sm pb-2">
            <div className="hover:underline cursor-pointer">
              <span className="font-bold text-foreground">502</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </div>
            <div className="hover:underline cursor-pointer">
              <span className="font-bold text-foreground">1.2M</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>

        <div className="flex border-b border-border dark:border-white/10 mt-2">
          {["posts", "replies", "highlights", "media", "likes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-4 text-sm font-bold hover:bg-secondary/50 transition-colors capitalize relative",
                activeTab === tab ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="pb-20">
          {activeTab === "posts" &&
            dummyPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="p-4 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3"
              >
                <img
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.avatar}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-muted-foreground">
                      {user.handle} · {post.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{post.content}</p>
                </div>
              </div>
            ))}

          {activeTab === "media" && (
            <div className="p-0.5">
              <div className="grid grid-cols-3 gap-0.5">
                {dummyPosts
                  .filter((p) => p.images && p.images.length > 0)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square relative group cursor-pointer overflow-hidden bg-secondary"
                    >
                      <img
                        src={post.images?.[0]}
                        alt="Media"
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 fill-white" />{" "}
                          {post.stats.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 fill-white" />{" "}
                          {post.stats.comments || 0}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] h-[90vh] sm:h-auto overflow-y-auto p-0 border-none bg-background">
          <DialogHeader className="p-4 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex flex-row items-center justify-between border-b border-border">
            <DialogTitle className="text-xl font-black">
              Edit profile
            </DialogTitle>
            <button
              onClick={handleSaveProfile}
              className="bg-foreground text-background px-4 py-1.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative h-32 sm:h-48 bg-secondary group">
              <img
                src={editCover}
                alt="Cover"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="p-3 bg-black/30 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
              <input
                type="file"
                ref={coverInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "cover")}
              />
            </div>
            <div className="px-4 -mt-12 sm:-mt-16 relative">
              <div className="relative inline-block">
                <img
                  src={editAvatar}
                  alt="Avatar"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-background object-cover bg-background brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="p-2 sm:p-3 bg-black/30 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all"
                  >
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "avatar")}
              />
            </div>
            <div className="p-4 space-y-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground font-bold">Name</Label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-transparent border-border focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground font-bold">Bio</Label>
                <Textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="bg-transparent border-border focus:ring-primary resize-none h-24"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground font-bold">
                  Location
                </Label>
                <Input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="bg-transparent border-border focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground font-bold">
                  Website
                </Label>
                <Input
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  className="bg-transparent border-border focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
