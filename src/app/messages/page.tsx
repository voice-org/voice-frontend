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
  Search,
  Settings,
  Menu,
  MessageSquarePlus,
  ChevronLeft,
  Send,
  Image as ImageIcon,
  Smile,
  Info,
  Phone,
  Video,
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  X,
  Play,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  dummyConversations,
  type Conversation,
  appState,
} from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { IconButton } from "@/components/shared/IconButton";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

export default function MessagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);

  // Calling States
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Voice Message States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("voice_user");
    if (!savedUser) {
      router.push("/");
    } else {
      setUser(JSON.parse(savedUser));
      appState.hasInitialLoaded = true;
      setIsLoading(false);
    }
  }, [router]);

  // Voice recording logic (dummy)
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current)
        clearInterval(recordingIntervalRef.current);
    }
    return () => {
      if (recordingIntervalRef.current)
        clearInterval(recordingIntervalRef.current);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startCall = (type: "audio" | "video") => {
    setCallType(type);
    setIsCalling(true);
  };

  const endCall = () => {
    setIsCalling(false);
    setCallType(null);
    toast({
      title: "Call Ended",
      description: `The ${callType} call with ${selectedChat?.user.name} has ended.`,
    });
  };

  const handleSendVoice = () => {
    setIsRecording(false);
    toast({
      title: "Voice Message Sent",
      description: "Your voice message has been shared.",
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

  return (
    <div className="bg-background dark:bg-[#0F0F0F] text-foreground min-h-screen">
      {/* Global Calling Overlay - Shows over everything */}
      {isCalling && selectedChat && (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-between p-8 md:p-12 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
          {/* Background Blur Image */}
          <div className="absolute inset-0 z-0">
            <img
              alt="BG"
              className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
              src={selectedChat.user.avatar}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center mt-12 sm:mt-20">
            <div className="relative mb-8">
              <div className="absolute -inset-8 bg-primary/20 rounded-full animate-ping opacity-20 duration-1000"></div>
              <div className="absolute -inset-4 bg-primary/10 rounded-full animate-pulse opacity-30"></div>
              <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative">
                <img
                  alt="Caller"
                  className="w-full h-full object-cover"
                  src={selectedChat.user.avatar}
                />
                {callType === "video" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <video
                      className="w-full h-full object-cover grayscale opacity-50"
                      autoPlay
                      muted
                      loop
                    />
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              {selectedChat.user.name}
            </h3>
            <p className="text-primary text-lg sm:text-xl font-bold flex items-center gap-2 drop-shadow-md">
              {callType === "video" ? (
                <Video className="w-5 h-5" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
              {callType === "video"
                ? "VOICE Video Calling..."
                : "VOICE Calling..."}
            </p>
          </div>

          <div className="relative z-10 w-full max-w-md flex items-center justify-between gap-4 mb-8 sm:mb-16">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={cn(
                "p-6 rounded-full transition-all flex flex-col items-center gap-2",
                isMuted
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20",
              )}
            >
              {isMuted ? (
                <MicOff className="w-7 h-7" />
              ) : (
                <Mic className="w-7 h-7" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </button>

            <button
              onClick={endCall}
              className="p-8 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-all shadow-[0_0_50px_rgba(239,68,68,0.3)] active:scale-90 flex flex-col items-center gap-2"
            >
              <PhoneOff className="w-10 h-10" />
            </button>

            <button className="p-6 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all flex flex-col items-center gap-2">
              <Volume2 className="w-7 h-7" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Speaker
              </span>
            </button>
          </div>

          {callType === "video" && (
            <div className="absolute top-4 right-4 sm:top-10 sm:right-10 w-32 h-44 sm:w-40 sm:h-56 bg-black rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl z-20">
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/50 uppercase">
                  Your Camera
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto max-w-7xl h-screen flex relative overflow-hidden">
        {/* Sidebar Navigation */}
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
              <SidebarLink
                icon={Mail}
                label="Messages"
                active
                href="/messages"
              />
              <SidebarLink icon={User} label="Profile" href="/profile" />
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

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Conversation List Pane */}
          <main
            className={cn(
              "flex-1 max-w-2xl w-full border-r border-border dark:border-[#2F3336] min-h-screen overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out",
              selectedChat ? "hidden md:block md:w-80 lg:w-[400px]" : "block",
            )}
          >
            <div className="sticky top-0 bg-background/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md z-40 border-b border-border dark:border-[#2F3336]">
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-xl font-bold">Messages</h2>
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                  <MessageSquarePlus className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                </div>
              </div>
              <div className="px-4 pb-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-2.5 pl-12 pr-4 text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Search Direct Messages"
                  />
                </div>
              </div>
            </div>

            <div className="pb-20">
              {dummyConversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  active={selectedChat?.id === conv.id}
                  onClick={() => setSelectedChat(conv)}
                />
              ))}
            </div>
          </main>

          {/* Chat Detail Pane */}
          <div
            className={cn(
              "fixed md:relative inset-0 md:flex-1 bg-background z-[60] md:z-10 flex flex-col transition-all duration-300 ease-in-out transform",
              "md:border-r border-border dark:border-[#2F3336]",
              selectedChat
                ? "translate-x-0 opacity-100"
                : "translate-x-full md:translate-x-0 opacity-0 md:opacity-100 md:hidden",
            )}
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border dark:border-[#2F3336] p-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden p-1 -ml-1 hover:bg-secondary rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 cursor-pointer">
                      <img
                        alt="Avatar"
                        className="w-8 h-8 rounded-full object-cover"
                        src={selectedChat.user.avatar}
                      />
                      <div className="flex flex-col leading-none">
                        <span className="font-bold text-sm hover:underline">
                          {selectedChat.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {selectedChat.user.handle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <button
                      onClick={() => startCall("audio")}
                      className="p-2 hover:bg-secondary hover:text-primary rounded-full transition-all"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => startCall("video")}
                      className="p-2 hover:bg-secondary hover:text-primary rounded-full transition-all"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-secondary hover:text-primary rounded-full transition-all">
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </header>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar relative">
                  <div className="flex flex-col items-center py-8 border-b border-border mb-4 text-center">
                    <img
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover mb-2"
                      src={selectedChat.user.avatar}
                    />
                    <h3 className="font-black text-lg">
                      {selectedChat.user.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedChat.user.handle}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Joined December 2021 · 1.2M Followers
                    </p>
                  </div>

                  {/* Dummy Chat History */}
                  <div className="flex justify-start">
                    <div className="bg-secondary dark:bg-[#16181C] p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm leading-relaxed">
                      {selectedChat.lastMessage}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-md leading-relaxed">
                      Hey! Thanks for reaching out. Let's talk about the summit
                      details.
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <footer className="p-3 border-t border-border dark:border-[#2F3336] flex items-center gap-2 bg-background relative">
                  {isRecording ? (
                    <div className="flex-1 flex items-center gap-4 bg-secondary dark:bg-[#16181C] rounded-full px-4 py-2 animate-in slide-in-from-bottom-2">
                      <div className="w-2 h-2 rounded-full bg-destructive animate-pulse"></div>
                      <span className="text-sm font-bold text-destructive">
                        Recording {formatTime(recordingTime)}
                      </span>
                      <div className="flex-1 flex items-center gap-1 justify-center">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3].map((h, i) => (
                          <div
                            key={i}
                            className="w-1 bg-primary rounded-full animate-bounce"
                            style={{
                              height: `${h * 3}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                      <button
                        onClick={() => setIsRecording(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSendVoice}
                        className="bg-primary text-white p-2 rounded-full shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center text-primary">
                        <IconButton icon={ImageIcon} />
                        <IconButton icon={Smile} />
                        <button
                          onClick={() => setIsRecording(true)}
                          className="p-2 hover:bg-primary/10 transition-colors rounded-full text-primary"
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          className="w-full bg-secondary dark:bg-[#16181C] border-none rounded-full py-2.5 px-4 text-sm outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Start a new message"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            messageText.trim() &&
                            (setMessageText(""),
                            toast({
                              title: "Sent",
                              description: "Message delivered.",
                            }))
                          }
                        />
                      </div>
                      <button
                        disabled={!messageText.trim()}
                        onClick={() => (
                          setMessageText(""),
                          toast({
                            title: "Sent",
                            description: "Message delivered.",
                          })
                        )}
                        className={cn(
                          "p-2.5 rounded-full transition-colors",
                          messageText.trim()
                            ? "bg-primary text-white shadow-lg"
                            : "text-primary opacity-50 cursor-not-allowed",
                        )}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </footer>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black mb-2 tracking-tighter">
                  Select a message
                </h2>
                <p className="text-muted-foreground max-w-sm mb-8 text-lg">
                  Choose from your existing conversations, or start a new one to
                  connect.
                </p>
                <button className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition-all shadow-xl active:scale-95 text-lg">
                  New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex gap-3 px-4 py-4 border-b border-border dark:border-[#2F3336] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors relative",
        active ? "border-r-4 border-r-primary bg-primary/5" : "",
      )}
    >
      <div className="relative flex-shrink-0">
        <img
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover border border-border"
          src={conversation.user.avatar}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-bold text-sm truncate">
              {conversation.user.name}
            </span>
            {conversation.user.verified && (
              <VerifiedBadge isMe={conversation.user.handle === "@johndoe"} />
            )}
            <span className="text-muted-foreground text-xs truncate ml-1">
              {conversation.user.handle}
            </span>
            <span className="text-muted-foreground text-xs flex-shrink-0">
              · {conversation.timestamp}
            </span>
          </div>
          {conversation.unreadCount && !active && (
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
          )}
        </div>
        <p
          className={cn(
            "text-sm truncate mt-0.5 leading-snug",
            conversation.unreadCount && !active
              ? "font-bold text-foreground"
              : "text-muted-foreground",
          )}
        >
          {conversation.lastMessage}
        </p>
      </div>
    </div>
  );
}
