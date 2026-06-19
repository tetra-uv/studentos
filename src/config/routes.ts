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
  ATTENDANCE: "/app/attendance",
  ASSIGNMENTS: "/app/assignments",
  HABITS: "/app/habits",
  POMODORO: "/app/pomodoro",
  SETTINGS: "/app/settings",
} as const;

export const LEGACY_ROUTES = {
  DASHBOARD: "/",
  ATTENDANCE: "/attendance",
  ASSIGNMENTS: "/assignments",
  HABITS: "/habits",
  POMODORO: "/pomodoro",
  SETTINGS: "/settings",
} as const;
