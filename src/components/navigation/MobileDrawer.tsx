import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Settings, Download, X } from "lucide-react";
import { clsx } from "clsx";
import { Logo } from "../ui/Logo";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { APP_ROUTES } from "../../config/routes";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { isInstallable, promptInstall } = useInstallPrompt();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r border-border shadow-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex h-14 items-center justify-between px-4 border-b border-border">
              <Logo />
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-muted-foreground hover:text-muted-foreground dark:hover:text-muted-foreground rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {/* Other utility links could go here if we wanted */}
            </div>

            <div className="p-4 border-t border-border flex flex-col gap-1">
              {isInstallable && (
                <button
                  onClick={() => {
                    promptInstall();
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Download className="h-5 w-5" />
                  Install App
                </button>
              )}
              <NavLink
                to={APP_ROUTES.SETTINGS}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                    isActive
                      ? "bg-slate-200/50 text-muted-foreground dark:bg-slate-800/50 dark:text-muted-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-muted-foreground dark:hover:bg-accent dark:hover:text-muted-foreground"
                  )
                }
              >
                <Settings className="h-5 w-5" />
                Settings
              </NavLink>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
