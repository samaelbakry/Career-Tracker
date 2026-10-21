"use client";

import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { JobFilters } from "@/types/jobs";
import {
  AlertCircle,
  ArrowDownWideNarrow,
  Briefcase,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import JobCard from "../jobs/JobCard";
import JobFormDialog from "../jobs/JobFormDialog";
import CardSkeleton from "../skeletons/CardSkeleton";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import PaginationBar from "../ui/PaginationBar";

const JOBS_PER_PAGE = 6;

export default function EmployerFeedExplorer() {
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [employmentType, setEmploymentType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<JobFilters["sortBy"]>("newest");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const filters: JobFilters = {
    search: debouncedSearch,
    employmentType,
    experienceLevel,
    location,
    sortBy,
  };

  const { data, isLoading, isError, error, refetch } = useFetch({
    queryKey: ["getAllJobs", page, JSON.stringify(filters)],
    queryFn: () => getAllJobs(page, JOBS_PER_PAGE, filters),
  });

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  const activeFilters = [
    {
      key: "search",
      label: debouncedSearch ? `Search: ${debouncedSearch}` : "",
      active: Boolean(debouncedSearch),
      clear: () => setSearchInput(""),
    },
    {
      key: "employment",
      label: employmentType,
      active: Boolean(employmentType),
      clear: () => setEmploymentType(""),
    },
    {
      key: "experience",
      label: experienceLevel,
      active: Boolean(experienceLevel),
      clear: () => setExperienceLevel(""),
    },
    {
      key: "location",
      label: location ? `Location: ${location}` : "",
      active: Boolean(location.trim()),
      clear: () => setLocation(""),
    },
  ].filter((filter) => filter.active);

  function clearAllFilters() {
    setSearchInput("");
    setDebouncedSearch("");
    setEmploymentType("");
    setExperienceLevel("");
    setLocation("");
    setSortBy("newest");
    setPage(1);
  }

  const selectClass =
    "h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";

  return (
    <section id="available-jobs" className="mt-10 scroll-mt-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
            <Briefcase className="size-3.5" />
            Explore opportunities
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Find your next opportunity
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Search listings, refine your results, and discover the right fit.
          </p>
        </div>

        {!isLoading && !isError && (
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-slate-900 dark:text-white">
              {total.toLocaleString()}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              open positions
            </span>
          </div>
        )}
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <SlidersHorizontal className="size-4 text-violet-500" />
            Search & refine
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search job titles, companies, or skills..."
              aria-label="Search jobs"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-11 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400 dark:focus:bg-slate-900"
            />

            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="relative">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Employment type
              </span>
              <select
                value={employmentType}
                onChange={(event) => setEmploymentType(event.target.value)}
                className={selectClass}
              >
                <option value="">All employment types</option>
                <option value="Full Time">Full time</option>
                <option value="Part Time">Part time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </label>

            <label>
              <span className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Experience level
              </span>
              <select
                value={experienceLevel}
                onChange={(event) => setExperienceLevel(event.target.value)}
                className={selectClass}
              >
                <option value="">All experience levels</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </label>

            <label>
              <span className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                <MapPin className="mr-1 inline size-3.5" />
                Location
              </span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Cairo, Remote"
                className={selectClass}
              />
            </label>

            <label>
              <span className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                Sort by
              </span>
              <div className="relative">
                <ArrowDownWideNarrow className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as JobFilters["sortBy"])
                  }
                  className={`${selectClass} pl-9`}
                >
                  <option value="newest">Newest first</option>
                  <option value="salary_high">Highest salary</option>
                  <option value="salary_low">Lowest salary</option>
                </select>
              </div>
            </label>
          </div>

          {(activeFilters.length > 0 || sortBy !== "newest") && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Active:
              </span>

              {activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={filter.clear}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300 dark:hover:bg-violet-400/20"
                >
                  {filter.label}
                  <X className="size-3" />
                </button>
              ))}

              {sortBy !== "newest" && (
                <button
                  type="button"
                  onClick={() => setSortBy("newest")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300"
                >
                  {sortBy === "salary_high"
                    ? "Highest salary"
                    : "Lowest salary"}
                  <X className="size-3" />
                </button>
              )}

              <button
                type="button"
                onClick={clearAllFilters}
                className="ml-auto inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-300"
              >
                <RotateCcw className="size-3.5" />
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Available jobs
          </h3>
          {!isLoading && !isError && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {total === 0
                ? "No matching listings"
                : `Showing ${Math.min(
                    (page - 1) * JOBS_PER_PAGE + 1,
                    total,
                  )}–${Math.min(page * JOBS_PER_PAGE, total)} of ${total} jobs`}
            </p>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: JOBS_PER_PAGE }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900/50 dark:bg-slate-900">
          <AlertCircle className="mx-auto size-8 text-red-500" />
          <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
            Couldn&apos;t load job listings
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-white dark:text-slate-900"
          >
            Try again
          </button>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl dark:bg-violet-950/20" />

          <div className="relative mx-auto flex max-w-md flex-col items-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-900/50 dark:bg-violet-950/50 dark:text-violet-400">
              <Search className="size-7" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              No matching jobs
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Try adjusting your search or removing some filters to discover
              more opportunities.
            </p>

            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-700 dark:bg-white dark:text-slate-900"
            >
              <RotateCcw className="size-4" />
              Reset search
            </button>

            <div className="mt-3">
              <DialogButtonTrigger
                Component={JobFormDialog}
                componentProps={{ mode: "create" as const }}
              />
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isError && totalPages > 1 && (
        <div className="mt-10 flex justify-center border-t border-slate-200 pt-6 dark:border-slate-800">
          <PaginationBar
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
}
