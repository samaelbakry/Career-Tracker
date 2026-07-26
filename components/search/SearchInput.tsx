"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchForJob } from "@/services/jobs";
import { Job } from "@/types/jobs";
import { AlertCircle, Loader2, Search } from "lucide-react";
import React, { useRef, useState } from "react";
import SearchResults from "./SearchResults";
import EmptySearchResults from "./EmptySearchResults";

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    setHasSearched(true);
    e.preventDefault();
    const query = inputRef.current?.value || "";
    console.log("Query:", query);
    if (!query.trim()) {
      setError("Please enter a search term.");
      setJobs([]);
      return;
    }
    try {
      setLoading(true);
      const data = await searchForJob(query);
      setJobs(data);
      console.log(data);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errMsg);
      console.log(errMsg);
    } finally {
      setLoading(false);
      setHasSearched(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center rounded-2xl bg-white  p-1.5 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
          <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />

          <Input
            ref={inputRef}
            type="text"
            placeholder="Search jobs, skills, or locations..."
            className="w-full pl-11 pr-28 h-12 bg-transparent border-none shadow-none text-slate-900  placeholder:text-slate-400 focus-visible:bg-slate-100 focus-visible:ring-0 text-base"
          />

          <Button
            type="submit"
            disabled={loading}
            className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white h-10 px-5 text-sm font-semibold rounded-xl transition-all shadow-xs"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>
      </form>
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 px-4 py-3 text-red-700 dark:text-red-400 shadow-sm transition-all animate-in fade-in-50 slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500 dark:text-red-400" />
            <p className="text-sm font-medium text-center">{error}</p>
          </div>
        )}
        {hasSearched && jobs.length === 0 && !loading && !error && (
          <EmptySearchResults />
        )}

        {jobs.length > 0 && <SearchResults loading={loading} jobs={jobs} />}
      </div>
    </>
  );
}
