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
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl"
            >
              Start for free
            </Link>
            <Link
              to={PUBLIC_ROUTES.FEATURES}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-card text-foreground border border-border font-semibold hover:bg-muted transition-colors"
            >
              Explore features
            </Link>
          </div>
        </AnimatedSection>

        {/* Device Showcase */}
        <AnimatedSection direction="up" delay={0.2} className="mt-16 mx-auto px-4 sm:px-0">
          <DeviceFrame type="desktop">
            <div className="w-full h-full bg-muted flex items-center justify-center border-t border-border">
               {/* Minimal abstract representation of the app inside the frame */}
               <div className="w-full max-w-3xl h-3/4 border border-border rounded-2xl bg-card shadow-sm flex overflow-hidden">
                 <div className="w-48 h-full border-r border-border bg-background hidden md:block"></div>
                 <div className="flex-1 p-8 flex flex-col gap-6">
                    <div className="w-1/3 h-8 bg-muted rounded-lg border border-border"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-muted rounded-xl border border-border"></div>
                      <div className="h-24 bg-muted rounded-xl border border-border"></div>
                      <div className="h-24 bg-muted rounded-xl border border-border"></div>
                    </div>
                    <div className="w-full flex-1 bg-muted rounded-xl border border-border"></div>
                 </div>
               </div>
            </div>
          </DeviceFrame>
        </AnimatedSection>
      </div>
    </section>
  );
}
