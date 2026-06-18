import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckSquare, AlertTriangle, TrendingUp, Info } from "lucide-react";

import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";

import { OverviewCard } from "../../components/dashboard/OverviewCard";
import { InsightCard } from "../../components/dashboard/InsightCard";
import { WarningSubjectsCard } from "../../components/dashboard/WarningSubjectsCard";
import { RecentSubjectsCard } from "../../components/dashboard/RecentSubjectsCard";
import { QuickActionsCard } from "../../components/dashboard/QuickActionsCard";

import { useAttendanceStore } from "../../store/attendanceStore";
import { AttendanceStatus } from "../../types/attendanceStatus";
import {
  calculateCurrentPercentage,
  calculateStatus,
  calculateSafeBunks,
  formatPercentage,
} from "../../utils/attendance";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { subjects } = useAttendanceStore();

  const stats = useMemo(() => {
    if (subjects.length === 0) return null;

    let totalAttended = 0;
    let totalClasses = 0;
    let safeCount = 0;
    let belowTargetCount = 0;
    let totalSafeBunks = 0;
    let criticalOrWorse = 0;

    for (const s of subjects) {
      const target = s.targetAttendance ?? 75;
      const status = calculateStatus(target, s.totalClasses, s.attendedClasses);
      const safeBunks = calculateSafeBunks(target, s.totalClasses, s.attendedClasses);

      totalAttended += s.attendedClasses;
      totalClasses += s.totalClasses;
      totalSafeBunks += safeBunks;

      if (status === AttendanceStatus.SAFE) safeCount++;
      if (status !== AttendanceStatus.SAFE) belowTargetCount++;
      if (status === AttendanceStatus.CRITICAL || status === AttendanceStatus.IMPOSSIBLE) {
        criticalOrWorse++;
      }
    }

    const avgPercentage = calculateCurrentPercentage(totalAttended, totalClasses);

    return { avgPercentage, safeCount, belowTargetCount, totalSafeBunks, criticalOrWorse };
  }, [subjects]);

  // Build insight messages based on computed stats
  const insights = useMemo(() => {
    if (!stats || subjects.length === 0) return [];

    const list: { icon: React.ReactNode; message: string }[] = [];

    list.push({
      icon: <TrendingUp className="h-4 w-4" />,
      message: `Average attendance across all subjects is ${formatPercentage(stats.avgPercentage)}.`,
    });

    if (stats.totalSafeBunks > 0) {
      list.push({
        icon: <Info className="h-4 w-4" />,
        message: `You can safely skip ${stats.totalSafeBunks} class${stats.totalSafeBunks !== 1 ? "es" : ""} in total without falling below target.`,
      });
    }

    if (stats.criticalOrWorse > 0) {
      list.push({
        icon: <AlertTriangle className="h-4 w-4" />,
        message: `${stats.criticalOrWorse} subject${stats.criticalOrWorse !== 1 ? "s require" : " requires"} immediate attention — attend consecutively to recover.`,
      });
    } else if (stats.belowTargetCount === 0) {
      list.push({
        icon: <CheckSquare className="h-4 w-4" />,
        message: "Great work! All subjects are above your target attendance.",
      });
    }

    return list;
  }, [stats, subjects]);

  // Empty state — no subjects at all
  if (subjects.length === 0) {
    return (
      <Container>
        <PageHeader title="Dashboard" description="Your student overview." />
        <EmptyState
          icon={<BookOpen className="h-6 w-6" />}
          title="Nothing here yet"
          description="Add your subjects in Attendance to start seeing your overview here."
          action={
            <Button onClick={() => navigate("/attendance")}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Go to Attendance
            </Button>
          }
        />
      </Container>
    );
  }

  const overviewStats = [
    {
      label: "Total Subjects",
      value: subjects.length,
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      label: "Avg Attendance",
      value: stats ? formatPercentage(stats.avgPercentage) : "—",
      icon: <TrendingUp className="h-3.5 w-3.5" />,
    },
    {
      label: "On Track",
      value: stats?.safeCount ?? 0,
      icon: <CheckSquare className="h-3.5 w-3.5" />,
      subtext: "subjects above target",
    },
    {
      label: "Need Attention",
      value: stats?.belowTargetCount ?? 0,
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      subtext: "subjects below target",
    },
  ];

  return (
    <Container>
      <PageHeader title="Dashboard" description="Your student overview." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — full width on mobile, 2/3 on desktop */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <OverviewCard stats={overviewStats} />
          <InsightCard insights={insights} />
          <WarningSubjectsCard subjects={subjects} />
        </div>

        {/* Right column — full width on mobile, 1/3 on desktop */}
        <div className="flex flex-col gap-6">
          <QuickActionsCard />
          <RecentSubjectsCard subjects={subjects} />
        </div>
      </div>
    </Container>
  );
}
