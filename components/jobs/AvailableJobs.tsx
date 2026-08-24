"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import JobCard from "./JobCard";
import CardSkeleton from "../skeletons/CardSkeleton";

import { BriefcaseBusiness } from "lucide-react";
import PaginationBar from "../ui/PaginationBar";

const JOBS_PER_PAGE = 6;

export default function AvailableJobs() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs", page],
    queryFn: () => getAllJobs(page, JOBS_PER_PAGE),
  });

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Latest opportunities
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            Browse available positions and find your next role.
          </p>
        </div>

        {total > 0 && (
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            {total} {total === 1 ? "position" : "positions"}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: JOBS_PER_PAGE }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center border-t border-slate-200/80 pt-6 dark:border-slate-800">
              <PaginationBar
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
            <BriefcaseBusiness className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            No jobs available
          </h3>

          <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            There are no open positions available right now. Check back later
            for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
