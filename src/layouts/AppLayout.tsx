import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { BottomNav } from "../components/navigation/BottomNav";
import { MainContent } from "./MainContent";
import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-slate-200 dark:selection:bg-slate-800">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full relative">
        <Header />
        <MainContent>
          {children}
        </MainContent>
        <BottomNav />
      </div>
    </div>
  );
}


