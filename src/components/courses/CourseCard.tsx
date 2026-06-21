import { motion } from "framer-motion";
import { MoreVertical, Edit2, Trash2, BookOpen, User, Star } from "lucide-react";
import type { Course } from "../../types/course";
import { useState } from "react";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const TypeIcon = course.type === "academic" ? BookOpen : course.type === "personal" ? User : Star;
  const typeLabel = course.type.charAt(0).toUpperCase() + course.type.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-4 border rounded-xl bg-card border-border/50 shadow-sm relative group overflow-hidden"
    >
      <div 
        className="absolute top-0 left-0 w-1 h-full" 
        style={{ backgroundColor: course.color || "#8b5cf6" }} 
      />
      
      <div className="flex justify-between items-start mb-3 pl-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-xl">
            {course.emoji || "📚"}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground tracking-tight line-clamp-1">{course.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <TypeIcon className="h-3 w-3" />
              <span>{typeLabel}</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-card border border-border shadow-lg rounded-lg py-1 z-10">
              <button
                onClick={() => { setShowMenu(false); onEdit(course); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" /> Edit
              </button>
              <button
                onClick={() => { setShowMenu(false); onDelete(course.id); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-rose-500 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {course.description && (
        <p className="text-sm text-muted-foreground pl-2 line-clamp-2 mt-2">
          {course.description}
        </p>
      )}

      {/* Invisible backdrop for menu */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </motion.div>
  );
}
