
"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
  Building2,
  Loader2,
} from "lucide-react";

import Link from "next/link";

import JobFormDialog from "../jobs/JobFormDialog";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import EmployerCompanySwitcher from "@/components/companies/companiesFeed/EmployerCompanySwitcher";

import { useFetch } from "@/hooks/useFetch";
import { getEmployerJobs } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { Job } from "@/types/jobs";

export default function JobListingsHeader() {
  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data: employerJobs,
    isLoading: jobsLoading,
    isError: jobsError,
  } = useFetch<Job[]>({
    queryKey: ["employerJobs", activeCompanyId!],
    queryFn: () => getEmployerJobs(activeCompanyId!),
    enabled: !!activeCompanyId,
  });


  const totalListings = employerJobs?.length ?? 0;

  const activeListings =
    employerJobs?.filter((job) => job.status === "open").length ?? 0;

  const hasCompany = !!activeCompanyId;

  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-36 size-104 rounded-full bg-violet-200/35 blur-[100px] dark:bg-violet-600/10" />
        <div className="absolute -bottom-44 left-[20%] size-100 rounded-full bg-blue-200/30 blur-[100px] dark:bg-blue-600/10" />
      </div>

      <div className="relative p-6 pb-0 sm:px-9 lg:px-12">
        <div className="max-w-sm">
          <EmployerCompanySwitcher />
        </div>
      </div>

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_290px] lg:items-center lg:gap-12 lg:p-12">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            Hiring Management
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.75rem] dark:text-white">
            Build your team
            <br className="hidden sm:block" /> with{" "}
            <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              the right talent.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            Create job opportunities, manage your listings, and keep track of
            your hiring activity — all from one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {jobsLoading && hasCompany ? (
              <button
                disabled
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white opacity-70"
              >
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </button>
            ) : hasCompany ? (
              <DialogButtonTrigger
                Component={JobFormDialog}
                componentProps={{ mode: "create" as const }}
                title="Add job post"
              />
            ) : (
              <Link
                href="/employer/companies"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-700"
              >
                <Building2 className="size-4" />
                Create company
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}

            <a
              href="#job-listings"
              className="group inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-700 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
            >
              View your listings
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {jobsError && (
            <p className="mt-3 text-xs text-red-500">
              We couldn&apos;t load your job listings. Please try again.
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
              </span>
              Manage active opportunities
            </div>

            <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="size-1.5 rounded-full bg-violet-500" />
              Find your next great hire
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-violet-200/40 to-blue-200/30 blur-2xl dark:from-violet-500/10 dark:to-blue-500/10" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.04] backdrop-blur-xl sm:p-6 dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Your hiring overview
                </p>

                <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Job listings
                </h2>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <BriefcaseBusiness className="size-5" />
              </div>
            </div>

            <div className="mt-7 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold tracking-[-0.06em] text-slate-950 dark:text-white">
                  {jobsLoading ? (
                    <span className="inline-block h-11 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
                  ) : (
                    totalListings.toLocaleString()
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
                <CheckCircle2 className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Active opportunities
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {jobsLoading ? (
                    <span className="inline-block h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  ) : (
                    `${activeListings} currently open`
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Career Tracker</span>

              <span className="flex items-center gap-1">
                Hiring dashboard
                <ArrowUpRight className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
