import { Logo } from "../ui/Logo";

export function Header() {
  return (
    <header className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0 dark:border-slate-800 dark:bg-slate-900 md:h-16 md:px-8">
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="ml-auto flex items-center gap-4">
        {/* Actions placeholder */}
        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
    </header>
  );
}


