"use client";

import { useFetch } from "@/hooks/useFetch";
import { getUserApplications } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Briefcase } from "lucide-react";
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
            return (
              <React.Fragment key={app.id}>
                <ApplicationCard app={app} />
              </React.Fragment>
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
