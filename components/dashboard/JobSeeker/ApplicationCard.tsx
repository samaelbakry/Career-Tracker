import { getStatusBadge } from "@/constants/constants";
import { formattedDate } from "@/lib/helpers";
import { ApplicationWithDetails } from "@/types/applications";
import {
  Building2,
  Calendar,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function ApplicationCard({app}: {app: ApplicationWithDetails}) {
  const statusConfig = getStatusBadge(app.status);
  const StatusIcon = statusConfig.icon;
  const company = app.job?.company;

  return (
    <Link href={`/jobSeeker/jobs/${app.job?.id}`}  className="group relative flex flex-col gap-4 rounded-2xl px-2 py-4 transition-all duration-200 hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-3">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-sm transition-all duration-200 group-hover:border-blue-100 group-hover:shadow-md">
          {company?.logo_url ? (
            <img
              src={company.logo_url}
              alt={company?.name ?? "Company"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <Building2
              size={20}
              className="text-slate-400 transition-colors group-hover:text-blue-500"
            />
          )}
        </div>

        <div className="min-w-0 space-y-1.5">
          <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-[15px]">
            {app.job?.title ?? "Job Title Unavailable"}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">
              {company?.name ?? "Unknown Company"}
            </span>

            {app.job?.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-slate-400" />
                {app.job.location}
              </span>
            )}

            {app.applied_at && (
              <span className="inline-flex items-center gap-1">
                <Calendar size={11} className="text-slate-400" />
                {formattedDate(app.applied_at)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pl-16 sm:justify-end sm:pl-0">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ring-inset ${statusConfig.className}`}
        >
          <StatusIcon size={12} strokeWidth={2.5} />
          {statusConfig.label}
        </span>

        <button
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-400 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:text-slate-700 hover:shadow-sm"
          title="View Details"
        >
          <ChevronRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </Link>
  );
}