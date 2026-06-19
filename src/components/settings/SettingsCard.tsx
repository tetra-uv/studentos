import type { ReactNode } from "react";

interface SettingsCardProps {
  children: ReactNode;
}

export function SettingsCard({ children }: SettingsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
      {children}
    </div>
  );
}
