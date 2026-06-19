import { Hero } from "../../components/public/Hero";
import { SectionHeader } from "../../components/public/SectionHeader";
import { BentoCard } from "../../components/public/BentoCard";
import { AnimatedSection } from "../../components/public/AnimatedSection";
import { DeviceFrame } from "../../components/public/DeviceFrame";
import { BookOpen, CheckSquare, Coffee, Clock } from "lucide-react";
import { Seo } from "../../components/seo/Seo";
import { motion } from "framer-motion";

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
            <div className="w-full mt-6 p-4 rounded-xl border-2 dark:border border-border-strong bg-background flex flex-col gap-3">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Current Status</div>
                  <div className="text-2xl font-bold text-foreground">82.5%</div>
                </div>
                <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  Safe to skip 2
                </div>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden border border-border">
                <div className="h-full bg-indigo-500 w-[82.5%] rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Target: 75%</span>
                <span>33 / 40 Attended</span>
              </div>
            </div>
          </BentoCard>

          {/* Regular Card */}
          <BentoCard 
            title="Assignments"
            description="Never miss a 11:59 PM deadline again. Keep your essays, projects, and homework perfectly organized."
            icon={<CheckSquare className="w-6 h-6 text-emerald-500" />}
            className="min-h-[300px]"
            delay={0.2}
          >
            <div className="w-full mt-6 flex flex-col gap-2">
              <div className="p-3 rounded-lg border-2 dark:border border-border-strong bg-background flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-sm font-medium text-foreground">Calculus Midterm</span>
                </div>
                <span className="text-xs font-bold text-rose-500">Today</span>
              </div>
              <div className="p-3 rounded-lg border-2 dark:border border-border-strong bg-background flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium text-foreground">Physics Lab</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">Tomorrow</span>
              </div>
            </div>
          </BentoCard>

          {/* Regular Card */}
          <BentoCard 
            title="Habits"
            description="Build routines that actually stick. Track your daily progress and become the academic weapon you were meant to be."
            icon={<Coffee className="w-6 h-6 text-amber-500" />}
            className="min-h-[300px]"
            delay={0.3}
          >
            <div className="w-full mt-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-bold text-foreground">Read 10 pages</span>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">🔥 12 Days</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} className={`aspect-square rounded-sm border ${i < 12 ? 'bg-amber-500 border-amber-600' : 'bg-muted border-border-strong'}`} />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Large Card spanning 2 columns */}
          <BentoCard 
            title="Pomodoro"
            description="Lock in. Run deep focus sessions to help you grind through midterms and crush your finals."
            icon={<Clock className="w-6 h-6 text-rose-500" />}
            className="md:col-span-2 min-h-[300px]"
            delay={0.4}
          >
            <div className="w-full mt-6 flex items-center justify-center p-6 rounded-xl border-2 dark:border border-border-strong bg-background">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset="70" className="text-rose-500" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold tracking-tighter text-foreground">25:00</span>
                  <span className="text-[10px] uppercase tracking-widest text-rose-500 font-bold mt-1">Focus</span>
                </div>
              </div>
              <div className="ml-8 flex flex-col gap-4 hidden sm:flex">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Session</div>
                  <div className="text-lg font-bold text-foreground">Deep Work</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Daily Total</div>
                  <div className="text-lg font-bold text-foreground">2h 45m</div>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="container mx-auto px-4 sm:px-6 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">A workspace you'll actually love using</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughtfully designed for deep focus. Available on desktop, tablet, and mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedSection direction="right" className="order-2 lg:order-1 flex justify-center">
             <motion.div
               animate={{ y: [-5, 5] }}
               transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
             >
               <DeviceFrame type="mobile">
                 <div className="w-full h-full flex flex-col bg-background">
                   <div className="p-6 pb-2 border-b-2 dark:border-b border-border-strong flex justify-between items-center">
                     <div className="h-6 w-32 bg-foreground rounded-md" />
                     <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">ST</div>
                   </div>
                   <div className="flex-1 p-4 space-y-4 bg-muted/30">
                     <div className="h-32 w-full bg-card rounded-2xl shadow-sm border-2 dark:border border-border-strong flex p-4 gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
                          <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                          <div className="h-3 w-4/5 bg-muted-foreground/10 rounded" />
                        </div>
                     </div>
                     <div className="h-32 w-full bg-card rounded-2xl shadow-sm border-2 dark:border border-border-strong flex p-4 gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
                          <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                          <div className="h-3 w-2/3 bg-muted-foreground/10 rounded" />
                        </div>
                     </div>
                   </div>
                 </div>
               </DeviceFrame>
             </motion.div>
          </AnimatedSection>
          <AnimatedSection direction="left" className="order-1 lg:order-2">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Your entire academic life, <br />
              <span className="text-primary">in your pocket.</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Install StudentOS as a PWA and get a native app experience. Track attendance on the bus, check assignments between classes, and start Pomodoro sessions at the library.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground border border-border font-medium text-sm">
                  <Clock className="w-4 h-4" /> Pomodoro
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground border border-border font-medium text-sm">
                  <Coffee className="w-4 h-4" /> Habits
               </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Source / Tech Stack Section */}
      <section className="container mx-auto px-4 sm:px-6 mt-12">
        <AnimatedSection direction="up" className="py-20 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Built by students, for students.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              StudentOS is an open-source, local-first application built with the most modern web technologies available. It's lightning fast, fully offline capable, and installs directly to your home screen.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['React', 'TypeScript', 'Zustand', 'TailwindCSS v4', 'PWA', 'IndexedDB (Offline First)'].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-full border-2 dark:border border-border-strong bg-card text-foreground font-semibold shadow-sm hover:bg-accent transition-colors">
                {tech}
              </div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
             <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
             </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Roadmap Timeline Section */}
      <section className="container mx-auto px-4 sm:px-6 mt-12 mb-20">
        <AnimatedSection direction="up" className="py-20 border-t border-border">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">The Master Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are building StudentOS completely in public. Here is our roadmap to creating the ultimate academic operating system.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-12">
              <div className="relative pl-16">
                <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background border-2 border-primary-foreground z-10" />
                <h3 className="text-xl font-bold text-foreground">Phase 1 & 2: Core Foundation (Done)</h3>
                <p className="text-muted-foreground mt-2">Local-first architecture, Attendance, Assignments, Habits, Pomodoro, and PWA support.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background border-2 border-primary-foreground z-10" />
                <h3 className="text-xl font-bold text-foreground">Phase 3: Visual Identity (Current)</h3>
                <p className="text-muted-foreground mt-2">Premium design system, Neo-Brutalist Light Mode, pure Dark Mode, and responsive polish.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-muted border-2 border-border-strong ring-4 ring-background z-10" />
                <h3 className="text-xl font-bold text-foreground opacity-70">Phase 4: Data Architecture</h3>
                <p className="text-muted-foreground mt-2 opacity-70">Migration to IndexedDB object stores, schema versioning, and sync engine preparation.</p>
              </div>
              <div className="relative pl-16">
                <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-muted border-2 border-border-strong ring-4 ring-background z-10" />
                <h3 className="text-xl font-bold text-foreground opacity-70">Future: Cloud Sync & AI</h3>
                <p className="text-muted-foreground mt-2 opacity-70">Real-time cross-device sync via Supabase, shared calendars, and intelligent study suggestions.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
