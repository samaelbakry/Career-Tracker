"use client";

import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { useState } from "react";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import JobFormDialog from "../jobs/JobFormDialog";
import PaginationBar from "../ui/PaginationBar";
import { Briefcase } from "lucide-react";
import JobCard from "../jobs/JobCard";
import CardSkeleton from "../skeletons/CardSkeleton";

const JOBS_PER_PAGE = 6;

export default function EmployerFeedExplorer() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs", page],
    queryFn: () => getAllJobs(page, JOBS_PER_PAGE),
  });

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(total / JOBS_PER_PAGE);
  return (
    <>
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Available Jobs
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse the latest job opportunities.
            </p>
          </div>

          {!isLoading && jobs.length > 0 && (
            <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:block">
              {jobs.length} on this page
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-950/20" />

            <div className="relative mx-auto flex max-w-md flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                <Briefcase className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No job listings found
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                There are currently no job listings available. Create a new
                opening to start attracting qualified candidates.
              </p>

              <div className="mt-6">
                <DialogButtonTrigger
                  Component={JobFormDialog}
                  componentProps={{ mode: "create" as const }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center border-t border-slate-200 pt-6 dark:border-slate-800">
          <PaginationBar
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  );
}
