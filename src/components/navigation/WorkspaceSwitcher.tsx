import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { clsx } from "clsx";

export function WorkspaceSwitcher() {
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

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
    <div className="relative px-3 py-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 group"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary text-xs">
            {activeWorkspace.icon || activeWorkspace.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-foreground truncate">
            {activeWorkspace.name}
          </span>
        </div>
        <ChevronDown 
          className={clsx(
            "h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-3 right-3 top-full mt-1 rounded-xl border border-border-strong dark:border-border bg-card/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden z-50 origin-top"
          >
            <div className="p-1">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full p-2 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="opacity-70">{ws.icon || ws.name.charAt(0)}</span>
                    <span>{ws.name}</span>
                  </div>
                  {ws.id === activeWorkspaceId && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
              
              <div className="h-px bg-border/50 my-1 mx-1" />
              
              <button
                className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Plus className="h-4 w-4" />
                <span>Create Workspace</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
