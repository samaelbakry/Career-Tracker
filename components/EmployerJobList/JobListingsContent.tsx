"use client"

import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import JobFormDialog from "../jobs/JobFormDialog";
import { AlertCircle, BriefcaseBusiness } from "lucide-react";
import JobCard from "../jobs/JobCard";
import CardSkeleton from "../skeletons/CardSkeleton";
import { getEmployerJobs } from "@/services/employer";
import { useFetch } from "@/hooks/useFetch";
import { Job } from "@/types/jobs";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";

export default function JobListingsContent() {
  const userId = useAppSelector(selectedUser)?.id;

  const {
    data: employerJobs,
    isLoading,
    isError,
    error,
  } = useFetch<Job[]>({
    queryKey: ["employerJobs", userId],
    queryFn: () => getEmployerJobs(userId!),
    enabled: !!userId,
  });
  return (
    <>
      {isError && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>

          <div className="pt-1">
            <p className="font-semibold">Unable to load your jobs</p>
            <p className="mt-0.5 text-red-600/80 dark:text-red-400/80">
              {(error as Error)?.message || "Something went wrong."}
            </p>
          </div>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Your Job Listings
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage the opportunities you currently have posted.
            </p>
          </div>

          {!isLoading && employerJobs && employerJobs.length > 0 && (
            <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:block">
              {employerJobs.length}{" "}
              {employerJobs.length === 1 ? "listing" : "listings"}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : employerJobs && employerJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {employerJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          !isError && (
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-950/20" />

              <div className="relative mx-auto flex max-w-md flex-col items-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                  <BriefcaseBusiness className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No job openings yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  You haven&apos;t posted any jobs yet. Create your first
                  listing and start connecting with qualified candidates.
                </p>

                <div className="mt-6">
                  <DialogButtonTrigger
                    Component={JobFormDialog}
                    componentProps={{ mode: "create" as const }}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
}
