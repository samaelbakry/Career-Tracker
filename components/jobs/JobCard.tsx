"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Job } from "@/types/jobs";
import { ArrowUpRight, Banknote, Building2, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JobCard({ job }: { job: Job }) {
  const role = useAppSelector(selectedUser)?.role;
  const isEmployer = role === "employer";
  const navigate = useRouter();

  const formatSalary = (amount?: number | null) =>
  amount ? new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
}).format(amount) : "Negotiable";

  const formattedDate = new Date(job?.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      onClick={isEmployer ? undefined : () => navigate.push(`jobSeeker/jobs/${job.id}`)}
      className="group relative w-full max-w-md cursor-pointer overflow-hidden rounded-3xl border border-dashed border-zinc-300/80 bg-zinc-50/50 p-1 transition-all duration-300 hover:border-solid hover:border-zinc-400 hover:bg-white hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-950"
    >
      <div className="rounded-[20px] bg-white p-5 dark:bg-zinc-900/90">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between gap-2">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase ${
                job?.status === "open"
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "bg-zinc-200/60 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  job?.status === "open" ? "bg-emerald-500" : "bg-zinc-400"
                }`}
              />
              {job?.status ?? "draft"}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              <Clock className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-md transition-transform duration-300 group-hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900">
              <Building2 className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <CardTitle className="line-clamp-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {job?.title ?? "Untitled Position"}
              </CardTitle>
              <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                {job?.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-0">
          <div className="flex flex-wrap gap-1.5">
            {job?.employment_type && (
              <Badge
                variant="outline"
                className="rounded-full border-zinc-200/80 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300"
              >
                {job?.employment_type}
              </Badge>
            )}

            {job?.experience_level && (
              <Badge
                variant="outline"
                className="rounded-full border-zinc-200/80 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300"
              >
                {job?.experience_level}
              </Badge>
            )}

            {job?.location && (
              <Badge
                variant="outline"
                className="rounded-full border-zinc-200/80 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300"
              >
                <MapPin className="mr-1 h-3 w-3 text-zinc-400" />
                {job?.location}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-4 py-3 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                {formatSalary(job?.salary_min)} –{" "}
                {formatSalary(job?.salary_max)}
              </span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/70 dark:text-emerald-400/70">
              / Month
            </span>
          </div>
        </CardContent>

        <CardFooter className="mt-4 p-0">
          {isEmployer ? (
            ""
          ) : (
            <Button className="w-full h-11 rounded-xl bg-zinc-100 font-semibold text-zinc-900 shadow-none transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
              Apply Now
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
