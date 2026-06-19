import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Logo } from "../ui/Logo";
import { MobileDrawer } from "./MobileDrawer";
import { CommandPalette } from "../ui/CommandPalette";
import { UserProfileDropdown } from "../user/UserProfileDropdown";
import { NotificationsDropdown } from "./NotificationsDropdown";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border bg-surface-header px-4 flex items-center justify-between shrink-0 md:h-16 md:px-8">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors"
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
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground text-sm hover:bg-accent hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 hover:scale-[1.02] focus:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              document.dispatchEvent(event);
            }}
            aria-label="Search Command Palette"
          >
            <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="group-hover:text-foreground transition-colors">Search...</span>
            <kbd className="hidden md:inline-flex items-center gap-1 font-sans text-xs border border-border rounded px-1.5 ml-2 bg-muted group-hover:border-primary/30 transition-colors">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </button>
          
          <NotificationsDropdown />

          {/* User Profile Dropdown - Mobile Only */}
          <div className="md:hidden">
            <UserProfileDropdown variant="header" />
          </div>
        </div>
      </header>
      
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <CommandPalette />
    </>
  );
}


