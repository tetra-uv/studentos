import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Logo } from "../ui/Logo";
import { MobileDrawer } from "./MobileDrawer";
import { CommandPalette } from "../ui/CommandPalette";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0 dark:border-slate-800 dark:bg-slate-900 md:h-16 md:px-8">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
        </div>
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              document.dispatchEvent(event);
            }}
            aria-label="Search Command Palette"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="hidden md:inline-flex items-center gap-1 font-sans text-xs border border-slate-200 dark:border-slate-700 rounded px-1.5 ml-2 bg-white dark:bg-slate-800">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </button>
          
          {/* Actions placeholder */}
          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </header>
      
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <CommandPalette />
    </>
  );
}


