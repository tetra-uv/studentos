import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import DashboardPage from "./pages/dashboard";
import AttendancePage from "./pages/attendance";
import AssignmentsPage from "./pages/assignments";
import HabitsPage from "./pages/habits";
import PomodoroPage from "./pages/pomodoro";
import SettingsPage from "./pages/settings";
import { useAppStore } from "./store/appStore";

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
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;


