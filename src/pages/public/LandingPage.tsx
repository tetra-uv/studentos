import { Hero } from "../../components/public/Hero";
import { FeatureCard } from "../../components/public/FeatureCard";
import { SectionHeader } from "../../components/public/SectionHeader";
import { BookOpen, CheckSquare, Coffee, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      
      <section className="container mx-auto px-4 sm:px-6">
        <SectionHeader 
          title="Everything you need to excel"
          description="A complete suite of tools designed specifically for students to manage their academic life."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <FeatureCard 
            title="Attendance"
            description="Track your classes, calculate percentages, and never miss a requirement."
            icon={<BookOpen className="w-6 h-6" />}
            delay={0.1}
          />
          <FeatureCard 
            title="Assignments"
            description="Manage deadlines, organize tasks, and stay on top of your coursework."
            icon={<CheckSquare className="w-6 h-6" />}
            delay={0.2}
          />
          <FeatureCard 
            title="Habits"
            description="Build positive routines and track your daily progress consistently."
            icon={<Coffee className="w-6 h-6" />}
            delay={0.3}
          />
          <FeatureCard 
            title="Pomodoro"
            description="Focus better with customizable study sessions and breaks."
            icon={<Clock className="w-6 h-6" />}
            delay={0.4}
          />
        </div>
      </section>
    </div>
  );
}
