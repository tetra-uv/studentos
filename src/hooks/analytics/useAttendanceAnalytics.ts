import { useMemo } from "react";
import { useAttendanceStore } from "../../store/attendanceStore";
import { calculateCurrentPercentage, calculateStatus, calculateSafeBunks } from "../../utils/attendance";
import { AttendanceStatus } from "../../types/attendanceStatus";

export function useAttendanceAnalytics() {
  const { subjects } = useAttendanceStore();

  return useMemo(() => {
    if (subjects.length === 0) return null;

    let totalAttended = 0;
    let totalClasses = 0;
    let totalSafeBunks = 0;

    const subjectsWithStats = subjects.map(s => {
      const target = s.targetAttendance ?? 75;
      const status = calculateStatus(target, s.totalClasses, s.attendedClasses);
      const safeBunks = calculateSafeBunks(target, s.totalClasses, s.attendedClasses);
      const percentage = calculateCurrentPercentage(s.attendedClasses, s.totalClasses);

      totalAttended += s.attendedClasses;
      totalClasses += s.totalClasses;
      totalSafeBunks += safeBunks;

      return {
        ...s,
        status,
        safeBunks,
        percentage
      };
    });

    const overallPercentage = calculateCurrentPercentage(totalAttended, totalClasses);

    // Sort to find best and risk subjects
    const sorted = [...subjectsWithStats].sort((a, b) => b.percentage - a.percentage);
    const bestSubjects = sorted.filter(s => s.status === AttendanceStatus.SAFE).slice(0, 3);
    const riskSubjects = sorted.filter(s => s.status !== AttendanceStatus.SAFE).reverse().slice(0, 3);

    // Monthly Trends mock (assuming subjects don't track attendance per day yet, we just provide the static data for the chart, or derive if we have logs. Since we only have totalClasses/attendedClasses, we will do a simple representation)
    const chartData = subjectsWithStats.map(s => ({
      name: s.name.substring(0, 10),
      attended: s.attendedClasses,
      missed: s.totalClasses - s.attendedClasses,
      percentage: s.percentage,
    }));

    return {
      overallPercentage,
      totalSafeBunks,
      bestSubjects,
      riskSubjects,
      chartData,
      totalClasses,
      totalAttended,
    };
  }, [subjects]);
}
