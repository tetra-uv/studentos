import { SectionHeader } from "../../components/public/SectionHeader";
import { FeatureCard } from "../../components/public/FeatureCard";
import { BookOpen, CheckSquare, Coffee, Clock } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32">
      <SectionHeader 
        title="Features"
        description="Everything you need to manage your academic life, built directly into one fast and reliable workspace."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <FeatureCard 
          title="Attendance"
          description="Track your classes, calculate percentages, and never miss a requirement."
          icon={<BookOpen className="w-6 h-6" />}
        />
        <FeatureCard 
          title="Assignments"
          description="Manage deadlines, organize tasks, and stay on top of your coursework."
          icon={<CheckSquare className="w-6 h-6" />}
        />
        <FeatureCard 
          title="Habits"
          description="Build positive routines and track your daily progress consistently."
          icon={<Coffee className="w-6 h-6" />}
        />
        <FeatureCard 
          title="Pomodoro"
          description="Focus better with customizable study sessions and breaks."
          icon={<Clock className="w-6 h-6" />}
        />
      </div>
    </div>
  );
}
