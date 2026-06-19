import { SectionHeader } from "../../components/public/SectionHeader";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <SectionHeader 
        title="About StudentOS"
        description="Built by students, for students."
      />
      <div className="mt-12 prose dark:prose-invert prose-slate mx-auto">
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          StudentOS started with a simple idea: students need better tools. Most academic software is outdated, clunky, and hard to use. We wanted to build something different.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Our mission is to empower students with a beautifully designed, fast, and reliable workspace to manage their attendance, assignments, and habits. We believe that good design can make studying less stressful and more enjoyable.
        </p>
      </div>
    </div>
  );
}
