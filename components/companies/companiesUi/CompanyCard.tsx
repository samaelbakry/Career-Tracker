import { getAvatarGradient } from "@/lib/helpers";
import { Company } from "@/types/companies";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

type CompanyCardData = Company & {
  cover_image?: string | null;
  website?: string | null;
  company_size?: string | null;
  employees?: string | null;
  founded_year?: number | null;
  rating?: string | number | null;
  reviews_count?: number | null;
  open_jobs_count?: number | null;
  benefits?: string[] | null;
};

export default function CompanyCard({
  company,
}: {
  company: CompanyCardData;
}) {
  const openJobs = Math.max(0, Number(company.open_jobs_count) || 0);
  const rating = Number(company.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;

  const benefits = [...new Set(company.benefits ?? [])]
    .filter(Boolean)
    .slice(0, 2);

  const companySize = company.company_size || company.employees || null;
  const profileUrl = `/employer/companies/${company.id}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_16px_45px_-20px_rgba(79,70,229,0.22)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40">
      <Link
        href={profileUrl}
        aria-label={`Explore ${company.name}`}
        className="relative block h-36 overflow-hidden bg-linear-to-br from-indigo-100 via-violet-50 to-sky-100 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800"
      >
        {company.cover_image && (
          <img
            src={company.cover_image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-white/10" />

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-sm backdrop-blur-md ${
              openJobs > 0
                ? "border-white/30 bg-white/95 text-emerald-700 dark:bg-slate-950/90 dark:text-emerald-400"
                : "border-white/30 bg-white/90 text-slate-500 dark:bg-slate-950/90 dark:text-slate-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                openJobs > 0 ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {openJobs > 0 ? "Actively hiring" : "Not hiring"}
          </span>
        </div>

        {hasRating && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md dark:bg-slate-950/90 dark:text-white">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {rating.toFixed(1)}
            {typeof company.reviews_count === "number" &&
              company.reviews_count > 0 && (
                <span className="font-medium text-slate-400">
                  ({company.reviews_count.toLocaleString()})
                </span>
              )}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6">
        <div className="-mt-8 relative z-10 flex items-end justify-between gap-3">
          <Link
            href={profileUrl}
            aria-label={`View ${company.name} profile`}
            className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-md transition-transform duration-300 group-hover:scale-[1.03] dark:border-slate-900 dark:bg-slate-800"
          >
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                loading="lazy"
                className="h-full w-full rounded-xl object-contain p-1.5"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br ${getAvatarGradient(
                  company.name || "",
                )} text-2xl font-bold text-white`}
              >
                {company.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </Link>

          {company.industry && (
            <span className="mb-1 max-w-[55%] truncate rounded-lg bg-indigo-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
              {company.industry}
            </span>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={profileUrl}
            className="group/title inline-flex max-w-full items-center gap-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <h2 className="truncate text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover/title:text-indigo-600 dark:text-white dark:group-hover/title:text-indigo-400">
              {company.name}
            </h2>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 opacity-0 transition-all group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:opacity-100" />
          </Link>

          {company.description ? (
            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
              {company.description}
            </p>
          ) : (
            <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400 dark:text-slate-500">
              Discover the team and explore career opportunities.
            </p>
          )}

          {company.location && (
            <div className="mt-3 flex min-w-0 items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
              <span className="truncate">{company.location}</span>

              {company.founded_year && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">
                    ·
                  </span>
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  <span className="shrink-0">{company.founded_year}</span>
                </>
              )}
            </div>
          )}

          {!company.location && company.founded_year && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CalendarDays className="h-3.5 w-3.5 text-indigo-500" />
              Founded in {company.founded_year}
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
            <div className="flex items-center gap-1.5 text-slate-400">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">Open positions</span>
            </div>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {openJobs.toLocaleString()}
              <span className="ml-1.5 text-xs font-medium text-slate-400">
                jobs
              </span>
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium">Team size</span>
            </div>

            <p className="mt-2 truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
              {companySize || "Not specified"}
            </p>
          </div>
        </div>

        <div className="mt-4 min-h-7">
          {benefits.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-md border border-slate-200/80 px-2 py-1 text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  {benefit}
                </span>
              ))}

              {(company.benefits?.length ?? 0) > 2 && (
                <span className="rounded-md px-1.5 py-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                  +{company.benefits!.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link
            href={profileUrl}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-400"
          >
            <span className="truncate">Explore company</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          {company.website && (
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name} website`}
              title="Visit official website"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
