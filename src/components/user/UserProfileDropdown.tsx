import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User as UserIcon, 
  Palette, 
  Settings, 
  Command, 
  Download, 
  LogOut, 
  LogIn,
  ChevronDown
} from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useAppStore } from "../../store/appStore";
import { UserAvatar } from "./UserAvatar";
import { APP_ROUTES } from "../../config/routes";
import { clsx } from "clsx";

export function UserProfileDropdown({ variant = "header" }: { variant?: "header" | "sidebar" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useUserStore();
  const { settings, updateSettings } = useAppStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = settings.theme === "dark" ? "light" : "dark";
    updateSettings({ theme: newTheme });
  };

  if (!profile) return null;

  const menuItems = [
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Profile",
      subtitle: "Coming soon",
      action: () => navigate("/profile"), // Will route to local profile edit
      disabled: false,
    },
    {
      icon: <Palette className="w-4 h-4" />,
      label: "Theme",
      subtitle: settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1),
      action: toggleTheme,
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
      action: () => {
        navigate(APP_ROUTES.SETTINGS);
        setIsOpen(false);
      },
    },
    {
      icon: <Command className="w-4 h-4" />,
      label: "Keyboard shortcuts",
      action: () => {
        document.dispatchEvent(new Event('show-keyboard-shortcuts'));
        setIsOpen(false);
      },
    },
    {
      icon: <Download className="w-4 h-4" />,
      label: "Install App",
      action: () => {
        // PWA install trigger (if supported, handled elsewhere)
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
          variant === "header" 
            ? "flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl border border-transparent hover:bg-muted/50"
            : "flex items-center justify-between w-full p-2 rounded-xl bg-card border border-border hover:border-border-strong shadow-sm hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-2">
          <UserAvatar user={profile} size={variant === "header" ? "sm" : "md"} />
          <div className={clsx(
            "flex flex-col text-left",
            variant === "header" ? "hidden sm:flex items-start" : "flex items-start"
          )}>
            <span className={clsx("font-semibold text-foreground leading-none mb-1 truncate", variant === "header" ? "text-sm" : "text-sm")}>
              {profile.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground leading-none truncate">
              {profile.subtitle}
            </span>
          </div>
        </div>
        <ChevronDown className={clsx(
          "text-muted-foreground transition-transform duration-200", 
          variant === "header" ? "w-3 h-3 hidden sm:block ml-1" : "w-4 h-4",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: variant === "header" ? 8 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: variant === "header" ? 4 : -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={clsx(
              "absolute mt-2 w-64 rounded-2xl border dark:border-border border-border-strong bg-card/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden z-50",
              variant === "header" ? "right-0 origin-top-right" : "left-0 bottom-full mb-2 origin-bottom-left"
            )}
          >
            {/* Header Area inside Dropdown */}
            <div className="p-4 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-3">
                <UserAvatar user={profile} size="lg" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">
                    {profile.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {profile.isGuest ? "Local Guest Account" : profile.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="p-2 flex flex-col gap-0.5">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  disabled={item.disabled}
                  className="flex items-center justify-between w-full p-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.subtitle && (
                    <span className="text-xs text-muted-foreground font-normal">
                      {item.subtitle}
                    </span>
                  )}
                </button>
              ))}

              <div className="h-px bg-border/50 my-1 mx-2" />

              {profile.isGuest ? (
                <button
                  className="flex items-center gap-3 w-full p-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In (Soon)</span>
                </button>
              ) : (
                <button
                  className="flex items-center gap-3 w-full p-2 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
