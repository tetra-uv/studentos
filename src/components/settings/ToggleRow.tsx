import { clsx } from "clsx";

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function ToggleRow({ label, description, checked, onChange, disabled }: ToggleRowProps) {
  return (
    <label
      className={clsx(
        "flex items-center justify-between gap-4 px-4 py-3 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        {description && (
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>
        )}
      </div>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-label={label}
        />
        <div
          className={clsx(
            "h-6 w-11 rounded-full transition-colors",
            checked ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
          )}
        />
        <div
          className={clsx(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </label>
  );
}
