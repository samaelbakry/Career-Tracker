
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { formatSalary, formattedDate } from "@/lib/helpers";
import { getUserApplications } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Job } from "@/types/jobs";
import {
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  MapPin
} from "lucide-react";
import { useRouter } from "next/navigation";
import DialogButtonTrigger from "../ui/DialogButtonTrigger";
import DeleteJobButton from "./DeleteJobButton";
import JobFormDialog from "./JobFormDialog";
import SaveJobs from "./SaveJobs";
import WithdrawButton from "./WithdrawButton";

export default function JobCard({ job }: { job: Job }) {
  const role = useAppSelector(selectedUser)?.role;
  const userId = useAppSelector(selectedUser)?.id;

  const { data: applications } = useFetch({
    queryKey: ["applications", userId],
    queryFn: () => getUserApplications(userId!),
    enabled: !!userId,
  });

  const isApplied = Boolean(
    applications?.some((app) => app.job_id === job.id),
  );

  const isEmployer = role === "employer";
  const canManageJob = isEmployer && userId === job.owner_id;

  const navigate = useRouter();

  const handleCardClick = () => {
    if (!isEmployer) {
      navigate.push(`/jobSeeker/jobs/${job.id}`);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`
        group relative w-full cursor-pointer overflow-hidden
        rounded-[1.75rem] border p-0 shadow-none
        transition-all duration-300
        ${
          isApplied
            ? "border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/60 dark:bg-emerald-950/10"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl  dark:border-slate-800 dark:bg-[#101114] dark:hover:border-slate-700 dark:hover:shadow-black/20"
        }
      `}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <div
              className={`
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-2xl transition-colors duration-300
                ${
                  isApplied
                    ? "bg-emerald-600 text-white"
                    : "bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-300 dark:group-hover:bg-violet-600 dark:group-hover:text-white"
                }
              `}
            >
              <Building2 size={22} strokeWidth={1.7} />
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                Career opportunity
              </p>

              <h3 className="line-clamp-2 text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white">
                {job.title ?? "Untitled Position"}
              </h3>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {canManageJob ? (
              <>
                <DialogButtonTrigger
                  Component={JobFormDialog}
                  edit
                  componentProps={{
                    mode: "edit" as const,
                    job,
                  }}
                />
                <DeleteJobButton jobId={job.id} />
              </>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all group-hover:border-violet-200 group-hover:text-violet-600 dark:border-slate-800 dark:text-slate-500 dark:group-hover:border-violet-900 dark:group-hover:text-violet-300">
                <ArrowUpRight size={17} />
              </div>
            )}
          </div>
        </div>

        <p className="mt-5 line-clamp-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          {job.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          {job.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-violet-500" />
              {job.location}
            </span>
          )}

          {job.employment_type && (
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseBusiness size={14} className="text-violet-500" />
              {job.employment_type}
            </span>
          )}

          {job.experience_level && (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-violet-500" />
              {job.experience_level}
            </span>
          )}
        </div>

        <div className="my-6 h-px bg-slate-100 dark:bg-slate-800" />

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Banknote size={15} className="text-emerald-600 dark:text-emerald-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                Monthly compensation
              </span>
            </div>

            <p className="break-words text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              {formatSalary(job.salary_min)}
              <span className="mx-2 text-sm font-normal text-slate-300 dark:text-slate-600">
                —
              </span>
              {formatSalary(job.salary_max)}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={`
                  rounded-full border px-2.5 py-1 text-[10px] font-semibold
                  ${
                    job.status === "open"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  }
                `}
              >
                <span
                  className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                    job.status === "open" ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {job.status ?? "draft"}
              </Badge>

              {isApplied && !isEmployer && (
                <Badge
                  variant="outline"
                  className="gap-1 rounded-full border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
                >
                  <Check size={11} />
                  Applied
                </Badge>
              )}

              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Posted {formattedDate(job.created_at)}
              </span>
            </div>
          </div>

          {!isEmployer && (
            <div
              className="flex w-full shrink-0 items-center gap-2 sm:w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                disabled={isApplied}
                className={`
                  h-11 min-w-0 flex-1 rounded-xl px-5 text-xs font-semibold
                  transition-all sm:flex-none
                  ${
                    isApplied
                      ? "cursor-default bg-emerald-600 text-white opacity-100 hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-700"
                      : "bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 dark:hover:text-slate-950"
                  }
                `}
              >
                {isApplied ? (
                  <>
                    <Check size={15} className="mr-1.5" />
                    Applied
                  </>
                ) : (
                  <>
                    Apply now
                    <ArrowUpRight size={15} className="ml-2" />
                  </>
                )}
              </Button>

              <SaveJobs jobId={job.id} />

              {isApplied && (
                <WithdrawButton
                  userId={userId as string}
                  jobId={job.id}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
