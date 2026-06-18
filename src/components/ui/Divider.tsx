import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Divider = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={clsx("shrink-0 bg-slate-200 dark:bg-slate-800 h-[1px] w-full border-none", className)}
      {...props}
    />
  )
);
Divider.displayName = "Divider";



