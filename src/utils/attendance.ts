import { AttendanceStatus } from "../types/attendanceStatus";

export function formatPercentage(value: number): string {
  if (isNaN(value)) return "0%";
  return `${value.toFixed(1)}%`;
}

export function calculateCurrentPercentage(attended: number, total: number): number {
  if (total === 0) return 0;
  return (attended / total) * 100;
}

export function calculateRequiredClasses(targetPercentage: number, total: number, attended: number): number {
  if (total === 0 || targetPercentage <= 0) return 0;
  
  const current = calculateCurrentPercentage(attended, total);
  if (current >= targetPercentage) return 0;

  // target/100 = (attended + X) / (total + X)
  // X = ((target/100) * total - attended) / (1 - target/100)
  const targetFraction = targetPercentage / 100;
  
  if (targetFraction >= 1) {
    // If target is 100% and we already missed a class, it's impossible.
    // If we haven't missed a class, we need 0 extra to "catch up".
    if (attended < total) return Infinity;
    return 0;
  }

  const required = (targetFraction * total - attended) / (1 - targetFraction);
  return Math.ceil(required);
}

export function calculateSafeBunks(targetPercentage: number, total: number, attended: number): number {
  if (total === 0 || targetPercentage <= 0) return 0;

  const current = calculateCurrentPercentage(attended, total);
  if (current < targetPercentage) return 0;

  const targetFraction = targetPercentage / 100;
  if (targetFraction === 0) return Infinity; // Can bunk infinitely

  // target/100 = attended / (total + Y)
  // Y = (attended - (target/100) * total) / (target/100)
  const safe = (attended - targetFraction * total) / targetFraction;
  return Math.max(0, Math.floor(safe));
}

export function calculateStatus(targetPercentage: number, total: number, attended: number): AttendanceStatus {
  if (total === 0) return AttendanceStatus.SAFE;
  
  const current = calculateCurrentPercentage(attended, total);
  
  if (current >= targetPercentage) {
    const safeBunks = calculateSafeBunks(targetPercentage, total, attended);
    if (safeBunks > 0) return AttendanceStatus.SAFE;
    return AttendanceStatus.WARNING; // Exactly on target, 1 bunk means dropping below
  } else {
    const required = calculateRequiredClasses(targetPercentage, total, attended);
    if (required === Infinity) return AttendanceStatus.IMPOSSIBLE;
    return AttendanceStatus.CRITICAL; // Below target, need to attend
  }
}
