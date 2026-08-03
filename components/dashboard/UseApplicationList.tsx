"use client";

import { getStatusBadge } from "@/constants/constants";
import { useFetch } from "@/hooks/useFetch";
import { getUserApplications } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";

export default function UserApplicationsList() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: applications, isLoading } = useFetch({
    queryKey: ["applications", userId],
    queryFn: () => getUserApplications(userId!),
  });

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Recent Applications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage and track the status of your submitted job applications
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {applications?.length ?? 0} Total
        </span>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded bg-slate-100" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </div>
              <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>
          ))
        ) : applications && applications.length > 0 ? (
          applications.map((app) => {
            const statusConfig = getStatusBadge(app.status);
            const StatusIcon = statusConfig.icon;
            const company = app.job?.company;

            return (
              <div
                key={app.id}
                className="group flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-slate-50/50 rounded-2xl px-2 -mx-2"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 shadow-sm">
                    {company?.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company?.name ?? "Company"}
                        className="h-full w-full object-cover"
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
                          {app.job.location}
                        </span>
                      )}

                      {app.applied_at && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          {new Date(app.applied_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
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
            );
          })
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Briefcase size={22} />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No applications yet
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Start applying to open positions to track your progress here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
