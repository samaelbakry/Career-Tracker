"use client";

import EmployerCompanySwitcher from "@/components/companies/companiesFeed/EmployerCompanySwitcher";
import EmployerCompanyHeaderSkeleton from "@/components/skeletons/EmployerCompanyHeaderSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getCompaniesByOwner } from "@/services/companies";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Company } from "@/types/companies";

import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Link2,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

function getExternalUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function EmployerCompanyHeader() {
  const userId = useAppSelector(selectedUser)?.id;

  const selectedCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data: companies,
    isLoading,
    isError,
  } = useFetch<Company[]>({
    queryKey: ["employerCompanies", userId],
    queryFn: () => getCompaniesByOwner(userId!),
    enabled: !!userId,
  });

  const company =
    companies?.find((item) => item.id === selectedCompanyId) ??
    companies?.[0] ??
    null;

  if (isLoading) {
    return <EmployerCompanyHeaderSkeleton />;
  }

  if (isError) {
    return (
      <section className="mb-8 rounded-[2rem] border border-red-200 bg-white p-6 dark:border-red-900/40 dark:bg-slate-950">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-400/10">
            <Building2 className="size-6" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Unable to load company profile
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Something went wrong while loading your company information.
              Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!company) {
    return (
      <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 -top-36 size-104 rounded-full bg-violet-200/35 blur-[100px] dark:bg-violet-600/10" />
          <div className="absolute -bottom-44 left-[20%] size-100 rounded-full bg-blue-200/30 blur-[100px] dark:bg-blue-600/10" />
        </div>

        <div className="relative flex flex-col items-start gap-5 p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              <Sparkles className="size-3.5" />
              Company profile
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Give your company
              <br className="hidden sm:block" /> a{" "}
              <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                professional presence.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
              Set up your company profile to showcase your brand, manage your
              hiring activity, and attract the right candidates.
            </p>
          </div>

          <div className="flex size-24 shrink-0 items-center justify-center rounded-[1.75rem] border border-violet-200/70 bg-violet-50/80 text-violet-600 shadow-lg shadow-violet-900/5 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Building2 className="size-12" />
          </div>
        </div>
      </section>
    );
  }

  const companyLocation = company.headquarters || company.location;

  const websiteUrl = company.website
    ? getExternalUrl(company.website)
    : null;

  const linkedinUrl = company.linkedin_url
    ? getExternalUrl(company.linkedin_url)
    : null;

  const twitterUrl = company.twitter_url
    ? getExternalUrl(company.twitter_url)
    : null;

  return (
    <section className="relative isolate mb-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-36 size-104 rounded-full bg-violet-200/35 blur-[100px] dark:bg-violet-600/10" />
        <div className="absolute -bottom-44 left-[20%] size-100 rounded-full bg-blue-200/30 blur-[100px] dark:bg-blue-600/10" />
      </div>

      <div className="relative p-6 pb-0 sm:px-9 lg:px-12">
        <div className="max-w-sm">
          <EmployerCompanySwitcher />
        </div>
      </div>

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_290px] lg:items-center lg:gap-12 lg:p-12">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            Your company space
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex size-[76px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 sm:size-24 dark:border-slate-700 dark:bg-slate-900">
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
                <Building2 className="size-9 text-violet-500 sm:size-11" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="break-words text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                  {company.name}
                </h1>

                {company.industry && (
                  <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                    {company.industry}
                  </span>
                )}
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {company.description ||
                  "Manage your company profile and hiring activity from one place."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
                {companyLocation && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <MapPin className="size-3.5 text-violet-500" />
                    {companyLocation}
                  </span>
                )}

                {company.company_size && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Users className="size-3.5 text-violet-500" />
                    {company.company_size} employees
                  </span>
                )}

                {company.founded_year && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CalendarDays className="size-3.5 text-violet-500" />
                    Est. {company.founded_year}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition-all hover:bg-violet-600 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-300"
              >
                <Globe2 className="size-4" />
                Visit website
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Company LinkedIn profile"
                className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
              >
                <Link2 className="size-4" />
              </a>
            )}

            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Company social profile"
                className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
              >
                <ExternalLink className="size-4" />
              </a>
            )}

            <a
              href="#company-details"
              className="group inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-700 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-400/10 dark:hover:text-violet-300"
            >
              Company details
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
              </span>
              Manage your company profile
            </div>

            <span className="hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="size-1.5 rounded-full bg-violet-500" />
              Grow your team
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-violet-200/40 to-blue-200/30 blur-2xl dark:from-violet-500/10 dark:to-blue-500/10" />

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-xl shadow-slate-900/[0.04] backdrop-blur-xl sm:p-6 dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Company overview
                </p>
                <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {company.name}
                </h2>
              </div>

              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300">
                <Building2 className="size-5" />
              </div>
            </div>

            <div className="mt-7 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold tracking-[-0.06em] text-slate-950 dark:text-white">
                  {(company.open_jobs_count ?? 0).toLocaleString()}
                </span>
                <ArrowUpRight className="mb-2 size-5 text-violet-500" />
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Open job positions
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/70">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                <Star className="size-4 fill-current" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Company rating
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {company.rating != null
                    ? `${company.rating.toFixed(1)} / 5.0`
                    : "Not rated yet"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Career Tracker</span>

              <span className="flex items-center gap-1">
                Company profile
                <ArrowUpRight className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}