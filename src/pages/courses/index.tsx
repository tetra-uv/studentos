import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { Plus, GraduationCap, Search, RotateCcw } from "lucide-react";
import { useCourseStore } from "../../store/courseStore";
import { CourseCard } from "../../components/courses/CourseCard";
import { CourseFormModal } from "../../components/courses/CourseFormModal";
import { EmptyStateStory } from "../../components/analytics/EmptyStateStory";
import { AnimatePresence } from "framer-motion";
import type { Course } from "../../types/course";

export default function CoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse, lastDeletedCourse, undoDelete } = useCourseStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses
    .filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleEdit = (course: Course) => {
    setCourseToEdit(course);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Course, "id" | "createdAt" | "updatedAt">) => {
    if (courseToEdit) {
      updateCourse(courseToEdit.id, data);
    } else {
      addCourse(data);
    }
  };

  const openNewModal = () => {
    setCourseToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <PageHeader 
        title="Courses" 
        description="The heart of your Academic Operating System." 
        actions={
          <div className="flex items-center gap-2">
            {lastDeletedCourse && (
              <Button variant="secondary" onClick={undoDelete} className="px-3" title="Undo Delete">
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={openNewModal}>
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Button>
          </div>
        }
      />

      {courses.length > 0 && (
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyStateStory 
          title="Build your syllabus." 
          description="Create your first Academic, Personal, or Skill course to center your OS around your goals."
          icon={<GraduationCap className="h-6 w-6" />}
        />
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No courses found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEdit={handleEdit} 
                onDelete={deleteCourse} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        courseToEdit={courseToEdit}
      />
    </Container>
  );
}
