interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, description, align = "center" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start max-w-2xl"}`}>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
