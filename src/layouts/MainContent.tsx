import type { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 overflow-y-auto bg-muted">
      <div className="py-6 md:py-8 min-h-full">
        {children}
      </div>
    </main>
  );
}


