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
 <div className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size:16px_16px opacity-40" />
  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-50/80 blur-3xl" />

  <div className="relative flex flex-col gap-6">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/80 text-slate-700 shadow-2xs sm:h-20 sm:w-20">
          {company.logo_url ? (
            <img
              src={company.logo_url}
              alt={company.name}
              className="h-full w-full rounded-lg object-contain p-2"
              onError ={(e)=>{e.currentTarget.style.display = "none"}}
            />
          ) : (
            <Building2 className="h-7 w-7 text-slate-500 sm:h-9 sm:w-9" />
          )}
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {company.name}
            </h1>
            {company.industry && (
              <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/60 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {company.industry}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
            {(company.location || company.headquarters) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{company.headquarters || company.location}</span>
              </div>
            )}

            {company.company_size && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                <span>{company.company_size} employees</span>
              </div>
            )}

            {company.founded_year && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Founded {company.founded_year}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center">
        {company.website && (
          <Link
            href={company.website}
            target="_blank"         
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span>Website</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Link>
        )}

        {company.linkedin_url && (
          <Link
            href={company.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition-all hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600"
            aria-label="LinkedIn Profile"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </Link>
        )}

        {company.twitter_url && (
          <Link
            href={company.twitter_url}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            aria-label="Twitter Profile"
          >
            <Link2Icon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>

    {(company.description || company.rating !== undefined || company.open_jobs_count !== undefined) && (
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        {company.description && (
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
            {company.description}
          </p>
        )}

        <div className="flex shrink-0 items-center gap-3">
          {company.rating !== undefined && (
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/60 bg-slate-50/80 px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{company.rating ? company.rating.toFixed(1) : "4.5"}</span>
            </div>
          )}

          {company.open_jobs_count !== undefined && (
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200/60 bg-blue-50/50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              <Briefcase className="h-3.5 w-3.5 text-blue-600" />
              <span>{company.open_jobs_count} Open Roles</span>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>
  );
}
