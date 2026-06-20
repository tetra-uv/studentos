import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun, Monitor, Menu } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ShortcutItem = {
  keys: string[];
  description: string;
  icon?: React.ReactNode;
};

type ShortcutCategory = {
  category: string;
  items: ShortcutItem[];
};

const SHORTCUTS: ShortcutCategory[] = [
  {
    category: "Global",
    items: [
      { keys: ["⌘", "K"], description: "Open Command Palette" },
      { keys: ["?"], description: "Show Keyboard Shortcuts" },
      { keys: ["Esc"], description: "Close Modals" },
    ],
  },
  {
    category: "Theme",
    items: [
      { keys: ["T", "D"], description: "Toggle Dark Theme", icon: <Moon className="w-3 h-3" /> },
      { keys: ["T", "L"], description: "Toggle Light Theme", icon: <Sun className="w-3 h-3" /> },
      { keys: ["T", "S"], description: "Toggle System Theme", icon: <Monitor className="w-3 h-3" /> },
    ],
  },
  {
    category: "Navigation",
    items: [
      { keys: ["G", "Then", "D"], description: "Go to Dashboard" },
      { keys: ["G", "Then", "A"], description: "Go to Attendance" },
      { keys: ["G", "Then", "P"], description: "Go to Pomodoro" },
    ],
  },
];

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      
      // Toggle with '?'
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        if (!isOpen) {
          // You might need to dispatch an event to open it from outside if needed, 
          // but since this listens globally when mounted, it handles closing.
          // Opening is usually handled by the parent state.
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border-strong dark:border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Menu className="w-5 h-5 text-muted-foreground" />
                Keyboard Shortcuts
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-h-[60vh] overflow-y-auto">
              {SHORTCUTS.map((section) => (
                <div key={section.category}>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                          {item.description}
                        </span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, kIdx) => (
                            <div key={kIdx} className="flex items-center gap-1">
                              {kIdx > 0 && <span className="text-muted-foreground text-xs">+</span>}
                              <kbd className="flex h-6 min-w-[24px] items-center justify-center rounded-md border border-border bg-muted px-1.5 font-sans text-xs font-medium text-foreground shadow-sm">
                                {key}
                              </kbd>
                            </div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
