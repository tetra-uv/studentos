import { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { useAssignmentStore } from "../../store/assignmentStore";
import { useAttendanceStore } from "../../store/attendanceStore";
import { dateInputToTimestamp, timestampToDateInput } from "../../utils/assignments";
import { AssignmentPriority } from "../../types/assignmentPriority";
import { AssignmentStatus } from "../../types/assignmentStatus";
import type { Assignment } from "../../types/assignment";

interface AssignmentFormProps {
  initialData?: Assignment;
  onClose: () => void;
}

const INPUT_CLASS =
  "rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full";

export function AssignmentForm({ initialData, onClose }: AssignmentFormProps) {
  const { addAssignment, updateAssignment } = useAssignmentStore();
  const { subjects } = useAttendanceStore();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [subjectId, setSubjectId] = useState(initialData?.subjectId || "");
  const [links, setLinks] = useState<string[]>(initialData?.links || []);
  const [dueDate, setDueDate] = useState(timestampToDateInput(initialData?.dueDate));
  const [priority, setPriority] = useState<AssignmentPriority>(
    initialData?.priority || AssignmentPriority.MEDIUM
  );
  const [status, setStatus] = useState<AssignmentStatus>(
    initialData?.status || AssignmentStatus.TODO
  );
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = (): boolean => {
    if (!title.trim()) {
      setError("Assignment title cannot be empty.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedSubject = subjects.find((s) => s.id === subjectId);

    if (initialData) {
      updateAssignment(initialData.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        subjectId: subjectId || undefined,
        subjectName: selectedSubject?.name,
        dueDate: dateInputToTimestamp(dueDate),
        priority,
        status,
        links: links.length > 0 ? links : undefined,
      });
    } else {
      addAssignment({
        title: title.trim(),
        description: description.trim() || undefined,
        subjectId: subjectId || undefined,
        subjectName: selectedSubject?.name,
        dueDate: dateInputToTimestamp(dueDate),
        priority,
        status,
        links: links.length > 0 ? links : undefined,
      });
    }
    onClose();
  };

  return (
    <Card className="p-5 border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20">
      <Text variant="h3" className="mb-4">
        {initialData ? "Edit Assignment" : "Add Assignment"}
      </Text>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/30 text-red-800 dark:text-red-400">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="as-title" className="text-sm font-medium text-muted-foreground">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            ref={titleRef}
            id="as-title"
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (error) setError(null); }}
            placeholder="e.g. Chapter 5 Assignment"
            className={INPUT_CLASS}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="as-desc" className="text-sm font-medium text-muted-foreground">
            Notes <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="as-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any additional notes..."
            rows={2}
            className={INPUT_CLASS + " resize-none"}
          />
        </div>

        {/* Link Resource */}
        <div className="flex flex-col gap-1">
          <label htmlFor="as-link" className="text-sm font-medium text-muted-foreground">
            Resource Link <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id="as-link"
            type="url"
            value={links[0] || ""}
            onChange={(e) => setLinks(e.target.value ? [e.target.value] : [])}
            placeholder="https://docs.google.com/..."
            className={INPUT_CLASS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label htmlFor="as-subject" className="text-sm font-medium text-muted-foreground">
              Subject <span className="text-xs font-normal text-muted-foreground">(optional)</span>
            </label>
            <select
              id="as-subject"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">None</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1">
            <label htmlFor="as-due" className="text-sm font-medium text-muted-foreground">
              Due Date <span className="text-xs font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id="as-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label htmlFor="as-priority" className="text-sm font-medium text-muted-foreground">
              Priority
            </label>
            <select
              id="as-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as AssignmentPriority)}
              className={INPUT_CLASS}
            >
              <option value={AssignmentPriority.LOW}>Low</option>
              <option value={AssignmentPriority.MEDIUM}>Medium</option>
              <option value={AssignmentPriority.HIGH}>High</option>
              <option value={AssignmentPriority.URGENT}>Urgent</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label htmlFor="as-status" className="text-sm font-medium text-muted-foreground">
              Status
            </label>
            <select
              id="as-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as AssignmentStatus)}
              className={INPUT_CLASS}
            >
              <option value={AssignmentStatus.TODO}>To Do</option>
              <option value={AssignmentStatus.IN_PROGRESS}>In Progress</option>
              <option value={AssignmentStatus.DONE}>Done</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Assignment"}</Button>
        </div>
      </form>
    </Card>
  );
}
