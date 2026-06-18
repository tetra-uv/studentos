import { Clock, Coffee } from "lucide-react";
import { PomodoroMode } from "../../types/pomodoroMode";
import { formatCompletedAt } from "../../utils/pomodoro";
import type { PomodoroSession } from "../../types/pomodoroSession";

const SESSION_MAX = 10;

interface SessionHistoryProps {
  sessions: PomodoroSession[];
  onClear: () => void;
}

export function SessionHistory({ sessions, onClear }: SessionHistoryProps) {
  const recent = sessions.slice(0, SESSION_MAX);

  if (recent.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <p className="text-sm text-center text-slate-400 dark:text-slate-500">
          No sessions completed yet. Start a focus session!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recent Sessions
        </p>
        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
        >
          Clear
        </button>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {recent.map((session) => {
          const isFocus = session.mode === PomodoroMode.FOCUS;
          return (
            <li key={session.id} className="flex items-center gap-3 px-4 py-3">
              <span className={isFocus ? "text-blue-500" : "text-emerald-500"} aria-hidden="true">
                {isFocus ? <Clock className="h-4 w-4" /> : <Coffee className="h-4 w-4" />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {isFocus ? "Focus" : "Break"} · {session.durationMinutes} min
                </p>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 shrink-0 tabular-nums">
                {formatCompletedAt(session.completedAt)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
