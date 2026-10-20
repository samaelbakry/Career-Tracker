"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCompanyByOwner } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import EmployerCompanyHeaderSkeleton from "@/components/skeletons/EmployerCompanyHeaderSkeleton";
import { Company } from "@/types/companies";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  ExternalLink,
  Globe2,
  MapPin,
  Star,
  Users,
  BriefcaseBusiness,
  Link2,
} from "lucide-react";
import Link from "next/link";

export default function EmployerCompanyHeader() {
  const userId = useAppSelector(selectedUser)?.id;

  const {
    data: company,
    isLoading,
    isError,
  } = useFetch<Company>({
    queryFn: () => getCompanyByOwner(userId!),
    queryKey: ["employerCompany", userId],
    enabled: !!userId,
  });

  if (isLoading) {
    return <EmployerCompanyHeaderSkeleton />;
  }

  if (isError || !company) {
    return (
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800">
            <Building2 className="size-7" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Company profile unavailable
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              We couldn&poas;t load your company information. Please try again
              later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const companyLocation = company.headquarters || company.location;

  return (
    <section className="group relative mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:hover:shadow-black/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-br from-indigo-50 via-slate-50 to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-950" />

      <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-indigo-200/40 dark:border-indigo-400/10" />
      <div className="pointer-events-none absolute -right-4 -top-12 size-52 rounded-full border border-indigo-200/40 dark:border-indigo-400/10" />

      <div className="relative p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div className="relative flex size-[76px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-200/70 sm:size-24 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-700">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={`${company.name} logo`}
                  className="size-full object-contain p-2.5"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <Building2 className="size-9 text-indigo-500 sm:size-11" />
              )}
            </div>

            <div className="min-w-0 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                  {company.name}
                </h1>

                {company.industry && (
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                    {company.industry}
                  </span>
                )}
              </div>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {company.description ||
                  "Manage your company profile and hiring activity from one place."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {companyLocation && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <MapPin className="size-3.5 text-slate-400" />
                    {companyLocation}
                  </span>
                )}

                {company.company_size && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Users className="size-3.5 text-slate-400" />
                    {company.company_size} employees
                  </span>
                )}

                {company.founded_year && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CalendarDays className="size-3.5 text-slate-400" />
                    Est. {company.founded_year}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:pt-1">
            {company.website && (
              <Link
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white transition-all hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-300"
              >
                <Globe2 className="size-4" />
                Visit website
                <ArrowUpRight className="size-3.5" />
              </Link>
            )}

            {company.linkedin_url && (
              <Link
                href={company.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Company LinkedIn profile"
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-300"
              >
                <Link2 className="size-4" />
              </Link>
            )}

            {company.twitter_url && (
              <Link
                href={company.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Company social profile"
                className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-300"
              >
                <ExternalLink className="size-4" />
              </Link>
            )}
          </div>
        </div>

        {(company.rating != null || company.open_jobs_count != null) && (
          <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-5 sm:grid-cols-2 dark:border-slate-800">
            {company.open_jobs_count != null && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                  <BriefcaseBusiness className="size-5" />
                </div>

                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {company.open_jobs_count.toLocaleString()}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Open positions
                  </p>
                </div>
              </div>
            )}

            {company.rating != null && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
                  <Star className="size-5 fill-current" />
                </div>

                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {company.rating.toFixed(1)}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Company rating
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
