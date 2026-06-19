import { SectionHeader } from "../../components/public/SectionHeader";
import { Seo } from "../../components/seo/Seo";

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <Seo title="Changelog" description="See what's new in StudentOS." />
      <SectionHeader 
        title="Changelog"
        description="New updates and improvements."
      />
      <div className="mt-12 space-y-8">
        <div className="border-l-2 border-border pl-6 pb-6">
          <span className="text-sm font-medium text-muted-foreground mb-2 block">June 2026</span>
          <h3 className="text-xl font-semibold mb-2 text-foreground">Public Website Launch</h3>
          <p className="text-muted-foreground leading-relaxed">
            We've completely redesigned our public website to better showcase the features of StudentOS. The new site features a clean, minimal design and improved performance.
          </p>
        </div>
      </div>
    </div>
  );
}
