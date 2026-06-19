import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { BottomNav } from "../components/navigation/BottomNav";
import { MainContent } from "./MainContent";
import { PageTransition } from "../components/layout/PageTransition";
import { KeyboardShortcutsModal } from "../components/ui/KeyboardShortcutsModal";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle shortcuts modal with '?'
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        setShowShortcuts(true);
      }
    };
    
    // Also listen for custom event dispatched from dropdown
    const handleShowShortcuts = () => setShowShortcuts(true);

    window.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("show-keyboard-shortcuts", handleShowShortcuts);
    
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("show-keyboard-shortcuts", handleShowShortcuts);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-muted-foreground selection:bg-primary/20 dark:selection:bg-primary/20">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full relative">
        <Header />
        <MainContent>
          <PageTransition>
            {children}
          </PageTransition>
        </MainContent>
        <BottomNav />
        <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      </div>
    </div>
  );
}
