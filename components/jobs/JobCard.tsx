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
import {
  ArrowUpRight,
  Banknote,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import JobFormDialog from "./JobFormDialog";
import DeleteJobButton from "./DeleteJobButton";

export default function JobCard({ job }: { job: Job }) {
  const role = useAppSelector(selectedUser)?.role;
  const userId = useAppSelector(selectedUser)?.id;

  const isEmployer = role === "employer";
  const canManageJob = isEmployer && userId === job.owner_id;

  const navigate = useRouter();

  const formatSalary = (amount?: number | null) =>
    amount
      ? new Intl.NumberFormat("en-EG", {
          style: "currency",
          currency: "EGP",
          maximumFractionDigits: 0,
        }).format(amount)
      : "Negotiable";

  const formattedDate = new Date(job.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const handleCardClick = () => {
    if (!isEmployer) {
      navigate.push(`/jobSeeker/jobs/${job.id}`);
    }
  };

  return (
    <Card
      onClick={isEmployer ? undefined : handleCardClick}
      className={`
        group relative w-full overflow-hidden rounded-3xl
        border border-slate-200/80 bg-white
        shadow-sm
        transition-all duration-300
        ${
          !isEmployer
            ? "cursor-pointer hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5"
            : ""
        }
        dark:border-slate-800 dark:bg-slate-950
      `}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-70" />

      <div className="p-5 sm:p-6">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`
                  inline-flex items-center gap-1.5 rounded-full
                  border px-2.5 py-1
                  text-[10px] font-bold uppercase tracking-wider
                  ${
                    job.status === "open"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400"
                      : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  }
                `}
              >
                <span
                  className={`
                    h-1.5 w-1.5 rounded-full
                    ${
                      job.status === "open"
                        ? "bg-emerald-500"
                        : "bg-slate-400"
                    }
                  `}
                />

                {job.status ?? "draft"}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                <Clock className="h-3 w-3" />
                {formattedDate}
              </div>
            </div>

            {canManageJob && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1"
              >
                <DialogButtonTrigger
                  Component={JobFormDialog}
                  edit
                  componentProps={{
                    mode: "edit" as const,
                    job,
                  }}
                />

                <DeleteJobButton jobId={job.id} />
              </div>
            )}
          </div>

          <div className="mt-6 flex items-start gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl
                bg-slate-900 text-white
                shadow-lg shadow-slate-900/10
                transition-all duration-300
                group-hover:scale-105 group-hover:shadow-indigo-900/10
                dark:bg-white dark:text-slate-900
              "
            >
              <Building2 className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <CardTitle
                className="
                  line-clamp-1
                  text-lg sm:text-xl
                  font-bold tracking-tight
                  text-slate-900
                  dark:text-slate-50
                "
              >
                {job.title ?? "Untitled Position"}
              </CardTitle>

              <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {job.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-6 space-y-5 p-0">
          <div className="flex flex-wrap gap-2">
            {job.employment_type && (
              <Badge
                variant="outline"
                className="
                  rounded-full
                  border-slate-200
                  bg-slate-50
                  px-3 py-1.5
                  text-[11px] font-semibold
                  text-slate-600
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-slate-300
                "
              >
                {job.employment_type}
              </Badge>
            )}

            {job.experience_level && (
              <Badge
                variant="outline"
                className="
                  rounded-full
                  border-slate-200
                  bg-slate-50
                  px-3 py-1.5
                  text-[11px] font-semibold
                  text-slate-600
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-slate-300
                "
              >
                {job.experience_level}
              </Badge>
            )}

            {job.location && (
              <Badge
                variant="outline"
                className="
                  rounded-full
                  border-slate-200
                  bg-slate-50
                  px-3 py-1.5
                  text-[11px] font-semibold
                  text-slate-600
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:text-slate-300
                "
              >
                <MapPin className="mr-1.5 h-3 w-3" />
                {job.location}
              </Badge>
            )}
          </div>

          <div
            className="
              relative overflow-hidden
              rounded-2xl
              border border-emerald-100
              bg-linear-to-br from-emerald-50 to-white
              px-4 py-4
              dark:border-emerald-900/40
              dark:from-emerald-950/30
              dark:to-slate-950
            "
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl
                    bg-white
                    text-emerald-600
                    shadow-sm
                    dark:bg-emerald-950/60
                    dark:text-emerald-400
                  "
                >
                  <Banknote className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700/60 dark:text-emerald-400/60">
                    Salary Range
                  </p>

                  <p className="truncate text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    {formatSalary(job.salary_min)} –{" "}
                    {formatSalary(job.salary_max)}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-emerald-700/60 dark:text-emerald-400/60">
                Monthly
              </span>
            </div>
          </div>
        </CardContent>

        {!isEmployer && (
          <CardFooter className="mt-5 p-0">
            <Button
              className="
                h-11 w-full
                rounded-xl
                bg-slate-900
                text-sm font-semibold text-white
                shadow-sm
                transition-all duration-300
                hover:bg-indigo-700
                hover:shadow-lg hover:shadow-indigo-900/10
                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-indigo-50
              "
            >
              Apply Now

              <ArrowUpRight
                className="
                  ml-1 h-4 w-4
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
}