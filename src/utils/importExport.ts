import type { Subject } from "../types/subject";

export interface AttendanceExportData {
  version: "1.0";
  subjects: Subject[];
}

export function exportAttendance(subjects: Subject[]): void {
  const data: AttendanceExportData = {
    version: "1.0",
    subjects,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "studentos-attendance.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateImportedData(raw: any): { valid: Subject[]; errors: string[] } {
  const valid: Subject[] = [];
  const errors: string[] = [];

  if (!raw || typeof raw !== "object") {
    errors.push("Invalid file format.");
    return { valid, errors };
  }

  if (raw.version !== "1.0") {
    errors.push(`Unsupported version: ${raw.version}`);
  }

  if (!Array.isArray(raw.subjects)) {
    errors.push("Missing or invalid subjects array.");
    return { valid, errors };
  }

  for (let i = 0; i < raw.subjects.length; i++) {
    const item = raw.subjects[i];
    
    // Basic type checks
    if (!item || typeof item !== "object") continue;
    
    // Validate required fields
    if (typeof item.id !== "string" || !item.id.trim()) continue;
    if (typeof item.name !== "string" || !item.name.trim()) continue;
    if (typeof item.totalClasses !== "number" || item.totalClasses < 0) continue;
    if (typeof item.attendedClasses !== "number" || item.attendedClasses < 0) continue;
    
    // Logical validation
    if (item.attendedClasses > item.totalClasses) continue;
    
    if (item.targetAttendance !== undefined) {
      if (typeof item.targetAttendance !== "number" || item.targetAttendance < 0 || item.targetAttendance > 100) {
        continue;
      }
    }

    if (typeof item.createdAt !== "number") continue;
    if (typeof item.updatedAt !== "number") continue;

    // Push valid item
    valid.push({
      id: item.id,
      name: item.name.trim(),
      teacher: typeof item.teacher === "string" ? item.teacher : undefined,
      credits: typeof item.credits === "number" ? item.credits : undefined,
      color: typeof item.color === "string" ? item.color : undefined,
      icon: typeof item.icon === "string" ? item.icon : undefined,
      targetAttendance: item.targetAttendance,
      totalClasses: item.totalClasses,
      attendedClasses: item.attendedClasses,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  if (valid.length === 0 && raw.subjects.length > 0) {
    errors.push("No valid subjects found in the file.");
  }

  return { valid, errors };
}

export function importAttendance(file: File, onSuccess: (subjects: Subject[]) => void, onError: (msg: string) => void): void {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content);
      const { valid, errors } = validateImportedData(parsed);
      
      if (valid.length > 0) {
        onSuccess(valid);
        if (errors.length > 0) {
          // Could surface warnings, but keeping it simple as requested
          console.warn("Import warnings:", errors);
        }
      } else {
        onError(errors[0] || "Failed to parse attendance data.");
      }
    } catch (err) {
      onError("Invalid JSON file. Please ensure the file is not corrupted.");
    }
  };

  reader.onerror = () => {
    onError("Failed to read the file.");
  };

  reader.readAsText(file);
}
