import { getStatusBadge } from "@/constants/constants";
import { formattedDate } from "@/lib/helpers";
import { ApplicationWithDetails } from "@/types/applications";
import { Building2, Calendar, ExternalLink, MapPin } from "lucide-react";

export default function ApplicationCard({ app }: { app: ApplicationWithDetails }) {
  const statusConfig = getStatusBadge(app.status);
  const StatusIcon = statusConfig.icon;
  const company = app.job?.company;
  return (
    <>
      <div className="group flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-slate-50/50 rounded-2xl px-2 -mx-2">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 shadow-sm">
            {company?.logo_url ? (
              <img
                src={company.logo_url}
                alt={company?.name ?? "Company"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <Building2 size={20} />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {app.job?.title ?? "Job Title Unavailable"}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="font-medium text-slate-700">
                {company?.name ?? "Unknown Company"}
              </span>

              {app.job?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-slate-400" />
                  {app?.job?.location}
                </span>
              )}

              {app.applied_at && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-slate-400" />
                  {formattedDate(app.applied_at)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusConfig.className}`}
          >
            <StatusIcon size={13} />
            {statusConfig.label}
          </span>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            title="View Details"
          >
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </>
  );
}
