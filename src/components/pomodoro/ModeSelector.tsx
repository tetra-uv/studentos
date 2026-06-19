import { clsx } from "clsx";
import { PomodoroMode } from "../../types/pomodoroMode";

interface ModeSelectorProps {
  mode: PomodoroMode;
  onChange: (mode: PomodoroMode) => void;
}

const MODES: { value: PomodoroMode; label: string }[] = [
  { value: PomodoroMode.FOCUS, label: "Focus" },
  { value: PomodoroMode.BREAK, label: "Break" },
];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1" role="tablist" aria-label="Timer mode">
      {MODES.map((m) => (
        <button
          key={m.value}
          role="tab"
          aria-selected={mode === m.value}
          onClick={() => onChange(m.value)}
          className={clsx(
            "flex-1 rounded-full px-5 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary",
            mode === m.value
              ? "bg-card text-muted-foreground shadow-sm"
              : "text-muted-foreground hover:text-muted-foreground dark:hover:text-muted-foreground"
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
