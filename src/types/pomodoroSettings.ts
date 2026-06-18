export interface PomodoroSettings {
  focusMinutes: number;    // default 25
  breakMinutes: number;    // default 5
  autoStartBreak: boolean; // default false
  soundEnabled: boolean;   // default false (OFF by default)
}

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  breakMinutes: 5,
  autoStartBreak: false,
  soundEnabled: false,
};
