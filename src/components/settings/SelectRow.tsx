import { clsx } from "clsx";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectRowProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
}

export function SelectRow({ label, description, value, onChange, options, disabled }: SelectRowProps) {
  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3",
        disabled && "opacity-50"
      )}
    >
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        {description && (
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full sm:w-auto min-w-[120px] rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
