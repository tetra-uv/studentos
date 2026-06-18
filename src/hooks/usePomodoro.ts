import { useState, useEffect, useRef, useCallback } from "react";
import { PomodoroMode } from "../types/pomodoroMode";
import type { PomodoroSettings } from "../types/pomodoroSettings";
import { playCompletionTone } from "../utils/pomodoro";

interface UsePomodoroReturn {
  timeRemaining: number;
  sessionTotal: number;
  isRunning: boolean;
  mode: PomodoroMode;
  start: () => void;
  pause: () => void;
  reset: () => void;
  changeMode: (mode: PomodoroMode) => void;
}

function calcTotal(mode: PomodoroMode, settings: PomodoroSettings): number {
  return mode === PomodoroMode.FOCUS
    ? settings.focusMinutes * 60
    : settings.breakMinutes * 60;
}

/**
 * usePomodoro — custom hook encapsulating all timer logic.
 *
 * Timer state is intentionally NOT persisted. Refreshing the page resets
 * the timer. Only completed sessions are saved (via the store callback).
 */
export function usePomodoro(
  settings: PomodoroSettings,
  onSessionComplete: (mode: PomodoroMode, durationMinutes: number) => void
): UsePomodoroReturn {
  const [mode, setMode] = useState<PomodoroMode>(PomodoroMode.FOCUS);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTotal, setSessionTotal] = useState(() => calcTotal(PomodoroMode.FOCUS, settings));
  const [timeRemaining, setTimeRemaining] = useState(() => calcTotal(PomodoroMode.FOCUS, settings));

  // Stable refs — avoid stale closures inside effects
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const onCompleteRef = useRef(onSessionComplete);
  onCompleteRef.current = onSessionComplete;

  // Transition to a new mode, optionally auto-starting
  const switchMode = useCallback((nextMode: PomodoroMode, autoStart: boolean = false) => {
    const total = calcTotal(nextMode, settingsRef.current);
    setMode(nextMode);
    setSessionTotal(total);
    setTimeRemaining(total);
    setIsRunning(autoStart);
  }, []);

  // 1-second interval tick
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // Completion: fires when timeRemaining hits 0 while running
  useEffect(() => {
    if (timeRemaining !== 0 || !isRunning) return;
    setIsRunning(false);

    const s = settingsRef.current;
    const m = modeRef.current;

    if (s.soundEnabled) playCompletionTone();

    if (m === PomodoroMode.FOCUS) {
      onCompleteRef.current(PomodoroMode.FOCUS, s.focusMinutes);
      switchMode(PomodoroMode.BREAK, s.autoStartBreak);
    } else {
      // Break ended — reset to focus, do not auto-start
      switchMode(PomodoroMode.FOCUS, false);
    }
  }, [timeRemaining, isRunning, switchMode]);

  // Resync timer when settings change while not running
  const prevFocusRef = useRef(settings.focusMinutes);
  const prevBreakRef = useRef(settings.breakMinutes);
  useEffect(() => {
    const focusChanged = prevFocusRef.current !== settings.focusMinutes;
    const breakChanged = prevBreakRef.current !== settings.breakMinutes;
    prevFocusRef.current = settings.focusMinutes;
    prevBreakRef.current = settings.breakMinutes;

    if (!isRunning && (focusChanged || breakChanged)) {
      const total = calcTotal(modeRef.current, settings);
      setSessionTotal(total);
      setTimeRemaining(total);
    }
  }, [settings.focusMinutes, settings.breakMinutes, isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    const total = calcTotal(modeRef.current, settingsRef.current);
    setSessionTotal(total);
    setTimeRemaining(total);
  }, []);
  const changeMode = useCallback(
    (nextMode: PomodoroMode) => {
      setIsRunning(false);
      switchMode(nextMode);
    },
    [switchMode]
  );

  return { timeRemaining, sessionTotal, isRunning, mode, start, pause, reset, changeMode };
}
