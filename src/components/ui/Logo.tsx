import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { BookOpen } from "lucide-react";

export const Logo = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx("flex items-center gap-2 text-slate-900 dark:text-slate-50 font-semibold", className)}
      {...props}
    >
      <BookOpen className="h-5 w-5" />
      <span>StudentOS</span>
    </div>
  )
);
Logo.displayName = "Logo";



