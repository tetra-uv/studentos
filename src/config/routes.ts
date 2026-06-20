export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  FEATURES: "/features",
  ROADMAP: "/roadmap",
  CHANGELOG: "/changelog",
  FAQ: "/faq",
  PRIVACY: "/privacy",
  CONTACT: "/contact",
} as const;

export const APP_ROUTES = {
  DASHBOARD: "/app",
  PROFILE: "/profile",
  ATTENDANCE: "/app/attendance",
  ASSIGNMENTS: "/app/assignments",
  HABITS: "/app/habits",
  TODO: "/app/todo",
  CALENDAR: "/app/calendar",
  POMODORO: "/app/pomodoro",
  SETTINGS: "/app/settings",
  LOGIN: "/login",
} as const;

export const LEGACY_ROUTES = {
  DASHBOARD: "/",
  ATTENDANCE: "/attendance",
  ASSIGNMENTS: "/assignments",
  HABITS: "/habits",
  POMODORO: "/pomodoro",
  SETTINGS: "/settings",
} as const;
