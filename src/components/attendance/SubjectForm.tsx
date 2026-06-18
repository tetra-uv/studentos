import { useState, useEffect, useRef } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { useAttendanceStore } from "../../store/attendanceStore";
import type { Subject } from "../../types/subject";
import { AlertCircle } from "lucide-react";

interface SubjectFormProps {
  initialData?: Subject;
  onClose: () => void;
}

export function SubjectForm({ initialData, onClose }: SubjectFormProps) {
  const { addSubject, updateSubject } = useAttendanceStore();
  const [name, setName] = useState(initialData?.name || "");
  const [target, setTarget] = useState(initialData?.targetAttendance?.toString() || "75");
  const [attended, setAttended] = useState(initialData?.attendedClasses?.toString() || "0");
  const [total, setTotal] = useState(initialData?.totalClasses?.toString() || "0");
  const [error, setError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Focus the first input on mount
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = (): boolean => {
    if (!name.trim()) {
      setError("Subject name cannot be empty.");
      return false;
    }
    
    const targetNum = Number(target);
    const attendedNum = Number(attended);
    const totalNum = Number(total);

    if (targetNum < 0 || targetNum > 100) {
      setError("Target attendance must be between 0 and 100.");
      return false;
    }

    if (attendedNum < 0 || totalNum < 0) {
      setError("Classes cannot be negative.");
      return false;
    }

    if (attendedNum > totalNum) {
      setError("Attended classes cannot exceed total classes.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (initialData) {
      updateSubject(initialData.id, {
        name: name.trim(),
        targetAttendance: Number(target),
        attendedClasses: Number(attended),
        totalClasses: Number(total),
      });
    } else {
      addSubject({
        name: name.trim(),
        targetAttendance: Number(target),
        totalClasses: Number(total),
        attendedClasses: Number(attended),
      });
    }
    onClose();
  };

  return (
    <Card className="p-5 border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20">
      <Text variant="h3" className="mb-4">{initialData ? "Edit Subject" : "Add Subject"}</Text>
      
      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-2 text-red-800 dark:text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <Text className="text-sm font-medium">{error}</Text>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject Name</label>
          <input
            ref={nameInputRef}
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. Mathematics"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="target" className="text-sm font-medium text-slate-700 dark:text-slate-300">Target (%)</label>
            <input
              id="target"
              type="number"
              min="0"
              max="100"
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
                if (error) setError(null);
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="attended" className="text-sm font-medium text-slate-700 dark:text-slate-300">Attended</label>
            <input
              id="attended"
              type="number"
              min="0"
              value={attended}
              onChange={(e) => {
                setAttended(e.target.value);
                if (error) setError(null);
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="total" className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Classes</label>
            <input
              id="total"
              type="number"
              min="0"
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
                if (error) setError(null);
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Subject"}</Button>
        </div>
      </form>
    </Card>
  );
}
