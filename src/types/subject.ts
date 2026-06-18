export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  credits?: number;
  color?: string;
  icon?: string;
  targetAttendance?: number;
  totalClasses: number;
  attendedClasses: number;
  createdAt: number;
  updatedAt: number;
}
