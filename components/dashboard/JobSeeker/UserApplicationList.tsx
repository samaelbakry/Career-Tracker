"use client";

import { useFetch } from "@/hooks/useFetch";
import { getUserApplications } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Briefcase, ChevronRight } from "lucide-react";
import React from "react";
import ApplicationCard from "./ApplicationCard";

export default function UserApplicationsList() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: applications, isLoading } = useFetch({
    queryKey: ["applications", userId],
    queryFn: () => getUserApplications(userId!),
    enabled: !!userId,
  });

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_12px_40px_-25px_rgba(15,23,42,0.25)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <Briefcase size={18} />
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
              Recent Applications
            </h2>

            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
              Track the progress of your submitted applications
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          {applications?.length ?? 0} Total
        </div>
      </div>

      <div className="px-3 py-2 sm:px-4">
        {isLoading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center justify-between gap-4 px-2 py-5 sm:px-3"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100" />

                  <div className="space-y-2">
                    <div className="h-4 w-36 rounded-md bg-slate-100 sm:w-48" />
                    <div className="h-3 w-24 rounded-md bg-slate-100 sm:w-32" />
                  </div>
                </div>

                <div className="h-7 w-20 shrink-0 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : applications && applications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {applications.map((app) => (
              <React.Fragment key={app.id}>
                <ApplicationCard app={app} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 ring-1 ring-slate-100">
              <Briefcase size={23} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              No applications yet
            </h3>

            <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-slate-500">
              Start applying to open positions and your applications will
              appear here.
            </p>

            <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
              Explore opportunities
              <ChevronRight size={13} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}