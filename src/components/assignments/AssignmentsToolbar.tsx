import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { AssignmentStatus } from "../../types/assignmentStatus";
import { AssignmentPriority } from "../../types/assignmentPriority";
import type { AssignmentSortOption } from "../../utils/assignments";

type StatusFilter = AssignmentStatus | "ALL" | "ACTIVE";
type PriorityFilter = AssignmentPriority | "ALL";

interface AssignmentsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (s: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (p: PriorityFilter) => void;
  sortBy: AssignmentSortOption;
  onSortChange: (s: AssignmentSortOption) => void;
}

export type { StatusFilter, PriorityFilter };

export function AssignmentsToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortChange,
}: AssignmentsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-sm">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search assignments..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value={AssignmentStatus.TODO}>To Do</option>
            <option value={AssignmentStatus.IN_PROGRESS}>In Progress</option>
            <option value={AssignmentStatus.DONE}>Done</option>
          </select>
        </div>

        {/* Priority filter */}
        <div className="flex items-center gap-2">
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value as PriorityFilter)}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Priority</option>
            <option value={AssignmentPriority.URGENT}>Urgent</option>
            <option value={AssignmentPriority.HIGH}>High</option>
            <option value={AssignmentPriority.MEDIUM}>Medium</option>
            <option value={AssignmentPriority.LOW}>Low</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-500 dark:text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as AssignmentSortOption)}
            className="bg-transparent text-sm font-medium focus:outline-none text-slate-700 dark:text-slate-300"
          >
            <option value="createdAt">Date Added</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}
