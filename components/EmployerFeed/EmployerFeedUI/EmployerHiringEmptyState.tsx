import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Sparkles, Users } from "lucide-react";

export default function EmployerHiringEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900 sm:p-9">
      <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-violet-100/60 blur-3xl dark:bg-violet-500/10" />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            Your hiring journey starts here
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ready to find your next great hire?
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
            You haven&apos;t published any job openings yet. Create your first
            job post and start receiving applications from talented candidates.
            Your hiring activity will appear here automatically.
          </p>

          <Link
            href="/employer/postJob"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-500"
          >
            <BriefcaseBusiness className="size-4" />
            Post your first job
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-72">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <BriefcaseBusiness className="size-5 text-violet-500" />
            <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
              Publish a job
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Create your first opening
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <Users className="size-5 text-emerald-500" />
            <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
              Meet candidates
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Start building your team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
