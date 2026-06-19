import { Hero } from "../../components/public/Hero";
import { SectionHeader } from "../../components/public/SectionHeader";
import { BentoCard } from "../../components/public/BentoCard";
import { AnimatedSection } from "../../components/public/AnimatedSection";
import { DeviceFrame } from "../../components/public/DeviceFrame";
import { BookOpen, CheckSquare, Coffee, Clock } from "lucide-react";
import { Seo } from "../../components/seo/Seo";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24 overflow-x-hidden">
      <Seo />
      <Hero />
      
      <section className="container mx-auto px-4 sm:px-6">
        <AnimatedSection direction="up">
          <SectionHeader 
            title="Everything you need to survive the semester"
            description="Ditch the messy spreadsheets and scattered notes. StudentOS brings your entire academic life into focus."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Large Card spanning 2 columns */}
          <BentoCard 
            title="Attendance"
            description="Track attendance without the math anxiety. Know exactly how many classes you can afford to skip while keeping your grades intact."
            icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
            className="md:col-span-2 min-h-[300px]"
            delay={0.1}
          >
            <div className="w-full h-32 bg-muted rounded-xl border border-border-strong mt-4 overflow-hidden relative">
              <div className="absolute left-0 bottom-0 top-0 w-3/4 bg-indigo-500/10 border-r border-indigo-500/20" />
            </div>
          </BentoCard>

          {/* Regular Card */}
          <BentoCard 
            title="Assignments"
            description="Never miss a 11:59 PM deadline again. Keep your essays, projects, and homework perfectly organized."
            icon={<CheckSquare className="w-6 h-6 text-emerald-500" />}
            className="min-h-[300px]"
            delay={0.2}
          />

          {/* Regular Card */}
          <BentoCard 
            title="Habits"
            description="Build routines that actually stick. Track your daily progress and become the academic weapon you were meant to be."
            icon={<Coffee className="w-6 h-6 text-amber-500" />}
            className="min-h-[300px]"
            delay={0.3}
          />

          {/* Large Card spanning 2 columns */}
          <BentoCard 
            title="Pomodoro"
            description="Lock in. Run deep focus sessions to help you grind through midterms and crush your finals."
            icon={<Clock className="w-6 h-6 text-rose-500" />}
            className="md:col-span-2 min-h-[300px]"
            delay={0.4}
          >
            <div className="w-full h-32 bg-muted rounded-xl border border-border-strong mt-4 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-rose-500/20 border-t-rose-500" />
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Mobile App Showcase Section */}
      <section className="container mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" className="order-2 lg:order-1 flex justify-center">
             <DeviceFrame type="mobile">
               <div className="w-full h-full flex flex-col bg-background">
                 <div className="p-6 pb-2 border-b border-border">
                   <div className="h-6 w-32 bg-muted rounded-md" />
                 </div>
                 <div className="flex-1 p-4 space-y-4">
                   <div className="h-24 w-full bg-card rounded-xl shadow-sm border border-border" />
                   <div className="h-24 w-full bg-card rounded-xl shadow-sm border border-border" />
                   <div className="h-24 w-full bg-card rounded-xl shadow-sm border border-border" />
                 </div>
               </div>
             </DeviceFrame>
          </AnimatedSection>
          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Beautifully responsive <br />
              <span className="text-muted-foreground">on any device</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Whether you're at your desk or on the go, StudentOS adapts perfectly to your screen. Install it as a PWA on your phone for a native app experience.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
