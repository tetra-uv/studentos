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
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-sm text-center text-muted-foreground">
          No sessions completed yet. Start a focus session!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Sessions
        </p>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
        >
          Clear
        </button>
      </div>
      <ul className="divide-y divide-border">
        {recent.map((session) => {
          const isFocus = session.mode === PomodoroMode.FOCUS;
          return (
            <li key={session.id} className="flex items-center gap-3 px-4 py-3">
              <span className={isFocus ? "text-blue-500" : "text-emerald-500"} aria-hidden="true">
                {isFocus ? <Clock className="h-4 w-4" /> : <Coffee className="h-4 w-4" />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {isFocus ? "Focus" : "Break"} · {session.durationMinutes} min
                </p>
              </div>
              <p className="text-xs text-muted-foreground shrink-0 tabular-nums">
                {formatCompletedAt(session.completedAt)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
