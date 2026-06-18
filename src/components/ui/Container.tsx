import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx("mx-auto w-full max-w-5xl px-4 md:px-8", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";



