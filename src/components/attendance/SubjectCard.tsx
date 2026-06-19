import { useState } from "react";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "../ui/ProgressBar";
import { calculateStatus, calculateCurrentPercentage, calculateRequiredClasses, calculateSafeBunks, formatPercentage } from "../../utils/attendance";
import type { Subject } from "../../types/subject";
import { useAttendanceStore } from "../../store/attendanceStore";
import { Trash2, Edit2, Plus, Minus } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDeleteOverride?: () => void;
}

export function SubjectCard({ subject, onEdit, onDeleteOverride }: SubjectCardProps) {
  const { deleteSubject, updateSubject } = useAttendanceStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const currentPercentage = calculateCurrentPercentage(subject.attendedClasses, subject.totalClasses);
  const target = subject.targetAttendance ?? 75;
  const status = calculateStatus(target, subject.totalClasses, subject.attendedClasses);
  const safeBunks = calculateSafeBunks(target, subject.totalClasses, subject.attendedClasses);
  const required = calculateRequiredClasses(target, subject.totalClasses, subject.attendedClasses);

  const handleAddClass = (attended: boolean) => {
    updateSubject(subject.id, {
      totalClasses: subject.totalClasses + 1,
      attendedClasses: subject.attendedClasses + (attended ? 1 : 0),
    });
  };

  const handleDelete = () => {
    if (isConfirmingDelete) {
      if (onDeleteOverride) {
        onDeleteOverride();
      } else {
        deleteSubject(subject.id);
      }
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {subject.icon && <span className="text-xl">{subject.icon}</span>}
          <div>
            <Text variant="h3" style={subject.color ? { color: subject.color } : undefined}>
              {subject.name}
            </Text>
            {subject.teacher && <Text variant="muted">{subject.teacher}</Text>}
          </div>
        </div>
        
        {isConfirmingDelete ? (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800">
            <Text className="text-xs font-semibold text-red-700 dark:text-red-400">Confirm Delete</Text>
            <Button variant="ghost" size="sm" onClick={handleDelete} className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-100">
              Yes
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancelDelete} className="h-6 px-2 text-muted-foreground hover:bg-accent">
              No
            </Button>
          </div>
        ) : (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(subject)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-2">
            <Text variant="h2">{formatPercentage(currentPercentage)}</Text>
            <Text variant="muted" className="mb-0.5">({subject.attendedClasses}/{subject.totalClasses})</Text>
          </div>
          <StatusBadge status={status} />
        </div>
        <ProgressBar percentage={currentPercentage} />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        <div>
          <Text className="text-sm font-medium">
            {safeBunks > 0 ? `Can bunk ${safeBunks} classes` : "No safe bunks"}
          </Text>
        </div>
        <div>
          <Text className="text-sm font-medium">
            {required === 0 ? "On track" : required === Infinity ? "Impossible" : `Need ${required} classes`}
          </Text>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <Button variant="outline" className="flex-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400" onClick={() => handleAddClass(true)}>
          <Plus className="h-4 w-4 mr-2" /> Attended
        </Button>
        <Button variant="outline" className="flex-1 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400" onClick={() => handleAddClass(false)}>
          <Minus className="h-4 w-4 mr-2" /> Missed
        </Button>
      </div>
    </Card>
  );
}
