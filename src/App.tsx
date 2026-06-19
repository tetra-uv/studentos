import { useEffect } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import AttendancePage from "./pages/attendance";
import AssignmentsPage from "./pages/assignments";
import HabitsPage from "./pages/habits";
import PomodoroPage from "./pages/pomodoro";
import SettingsPage from "./pages/settings";
import { useAppStore } from "./store/appStore";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import FeaturesPage from "./pages/public/FeaturesPage";
import RoadmapPage from "./pages/public/RoadmapPage";
import ChangelogPage from "./pages/public/ChangelogPage";
import FaqPage from "./pages/public/FaqPage";
import PrivacyPage from "./pages/public/PrivacyPage";
import ContactPage from "./pages/public/ContactPage";

// Routes config
import { PUBLIC_ROUTES, APP_ROUTES, LEGACY_ROUTES } from "./config/routes";

const WithAppLayout = ({ children }: { children: ReactNode }) => (
  <AppLayout>{children}</AppLayout>
);

const WithPublicLayout = ({ children }: { children: ReactNode }) => (
  <PublicLayout>{children}</PublicLayout>
);

function App() {
  const theme = useAppStore((state) => state.settings.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let activeTheme = theme;
    if (theme === "system") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    
    root.classList.add(activeTheme);

    // Sync browser theme-color meta tag for PWA
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", activeTheme === "dark" ? "#020617" : "#f8fafc");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={PUBLIC_ROUTES.HOME} element={<WithPublicLayout><LandingPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.ABOUT} element={<WithPublicLayout><AboutPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.FEATURES} element={<WithPublicLayout><FeaturesPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.ROADMAP} element={<WithPublicLayout><RoadmapPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.CHANGELOG} element={<WithPublicLayout><ChangelogPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.FAQ} element={<WithPublicLayout><FaqPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.PRIVACY} element={<WithPublicLayout><PrivacyPage /></WithPublicLayout>} />
        <Route path={PUBLIC_ROUTES.CONTACT} element={<WithPublicLayout><ContactPage /></WithPublicLayout>} />

        {/* App Routes */}
        <Route path={APP_ROUTES.DASHBOARD} element={<WithAppLayout><DashboardPage /></WithAppLayout>} />
        <Route path={APP_ROUTES.PROFILE} element={<WithAppLayout><ProfilePage /></WithAppLayout>} />
        <Route path={APP_ROUTES.ATTENDANCE} element={<WithAppLayout><AttendancePage /></WithAppLayout>} />
        <Route path={APP_ROUTES.ASSIGNMENTS} element={<WithAppLayout><AssignmentsPage /></WithAppLayout>} />
        <Route path={APP_ROUTES.HABITS} element={<WithAppLayout><HabitsPage /></WithAppLayout>} />
        <Route path={APP_ROUTES.POMODORO} element={<WithAppLayout><PomodoroPage /></WithAppLayout>} />
        <Route path={APP_ROUTES.SETTINGS} element={<WithAppLayout><SettingsPage /></WithAppLayout>} />

        {/* Legacy Redirects */}
        <Route path={LEGACY_ROUTES.ATTENDANCE} element={<Navigate to={APP_ROUTES.ATTENDANCE} replace />} />
        <Route path={LEGACY_ROUTES.ASSIGNMENTS} element={<Navigate to={APP_ROUTES.ASSIGNMENTS} replace />} />
        <Route path={LEGACY_ROUTES.HABITS} element={<Navigate to={APP_ROUTES.HABITS} replace />} />
        <Route path={LEGACY_ROUTES.POMODORO} element={<Navigate to={APP_ROUTES.POMODORO} replace />} />
        <Route path={LEGACY_ROUTES.SETTINGS} element={<Navigate to={APP_ROUTES.SETTINGS} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


