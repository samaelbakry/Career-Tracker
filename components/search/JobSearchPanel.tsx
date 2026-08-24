"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { filterJobs, getAllJobs, searchForJob } from "@/services/jobs";
import { JobsResponse } from "@/types/jobs";
import { AlertCircle, Loader2, Search, X } from "lucide-react";
import SearchResults from "./SearchResults";
import EmptySearchResults from "./EmptySearchResults";
import JobFilter from "./JobFilter";
import CardSkeleton from "../skeletons/CardSkeleton";

export function JobSearchPanel() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState("");

  const {
    data,
    isLoading: loading,
    error,
  } = useFetch<JobsResponse>({
    queryKey: ["getJobs", searchQuery, filter],
    queryFn: () => {
      if (filter) {
        return filterJobs(filter);
      }

      if (searchQuery) {
        return searchForJob(searchQuery.trim());
      }

      return getAllJobs();
    },
  });

  const jobs = data?.jobs ?? [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter("");
    setHasSearched(true);
    setSearchQuery(inputValue);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setHasSearched(true);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
    setHasSearched(false);
    setFilter("");
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : null;

  return (
    <div className="w-full space-y-8">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div
          className="
            group relative flex items-center
            rounded-2xl
            border border-slate-200
            bg-white
            p-1.5
            shadow-sm
            shadow-slate-200/60
            transition-all duration-300
            focus-within:border-[#1E3A8A]
            focus-within:ring-4
            focus-within:ring-blue-500/10
            dark:border-slate-800
            dark:bg-slate-900
            dark:shadow-none
          "
        >
          <div className="pointer-events-none flex h-12 w-12 shrink-0 items-center justify-center">
            <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#1E3A8A]" />
          </div>

          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search jobs, skills, or locations..."
            className="
              h-12
              flex-1
              border-none
              bg-transparent
              px-1
              text-base
              text-slate-900
              shadow-none
              outline-none
              placeholder:text-slate-400
              focus-visible:ring-0
              dark:text-slate-100
            "
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="
                mr-2
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-all
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-slate-200
              "
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="
              h-11
              rounded-xl
              bg-[#1E3A8A]
              px-6
              text-sm
              font-semibold
              text-white
              shadow-md
              shadow-blue-900/10
              transition-all
              duration-200
              hover:bg-[#172554]
              active:scale-[0.98]
              disabled:opacity-70
            "
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>

        <div>
          <JobFilter filter={filter} onFilterChange={handleFilterChange} />
        </div>
      </form>

      <div className="w-full">
        {errorMessage && (
          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-red-200
              bg-red-50
              px-4 py-3
              text-red-700
              shadow-xs
              dark:border-red-900/50
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>

            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {hasSearched && jobs.length === 0 && !loading && !errorMessage && (
          <EmptySearchResults />
        )}

        {loading && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="mt-6">
            <SearchResults loading={loading} jobs={jobs} />
          </div>
        )}
      </div>
    </div>
  );
}
