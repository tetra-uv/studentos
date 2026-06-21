import { useEffect } from "react";
import { useAttendanceStore } from "../../store/attendanceStore";
import { useCourseStore } from "../../store/courseStore";

export function MigrationManager() {
  const { subjects, isMigratedToCourses, setMigrated, addRecord } = useAttendanceStore();
  const { addCourse } = useCourseStore();

  useEffect(() => {
    if (!isMigratedToCourses) {
      if (subjects.length > 0) {
        subjects.forEach((subject) => {
          const courseId = crypto.randomUUID();
          addCourse({
            id: courseId,
            name: subject.name,
            type: "academic", // Legacy subjects are all academic
            color: subject.color,
            emoji: subject.icon,
          });
          addRecord({
            courseId,
            totalClasses: subject.totalClasses,
            attendedClasses: subject.attendedClasses,
            targetAttendance: subject.targetAttendance,
          });
        });
      }
      // Mark as migrated, but keep legacy subjects untouched as fallback
      setMigrated(true);
    }
  }, [subjects, isMigratedToCourses, setMigrated, addCourse, addRecord]);

  return null;
}
