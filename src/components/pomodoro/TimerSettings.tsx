import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PomodoroSettings } from "../../types/pomodoroSettings";

interface TimerSettingsProps {
  settings: PomodoroSettings;
  onChange: (updates: Partial<PomodoroSettings>) => void;
}

const INPUT_CLASS =
  "w-20 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-center dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400";

export function TimerSettings({ settings, onChange }: TimerSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
        aria-expanded={isOpen}
      >
        <span>Settings</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-4 py-4 flex flex-col gap-4">
          {/* Duration controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pom-focus" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Focus (min)
              </label>
              <input
                id="pom-focus"
                type="number"
                min={1}
                max={90}
                value={settings.focusMinutes}
                onChange={(e) => {
                  const v = Math.min(90, Math.max(1, Number(e.target.value)));
                  if (!isNaN(v)) onChange({ focusMinutes: v });
                }}
                className={INPUT_CLASS}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pom-break" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Break (min)
              </label>
              <input
                id="pom-break"
                type="number"
                min={1}
                max={30}
                value={settings.breakMinutes}
                onChange={(e) => {
                  const v = Math.min(30, Math.max(1, Number(e.target.value)));
                  if (!isNaN(v)) onChange({ breakMinutes: v });
                }}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-sm text-slate-700 dark:text-slate-300">Auto-start break</span>
              <input
                type="checkbox"
                checked={settings.autoStartBreak}
                onChange={(e) => onChange({ autoStartBreak: e.target.checked })}
                className="h-4 w-4 rounded focus:ring-slate-400"
              />
            </label>
            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="text-sm text-slate-700 dark:text-slate-300">Completion sound</span>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onChange({ soundEnabled: e.target.checked })}
                className="h-4 w-4 rounded focus:ring-slate-400"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
