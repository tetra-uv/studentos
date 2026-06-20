export interface PomodoroSettings {
  focusMinutes: number;    // default 25
  breakMinutes: number;    // default 5
  longBreakMinutes: number; // default 15
  sessionsBeforeLongBreak: number; // default 4
  dailyGoal: number; // default 8 sessions
  autoStartBreak: boolean; // default false
  autoStartFocus: boolean; // default false
  soundEnabled: boolean;   // default false (OFF by default)
  soundSelection: string; // default 'bell'
  volume: number; // default 0.5
  deepWorkMode: boolean; // default false
}

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
  dailyGoal: 8,
  autoStartBreak: false,
  autoStartFocus: false,
  soundEnabled: false,
  soundSelection: 'bell',
  volume: 0.5,
  deepWorkMode: false,
};
