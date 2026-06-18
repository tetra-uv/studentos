import { useState, useMemo } from "react";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { Button } from "../../components/ui/Button";
import { Toast } from "../../components/ui/Toast";
import { CheckSquare, Plus, SearchX } from "lucide-react";
import { useAttendanceStore } from "../../store/attendanceStore";
import { SubjectCard } from "../../components/attendance/SubjectCard";
import { SubjectForm } from "../../components/attendance/SubjectForm";
import { AttendanceToolbar, type SortOption } from "../../components/attendance/AttendanceToolbar";
import { DataOptions } from "../../components/attendance/DataOptions";
import type { Subject } from "../../types/subject";
import { AttendanceStatus } from "../../types/attendanceStatus";
import { calculateCurrentPercentage, calculateStatus } from "../../utils/attendance";

export default function AttendancePage() {
  const { subjects, deleteSubject, restoreSubject } = useAttendanceStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  // Search, Filter, Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("createdAt");

  // Toast / Undo State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastDeletedSubject, setLastDeletedSubject] = useState<Subject | null>(null);

  const handleEdit = (subject: Subject) => {
    setIsAdding(false);
    setEditingSubject(subject);
  };

  const handleCloseForm = () => {
    setIsAdding(false);
    setEditingSubject(null);
  };

  // Replace default store delete to inject Undo
  const handleDelete = (subjectId: string) => {
    const subjectToDel = subjects.find(s => s.id === subjectId);
    if (subjectToDel) {
      setLastDeletedSubject(subjectToDel);
      deleteSubject(subjectId);
      setToastMessage(`Deleted ${subjectToDel.name}`);
    }
  };

  const handleUndo = () => {
    if (lastDeletedSubject) {
      restoreSubject(lastDeletedSubject);
      setLastDeletedSubject(null);
      setToastMessage(null);
    }
  };

  const filteredAndSortedSubjects = useMemo(() => {
    // 1. Filter
    let result = subjects;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q));
    }

    if (statusFilter !== "ALL") {
      result = result.filter(s => {
        const target = s.targetAttendance ?? 75;
        const status = calculateStatus(target, s.totalClasses, s.attendedClasses);
        return status === statusFilter;
      });
    }

    // 2. Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "percentage") {
        const aPct = calculateCurrentPercentage(a.attendedClasses, a.totalClasses);
        const bPct = calculateCurrentPercentage(b.attendedClasses, b.totalClasses);
        return bPct - aPct; // High to low
      }
      if (sortBy === "status") {
        const aStatus = calculateStatus(a.targetAttendance ?? 75, a.totalClasses, a.attendedClasses);
        const bStatus = calculateStatus(b.targetAttendance ?? 75, b.totalClasses, b.attendedClasses);
        const order: Record<AttendanceStatus, number> = {
          [AttendanceStatus.IMPOSSIBLE]: 0,
          [AttendanceStatus.CRITICAL]: 1,
          [AttendanceStatus.WARNING]: 2,
          [AttendanceStatus.SAFE]: 3,
        };
        return order[aStatus] - order[bStatus];
      }
      return b.createdAt - a.createdAt; // Newest first
    });

    return result;
  }, [subjects, searchQuery, statusFilter, sortBy]);

  return (
    <Container>
      <PageHeader 
        title="Attendance" 
        description="Track your attendance, required classes, and safe bunks." 
        actions={
          !isAdding && !editingSubject && (
            <Button onClick={() => setIsAdding(true)} className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" /> Add Subject
            </Button>
          )
        }
      />

      <div className="flex flex-col gap-6 pb-24 md:pb-12">
        {subjects.length > 0 && !isAdding && !editingSubject && (
          <AttendanceToolbar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}

        {isAdding && (
          <SubjectForm onClose={handleCloseForm} />
        )}

        {editingSubject && (
          <SubjectForm initialData={editingSubject} onClose={handleCloseForm} />
        )}

        {subjects.length === 0 && !isAdding && !editingSubject ? (
          <EmptyState 
            icon={<CheckSquare className="h-6 w-6" />}
            title="No subjects added"
            description="Add your first subject to start tracking your attendance."
            action={<Button onClick={() => setIsAdding(true)}>Add Subject</Button>}
          />
        ) : filteredAndSortedSubjects.length === 0 && !isAdding && !editingSubject ? (
          <EmptyState 
            icon={<SearchX className="h-6 w-6" />}
            title="No matches found"
            description="Try adjusting your search or filter settings."
            action={
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setStatusFilter("ALL");
              }}>
                Clear Filters
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSubjects.map((subject) => (
              editingSubject?.id === subject.id ? null : (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  onEdit={handleEdit} 
                  onDeleteOverride={() => handleDelete(subject.id)}
                />
              )
            ))}
          </div>
        )}

        {subjects.length > 0 && !isAdding && !editingSubject && (
          <DataOptions 
            onImportSuccess={() => setToastMessage("Data imported successfully")}
            onImportError={(msg) => setToastMessage(`Import failed: ${msg}`)}
          />
        )}
      </div>

      {/* Mobile FAB */}
      {!isAdding && !editingSubject && (
        <Button 
          onClick={() => setIsAdding(true)} 
          className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg md:hidden flex items-center justify-center p-0 z-40"
          aria-label="Add Subject"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}

      {/* Toast */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onUndo={lastDeletedSubject ? handleUndo : undefined} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </Container>
  );
}
