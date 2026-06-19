import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              autoFocus
              className="flex h-14 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400 text-slate-900 dark:text-slate-50"
              placeholder="Type a command or search..."
              aria-label="Search input"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            {/* Future search results will go here */}
            <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Search results will appear here...
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
