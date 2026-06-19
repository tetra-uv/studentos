import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { APP_ROUTES } from "../../config/routes";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 hidden sm:flex">
      <ol className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
        <li>
          <Link
            to={APP_ROUTES.DASHBOARD}
            className="flex items-center hover:text-slate-900 dark:hover:text-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
            aria-label="Dashboard"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.slice(1).map((value, index) => {
          const to = `/app/${pathnames.slice(1, index + 2).join("/")}`;
          const isLast = index === pathnames.length - 2;

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {isLast ? (
                <span className="font-medium text-slate-900 dark:text-slate-50 capitalize" aria-current="page">
                  {value}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded capitalize"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
