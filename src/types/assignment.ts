import type { AssignmentPriority } from "./assignmentPriority";
import type { AssignmentStatus } from "./assignmentStatus";

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subjectId?: string;
  subjectName?: string;
  dueDate?: number;
  priority: AssignmentPriority;
  status: AssignmentStatus;
  createdAt: number;
  updatedAt: number;
}
