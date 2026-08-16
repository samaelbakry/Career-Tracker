import AvailableJobs from "./AvailableJobs";
import { Sparkles } from "lucide-react";

export default function JobScreenHeader() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-8 text-center sm:text-left">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Career Opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Available Jobs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed mx-auto sm:mx-0">
            Search open positions across all departments, experience levels, and
            locations to find your next career step.
          </p>
        </div>

        <div>
          <div className="relative flex-1 w-full border-t pt-1">
            <AvailableJobs />
          </div>
        </div>
      </div>
    </section>
  );
}
