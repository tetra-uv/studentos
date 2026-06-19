import { SectionHeader } from "../../components/public/SectionHeader";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="Contact Us"
        description="We'd love to hear from you."
      />
      <div className="mt-12 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          Have a question, feedback, or need support? Reach out to us directly.
        </p>
        <a href="mailto:support@studentos.com" className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 font-medium hover:opacity-90 transition-opacity">
          support@studentos.com
        </a>
      </div>
    </div>
  );
}
