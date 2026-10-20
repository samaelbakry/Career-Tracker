"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCompanyOwner } from "@/services/companies";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";

import { useHiringAnalytics } from "@/hooks/employer/hiringAnalytics/useHiringAnalytics";
import { AlertCircle, Percent } from "lucide-react";
import { stats } from "@/lib/helpers";

export default function HiringAnalytics() {
  const userId = useAppSelector(selectedUser)?.id;

  const {
    data: company,
    isLoading: companyLoading,
    isError: companyError,
  } = useFetch({
    queryKey: ["employerCompany", userId],
    queryFn: () => getCompanyOwner(userId!),
    enabled: !!userId,
  });

  const {
    data,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useHiringAnalytics(company?.id);

  if (companyLoading || analyticsLoading) {
    return (
      <div className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (companyError || analyticsError || !data) {
    return (
      <div className="my-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30">
        <AlertCircle className="size-5 shrink-0" />
        Failed to load hiring analytics.
      </div>
    );
  }

  return (
    <section className="my-10 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hiring Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Understand your recruitment performance at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats(data).map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Application Pipeline
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Distribution by current application status.
          </p>

          {[
            { label: "Applied", count: data.applied, color: "bg-blue-500" },
            {
              label: "Reviewing",
              count: data.reviewing,
              color: "bg-amber-500",
            },
            {
              label: "Interview",
              count: data.interviews,
              color: "bg-violet-500",
            },
            { label: "Offer", count: data.offers, color: "bg-emerald-500" },
            { label: "Rejected", count: data.rejected, color: "bg-rose-500" },
          ].map((item) => {
            const percentage = data.totalApplicants
              ? Math.round((item.count / data.totalApplicants) * 100)
              : 0;

            return (
              <div key={item.label} className="mt-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.count} · {percentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Top Jobs by Applications
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your most popular job listings.
          </p>

          {data.topJobs.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              No applications yet.
            </p>
          ) : (
            data.topJobs.map((job, index) => {
              const maxApplicants = data.topJobs[0].applicants;
              const width = maxApplicants
                ? (job.applicants / maxApplicants) * 100
                : 0;

              return (
                <div key={job.jobId} className="mt-5 space-y-2">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="truncate text-slate-700 dark:text-slate-200">
                      {index + 1}. {job.title}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {job.applicants}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-blue-600 to-violet-600"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}

          <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800">
            <Percent className="size-4" />
            Interview rate:{" "}
            <strong className="text-slate-900 dark:text-white">
              {data.interviewRate}%
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
