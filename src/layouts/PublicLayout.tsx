import type { ReactNode } from "react";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { PublicFooter } from "../components/public/PublicFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-slate-200 dark:selection:bg-slate-800 font-sans">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
