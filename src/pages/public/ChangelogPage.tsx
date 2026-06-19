import { SectionHeader } from "../../components/public/SectionHeader";

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="Changelog"
        description="New updates and improvements."
      />
      <div className="mt-12 space-y-8">
        <div className="border-l-2 border-slate-200 dark:border-slate-800 pl-6 pb-6">
          <span className="text-sm font-medium text-slate-500 mb-2 block">June 2026</span>
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Public Website Launch</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We've completely redesigned our public website to better showcase the features of StudentOS. The new site features a clean, minimal design and improved performance.
          </p>
        </div>
      </div>
    </div>
  );
}
