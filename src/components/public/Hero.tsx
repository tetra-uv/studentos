import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { APP_ROUTES, PUBLIC_ROUTES } from "../../config/routes";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
            The Operating System for <span className="text-slate-500 dark:text-slate-400">Students</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage your attendance, assignments, and habits in one beautifully designed, lightning-fast workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={APP_ROUTES.DASHBOARD}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900 font-semibold hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Start for free
            </Link>
            <Link
              to={PUBLIC_ROUTES.FEATURES}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-800 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Explore features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
