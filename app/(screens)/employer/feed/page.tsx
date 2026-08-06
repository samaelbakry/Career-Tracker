"use client";

import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { Briefcase, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardSkeleton from "@/components/jobs/CardSkeleton";
import JobCard from "@/components/jobs/JobCard";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import JobFormDialog from "@/components/jobs/JobFormDialog";

export default function EmployerFeed() {
  const { data: jobs, isLoading } = useFetch({
    queryFn: getAllJobs,
    queryKey: ["getAllJobs"],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDE9FB] px-3 py-1 text-xs font-semibold text-[#6C4FD6]">
              <Sparkles className="h-3.5 w-3.5" />
              Employer Dashboard
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#1E2A5E] sm:text-3xl">
            Active Job Listings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your open positions, track applicants, and review job performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Briefcase className="h-4 w-4 text-[#6C4FD6]" />
            <span>Total Listings:</span>
            <span className="font-bold text-[#1E2A5E]">
              {isLoading ? "..." : jobs?.length ?? 0}
            </span>
          </div>

         <DialogButtonTrigger Component={JobFormDialog} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE9FB] text-[#6C4FD6]">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[#1E2A5E]">
            No job listings found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Get started by posting your first job opening to find qualified candidates.
          </p>
          <Button className="mt-6 rounded-xl bg-[#6C4FD6] text-white hover:bg-[#5b40c2]">
            Post a Job
          </Button>
        </div>
      )}
    </div>
  );
}