"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCompaniesDetails } from "@/services/companies";
import CardSkeleton from "@/components/jobs/CardSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { InfoCard } from "@/components/ui/InfoCard";
import { getAvatarGradient } from "@/lib/helpers";
import { Company } from "@/types/companies";

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
    enabled: !!companyId,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-stone-50/60 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CardSkeleton />
        </div>
      </main>
    );
  }

  if (isError || !company) {
    return (
      <main className="min-h-screen bg-stone-50/60 dark:bg-slate-950 py-16 px-4 flex flex-col items-center justify-center font-sans">
        <div className="max-w-md w-full text-center space-y-5 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Company Not Found
            </h2>
            <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
              {isError
                ? (error as Error).message
                : "The requested company details could not be retrieved."}
            </p>
          </div>
          <button
            onClick={() => router.push("/companies")}
            type="button"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ← Back to All Companies
          </button>
        </div>
      </main>
    );
  }

  const formattedWebsite = company.website?.startsWith("http")
    ? company.website
    : `https://${company.website}`;

  return (
    <main className="min-h-screen bg-stone-50/60 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-stone-800 dark:text-stone-200">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => router.back()}
            type="button"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-2 py-1 -ml-2 cursor-pointer"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Companies</span>
          </button>
        </div>

        <section className="relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-8">
          {" "}
          <div
            className="pointer-events-none absolute -top-16 -right-16 z-0 h-72 w-72 rounded-full bg-linear-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-50 shadow">
                {company?.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name || "Company logo"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-linear-to-br ${getAvatarGradient(
                      company?.name || "",
                    )} font-extrabold text-xl flex items-center justify-center shadow-sm border border-white/20 select-none`}
                  >
                    {company?.name ? company.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                  {company.name}
                </h1>

                {company.industry && (
                  <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900/60 px-2.5 py-0.5 rounded-md">
                    {company.industry}
                  </span>
                )}
              </div>
            </div>

            {company.website && (
              <Link
                href={formattedWebsite}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span>Visit Official Website</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            )}
          </div>
          {company.description && (
            <div className="relative z-10 space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                About
              </h2>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-slate-300 max-w-4xl">
                {company.description}
              </p>
            </div>
          )}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              label="Location"
              value={company.location}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V7m0 0h4m-4 0H9"
                  />
                </svg>
              }
              label="Headquarters"
              value={company.headquarters}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              label="Industry"
              value={company.industry}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              label="Company Size"
              value={company.company_size}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              label="Founded"
              value={company.founded_year?.toString()}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              }
              label="Rating"
              value={company.rating?.toString()}
            />

            <InfoCard
              icon={
                <svg
                  className="w-4 h-4 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
              }
              label="Open Positions"
              value={company.open_jobs_count?.toString()}
            />
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-stone-100 dark:border-slate-800/80">
            {company.website && (
              <Link
                href={formattedWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800/80 text-stone-700 dark:text-slate-300 transition-colors shadow-xs"
              >
                <svg
                  className="w-4 h-4 text-stone-400 dark:text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span>Website</span>
              </Link>
            )}

            {company.linkedin_url && (
              <Link
                href={company.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-stone-50 dark:hover:bg-slate-800/80 text-stone-700 dark:text-slate-300 transition-colors shadow-xs"
              >
                <svg
                  className="w-4 h-4 text-blue-600 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
            )}

            {company.careers_url && (
              <Link
                href={company.careers_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs"
              >
                <span>View Careers</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
