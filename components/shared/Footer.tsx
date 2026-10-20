import { Briefcase, Globe, Share2, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 font-sans text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-900 text-white shadow-sm dark:bg-blue-600">
                <Briefcase size={15} />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Career Tracker
              </span>
            </div>
            <span className="hidden text-slate-300 sm:inline dark:text-slate-700">|</span>
            <p className="max-w-md text-slate-500 dark:text-slate-400">
              The modern job application workspace for professionals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-600 dark:text-slate-300">
            <a href="#product" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Product
            </a>
            <a href="#resources" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Resources
            </a>
            <a href="#company" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Company
            </a>
            <a href="#privacy" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Privacy
            </a>
            <a href="#terms" className="transition-colors hover:text-slate-900 dark:hover:text-white">
              Terms
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800/80">
          <p className="text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Career Tracker Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <a href="#" aria-label="Website" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
                <Globe size={16} />
              </a>
              <a href="#" aria-label="Social Share" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
                <Share2 size={16} />
              </a>
              <a href="#" aria-label="Community" className="transition-colors hover:text-slate-600 dark:hover:text-slate-300">
                <MessageSquare size={16} />
              </a>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50/50 px-2.5 py-1 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}