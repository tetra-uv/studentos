import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { AttendanceStatus } from "../../types/attendanceStatus";

export type SortOption = "name" | "percentage" | "status" | "createdAt";

interface AttendanceToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: AttendanceStatus | "ALL";
  onStatusFilterChange: (status: AttendanceStatus | "ALL") => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function AttendanceToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
}: AttendanceToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
      
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search subjects..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as AttendanceStatus | "ALL")}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Status</option>
            <option value={AttendanceStatus.SAFE}>Safe</option>
            <option value={AttendanceStatus.WARNING}>Warning</option>
            <option value={AttendanceStatus.CRITICAL}>Critical</option>
            <option value={AttendanceStatus.IMPOSSIBLE}>Impossible</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="createdAt">Date Added</option>
            <option value="name">Name (A-Z)</option>
            <option value="percentage">Attendance %</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
      
    </div>
  );
}

