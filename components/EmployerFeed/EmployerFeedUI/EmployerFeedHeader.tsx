"use client";
import JobFormDialog from "@/components/jobs/JobFormDialog";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { Briefcase, Sparkles } from "lucide-react";

export default function EmployerFeedHeader() {
  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs"],
    queryFn: () => getAllJobs(),
  });

  const total = data?.total ?? 0;
  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/30" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/20" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Employer Dashboard
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                Explore{" "}
                <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  job listings
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                Browse available opportunities, discover talented candidates,
                and manage your hiring activities.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Briefcase className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Total Listings
                </p>

                <p className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                  {isLoading ? "..." : total}
                </p>
              </div>
            </div>

            <DialogButtonTrigger
              Component={JobFormDialog}
              componentProps={{ mode: "create" as const }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
