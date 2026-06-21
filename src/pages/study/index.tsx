import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { Plus, BookOpen, Search, RotateCcw } from "lucide-react";
import { useStudyStore } from "../../store/studyStore";
import { StudySessionCard } from "../../components/study/StudySessionCard";
import { StudySessionFormModal } from "../../components/study/StudySessionFormModal";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { AnimatePresence } from "framer-motion";
import type { StudySession } from "../../types/study";

export default function StudyPage() {
  const { sessions, addSession, updateSession, deleteSession, lastDeletedSession, undoDelete } = useStudyStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<StudySession | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = sessions
    .filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.date - a.date);

  const handleEdit = (session: StudySession) => {
    setSessionToEdit(session);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<StudySession, "id" | "createdAt" | "updatedAt">) => {
    if (sessionToEdit) {
      updateSession(sessionToEdit.id, data);
    } else {
      addSession(data);
    }
  };

  const openNewModal = () => {
    setSessionToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <PageHeader 
        title="Study Sessions" 
        description="Track your learning and revision." 
        actions={
          <div className="flex items-center gap-2">
            {lastDeletedSession && (
              <Button variant="secondary" onClick={undoDelete} className="px-3" title="Undo Delete">
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={openNewModal}>
              <Plus className="h-4 w-4 mr-2" />
              Log Session
            </Button>
          </div>
        }
      />

      {sessions.length > 0 && (
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sessions by title, course, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}

      {sessions.length === 0 ? (
        <EmptyStateStory 
          title="Your story starts here." 
          description="Log your first study session to start building your academic history."
          icon={<BookOpen className="h-6 w-6" />}
        />
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No sessions found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSessions.map((session) => (
              <StudySessionCard 
                key={session.id} 
                session={session} 
                onEdit={handleEdit} 
                onDelete={deleteSession} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <StudySessionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        sessionToEdit={sessionToEdit}
      />
    </Container>
  );
}
