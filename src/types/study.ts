export interface StudySession {
  id: string;
  title: string;
  course: string; // Legacy string fallback / cache
  courseId?: string; // New relational field
  durationMinutes: number;
  date: number; // Timestamp of when the session occurred/started
  tags: string[];
  notes?: string;
  createdAt: number;
  updatedAt: number;

  // Future fields prepared
  confidence?: number;
  revisionCount?: number;
  resources?: string[];
}
