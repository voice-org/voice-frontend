"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Hash,
  Bell,
  Mail,
  User,
  Settings as SettingsIcon,
  MoreHorizontal,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  Lock,
  Eye,
  BellRing,
  Palette,
  ArrowLeft,
  LogOut,
  Menu,
  Check,
} from "lucide-react";
import { appState } from "@/lib/dummy-data";
import { SidebarLink } from "@/components/shared/SidebarLink";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTheme, type AccentColor } from "@/components/theme-provider";

// Modularized Sections
import { AccountInfo } from "@/components/settings/sections/AccountInfo";
import { ChangePassword } from "@/components/settings/sections/ChangePassword";
import { SecuritySettings } from "@/components/settings/sections/SecuritySettings";
import { ActiveSessions } from "@/components/settings/sections/ActiveSessions";
import { AudienceSettings } from "@/components/settings/sections/AudienceSettings";
import { NotificationPreferences } from "@/components/settings/sections/NotificationPreferences";
import { DeactivateAccount } from "@/components/settings/sections/DeactivateAccount";
import { DownloadData } from "@/components/settings/sections/DownloadData";
import { SafetySettings } from "@/components/settings/sections/SafetySettings";
import { DMPrivacySettings } from "@/components/settings/sections/DMPrivacySettings";
import { ConnectedApps } from "@/components/settings/sections/ConnectedApps";
import { NotificationFilters } from "@/components/settings/sections/NotificationFilters";
import { SettingsFallback } from "@/components/settings/sections/SettingsFallback";

