"use client";

import { useFetch } from "@/hooks/useFetch";
import { getsavedJob } from "@/services/savedJobs";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { BookmarkX, Briefcase, BriefcaseBusiness, Building2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SavedJobs() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: savedJobs, isLoading } = useFetch({
    queryKey: ["getSavedJobs", userId],
    queryFn: () => getsavedJob(userId!),
    enabled: !!userId,
  });

  const total = savedJobs?.length ?? 0;

  return (
    <main className="max-w-8xl mx-auto space-y-2 mt-5 min-h-screen">

    <section className="relative overflow-hidden py-10 sm:py-10 ">
      <div className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-8 px-4 sm:px-6">
        <div className="flex flex-col gap-6 border-b border-slate-200/80 pb-7 dark:border-slate-800 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Bookmarked Roles</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400 sm:flex">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
                Your saved{" "}
                <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  opportunities
                </span>
              </h1>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Manage and keep track of all the roles you&apos;ve bookmarked across different departments and locations.
            </p>
          </div>

          {!isLoading && total > 0 && (
            <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Total Saved
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {total} {total === 1 ? "position" : "positions"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Saved Positions
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Review your bookmarked jobs and take the next step in your application.
              </p>
            </div>

            {total > 0 && (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                {total} {total === 1 ? "position" : "positions"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="size-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
                      <div className="size-9 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-5 w-48 rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3.5 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
                      <div className="h-3.5 w-20 rounded-md bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !savedJobs || savedJobs.length === 0 ? (
            <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                <BookmarkX className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                No jobs saved yet
              </h3>

              <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Click the bookmark icon on any job posting to save it here for quick access later.
              </p>

              <Link
                href="/jobSeeker/jobs"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
              >
                Explore Available Jobs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {savedJobs.map(({ id, job: jobData }) => {
                const job = Array.isArray(jobData) ? jobData[0] : jobData;
                if (!job) return null;

                const company = Array.isArray(job.company) ? job.company[0] : job.company;

                return (
                  <article
                    key={id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                          {company?.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={company.name || "Company Logo"}
                              className="object-cover"
                            />
                          ) : (
                            <Building2 className="size-6 text-slate-400 dark:text-slate-500" />
                          )}
                        </div>

                        
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            {company?.name || "Company"}
                          </span>
                          <span className="inline-block size-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-xs capitalize text-slate-500 dark:text-slate-400">
                            {job.employment_type}
                          </span>
                        </div>

                        <Link
                          href={`/jobs/${job.id}`}
                          className="block transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                        >
                          <h2 className="text-base font-bold text-slate-900 line-clamp-1 dark:text-slate-50">
                            {job.title}
                          </h2>
                        </Link>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5 text-slate-400 dark:text-slate-500" />
                            {job.location}
                          </span>
                        )}
                        {job.experience_level && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="size-3.5 text-slate-400 dark:text-slate-500" />
                            {job.experience_level}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
                      {job.salary_min && job.salary_max ? (
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Salary Undisclosed</span>
                      )}

                      <Link
                        href={`/jobs/${job.id}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        View role →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
    </main>
  );
}