import { Link, useLocation } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { PUBLIC_ROUTES, APP_ROUTES } from "../../config/routes";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Features", href: PUBLIC_ROUTES.FEATURES },
  { name: "Roadmap", href: PUBLIC_ROUTES.ROADMAP },
  { name: "Changelog", href: PUBLIC_ROUTES.CHANGELOG },
];

export function PublicNavbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={PUBLIC_ROUTES.HOME} className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-slate-900 dark:hover:text-slate-50 relative py-1 ${
                  location.pathname === link.href
                    ? "text-slate-900 dark:text-slate-50"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {link.name}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-slate-50 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={APP_ROUTES.DASHBOARD}
            className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 hover:scale-105 transition-transform active:scale-95"
          >
            Go to App
          </Link>
        </div>
      </div>
    </header>
  );
}
