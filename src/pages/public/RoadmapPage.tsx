import { SectionHeader } from "../../components/public/SectionHeader";

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="Roadmap"
        description="What we're building next."
      />
      <div className="mt-12 space-y-8">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Q3 2026</h3>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
            <li>Public Website Launch (Phase 3)</li>
            <li>Cloud Sync & Accounts</li>
            <li>Dark Mode Polish</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 opacity-70">
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Q4 2026</h3>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
            <li>Mobile Apps (iOS & Android)</li>
            <li>Calendar Integration</li>
            <li>Advanced Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
