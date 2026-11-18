
"use client";

import { useAppSelector } from "@/store/hooks/redux-hooks";

import { useHiringAnalytics } from "@/hooks/employer/hiringAnalytics/useHiringAnalytics";
import { stats } from "@/lib/helpers";

import {
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  FileSearch,
  Percent,
  Sparkles,
} from "lucide-react";

import AnalyticsSkeleton from "@/components/skeletons/AnalyticsSkeleton";
import AnalyticsEmptyState from "@/components/emptyCase/AnalyticsEmptyState";

export default function HiringAnalytics() {
  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useHiringAnalytics(activeCompanyId ?? undefined);

  if (!activeCompanyId) {
    return (
      <AnalyticsEmptyState
        title="Select a company first"
        description="Choose an active company to view its hiring performance and application insights."
        icon={BriefcaseBusiness}
        action={{
          label: "Create company profile",
          href: "/employer/companies",
        }}
      />
    );
  }

  if (analyticsLoading) {
    return <AnalyticsSkeleton />;
  }

  if (analyticsError || !data) {
    return (
      <AnalyticsEmptyState
        title="Analytics are temporarily unavailable"
        description="We couldn't load your hiring statistics right now. Your job listings and applications are not affected."
        icon={AlertCircle}
      />
    );
  }

  const hasApplications = data.totalApplicants > 0;
  const hasJobs = data.topJobs.length > 0;

  if (!hasApplications && !hasJobs) {
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

        <AnalyticsEmptyState
          title="Your hiring insights start here"
          description="Once you publish job listings and receive applications, you'll see your recruitment performance, application pipeline, and most popular jobs here."
          icon={Sparkles}
          action={{
            label: "Create your first job",
            href: "/employer/jobs/create",
          }}
        />
      </section>
    );
  }

  const pipeline = [
    { label: "Applied", count: data.applied, color: "bg-blue-500" },
    { label: "Reviewing", count: data.reviewing, color: "bg-amber-500" },
    { label: "Interview", count: data.interviews, color: "bg-violet-500" },
    { label: "Offer", count: data.offers, color: "bg-emerald-500" },
    { label: "Rejected", count: data.rejected, color: "bg-rose-500" },
  ];

  return (
    <section className="my-10 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Hiring Analytics
          </h2>

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
            Live insights
          </span>
        </div>

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
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
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
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Application Pipeline
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Distribution by current application status.
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
              <BarChart3 className="size-4" />
            </div>
          </div>

          {hasApplications ? (
            pipeline.map((item) => {
              const percentage = Math.round(
                (item.count / data.totalApplicants) * 100,
              );

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
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <FileSearch className="size-5" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                No applications yet
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Your application pipeline will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Top Jobs by Applications
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your most popular job listings.
              </p>
            </div>

            <div className="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400">
              <BriefcaseBusiness className="size-4" />
            </div>
          </div>

          {hasJobs ? (
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
                      className="h-full rounded-full bg-linear-to-r from-blue-600 to-violet-600 transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <BriefcaseBusiness className="size-5" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                No job applications to rank
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Your top-performing jobs will appear here.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800">
            <Percent className="size-4" />
            Interview rate:
            <strong className="text-slate-900 dark:text-white">
              {data.interviewRate}%
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
