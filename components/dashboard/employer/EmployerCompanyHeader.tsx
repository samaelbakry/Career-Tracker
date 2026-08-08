"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCompanyByOwner } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Calendar,
  Briefcase,
  Star,
  ExternalLink,
  Link2Icon,
} from "lucide-react";
import { Company } from "@/types/companies";
import Link from "next/link";

export default function EmployerCompanyHeader() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: company, isLoading } = useFetch<Company>({
    queryFn: () => getCompanyByOwner(userId!),
    queryKey: ["employerCompany", userId],
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-80 animate-pulse rounded-2xl bg-slate-100" />
    );
  }

  if (!company) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        No company details found. Please set up your company profile.
      </div>
    );
  }

  return (
    <div className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="h-35 w-full bg-slate-100">
        <div className="h-full w-full bg-linear-to-r from-blue-400 to-indigo-500 opacity-90" />
      </div>

      <div className="relative px-6 pb-6 pt-0 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 sm:-mt-14">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md dark:border-slate-900 sm:h-28 sm:w-28">
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                <Building2 className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {company.name}
                </h1>
                {company.industry && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                    {company.industry}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-500 dark:text-slate-400">
                {(company.location || company.headquarters) && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>{company.headquarters || company.location}</span>
                  </div>
                )}

                {company.company_size && (
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>{company.company_size} employees</span>
                  </div>
                )}

                {company.founded_year && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                    <span>Founded {company.founded_year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {company.website && (
              <Link
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Globe className="h-4 w-4" />
                <span>Website</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </Link>
            )}

            {company.linkedin_url && (
              <Link
                href={company.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-4 h-4 text-blue-600 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </Link>
            )}

            {company.twitter_url && (
              <Link
                href={company.twitter_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Twitter Profile"
              >
                <Link2Icon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          <div className="flex items-center gap-6 text-sm">
            {company.rating !== undefined && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>
                  {company?.rating ? company.rating.toFixed(1) : "4.5"}
                </span>
              </div>
            )}

            {company.open_jobs_count !== undefined && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>{company.open_jobs_count} Open Jobs</span>
              </div>
            )}
          </div>
        </div>

        {company.description && (
          <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
            {company.description}
          </p>
        )}
      </div>
    </div>
  );
}
