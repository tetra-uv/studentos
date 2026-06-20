import { useState } from "react";
import { ChevronDown, ChevronUp, Settings2, MoonStar } from "lucide-react";
import type { PomodoroSettings } from "../../types/pomodoroSettings";
import { clsx } from "clsx";

interface TimerSettingsProps {
  settings: PomodoroSettings;
  onChange: (updates: Partial<PomodoroSettings>) => void;
}

const PRESETS = [
  { label: "25/5", focus: 25, break: 5 },
  { label: "50/10", focus: 50, break: 10 },
  { label: "90/20", focus: 90, break: 20 },
];

export function TimerSettings({ settings, onChange }: TimerSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const applyPreset = (focus: number, breakMin: number) => {
    onChange({ focusMinutes: focus, breakMinutes: breakMin });
  };

  const isCustom = !PRESETS.some(
    (p) => p.focus === settings.focusMinutes && p.break === settings.breakMinutes
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      >
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-muted-foreground" />
          <span>Timer Settings</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded bg-muted">
            {settings.focusMinutes} / {settings.breakMinutes}
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border p-5 flex flex-col gap-6">
          {/* Presets */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Presets</label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => {
                const active = p.focus === settings.focusMinutes && p.break === settings.breakMinutes;
                return (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p.focus, p.break)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                      active
                        ? "bg-primary/20 text-primary border-primary/50"
                        : "bg-muted border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
              <div
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                  isCustom
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "bg-muted border-transparent text-muted-foreground"
                )}
              >
                Custom
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Focus (min)</label>
              <input
                type="number"
                min={1} max={120}
                value={settings.focusMinutes}
                onChange={(e) => onChange({ focusMinutes: Number(e.target.value) || 25 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Break (min)</label>
              <input
                type="number"
                min={1} max={60}
                value={settings.breakMinutes}
                onChange={(e) => onChange({ breakMinutes: Number(e.target.value) || 5 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Long Break (min)</label>
              <input
                type="number"
                min={1} max={60}
                value={settings.longBreakMinutes}
                onChange={(e) => onChange({ longBreakMinutes: Number(e.target.value) || 15 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Sessions / Long Break</label>
              <input
                type="number"
                min={1} max={10}
                value={settings.sessionsBeforeLongBreak}
                onChange={(e) => onChange({ sessionsBeforeLongBreak: Number(e.target.value) || 4 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Daily Goal (Sessions)</label>
              <input
                type="number"
                min={1} max={20}
                value={settings.dailyGoal}
                onChange={(e) => onChange({ dailyGoal: Number(e.target.value) || 8 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Sound Volume</label>
              <input
                type="range"
                min={0} max={1} step={0.1}
                value={settings.volume}
                onChange={(e) => onChange({ volume: Number(e.target.value) })}
                className="w-full mt-2 accent-primary"
              />
            </div>
          </div>

          <div className="h-px bg-border/50" />

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Auto-start Breaks</span>
                <span className="text-xs text-muted-foreground">Timer starts automatically when focus ends</span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoStartBreak}
                onChange={(e) => onChange({ autoStartBreak: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary bg-background"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Auto-start Focus</span>
                <span className="text-xs text-muted-foreground">Timer starts automatically when break ends</span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoStartFocus}
                onChange={(e) => onChange({ autoStartFocus: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary bg-background"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Completion Sound</span>
                <span className="text-xs text-muted-foreground">Play a tone when the timer finishes</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onChange({ soundEnabled: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary bg-background"
              />
            </label>
            
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MoonStar className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">Deep Work Mode</span>
                  <span className="text-xs text-muted-foreground">Minimal visual distractions while focused</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.deepWorkMode}
                  onChange={(e) => onChange({ deepWorkMode: e.target.checked })}
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
