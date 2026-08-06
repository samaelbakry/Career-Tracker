"use client";

import CardSkeleton from "@/components/jobs/CardSkeleton";
import JobCard from "@/components/jobs/JobCard";
import JobFormDialog from "@/components/jobs/JobFormDialog";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { useFetch } from "@/hooks/useFetch";
import { getEmployerJobs } from "@/services/jobs";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Briefcase, AlertCircle, PlusCircle } from "lucide-react";

export default function PostJob() {
  const userId = useAppSelector(selectedUser)?.id;

  const {
    data: employerJobs,
    isLoading,
    isError,
    error,
  } = useFetch({
    queryKey: ["employerJobs", userId],
    queryFn: () => getEmployerJobs(userId!),
    enabled: !!userId,
  });

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-stone-800 dark:text-stone-200 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
                <section className="relative overflow-hidden pt-4 pb-2 text-center sm:text-left space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-sm border border-indigo-100 dark:border-indigo-900/50">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Hiring Portal</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Manage Job Listings
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-base sm:text-xl text-stone-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed mx-auto sm:mx-0">
                Reach qualified candidates by creating new job postings and reviewing your active listings.
              </p>
              
              <div className="flex justify-center sm:justify-end shrink-0">
                <DialogButtonTrigger Component={JobFormDialog} />
              </div>
            </div>
          </div>
        </section>

        {isError && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>Failed to load your jobs: {(error as Error)?.message || "Something went wrong."}</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : employerJobs && employerJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          !isError && (
            <div className="text-center py-16 px-4 border border-dashed border-stone-300 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mx-auto">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No job openings yet</h3>
                <p className="text-sm text-stone-500 dark:text-slate-400 max-w-sm mx-auto">
                  Get started by posting your first job listing to connect with talent.
                </p>
              </div>
            
            </div>
          )
        )}

      </div>
    </main>
  );
}