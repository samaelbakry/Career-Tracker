"use client";

import JobFormDialog from "@/components/jobs/JobFormDialog";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function EmployerFeedHeader() {
  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs"],
    queryFn: () => getAllJobs(),
  });

  const total = data?.total ?? 0;

  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-36 size-104 rounded-full bg-violet-200/35 blur-[100px] dark:bg-violet-600/10" />
        <div className="absolute -bottom-44 left-[20%] size-100 rounded-full bg-blue-200/30 blur-[100px] dark:bg-blue-600/10" />
        <div className="absolute inset-0 bg-[linear-linear(to_right,#94a3b808_1px,transparent_1px),linear-linear(to_bottom,#94a3b808_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_290px] lg:items-center lg:gap-12 lg:p-12">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            The employer space
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.75rem] dark:text-white">
            Great teams start
            <br className="hidden sm:block" /> with{" "}
            <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              the right hire.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            Explore the job market, discover new opportunities, and make your
            next hiring decision with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DialogButtonTrigger
              Component={JobFormDialog}
              componentProps={{ mode: "create" as const }}
            />

            <a
              href="#available-jobs"
              className="group inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-700 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
            >
              Explore listings
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                <TrendingUp className="size-3.5" />
              </span>
              Explore opportunities
            </div>

            <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="size-1.5 rounded-full bg-violet-500" />
              Build your next team
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-violet-200/40 to-blue-200/30 blur-2xl dark:from-violet-500/10 dark:to-blue-500/10" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.04] backdrop-blur-xl sm:p-6 dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Across the platform
                </p>
                <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Job marketplace
                </h2>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <BriefcaseBusiness className="size-5" />
              </div>
            </div>

            <div className="mt-7 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold tracking-[-0.06em] text-slate-950 dark:text-white">
                  {isLoading ? (
                    <span className="inline-block h-11 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
                  ) : (
                    total.toLocaleString()
                  )}
                </span>
                <ArrowUpRight className="mb-2 size-5 text-violet-500" />
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Total job listings
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/70">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                <TrendingUp className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Your next opportunity
                </p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Find a role that moves your team forward.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Career Tracker</span>
              <span className="flex items-center gap-1">
                Discover <ArrowUpRight className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
