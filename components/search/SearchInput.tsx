"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { filterJobs, getAllJobs, searchForJob } from "@/services/jobs";
import { Job } from "@/types/jobs";
import { AlertCircle, Loader2, Search, X } from "lucide-react";
import SearchResults from "./SearchResults";
import EmptySearchResults from "./EmptySearchResults";
import JobFilter from "./JobFilter";
import CardSkeleton from "../jobs/CardSkeleton";

export function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState("");

  const {
    data: jobs = [],
    isLoading: loading,
    error,
  } = useFetch<Job[]>({
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
    <>
      <div className="w-full space-y-6 ">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900 p-1.5 border border-stone-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none transition-all focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <Search className="absolute left-4 h-5 w-5 text-stone-400 dark:text-slate-500 pointer-events-none" />

            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search jobs, skills, or locations..."
              className="w-full pl-11 pr-28 h-12 bg-transparent border-none shadow-none text-slate-900 dark:text-slate-100 placeholder:text-stone-400 dark:placeholder:text-slate-500 focus-visible:ring-0 text-base"
            />

            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-28 p-1.5 rounded-full text-stone-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white h-10 px-5 text-sm font-semibold rounded-xl transition-all shadow-xs disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span>Search</span>
              )}
            </Button>
          </div>
          <JobFilter filter={filter} onFilterChange={handleFilterChange} />
        </form>

        <div className="max-w-7xl mx-auto w-full">
          {errorMessage && (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 px-4 py-3 text-red-700 dark:text-red-400 shadow-xs transition-all animate-in fade-in-50 slide-in-from-top-1">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
              <p className="text-sm font-medium text-center">{errorMessage}</p>
            </div>
          )}

          {hasSearched && jobs.length === 0 && !loading && !errorMessage && (
            <EmptySearchResults />
          )}

          {loading ? (
            <div className="grid grid-cols-3 gap-3 my-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <SearchResults loading={loading} jobs={jobs} />
          ) : null}
        </div>
      </div>
    </>
  );
}
