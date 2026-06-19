import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "relative p-2 rounded-lg text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
          isOpen ? "bg-muted text-foreground" : "hover:bg-muted/50 hover:text-foreground"
        )}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 rounded-2xl border dark:border-border border-border-strong bg-card/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden z-50 origin-top-right"
          >
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                Mark all as read
              </button>
            </div>

            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">You're all caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">No notifications yet.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
