/**
 * Domain Models for StudentOS
 * Designed to be agnostic of any specific UI framework or database.
 * Supports future synchronization and conflict resolution.
 */

export interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
  
  // Sync metadata
  version: number;
  deleted: boolean;
  syncStatus: 'synced' | 'pending' | 'conflict';
}

export interface Institution extends BaseEntity {
  name: string;
  website?: string;
  type: 'university' | 'college' | 'high_school' | 'other';
  timezone?: string;
}

export interface Department extends BaseEntity {
  institutionId: string;
  name: string;
  code: string;
}

export interface StudentProfile extends BaseEntity {
  userId: string;
  institutionId?: string;
  departmentId?: string;
  firstName: string;
  lastName: string;
  enrollmentYear: number;
  expectedGraduationYear?: number;
  studentIdNumber?: string;
}

export interface TeacherProfile extends BaseEntity {
  userId: string;
  institutionId?: string;
  departmentId?: string;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
}

export interface Semester extends BaseEntity {
  studentId: string;
  name: string; // e.g., "Fall 2026"
  startDate: number;
  endDate: number;
  isActive: boolean;
}

export interface Section extends BaseEntity {
  semesterId: string;
  courseName: string;
  courseCode: string;
  teacherId?: string; // Optional link to teacher profile
  credits: number;
  
  // Attendance rules
  minimumAttendancePercentage: number;
  
  // Location/Time metadata could be expanded later
  color?: string;
}

export interface Credits extends BaseEntity {
  studentId: string;
  semesterId: string;
  earnedCredits: number;
  attemptedCredits: number;
}

export interface CGPA extends BaseEntity {
  studentId: string;
  semesterId: string;
  sgpa: number; // Semester GPA
  cgpa: number; // Cumulative GPA up to this semester
  totalCreditsEarned: number;
}
