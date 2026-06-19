import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import type { HabitSortOption } from "../../utils/habits";

export type HabitFilter = "ALL" | "COMPLETED_TODAY" | "NOT_COMPLETED" | "ACTIVE";

interface HabitsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filter: HabitFilter;
  onFilterChange: (f: HabitFilter) => void;
  sortBy: HabitSortOption;
  onSortChange: (s: HabitSortOption) => void;
}

export function HabitsToolbar({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
}: HabitsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap bg-card p-4 rounded-lg border border-border mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-sm">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search habits..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as HabitFilter)}
            className="bg-transparent text-sm font-medium focus:outline-none text-muted-foreground"
          >
            <option value="ALL">All Habits</option>
            <option value="ACTIVE">Active (7 days)</option>
            <option value="COMPLETED_TODAY">Completed Today</option>
            <option value="NOT_COMPLETED">Not Completed</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as HabitSortOption)}
            className="bg-transparent text-sm font-medium focus:outline-none text-muted-foreground"
          >
            <option value="createdAt">Date Added</option>
            <option value="name">Name (A-Z)</option>
            <option value="currentStreak">Current Streak</option>
            <option value="longestStreak">Longest Streak</option>
          </select>
        </div>
      </div>
    </div>
  );
}
