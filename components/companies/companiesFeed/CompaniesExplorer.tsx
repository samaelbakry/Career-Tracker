"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCompanies, searchCompany } from "@/services/companies";
import { Company } from "@/types/companies";
import { Input } from "@base-ui/react";
import { Building2, FilterX, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import CompanyCard from "../companiesUi/CompanyCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

export default function CompaniesExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useFetch<Company[]>({
    queryKey: ["companies", debouncedSearch],
    queryFn: () =>
      debouncedSearch.trim() ? searchCompany(debouncedSearch) : getCompanies(),
  });

  return (
    <>
      <div className="relative mt-8">
        <div className="relative flex h-14 items-center rounded-2xl border border-slate-200 bg-slate-50/80 transition-all duration-200 focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:focus-within:border-indigo-600 dark:focus-within:bg-slate-950">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />

          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search companies by name, industry, or location..."
            className="h-full w-full border-none bg-transparent pl-12 pr-12 text-sm text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 sm:text-base dark:text-slate-100"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              type="button"
              title="Clear input"
              className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="mt-2 flex items-center gap-1.5 px-1 text-xs text-slate-500 dark:text-slate-400">
            <Search className="h-3 w-3" />
            Searching for{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              &quot;{searchQuery}&quot;
            </span>
          </div>
        )}
      </div>

      {isError && (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>

          <div className="pt-1">
            <p className="font-semibold">Unable to load companies</p>

            <p className="mt-0.5 text-red-600/80 dark:text-red-400/80">
              {(error as Error).message || "Something went wrong."}
            </p>
          </div>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {searchQuery ? "Search Results" : "All Companies"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {searchQuery
                ? "Companies matching your search."
                : "Browse organizations and explore their opportunities."}
            </p>
          </div>

          {!isLoading && companies && companies.length > 0 && (
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:flex">
              <Building2 className="h-3.5 w-3.5 text-indigo-500" />
              {companies.length} companies
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </div>
        ) : companies && companies.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-950/20" />

            <div className="relative mx-auto flex max-w-md flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-400">
                {searchQuery ? (
                  <FilterX className="h-7 w-7" />
                ) : (
                  <Building2 className="h-7 w-7" />
                )}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                {searchQuery
                  ? "No matching companies found"
                  : "No companies listed yet"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {searchQuery ? (
                  <>
                    We couldn&apos;t find anything matching{" "}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      &quot;{searchQuery}&quot;
                    </span>
                    . Try another search term.
                  </>
                ) : (
                  "There are no companies available at the moment. Check back soon."
                )}
              </p>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
