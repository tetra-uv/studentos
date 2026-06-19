import { Link } from "react-router-dom";
import { APP_ROUTES, PUBLIC_ROUTES } from "../../config/routes";
import { AnimatedSection } from "./AnimatedSection";
import { DeviceFrame } from "./DeviceFrame";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <AnimatedSection direction="up" className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium text-foreground mb-8 ring-1 ring-inset ring-border shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            StudentOS 1.0 is here
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6">
            Ace your classes. <br className="hidden sm:block" />
            <span className="text-muted-foreground italic font-serif pr-2 font-normal">Own</span> 
            your time.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate all-in-one workspace built specifically for students. Manage your attendance, assignments, and focus—all in one beautifully designed app.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              to={APP_ROUTES.DASHBOARD}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 dark:border border-border-strong bg-primary text-primary-foreground font-bold hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:hover:shadow-none transition-all flex items-center justify-center gap-2"
            >
              Start using StudentOS
            </Link>
            <Link
              to={PUBLIC_ROUTES.FEATURES}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 dark:border border-border-strong bg-card text-foreground font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              Explore features
            </Link>
          </div>
        </AnimatedSection>

        {/* Device Showcase */}
        <AnimatedSection direction="up" delay={0.2} className="mt-16 mx-auto px-4 sm:px-0">
          <DeviceFrame type="desktop">
            <div className="w-full h-full bg-background flex flex-col border-t-2 dark:border-t border-border-strong">
               {/* App Header */}
               <div className="h-14 border-b-2 dark:border-b border-border-strong bg-card flex items-center px-6 gap-4">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-rose-500 border border-border-strong" />
                   <div className="w-3 h-3 rounded-full bg-amber-500 border border-border-strong" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500 border border-border-strong" />
                 </div>
                 <div className="h-6 w-64 bg-muted border border-border-strong rounded-md mx-auto" />
               </div>
               
               {/* App Body */}
               <div className="flex-1 flex overflow-hidden">
                 {/* Sidebar */}
                 <div className="w-64 h-full border-r-2 dark:border-r border-border-strong bg-card hidden md:flex flex-col p-4 gap-2">
                   <div className="h-8 bg-muted rounded border border-border-strong mb-4" />
                   <div className="h-10 bg-primary/10 border border-primary/20 rounded-lg" />
                   <div className="h-10 bg-muted/50 rounded-lg" />
                   <div className="h-10 bg-muted/50 rounded-lg" />
                   <div className="h-10 bg-muted/50 rounded-lg" />
                 </div>
                 
                 {/* Main Content */}
                 <div className="flex-1 bg-background p-8 flex flex-col gap-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="h-8 w-48 bg-foreground rounded-lg" />
                        <div className="h-4 w-64 bg-muted-foreground/30 rounded" />
                      </div>
                      <div className="h-10 w-32 bg-primary rounded-xl" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="h-32 bg-card rounded-2xl border-2 dark:border border-border-strong p-4 flex flex-col justify-between">
                         <div className="h-10 w-10 bg-indigo-500/20 rounded-lg border border-indigo-500/30" />
                         <div className="h-4 w-24 bg-muted-foreground/30 rounded" />
                      </div>
                      <div className="h-32 bg-card rounded-2xl border-2 dark:border border-border-strong p-4 flex flex-col justify-between">
                         <div className="h-10 w-10 bg-emerald-500/20 rounded-lg border border-emerald-500/30" />
                         <div className="h-4 w-24 bg-muted-foreground/30 rounded" />
                      </div>
                      <div className="h-32 bg-card rounded-2xl border-2 dark:border border-border-strong p-4 flex flex-col justify-between">
                         <div className="h-10 w-10 bg-amber-500/20 rounded-lg border border-amber-500/30" />
                         <div className="h-4 w-24 bg-muted-foreground/30 rounded" />
                      </div>
                    </div>
                    
                    <div className="w-full flex-1 bg-card rounded-2xl border-2 dark:border border-border-strong flex flex-col p-6 gap-4">
                       <div className="h-6 w-48 bg-foreground/80 rounded" />
                       <div className="flex-1 bg-muted/30 rounded-xl border border-border-strong" />
                    </div>
                 </div>
               </div>
            </div>
          </DeviceFrame>
        </AnimatedSection>
      </div>
    </section>
  );
}
