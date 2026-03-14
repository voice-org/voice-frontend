"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  ShieldCheck,
  Eye,
  BellRing,
  Palette,
  ArrowLeft,
  LogOut,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme, type AccentColor } from "@/components/theme-provider";
import { useUser } from "@/components/providers/UserProvider";

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
  const { user, setUser } = useUser();
  const [activeSection, setActiveSection] = useState<SettingSection>("account");
  const [navStack, setNavStack] = useState<string[]>([]);
  const [isMobileDetail, setIsMobileDetail] = useState(false);

  const activeSubSection = navStack[navStack.length - 1] || null;

  const handleLogout = () => {
    localStorage.removeItem("voice_user");
    setUser(null);
    router.push("/");
  };

  const handleSectionChange = (section: SettingSection) => {
    setActiveSection(section);
    setNavStack([]);
    setIsMobileDetail(true);
  };

  const pushNav = (target: string) => setNavStack((prev) => [...prev, target]);
  const popNav = () => setNavStack((prev) => prev.slice(0, -1));

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
        return activeSubSection ? (
          <SettingsFallback
            title={activeSubSection}
            section={activeSection}
            onBack={popNav}
          />
        ) : null;
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      <div
        className={cn(
          "flex-1 md:flex-none md:w-80 lg:w-[450px] border-r border-border dark:border-white/10 bg-background flex flex-col overflow-y-auto no-scrollbar",
          isMobileDetail ? "hidden md:flex" : "flex",
        )}
      >
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 px-4 py-4 border-b border-border dark:border-white/10 text-xl font-bold">
          Settings
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
          "flex-1 bg-background flex flex-col overflow-y-auto no-scrollbar transition-all duration-300",
          isMobileDetail ? "flex" : "hidden md:flex",
        )}
      >
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-20 px-4 py-4 border-b border-border dark:border-white/10 flex items-center gap-4">
          <button
            onClick={() =>
              navStack.length > 0 ? popNav() : setIsMobileDetail(false)
            }
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
                      See information about your account, download an archive of
                      your data, or learn about your account deactivation
                      options.
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
                      account's usage including apps that you have connected to
                      your account.
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
                      Manage what information you allow other people on VOICE to
                      see.
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
                            <span className="font-bold text-sm">Dark Mode</span>
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
                            {(
                              [
                                "violet",
                                "blue",
                                "green",
                                "orange",
                                "pink",
                              ] as const
                            ).map((c) => (
                              <ColorOption
                                key={c}
                                color={c}
                                hex={
                                  c === "violet"
                                    ? "#5A55F2"
                                    : c === "blue"
                                      ? "#3b82f6"
                                      : c === "green"
                                        ? "#10b981"
                                        : c === "orange"
                                          ? "#f97316"
                                          : "#ec4899"
                                }
                                active={accentColor === c}
                                onClick={() => setAccentColor(c)}
                              />
                            ))}
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
      <div className="flex items-center gap-4 text-balance">
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
