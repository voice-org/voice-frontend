"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User,
  MoreHorizontal,
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Search,
  Settings,
  Menu,
  Camera,
  X,
  BadgeCheck,
} from "lucide-react";
import {
  dummyPosts,
  trendingTopics,
  followSuggestions,
  appState,
} from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);
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
        parsedUser.cover ||
          PlaceHolderImages.find((img) => img.id === "profile-cover")
            ?.imageUrl ||
          "https://picsum.photos/seed/cover/800/260",
      );
      appState.hasInitialLoaded = true;
      setIsLoading(false);
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
        if (type === "avatar") {
          setEditAvatar(reader.result as string);
        } else {
          setEditCover(reader.result as string);
        }
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

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center custom-gradient relative z-50">
        <span className="text-primary font-black text-6xl tracking-tighter">
          VOICE<span className="text-[#2DD0B3]">.</span>
        </span>
      </div>
    );

  const displayCover =
    user?.cover ||
    PlaceHolderImages.find((img) => img.id === "profile-cover")?.imageUrl ||
    "https://picsum.photos/seed/cover/800/260";
  const isCreator = user?.handle === "@johndoe";

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex sm:hidden sticky top-0 bg-background dark:bg-backgroundBlur/80  backdrop-blur-md z-50 border-b border-border dark:border-[#2F3336] px-4 py-3 items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="font-bold text-base leading-none">
              {user?.name}
            </span>
            <span className="text-xs text-muted-foreground">12 VOICEs</span>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-1">
              <Menu className="w-6 h-6 text-muted-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-background border-r border-border dark:border-[#2F3336]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Access your profile and navigation links
            </SheetDescription>
            <div className="flex flex-col h-full p-4">
              <nav className="space-y-1">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
                <SidebarLink
                  icon={Bell}
                  label="Notifications"
                  badge
                  href="/notifications"
                />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink
                  icon={User}
                  label="Profile"
                  active
                  href="/profile"
                />
                <SidebarLink
                  icon={Settings}
                  label="Settings"
                  href="/settings"
                />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="container mx-auto max-w-7xl h-screen flex">
        <header className="w-20 xl:w-64 h-full flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-[#2F3336] overflow-y-auto hidden sm:flex z-50">
          <div className="flex flex-col items-center xl:items-start space-y-4 w-full">
            <Link
              href="/feed"
              className="p-3 mb-2 rounded-full hover:bg-primary/10 transition-colors cursor-pointer w-fit self-center xl:self-start"
            >
              <span className="text-primary font-black text-2xl tracking-tighter">
                <span className="xl:hidden">
                  V<span className="text-[#2DD0B3]">.</span>
                </span>
                <span className="hidden xl:inline">
                  VOICE<span className="text-[#2DD0B3]">.</span>
                </span>
              </span>
            </Link>
            <nav className="space-y-2 w-full flex flex-col items-center xl:items-start">
              <SidebarLink icon={Home} label="Home" href="/feed" />
              <SidebarLink icon={Hash} label="Explore" href="/explore" />
              <SidebarLink
                icon={Bell}
                label="Notifications"
                badge
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" active href="/profile" />
              <SidebarLink icon={Settings} label="Settings" href="/settings" />
            </nav>
          </div>
          <div className="flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-secondary dark:hover:bg-[#16181C] transition-colors cursor-pointer w-fit xl:w-full mt-4 mx-auto xl:mx-0">
            <div className="flex items-center gap-3">
              <img
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-border"
                src={user?.avatar}
              />
              <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
                <span className="font-bold text-sm truncate">{user?.name}</span>
                <span className="text-muted-foreground text-sm truncate">
                  {user?.handle}
                </span>
              </div>
            </div>
            <MoreHorizontal className="hidden xl:block w-4 h-4 text-muted-foreground" />
          </div>
        </header>

        <main className="flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-background dark:bg-backgroundBlur/80  backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336] px-4 py-1 flex items-center gap-6 hidden sm:flex">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold leading-tight">{user?.name}</h2>
              <span className="text-xs text-muted-foreground">12 VOICEs</span>
            </div>
          </div>

          <div className="relative">
            <div className="h-32 sm:h-48 w-full bg-muted overflow-hidden">
              <img
                src={displayCover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 relative pb-4">
              <div className="flex justify-between items-start">
                <div className="relative -mt-12 sm:-mt-16 mb-2">
                  <div className="border-4 border-background rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 bg-background shadow-sm">
                    <img
                      src={user?.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="border border-border hover:bg-secondary rounded-full p-2 h-fit transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <button className="border border-border hover:bg-secondary font-bold px-4 py-2 rounded-full text-sm transition-colors h-fit">
                        Edit profile
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] p-0 gap-0 border-none overflow-hidden max-h-[90vh] flex flex-col">
                      <DialogHeader className="px-4 h-14 flex flex-row items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-none">
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="p-1 hover:bg-secondary rounded-full transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <DialogTitle className="text-xl font-bold">
                            Edit profile
                          </DialogTitle>
                        </div>
                        <button
                          onClick={handleSaveProfile}
                          className="bg-foreground text-background font-bold px-4 py-1.5 rounded-full text-sm hover:opacity-90 transition-opacity"
                        >
                          Save
                        </button>
                      </DialogHeader>

                      <div className="overflow-y-auto flex-1 no-scrollbar">
                        <input
                          type="file"
                          className="hidden"
                          ref={avatarInputRef}
                          onChange={(e) => handleImageUpload(e, "avatar")}
                          accept="image/*"
                        />
                        <input
                          type="file"
                          className="hidden"
                          ref={coverInputRef}
                          onChange={(e) => handleImageUpload(e, "cover")}
                          accept="image/*"
                        />

                        <div className="relative h-48 w-full bg-muted">
                          <img
                            src={editCover}
                            alt="Edit Cover"
                            className="w-full h-full object-cover opacity-70"
                          />
                          <div className="absolute inset-0 flex items-center justify-center gap-4">
                            <button
                              onClick={() => coverInputRef.current?.click()}
                              className="p-3 bg-black/50 text-white rounded-full hover:bg-black/40 transition-colors"
                            >
                              <Camera className="w-6 h-6" />
                            </button>
                          </div>
                        </div>

                        <div className="px-4 relative">
                          <div className="relative -mt-12 mb-4">
                            <div className="border-4 border-background rounded-full overflow-hidden w-28 h-28 bg-muted relative group">
                              <img
                                src={editAvatar}
                                alt="Edit Avatar"
                                className="w-full h-full object-cover opacity-70"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                  onClick={() =>
                                    avatarInputRef.current?.click()
                                  }
                                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/40 transition-colors"
                                >
                                  <Camera className="w-6 h-6" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6 pb-8">
                            <div className="space-y-1.5 px-1">
                              <Label className="text-xs text-muted-foreground ml-2 font-bold uppercase tracking-wider">
                                Name
                              </Label>
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="h-14 bg-transparent border-border focus:ring-1 focus:ring-primary text-base px-4"
                              />
                            </div>
                            <div className="space-y-1.5 px-1">
                              <Label className="text-xs text-muted-foreground ml-2 font-bold uppercase tracking-wider">
                                Bio
                              </Label>
                              <Textarea
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                className="min-h-[100px] bg-transparent border-border focus:ring-1 focus:ring-primary text-base px-4 py-3 resize-none"
                              />
                            </div>
                            <div className="space-y-1.5 px-1">
                              <Label className="text-xs text-muted-foreground ml-2 font-bold uppercase tracking-wider">
                                Location
                              </Label>
                              <Input
                                value={editLocation}
                                onChange={(e) =>
                                  setEditLocation(e.target.value)
                                }
                                className="h-14 bg-transparent border-border focus:ring-1 focus:ring-primary text-base px-4"
                              />
                            </div>
                            <div className="space-y-1.5 px-1">
                              <Label className="text-xs text-muted-foreground ml-2 font-bold uppercase tracking-wider">
                                Website
                              </Label>
                              <Input
                                value={editWebsite}
                                onChange={(e) => setEditWebsite(e.target.value)}
                                className="h-14 bg-transparent border-border focus:ring-1 focus:ring-primary text-base px-4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="mt-2 space-y-3">
                <div className="flex flex-col">
                  <h1 className="text-xl font-black flex items-center gap-1.5">
                    {user?.name}
                    <VerifiedBadge isMe={isCreator} className="w-5 h-5" />
                  </h1>
                  <p className="text-muted-foreground text-sm leading-none mt-0.5">
                    {user?.handle}
                  </p>
                </div>

                <p className="text-sm leading-normal mt-2">{user?.bio}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href="#" className="text-primary hover:underline">
                      {user?.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined June 2023</span>
                  </div>
                </div>

                <div className="flex gap-4 text-sm pt-2">
                  <Link
                    href="/profile/following"
                    className="flex gap-1 hover:underline cursor-pointer"
                  >
                    <span className="font-bold">482</span>
                    <span className="text-muted-foreground">Following</span>
                  </Link>
                  <Link
                    href="/profile/followers"
                    className="flex gap-1 hover:underline cursor-pointer"
                  >
                    <span className="font-bold">1.2K</span>
                    <span className="text-muted-foreground">Followers</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border dark:border-[#2F3336]">
            <ProfileTab
              label="VOICEs"
              active={activeTab === "posts"}
              onClick={() => setActiveTab("posts")}
            />
            <ProfileTab
              label="Replies"
              active={activeTab === "replies"}
              onClick={() => setActiveTab("replies")}
            />
            <ProfileTab
              label="Media"
              active={activeTab === "media"}
              onClick={() => setActiveTab("media")}
            />
            <ProfileTab
              label="Likes"
              active={activeTab === "likes"}
              onClick={() => setActiveTab("likes")}
            />
          </div>

          <div className="pb-20">
            {dummyPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="p-4 border-b border-border hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3"
              >
                <img
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  src={user?.avatar}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-bold">{user?.name}</span>
                    <span className="text-muted-foreground">
                      {user?.handle} · {post.timestamp}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{post.content}</p>
                  {post.image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-border">
                      <img
                        src={post.image}
                        alt="Content"
                        className="w-full h-auto max-h-80 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="w-[350px] hidden lg:block h-screen sticky top-0 px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary w-4 h-4" />
            <input
              className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary text-sm placeholder-muted-foreground outline-none"
              placeholder="Search VOICE"
              type="text"
            />
          </div>

          <div className="bg-secondary dark:bg-[#16181C] rounded-2xl border border-border dark:border-[#2F3336] pt-3">
            <h3 className="font-extrabold text-xl px-4 mb-3">Who to follow</h3>
            {followSuggestions.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Link href={`/profile/${person.handle.replace("@", "")}`}>
                    <img
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                      src={person.avatar}
                    />
                  </Link>
                  <div className="flex flex-col min-w-0">
                    <Link
                      href={`/profile/${person.handle.replace("@", "")}`}
                      className="font-bold text-sm hover:underline truncate"
                    >
                      {person.name}
                    </Link>
                    <span className="text-xs text-muted-foreground truncate">
                      {person.handle}
                    </span>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfileTab({
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
        "flex-1 py-4 text-sm font-bold hover:bg-secondary dark:hover:bg-white/5 transition-colors relative",
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
