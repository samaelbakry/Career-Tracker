"use client";

import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { CompanyFormDialog } from "./CompanyFormDialog";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export default function CompanyHeader() {
  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10" />

        <div className="absolute inset-0 bg-[radial-linear(#94a3b8_0.7px,transparent_0.7px)] [background-size:22px_22px] opacity-[0.13] dark:opacity-[0.08]" />
      </div>

      <div className="relative grid gap-10 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center lg:px-12 lg:py-12">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3.5 py-2 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Your next opportunity starts here
            <span className="h-1 w-1 rounded-full bg-indigo-500" />
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[3.5rem]">
            Find the companies
            <span className="mt-1 block bg-linear-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text pb-1 text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-blue-400">
              shaping your future.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Explore organizations, discover their culture, compare company
            details, and find opportunities that match your career goals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DialogButtonTrigger
              Component={CompanyFormDialog}
              componentProps={{ mode: "create" as const }}
            />

            <a
              href="#companies-explorer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50/70 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:bg-slate-800"
            >
              Explore directory
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200/80 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Building2 className="h-4 w-4 text-indigo-500" />
              Company profiles
            </div>

            <span className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Users className="h-4 w-4 text-violet-500" />
              Career opportunities
            </div>

            <span className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Career growth
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-xl shadow-indigo-950/5 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/10 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Career discovery
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  Your next move
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Explore companies
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Discover teams and industries
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Find your fit
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Compare details and opportunities
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Ready for your next step?</p>
                  <p className="mt-1 text-xs leading-5 text-indigo-100">
                    Start exploring the directory today.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 -top-3 -z-10 h-20 w-20 rounded-full border border-indigo-200/60 dark:border-indigo-400/20" />
          <div className="absolute -bottom-3 -left-3 -z-10 h-14 w-14 rounded-full border border-violet-200/60 dark:border-violet-400/20" />
        </div>
      </div>
    </section>
  );
}