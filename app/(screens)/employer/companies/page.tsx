"use client";

import CompanyCard from "@/components/compnaies/CompanyCard";
import { CompanyFormDialog } from "@/components/compnaies/CompanyFormDialog";
import CardSkeleton from "@/components/jobs/CardSkeleton";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { getCompanies, searchCompany } from "@/services/companies";
import { Company } from "@/types/companies";
import {
  Building2,
  Search,
  X
} from "lucide-react";
import { useState } from "react";

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useFetch<Company[]>({
    queryKey: ["companies", searchQuery],
    queryFn: () =>
      searchQuery.trim() ? searchCompany(searchQuery) : getCompanies(),
  });

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-stone-800 dark:text-stone-200 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="relative overflow-hidden pt-4 pb-2 text-center sm:text-left space-y-6">
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50  text-indigo-700 text-xs font-semibold uppercase tracking-wider shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Company Directory</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Explore Companies
              </span>
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-xl text-stone-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed mx-auto sm:mx-0">
                Discover top organizations, hiring insights, and workplace
                profiles.
              </p>
              <DialogButtonTrigger Component={CompanyFormDialog} componentProps={{mode:"create" as const}}/>
            </div>
          </div>
          <div className="relative flex items-center rounded-2xl bg-white p-1.5 border border-stone-200 dark:border-slate-800 shadow-md shadow-stone-200/50 dark:shadow-none transition-all focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <Search className="absolute left-4 h-5 w-5 text-slate-400 pointer-events-none" />

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search by company name, industry, or location..."
              className="w-full pl-11 pr-10 h-12 bg-transparent border-none shadow-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus-visible:ring-0 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Clear input"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>Failed to load companies: {(error as Error).message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          ) : companies && companies.length > 0 ? (
            companies.map((company) => {
              return (
                <CompanyCard key={company.id} company={company} />
              );
            })
          ) : (
            <div className="col-span-full relative overflow-hidden py-16 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm text-center">
              <div
                className="pointer-events-none absolute -top-10 left-1/2 z-0 h-40 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-violet-500/10 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-sm mx-auto space-y-4">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {searchQuery
                      ? "No matching companies"
                      : "No companies listed yet"}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
                    {searchQuery ? (
                      <>
                        We couldn&apos;t find anything matching{" "}
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          &quot;{searchQuery}&quot;
                        </span>
                        . Try checking for typos or searching a different term.
                      </>
                    ) : (
                      "Check back soon or search for another term once companies are added."
                    )}
                  </p>
                </div>

                {searchQuery && (
                  <div className="pt-2">
                    <button
                      onClick={() => setSearchQuery("")}
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      Clear Search Filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
