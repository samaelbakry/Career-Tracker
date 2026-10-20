
"use client";

import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getEmployerJobStats } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";

import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  CircleX,
  TrendingUp,
} from "lucide-react";

import JobStatusCard from "./JobStatusCard";

export default function JobStatus() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data, isLoading, error } = useFetch({
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      return getEmployerJobStats(userId);
    },
    queryKey: ["employerJobStats", userId],
    enabled: !!userId,
  });

  const statCards = [
    {
      id: "total",
      title: "Total Jobs",
      count: data?.totalJobs ?? 0,
      description: "All job posts created",
      icon: <BriefcaseBusiness className="size-5" />,
      accent: "violet" as const,
    },
    {
      id: "active",
      title: "Active Jobs",
      count: data?.activeJobs ?? 0,
      description: "Currently open listings",
      icon: <CheckCircle2 className="size-5" />,
      accent: "emerald" as const,
    },
    {
      id: "closed",
      title: "Closed Jobs",
      count: data?.closedJobs ?? 0,
      description: "Filled or ended listings",
      icon: <CircleX className="size-5" />,
      accent: "amber" as const,
    },
  ];

  return (
    <section className="my-10 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <TrendingUp className="size-4" />
            <span>Recruitment overview</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Job Postings
            <span className="text-slate-400 dark:text-slate-500">
              {" "} & Status
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Keep track of your vacancies and monitor your companyA&apos;s hiring activity.
          </p>
        </div>

        {!isLoading && !error && (
          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>
              {data?.activeJobs ?? 0} active vacancies
            </span>
          </div>
        )}
      </div>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">
              Unable to load job statistics
            </p>
            <p className="mt-1 opacity-80">
              Please try again later.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : statCards.map((stat) => (
                <JobStatusCard
                  key={stat.id}
                  title={stat.title}
                  count={stat.count}
                  description={stat.description}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              ))}
        </div>
      )}
    </section>
  );
}
