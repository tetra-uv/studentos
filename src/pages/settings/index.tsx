import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { Toast } from "../../components/ui/Toast";
import { SettingsSection } from "../../components/settings/SettingsSection";
import { SettingsCard } from "../../components/settings/SettingsCard";
import { ToggleRow } from "../../components/settings/ToggleRow";
import { SelectRow } from "../../components/settings/SelectRow";
import { DangerZone } from "../../components/settings/DangerZone";
import { useAppStore } from "../../store/appStore";
import { usePomodoroStore } from "../../store/pomodoroStore";
import { useAttendanceStore } from "../../store/attendanceStore";
import { useAssignmentStore } from "../../store/assignmentStore";
import { useHabitStore } from "../../store/habitStore";

export default function SettingsPage() {
  const { settings: appSettings, updateSettings: updateApp } = useAppStore();
  const { settings: pomSettings, updateSettings: updatePom, clearHistory: clearPom } = usePomodoroStore();
  const { subjects, resetData: resetAttendance } = useAttendanceStore();
  const { assignments, deleteAssignment } = useAssignmentStore();
  const { habits, deleteHabit } = useHabitStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExportAll = () => {
    const data = {
      attendance: subjects,
      assignments,
      habits,
      pomodoro: usePomodoroStore.getState().sessions,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studentos-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToastMessage("Data exported successfully");
  };

  const handleResetAll = () => {
    resetAttendance();
    assignments.forEach((a) => deleteAssignment(a.id));
    habits.forEach((h) => deleteHabit(h.id));
    clearPom();
    setToastMessage("All data has been reset");
  };

  return (
    <Container>
      <PageHeader
        title="Settings"
        description="Configure your preferences and manage your data."
      />

      <div className="flex flex-col gap-8 max-w-2xl pb-12">
        
        {/* Appearance */}
        <SettingsSection title="Appearance">
          <SettingsCard>
            <SelectRow
              label="Theme"
              description="Choose your preferred color theme."
              value={appSettings.theme}
              onChange={(v) => updateApp({ theme: v as "light" | "dark" | "system" })}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
                { label: "System", value: "system" },
              ]}
            />
            <ToggleRow
              label="Compact Mode"
              description="Reduce spacing in cards and lists to see more items."
              checked={appSettings.compactMode}
              onChange={(v) => updateApp({ compactMode: v })}
            />
            <ToggleRow
              label="Animations"
              description="Enable subtle transitions and micro-animations."
              checked={appSettings.animationsEnabled}
              onChange={(v) => updateApp({ animationsEnabled: v })}
            />
          </SettingsCard>
        </SettingsSection>

        {/* Pomodoro */}
        <SettingsSection title="Pomodoro Timer" description="Configure focus and break durations.">
          <SettingsCard>
            <SelectRow
              label="Focus Duration"
              value={String(pomSettings.focusMinutes)}
              onChange={(v) => updatePom({ focusMinutes: Number(v) })}
              options={[15, 20, 25, 30, 45, 60, 90].map((n) => ({ label: `${n} min`, value: String(n) }))}
            />
            <SelectRow
              label="Break Duration"
              value={String(pomSettings.breakMinutes)}
              onChange={(v) => updatePom({ breakMinutes: Number(v) })}
              options={[5, 10, 15, 20, 30].map((n) => ({ label: `${n} min`, value: String(n) }))}
            />
            <ToggleRow
              label="Auto-start Break"
              description="Automatically start the break timer when focus ends."
              checked={pomSettings.autoStartBreak}
              onChange={(v) => updatePom({ autoStartBreak: v })}
            />
            <ToggleRow
              label="Completion Sound"
              description="Play a subtle tone when the timer finishes."
              checked={pomSettings.soundEnabled}
              onChange={(v) => updatePom({ soundEnabled: v })}
            />
          </SettingsCard>
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection title="Data Management" description="Export your data or reset the application.">
          <SettingsCard>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Export All Data</span>
                <span className="text-xs text-muted-foreground mt-0.5">Download a backup of all modules.</span>
              </div>
              <button
                onClick={handleExportAll}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none"
              >
                Export JSON
              </button>
            </div>
            {/* Import placeholder - since we need unified import logic, skipping for V1F simplicity or could add simple button */}
          </SettingsCard>
          
          <div className="mt-4">
            <DangerZone
              title="Reset All Data"
              description="This will permanently delete all attendance, assignments, habits, and pomodoro history. Settings will remain."
              buttonText="Reset All Modules"
              onConfirm={handleResetAll}
            />
          </div>
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingsCard>
            <div className="px-4 py-4 flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">StudentOS</span>
              <span className="text-xs text-muted-foreground">Version 1.0 (Phase 1 Complete)</span>
              <span className="text-xs text-muted-foreground mt-2">
                Built with React, Tailwind v4, Zustand, and TypeScript.
              </span>
            </div>
          </SettingsCard>
        </SettingsSection>

      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </Container>
  );
}