type SettingSection =
  | "account"
  | "security"
  | "privacy"
  | "notifications"
  | "display";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme, accentColor, setAccentColor } = useTheme();
  const [user, setUser] = useState<{
    name: string;
    handle: string;
    avatar: string;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<SettingSection>("account");
  const [navStack, setNavStack] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(!appState.hasInitialLoaded);
  const [isMobileDetail, setIsMobileDetail] = useState(false);

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

  const activeSubSection = navStack[navStack.length - 1] || null;

  const handleLogout = () => {
    localStorage.removeItem("voice_user");
    router.push("/");
  };

  const handleSectionChange = (section: SettingSection) => {
    setActiveSection(section);
    setNavStack([]);
    setIsMobileDetail(true);
  };

  const pushNav = (target: string) => {
    setNavStack((prev) => [...prev, target]);
  };

  const popNav = () => {
    setNavStack((prev) => prev.slice(0, -1));
  };

  const renderSubSectionContent = () => {
    switch (activeSubSection) {
      case "Account Information":
        return <AccountInfo user={user} />;
      case "Change Password":
        return <ChangePassword />;
      case "Two-factor authentication":
        return <SecuritySettings onNavigate={pushNav} />;
      case "Active Sessions":
        return <ActiveSessions />;
      case "Connected Apps":
        return <ConnectedApps />;
      case "Audience":
        return <AudienceSettings />;
      case "Safety":
        return <SafetySettings onNavigate={pushNav} />;
      case "DM Privacy":
        return <DMPrivacySettings />;
      case "Filters":
        return <NotificationFilters />;
      case "Preferences":
        return <NotificationPreferences />;
      case "Deactivate":
        return <DeactivateAccount user={user} />;
      case "Download Data":
        return <DownloadData />;
      default:
        if (activeSubSection) {
          return (
            <SettingsFallback
              title={activeSubSection}
              section={activeSection}
              onBack={popNav}
            />
          );
        }
        return null;
    }
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
    <div className="bg-background  text-foreground min-h-screen">
      {!isMobileDetail && (
        <div className="sm:hidden sticky top-0 bg-background dark:bg-backgroundBlur/80 backdrop-blur-md z-50 border-b border-border dark:border-white/10 px-4 py-3 flex items-center justify-between">
          <Link href="/feed">
            <span className="text-primary font-black text-xl tracking-tighter">
              VOICE<span className="text-[#2DD0B3]">.</span>
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1">
                <Menu className="w-6 h-6 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="p-4 space-y-4">
                <SidebarLink icon={Home} label="Home" href="/feed" />
                <SidebarLink icon={Hash} label="Explore" href="/explore" />
                <SidebarLink
                  icon={Bell}
                  label="Notifications"
                  href="/notifications"
                />
                <SidebarLink icon={Mail} label="Messages" href="/messages" />
                <SidebarLink icon={User} label="Profile" href="/profile" />
                <SidebarLink
                  icon={SettingsIcon}
                  label="Settings"
                  active
                  href="/settings"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="container mx-auto max-w-7xl h-screen flex">
        <header className="w-20 xl:w-64 h-full flex flex-col justify-between p-2 xl:px-4 xl:py-4 sticky top-0 border-r border-border dark:border-white/10 overflow-y-auto hidden sm:flex">
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
                href="/notifications"
              />
              <SidebarLink icon={Mail} label="Messages" href="/messages" />
              <SidebarLink icon={User} label="Profile" href="/profile" />
              <SidebarLink
                icon={SettingsIcon}
                label="Settings"
                active
                href="/settings"
              />
            </nav>
          </div>
          <div
            className="flex items-center p-3 rounded-full hover:bg-secondary dark:hover:bg-white/5 transition-colors cursor-pointer xl:w-full mt-4"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-3">
              <img
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-border"
                src={user?.avatar}
              />
              <div className="hidden xl:flex flex-col leading-tight overflow-hidden">
                <span className="font-bold text-sm truncate">{user?.name}</span>
                <span className="text-muted-foreground text-sm truncate">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <div
            className={cn(
              "flex-1 md:flex-none md:w-80 lg:w-[450px] border-r border-border dark:border-white/10  bg-background flex flex-col overflow-y-auto no-scrollbar",
              isMobileDetail ? "hidden md:flex" : "flex",
            )}
          >
            <div className="sticky top-0 bg-background dark:bg-backgroundBlur/80  backdrop-blur-md z-10 px-4 py-4 border-b border-border dark:border-white/10">
              <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <div className="py-2">
              <SectionItem
                id="account"
                icon={UserCircle}
                label="Your Account"
                description="Account info, password, deactivate"
                active={activeSection === "account"}
                onClick={() => handleSectionChange("account")}
              />
              <SectionItem
                id="security"
                icon={ShieldCheck}
                label="Security & Account Access"
                description="Security, apps and sessions"
                active={activeSection === "security"}
                onClick={() => handleSectionChange("security")}
              />
              <SectionItem
                id="privacy"
                icon={Eye}
                label="Privacy & Safety"
                description="Manage what you see and share"
                active={activeSection === "privacy"}
                onClick={() => handleSectionChange("privacy")}
              />
              <SectionItem
                id="notifications"
                icon={BellRing}
                label="Notifications"
                description="Choose which notifications you receive"
                active={activeSection === "notifications"}
                onClick={() => handleSectionChange("notifications")}
              />
              <SectionItem
                id="display"
                icon={Palette}
                label="Accessibility, Display & Languages"
                description="Manage display, color and more"
                active={activeSection === "display"}
                onClick={() => handleSectionChange("display")}
              />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-4 flex items-center gap-4 text-destructive hover:bg-destructive/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-bold text-sm">Logout</span>
              </button>
            </div>
          </div>

          <div
            className={cn(
              "flex-1 bg-background flex flex-col overflow-y-auto no-scrollbar",
              isMobileDetail ? "flex" : "hidden md:flex",
            )}
          >
            <div className="sticky top-0 bg-background dark:bg-backgroundBlur/80 backdrop-blur-md z-20 px-4 py-4 border-b border-border dark:border-white/10 flex items-center gap-4">
              <button
                onClick={() => {
                  if (navStack.length > 0) {
                    popNav();
                  } else {
                    setIsMobileDetail(false);
                  }
                }}
                className={cn(
                  "p-1 hover:bg-secondary rounded-full transition-colors",
                  !isMobileDetail && navStack.length === 0 && "hidden",
                )}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">
                {activeSubSection || (
                  <>
                    {activeSection === "account" && "Your Account"}
                    {activeSection === "security" && "Security"}
                    {activeSection === "privacy" && "Privacy & Safety"}
                    {activeSection === "notifications" && "Notifications"}
                    {activeSection === "display" && "Display"}
                  </>
                )}
              </h2>
            </div>

            <div className="flex-1 relative overflow-x-hidden">
              <div
                key={activeSubSection || activeSection}
                className="animate-in fade-in slide-in-from-right-4 duration-300 h-full"
              >
                {!activeSubSection ? (
                  <div className="space-y-1">
                    {activeSection === "account" && (
                      <>
                        <div className="px-4 py-6 text-sm text-muted-foreground">
                          See information about your account, download an
                          archive of your data, or learn about your account
                          deactivation options.
                        </div>
                        <SettingsAction
                          label="Account Information"
                          description="Review your username, email, and phone number"
                          onClick={() => pushNav("Account Information")}
                        />
                        <SettingsAction
                          label="Change your password"
                          description="Change your password at any time"
                          onClick={() => pushNav("Change Password")}
                        />
                        <SettingsAction
                          label="Download an archive of your data"
                          description="Get a copy of your VOICE data"
                          onClick={() => pushNav("Download Data")}
                        />
                        <SettingsAction
                          label="Deactivate your account"
                          description="Find out how you can deactivate your account"
                          variant="destructive"
                          onClick={() => pushNav("Deactivate")}
                        />
                      </>
                    )}

                    {activeSection === "security" && (
                      <>
                        <div className="px-4 py-6 text-sm text-muted-foreground">
                          Manage your account's security and keep track of your
                          account's usage including apps that you have connected
                          to your account.
                        </div>
                        <SettingsAction
                          label="Two-factor authentication"
                          description="Help protect your account from being accessed by others"
                          onClick={() => pushNav("Two-factor authentication")}
                        />
                        <SettingsAction
                          label="Connected apps"
                          description="Manage third-party apps connected to your account"
                          onClick={() => pushNav("Connected Apps")}
                        />
                        <SettingsAction
                          label="Sessions"
                          description="Manage your active sessions on other devices"
                          onClick={() => pushNav("Active Sessions")}
                        />
                      </>
                    )}

                    {activeSection === "privacy" && (
                      <>
                        <div className="px-4 py-6 text-sm text-muted-foreground">
                          Manage what information you allow other people on
                          VOICE to see.
                        </div>
                        <div className="px-4 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                          <div className="flex flex-col pr-4">
                            <span className="font-bold text-sm">
                              Protect your VOICEs
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Only show your posts to people who follow you
                            </span>
                          </div>
                          <Switch />
                        </div>
                        <SettingsAction
                          label="Audience and tagging"
                          description="Manage who can tag you in photos"
                          onClick={() => pushNav("Audience")}
                        />
                        <SettingsAction
                          label="Muted and blocked"
                          description="Manage the accounts you have muted or blocked"
                          onClick={() => pushNav("Safety")}
                        />
                        <SettingsAction
                          label="Direct Messages"
                          description="Control who can send you direct messages"
                          onClick={() => pushNav("DM Privacy")}
                        />
                      </>
                    )}

                    {activeSection === "notifications" && (
                      <>
                        <div className="px-4 py-6 text-sm text-muted-foreground">
                          Select the kinds of notifications you get about your
                          activities, interests, and recommendations.
                        </div>
                        <SettingsAction
                          label="Filters"
                          description="Choose which notifications you want to see"
                          onClick={() => pushNav("Filters")}
                        />
                        <SettingsAction
                          label="Preferences"
                          description="Select your preferences by notification type"
                          onClick={() => pushNav("Preferences")}
                        />
                        <div className="px-4 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                          <div className="flex flex-col pr-4">
                            <span className="font-bold text-sm">
                              Push Notifications
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Receive real-time updates
                            </span>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </>
                    )}

                    {activeSection === "display" && (
                      <div className="p-4 space-y-8">
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg">Appearance</h3>
                          <div className="p-6 rounded-2xl border border-border dark:border-white/10 bg-secondary/20 space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col pr-4">
                                <span className="font-bold text-sm">
                                  Dark Mode
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Enjoy a darker interface for low light
                                </span>
                              </div>
                              <Switch
                                checked={theme === "dark"}
                                onCheckedChange={toggleTheme}
                              />
                            </div>
                            <Separator className="bg-border/50" />
                            <div className="space-y-4">
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                Accent Color
                              </span>
                              <div className="flex flex-wrap gap-4">
                                <ColorOption
                                  color="violet"
                                  hex="#5A55F2"
                                  active={accentColor === "violet"}
                                  onClick={() => setAccentColor("violet")}
                                />
                                <ColorOption
                                  color="blue"
                                  hex="#3b82f6"
                                  active={accentColor === "blue"}
                                  onClick={() => setAccentColor("blue")}
                                />
                                <ColorOption
                                  color="green"
                                  hex="#10b981"
                                  active={accentColor === "green"}
                                  onClick={() => setAccentColor("green")}
                                />
                                <ColorOption
                                  color="orange"
                                  hex="#f97316"
                                  active={accentColor === "orange"}
                                  onClick={() => setAccentColor("orange")}
                                />
                                <ColorOption
                                  color="pink"
                                  hex="#ec4899"
                                  active={accentColor === "pink"}
                                  onClick={() => setAccentColor("pink")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  renderSubSectionContent()
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionItem({
  id,
  icon: Icon,
  label,
  description,
  active,
  onClick,
}: {
  id: string;
  icon: any;
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative",
        active ? "bg-primary/5 border-r-4 border-primary" : "",
      )}
    >
      <div className="flex items-center gap-4">
        <Icon
          className={cn(
            "w-5 h-5",
            active ? "text-primary" : "text-muted-foreground",
          )}
        />
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-bold text-sm",
              active ? "text-primary" : "text-foreground",
            )}
          >
            {label}
          </span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {description}
          </span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function SettingsAction({
  label,
  description,
  variant = "default",
  onClick,
}: {
  label: string;
  description: string;
  variant?: "default" | "destructive";
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors group"
    >
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-bold text-sm",
            variant === "destructive"
              ? "text-destructive"
              : "group-hover:text-primary",
          )}
        >
          {label}
        </span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}

function ColorOption({
  color,
  hex,
  active,
  onClick,
}: {
  color: AccentColor;
  hex: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
        active
          ? "ring-2 ring-primary ring-offset-4 ring-offset-background"
          : "hover:ring-2 hover:ring-primary/50",
      )}
      style={{ backgroundColor: hex }}
    >
      {active && <Check className="w-5 h-5 text-white" />}
    </button>
  );
}
