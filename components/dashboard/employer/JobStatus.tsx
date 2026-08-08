"use client";

import CardSkeleton from "@/components/jobs/CardSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getEmployerJobStats } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { AlertTriangle, Briefcase, CheckCircle2, XCircle } from "lucide-react";
import JobStatusCard from "./JobStatusCard";

export default function JobStatus() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data, isLoading, error } = useFetch({
    queryFn: () => getEmployerJobStats(userId!),
    queryKey: ["employerJobStats", userId],
    enabled: !!userId,
  });

  const statCards = [
    {
      id: "total",
      title: "Total Jobs",
      count: data?.totalJobs ?? 0,
      description: "All job posts created",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: "active",
      title: "Active Jobs",
      count: data?.activeJobs ?? 0,
      description: "Currently open listings",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      id: "closed",
      title: "Closed Jobs",
      count: data?.closedJobs ?? 0,
      description: "Filled or ended listings",
      icon: <XCircle className="h-5 w-5" />,
    },
  ];
  return (
    <>
      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Failed to load job statistics.</span>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : statCards.map((stat) => (
                <JobStatusCard
                  key={stat.id}
                  title={stat.title}
                  count={stat.count}
                  description={stat.description}
                  icon={stat.icon}
                />
              ))}
        </div>
      )}
    </>
  );
}
