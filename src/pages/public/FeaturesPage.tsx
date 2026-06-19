import { Container } from "../../components/ui/Container";
import { SectionHeader } from "../../components/public/SectionHeader";
import { FeatureCard } from "../../components/public/FeatureCard";
import { BookOpen, CheckSquare, Coffee, Clock } from "lucide-react";
import { Seo } from "../../components/seo/Seo";

export default function FeaturesPage() {
  return (
    <Container className="py-24">
      <Seo title="Features" description="Explore everything StudentOS has to offer." />
      <SectionHeader 
        title="Everything you need"
        description="A complete suite of tools designed specifically for students."
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
    </Container>
  );
}
