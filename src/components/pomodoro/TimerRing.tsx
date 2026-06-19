import { PomodoroMode } from "../../types/pomodoroMode";
import { formatTime } from "../../utils/pomodoro";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MODE_COLORS: Record<PomodoroMode, string> = {
  [PomodoroMode.FOCUS]: "#3b82f6",  // blue-500
  [PomodoroMode.BREAK]: "#10b981",  // emerald-500
};

const MODE_LABELS: Record<PomodoroMode, string> = {
  [PomodoroMode.FOCUS]: "Focus",
  [PomodoroMode.BREAK]: "Break",
};

interface TimerRingProps {
  timeRemaining: number;
  sessionTotal: number;
  mode: PomodoroMode;
}

/**
 * TimerRing — circular SVG countdown display.
 * Uses stroke-dashoffset to animate progress. Fully stateless.
 */
export function TimerRing({ timeRemaining, sessionTotal, mode }: TimerRingProps) {
  const progress = sessionTotal > 0 ? timeRemaining / sessionTotal : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const color = MODE_COLORS[mode];

  return (
    <div className="relative flex items-center justify-center select-none" aria-label={`${MODE_LABELS[mode]} timer: ${formatTime(timeRemaining)} remaining`}>
      <svg
        width="220"
        height="220"
        viewBox="0 0 200 200"
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          className="stroke-slate-100 dark:stroke-slate-800"
          strokeWidth="10"
        />
        {/* Progress arc */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className="text-5xl font-semibold tabular-nums tracking-tight text-muted-foreground">
          {formatTime(timeRemaining)}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {MODE_LABELS[mode]}
        </span>
      </div>
    </div>
  );
}
