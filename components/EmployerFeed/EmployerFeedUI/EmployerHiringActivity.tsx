"use client";

import { useFetch } from "@/hooks/useFetch";
import { getEmployerHiringActivity } from "@/services/hiringActivity";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Clock3,
  Users,
} from "lucide-react";
import EmployerHiringEmptyState from "./EmployerHiringEmptyState";

function ActivitySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="size-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
          <div className="mt-5 h-6 w-20 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-3 w-32 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default function EmployerHiringActivity() {
  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data: activity,
    isLoading,
    isError,
    refetch,
  } = useFetch({
    queryKey: ["employerHiringActivity", activeCompanyId!],
    queryFn: () => getEmployerHiringActivity(activeCompanyId!),
    enabled: !!activeCompanyId,
  });


  const stats = [
    {
      label: "New applications",
      description: "Received in the last 7 days",
      value: activity?.newApplications ?? 0,
      icon: Users,
      accent:
        "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300",
    },
    {
      label: "Under review",
      description: "Awaiting your evaluation",
      value: activity?.underReview ?? 0,
      icon: Clock3,
      accent:
        "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    },
    {
      label: "Interview stage",
      description: "Applications at interview stage",
      value: activity?.interviewStage ?? 0,
      icon: CalendarClock,
      accent:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    },
  ];

  return (
    <section className="mt-10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
            <Activity className="size-3.5" />
            Your hiring overview
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Hiring activity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A snapshot of your candidate pipeline.
          </p>
        </div>

        {!isLoading && !isError && activity && (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <BriefcaseBusiness className="size-4" />
            <span>
              {activity.totalApplications.toLocaleString()} total applications
            </span>
          </div>
        )}
      </div>

      {!activeCompanyId ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400">
            <Building2 className="size-6" />
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Select a company first
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Choose an active company to view its hiring activity and candidate
            pipeline.
          </p>
        </div>
      ) : isLoading ? (
        <ActivitySkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900/50 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            We couldn&apos;t load your hiring activity.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
          >
            Try again
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      ) : !activity ? (
        <EmployerHiringEmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>

                    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${stat.accent}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </p>

                  <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
