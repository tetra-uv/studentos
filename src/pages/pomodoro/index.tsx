import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { TimerRing } from "../../components/pomodoro/TimerRing";
import { TimerControls } from "../../components/pomodoro/TimerControls";
import { ModeSelector } from "../../components/pomodoro/ModeSelector";
import { SessionHistory } from "../../components/pomodoro/SessionHistory";
import { usePomodoroStore } from "../../store/pomodoroStore";
import { usePomodoro } from "../../hooks/usePomodoro";
import { getTodayFocusMinutes, getTodayFocusCount } from "../../utils/pomodoro";

export default function PomodoroPage() {
  const { sessions, settings, addSession, clearHistory } = usePomodoroStore();
  const { timeRemaining, sessionTotal, isRunning, mode, start, pause, reset, changeMode } =
    usePomodoro(settings, (completedMode, durationMinutes) => {
      addSession(completedMode, durationMinutes);
    });

  const focusMinutesToday = getTodayFocusMinutes(sessions);
  const focusCountToday = getTodayFocusCount(sessions);

  return (
    <Container>
      <PageHeader
        title="Pomodoro"
        description="Stay focused with timed work and break sessions."
      />

      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {/* Mode switcher */}
        <ModeSelector mode={mode} onChange={changeMode} />

        {/* Timer centrepiece */}
        <div className="flex flex-col items-center gap-6 py-4">
          <TimerRing
            timeRemaining={timeRemaining}
            sessionTotal={sessionTotal}
            mode={mode}
          />
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </div>

        {/* Daily stats */}
        <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col items-center gap-0.5 py-4">
            <p className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
              {focusCountToday}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">sessions today</p>
          </div>
          <div className="flex flex-col items-center gap-0.5 py-4">
            <p className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-slate-50">
              {focusMinutesToday}
              <span className="text-base font-normal text-slate-500 dark:text-slate-400 ml-1">min</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">focus today</p>
          </div>
        </div>

        {/* Session history */}
        <SessionHistory sessions={sessions} onClear={clearHistory} />
      </div>
    </Container>
  );
}
