import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { clsx } from "clsx";

const TABS = ['All', 'Assignments', 'Deadlines', 'Updates', 'Sync'];

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
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
          "relative p-2 rounded-lg text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-[0.98]",
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
            className="absolute right-0 mt-2 w-[360px] rounded-2xl border dark:border-border border-border-strong bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden z-50 origin-top-right flex flex-col"
          >
            <div className="p-4 pb-0 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Notifications</h3>
                <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors active:scale-[0.98]">
                  Mark all as read
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
                {TABS.map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      "relative pb-2 text-sm font-medium transition-colors whitespace-nowrap",
                      activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-12 flex flex-col items-center justify-center text-center bg-muted/10 h-64">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="w-24 h-24 mb-6 text-muted-foreground/30 dark:text-muted-foreground/20"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 8C26.804 8 8 26.804 8 50C8 73.196 26.804 92 50 92C73.196 92 92 73.196 92 50C92 26.804 73.196 8 50 8Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M30 50L45 65L70 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M75 75L85 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="30" r="4" fill="currentColor"/>
                  <circle cx="80" cy="30" r="3" fill="currentColor"/>
                  <circle cx="25" cy="75" r="2" fill="currentColor"/>
                </svg>
              </motion.div>
              <h4 className="text-lg font-bold text-foreground mb-1">You're all caught up.</h4>
              <p className="text-sm text-muted-foreground">No new updates right now.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
