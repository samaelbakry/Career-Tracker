import AvailableJobs from "./AvailableJobs";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

export default function JobScreenHeader() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-10">
      <div className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 border-b border-slate-200/80 pb-7 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Career Opportunities</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400 sm:flex">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                Find your next{" "}
                <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  opportunity
                </span>
              </h1>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Search open positions across different departments, experience
              levels, and locations to find the role that fits your career
              goals.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Explore
              </p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Open Positions
              </p>
            </div>
          </div>
        </div>

        <div>
          <AvailableJobs />
        </div>
      </div>
    </section>
  );
}