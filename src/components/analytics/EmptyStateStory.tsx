import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface EmptyStateStoryProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyStateStory({
  title = "Your story starts here.",
  description = "Log your data to uncover insights and understand your habits better.",
  icon = <BookOpen className="h-6 w-6" />,
}: EmptyStateStoryProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-surface-card border-border/50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 text-primary bg-primary/10 p-4 rounded-full"
      >
        {icon}
      </motion.div>
      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-xl font-medium tracking-tight text-foreground mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="text-sm text-muted-foreground max-w-sm"
      >
        {description}
      </motion.p>
    </div>
  );
}
