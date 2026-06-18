import { clsx } from "clsx";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className }: ProgressBarProps) {
  // Ensure percentage stays between 0 and 100 for the width calculation
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", className)}>
      <div
        className="h-full bg-slate-900 transition-all duration-300 ease-in-out dark:bg-slate-50"
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  );
}
