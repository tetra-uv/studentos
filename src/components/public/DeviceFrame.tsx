import type { ReactNode } from "react";
import { clsx } from "clsx";

interface DeviceFrameProps {
  children: ReactNode;
  type?: "desktop" | "mobile";
  className?: string;
}

export function DeviceFrame({ children, type = "desktop", className }: DeviceFrameProps) {
  if (type === "mobile") {
    return (
      <div className={clsx(
        "relative mx-auto border-border border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl bg-card overflow-hidden",
        className
      )}>
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
          <div className="w-32 h-6 bg-muted rounded-b-2xl border-x border-b border-border/50"></div>
        </div>
        <div className="w-full h-full pt-8 overflow-hidden rounded-[2rem] bg-background">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      "relative mx-auto w-full max-w-5xl rounded-xl border border-border/60 bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden",
      className
    )}>
      {/* Browser Header */}
      <div className="flex h-12 items-center gap-2 border-b border-border/60 bg-background/50 px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400/80" />
          <div className="h-3 w-3 rounded-full bg-amber-400/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-md items-center justify-center rounded-md bg-card border border-border text-[11px] text-muted-foreground font-medium">
          studentos.com
        </div>
        <div className="w-12"></div> {/* Spacer for symmetry */}
      </div>
      {/* Browser Body */}
      <div className="relative w-full overflow-hidden bg-background aspect-[16/10] sm:aspect-video">
        {children}
      </div>
    </div>
  );
}
