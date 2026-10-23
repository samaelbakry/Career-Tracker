"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe,
  MapPin,
  Star,
  Users,
  Sparkles,
  Heart,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

import { getCompaniesDetails } from "@/services/companies";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getAvatarGradient } from "@/lib/helpers";
import { Company } from "@/types/companies";
import CompanyDetailsEmptyStatus from "@/components/emptyCase/CompanyDetailsEmptyStatus";

function getExternalUrl(url?: string | null) {
  if (!url) return undefined;

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof Building2;
  label: string;
  value: string | number;
  description?: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/[0.04] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-400/10 dark:text-indigo-300 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-600" />
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {value || "—"}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </p>

      {description && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Globe | typeof FaLinkedinIn;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
    >
      <Icon className="h-4 w-4" />
      {label}
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>
  );
}

export default function CompanyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params.companyId as string;

  const {
    data: company,
    isLoading,
    isError,
    error,
  } = useFetch<Company>({
    queryKey: ["company", companyId],
    queryFn: () => getCompaniesDetails(companyId),
    enabled: Boolean(companyId),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/70 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CardSkeleton />
        </div>
      </main>
    );
  }

  if (isError || !company) {
    return (
      <CompanyDetailsEmptyStatus
        error={error ?? new Error("Unable to load company details")}
        isError={isError}
      />
    );
  }

  const websiteUrl = getExternalUrl(company.website);
  const linkedinUrl = getExternalUrl(company.linkedin_url);
  const careersUrl = getExternalUrl(company.careers_url);

  const isHiring = (company.open_jobs_count ?? 0) > 0;

  return (
    <main className="min-h-screen bg-slate-50/70 pb-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to companies
          </button>

          <span className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex dark:text-slate-500">
            <Building2 className="h-4 w-4" />
            Company profile
          </span>
        </div>

        <section className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-44 overflow-hidden sm:h-56 lg:h-64">
            {company.cover_image ? (
              <img
                src={company.cover_image}
                alt={`${company.name} cover`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-500">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:22px_22px] opacity-20" />
                <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/20" />
                <div className="absolute -right-2 -top-16 h-56 w-56 rounded-full border border-white/20" />
                <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

                <div className="absolute bottom-5 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:left-8">
                  <Sparkles className="h-3.5 w-3.5" />
                  Discover the company
                </div>
              </div>
            )}

            {company.cover_image && (
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/5" />
            )}
          </div>

          <div className="relative px-5 pb-6 sm:px-8 sm:pb-8 lg:px-10">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg dark:border-slate-900 dark:bg-slate-800 sm:h-28 sm:w-28">
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={`${company.name} logo`}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center bg-linear-to-br ${getAvatarGradient(
                        company.name || "",
                      )} text-4xl font-bold text-white`}
                    >
                      {company.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                <div className="min-w-0 pb-1 pt-14 sm:pt-16">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {company.industry && (
                      <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                        {company.industry}
                      </span>
                    )}

                    {isHiring && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Hiring now
                      </span>
                    )}
                  </div>

                  <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
                    {company.name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                    {company.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {company.location}
                      </span>
                    )}

                    {company.founded_year && (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 shrink-0" />
                        Founded {company.founded_year}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {careersUrl && (
                <Link
                  href={careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                >
                  Explore careers
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {company.description && (
              <div className="mt-8 max-w-4xl border-t border-slate-100 pt-6 dark:border-slate-800">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  About the company
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  {company.description}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {company.headquarters && (
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  {company.headquarters}
                </div>
              )}

              {company.company_size && (
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                  <Users className="h-4 w-4 text-slate-400" />
                  {company.company_size}
                </div>
              )}

              {company.rating && Number(company.rating) > 0 && (
                <div className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                  <Star className="h-4 w-4 fill-current" />
                  {Number(company.rating).toFixed(1)}
                  {company.reviews_count != null && (
                    <span className="font-normal opacity-75">
                      ({company.reviews_count} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              At a glance
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
              Company overview
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Key information to help you get to know this organization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BriefcaseBusiness}
              label="Open positions"
              value={company.open_jobs_count ?? 0}
              description={
                isHiring
                  ? "Opportunities available"
                  : "No listed open positions"
              }
            />

            <StatCard
              icon={Users}
              label="Company size"
              value={company.company_size || "Not specified"}
              description={
                company.employees
                  ? `${company.employees.toLocaleString()} employees`
                  : "Team size"
              }
            />

            <StatCard
              icon={CalendarDays}
              label="Founded"
              value={company.founded_year || "—"}
              description="Year established"
            />

            <StatCard
              icon={Star}
              label="Company rating"
              value={
                company.rating && Number(company.rating) > 0
                  ? `${Number(company.rating).toFixed(1)} / 5`
                  : "Not rated"
              }
              description={
                company.reviews_count
                  ? `${company.reviews_count} reviews`
                  : "No reviews available"
              }
            />
          </div>
        </section>

        {company.benefits && company.benefits.length > 0 && (
          <section className="mt-10 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 dark:bg-rose-400/10 dark:text-rose-300">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Workplace perks
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
                  Benefits & culture
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Discover the benefits this company offers its team.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {company.benefits.map((benefit, index) => (
                <div
                  key={`${benefit}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(websiteUrl || linkedinUrl || careersUrl) && (
          <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Stay connected
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
                Explore more
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {websiteUrl && (
                <SocialLink
                  href={websiteUrl}
                  icon={Globe}
                  label="Official website"
                />
              )}

              {linkedinUrl && (
                <SocialLink
                  href={linkedinUrl}
                  icon={FaLinkedinIn}
                  label="LinkedIn"
                />
              )}

              {careersUrl && (
                <Link
                  href={careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  Career opportunities
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Looking for more opportunities?
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Explore other companies in the directory.
            </p>
          </div>

          <Link
            href="/employer/companies"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500/40 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>
        </div>
      </div>
    </main>
  );
}
