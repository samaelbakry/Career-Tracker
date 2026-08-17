"use client";

import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { Briefcase, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import CardSkeleton from "@/components/jobs/CardSkeleton";
import JobCard from "@/components/jobs/JobCard";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import JobFormDialog from "@/components/jobs/JobFormDialog";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const JOBS_PER_PAGE = 6;

export default function EmployerFeed() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs", page],
    queryFn: () => getAllJobs(page, JOBS_PER_PAGE),
  });

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <button
                    type="button"
                    onClick={() => {
                      if (page > 1) {
                        setPage((prev) => prev - 1);
                      }
                    }}
                    disabled={page === 1}
                    className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-xs transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                </PaginationItem>

                <PaginationItem>
                  <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium shadow-xs dark:border-slate-800 dark:bg-slate-900">
                    <span className="text-slate-500 dark:text-slate-400">
                      Page
                    </span>

                    <span className="mx-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                      {page}
                    </span>

                    <span className="text-slate-400">of</span>

                    <span className="ml-1.5 font-semibold text-slate-700 dark:text-slate-200">
                      {totalPages}
                    </span>
                  </div>
                </PaginationItem>

                <PaginationItem>
                  <button
                    type="button"
                    onClick={() => {
                      if (page < totalPages) {
                        setPage((prev) => prev + 1);
                      }
                    }}
                    disabled={page === totalPages}
                    className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-xs transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
}
