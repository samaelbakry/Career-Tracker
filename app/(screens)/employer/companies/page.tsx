"use client";

import { useState, useEffect } from "react";
import CompanyCard from "@/components/compnaies/CompanyCard";
import { CompanyFormDialog } from "@/components/compnaies/CompanyFormDialog";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { getCompanies, searchCompany } from "@/services/companies";
import { Company } from "@/types/companies";
import { Building2, Search, X, Sparkles, FilterX } from "lucide-react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: companies, isLoading, isError, error } = useFetch<Company[]>({
    queryKey: ["companies", debouncedSearch],
    queryFn: () =>
      debouncedSearch.trim() ? searchCompany(debouncedSearch) : getCompanies(),
  });

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/30" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/20" />

          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Company Directory
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                    Explore{" "}
                    <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      top organizations
                    </span>
                  </h1>

                  <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                    Discover companies, learn about their workplace culture, and
                    explore the opportunities they offer.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <DialogButtonTrigger
                  Component={CompanyFormDialog}
                  componentProps={{ mode: "create" as const }}
                />
              </div>
            </div>

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
          </div>
        </section>

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
      </div>
    </main>
  );
}
