"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import JobCard from "./JobCard";
import CardSkeleton from "../skeletons/CardSkeleton";

import { BriefcaseBusiness, Sparkles } from "lucide-react";
import PaginationBar from "../ui/PaginationBar";
import ProfileCompletionCard from "../dashboard/JobSeeker/profileOptimization/ProfileCompletionCard";

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
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-5 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-400">
            <Sparkles size={12} />
            Explore Roles
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-slate-100 sm:text-2xl">
            Latest Opportunities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Browse available positions and find your next career step.
          </p>
        </div>

        {total > 0 && (
          <span className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {total} {total === 1 ? "position" : "positions"}
          </span>
        )}
      </div>

      <ProfileCompletionCard />

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
        <div className="relative isolate overflow-hidden flex min-h-70 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner dark:bg-blue-950/50 dark:text-blue-400">
            <BriefcaseBusiness className="h-7 w-7" />
          </div>

          <h3 className="mt-4 text-base font-black text-slate-900 dark:text-slate-100 sm:text-lg">
            No jobs available
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
            There are no open positions available right now. Check back later
            for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
}