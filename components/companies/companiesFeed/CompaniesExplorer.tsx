
"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getCompanies, searchCompany } from "@/services/companies";
import { Company } from "@/types/companies";
import { Input } from "@base-ui/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  BriefcaseBusiness,
  Building2,
  FilterX,
  Grid2X2,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import CompanyCard from "../companiesUi/CompanyCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

type CompanyView = "grid" | "list";

type CompanyFields = Company & {
  industry?: string | null;
  location?: string | null;
  created_at?: string | null;
  open_jobs_count?: number | null;
};

export default function CompaniesExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "newest">("name");

  const [hiringNow, setHiringNow] = useState(false);
  const [view, setView] = useState<CompanyView>("grid");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
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
      debouncedSearch
        ? searchCompany(debouncedSearch)
        : getCompanies(),
  });

  const availableIndustries = useMemo(() => {
    const values = (companies ?? [])
      .map((company) => (company as CompanyFields).industry?.trim())
      .filter((value): value is string => Boolean(value));

    return [...new Set(values)].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [companies]);

  const availableLocations = useMemo(() => {
    const values = (companies ?? [])
      .map((company) => (company as CompanyFields).location?.trim())
      .filter((value): value is string => Boolean(value));

    return [...new Set(values)].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const result = (companies ?? []).filter((company) => {
      const item = company as CompanyFields;

      const matchesIndustry =
        industry === "all" || item.industry === industry;

      const matchesLocation =
        location === "all" || item.location === location;

      const matchesHiring =
        !hiringNow || (item.open_jobs_count ?? 0) > 0;

      return (
        matchesIndustry &&
        matchesLocation &&
        matchesHiring
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      const aDate = (a as CompanyFields).created_at;
      const bDate = (b as CompanyFields).created_at;

      return (
        new Date(bDate ?? 0).getTime() -
        new Date(aDate ?? 0).getTime()
      );
    });
  }, [companies, industry, location, hiringNow, sortBy]);

  const activeFilters =
    Number(industry !== "all") +
    Number(location !== "all") +
    Number(hiringNow);

  const resetFilters = () => {
    setSearchQuery("");
    setIndustry("all");
    setLocation("all");
    setSortBy("name");
    setHiringNow(false);
  };

  return (
    <section className="mt-8 space-y-6" id="companies-explorer">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <Input
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search companies, industries, locations..."
              aria-label="Search companies"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-11 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                view === "grid"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                view === "list"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              Filters

              {activeFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1.5 text-[11px] text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {activeFilters}
                </span>
              )}
            </div>

            {(activeFilters > 0 ||
              searchQuery ||
              sortBy !== "name") && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <FilterX className="h-4 w-4" />
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Select
              value={industry}
              onValueChange={(value) => {
                if (value) setIndustry(value);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                <div className="flex min-w-0 items-center gap-2">
                  <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                  <SelectValue placeholder="All industries" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All industries</SelectItem>

                {availableIndustries.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={location}
              onValueChange={(value) => {
                if (value) setLocation(value);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                <div className="flex min-w-0 items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                  <SelectValue placeholder="All locations" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>

                {availableLocations.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                if (value === "name" || value === "newest") {
                  setSortBy(value);
                }
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                <div className="flex min-w-0 items-center gap-2">
                  <ArrowDownAZ className="h-4 w-4 shrink-0 text-slate-400" />
                  <SelectValue placeholder="Sort companies" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="name">Name: A to Z</SelectItem>
                <SelectItem value="newest">Recently added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => setHiringNow((current) => !current)}
            aria-pressed={hiringNow}
            className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition sm:w-fit sm:min-w-64 ${
              hiringNow
                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30"
                : "border-slate-200 bg-white hover:border-emerald-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  hiringNow
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <BriefcaseBusiness className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Hiring now
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Companies with open jobs
                </p>
              </div>
            </div>

            <span
              className={`relative h-5 w-9 rounded-full transition ${
                hiringNow
                  ? "bg-emerald-500"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                  hiringNow ? "left-[18px]" : "left-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {debouncedSearch
                ? "Search results"
                : "Explore companies"}
            </h2>

            {!isLoading && !isError && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                {filteredCompanies.length}
              </span>
            )}

            {hiringNow && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Hiring now
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Discover organizations and find your next opportunity.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20">
          <p className="font-semibold text-red-700 dark:text-red-400">
            Unable to load companies
          </p>

          <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
            {(error as Error)?.message || "Something went wrong."}
          </p>
        </div>
      )}

      {/* Companies */}
      {!isLoading && !isError && filteredCompanies.length > 0 && (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              : "grid grid-cols-1 gap-4"
          }
        >
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && filteredCompanies.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            {searchQuery || activeFilters > 0 ? (
              <FilterX className="h-7 w-7" />
            ) : (
              <Building2 className="h-7 w-7" />
            )}
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            {hiringNow
              ? "No companies hiring right now"
              : searchQuery || activeFilters > 0
                ? "No companies match your filters"
                : "No companies available yet"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            {hiringNow
              ? "Try disabling Hiring Now or check back later for new openings."
              : "Try adjusting your search or removing some filters."}
          </p>

          {(searchQuery ||
            activeFilters > 0 ||
            sortBy !== "name") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
