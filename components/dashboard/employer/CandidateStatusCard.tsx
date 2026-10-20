
"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Application } from "@/types/applications";
import {
  ApplicationStatus,
  UpdateApplicationStatus,
} from "@/services/employer";

import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  FileText,
  UserRound,
  LoaderCircle,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

import { getApplictaionStatusBadge } from "@/constants/constants";
import { formattedDate } from "@/lib/helpers";
import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import ScheduleInterviewDialog from "./ScheduleInterviewDialog";

interface ActiveCoverLetterData {
  candidateName: string;
  text: string;
}

interface CandidateStatusCardProps {
  applications: Application[];
  setActiveCoverLetter: (data: ActiveCoverLetterData) => void;
}

export default function CandidateStatusCard({
  applications,
  setActiveCoverLetter,
}: CandidateStatusCardProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleApplicationUpdate = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      setUpdatingId(applicationId);

      await UpdateApplicationStatus(applicationId, status);

      toast.success("Application status updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["getEmployerApplications"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["hiringAnalytics"],
      });
    } catch (error) {
      console.error("Failed to update application status:", error);
      toast.error("Failed to update application status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          All applicants
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Review candidate details and update their application stages.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-237.5 text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Application status</th>
              <th className="px-6 py-4">Applied on</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.map((application) => {
              const candidateName =
                application.profiles?.full_name || "Unknown Candidate";

              const isUpdating = updatingId === application.id;

              return (
                <tr
                  key={application.id}
                  className="group transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-sm font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                        {candidateName !== "Unknown Candidate" ? (
                          candidateName.charAt(0).toUpperCase()
                        ) : (
                          <UserRound className="size-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-47.5 truncate font-semibold text-slate-900 dark:text-white">
                          {candidateName}
                        </p>

                        <p className="mt-1 font-mono text-[10px] text-slate-400">
                          {application.user_id
                            ? `ID: ${application.user_id.slice(0, 8)}…`
                            : "No user ID"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex max-w-52.5 items-start gap-2.5">
                      <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <BriefcaseBusiness className="size-4" />
                      </div>

                      <span className="pt-1 font-medium leading-5 text-slate-700 dark:text-slate-200">
                        {application.job?.title || "Position unavailable"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <Select
                      value={application.status}
                      disabled={isUpdating}
                      onValueChange={(value) =>
                        handleApplicationUpdate(
                          application.id,
                          value as ApplicationStatus,
                        )
                      }
                    >
                      <SelectTrigger
                        className={`h-9 w-36 rounded-full border-0 px-3 text-xs font-semibold ring-1 ring-inset ring-black/5 focus:ring-2 focus:ring-violet-500 dark:ring-white/10 ${getApplictaionStatusBadge(
                          application.status,
                        )} ${isUpdating ? "opacity-60" : ""}`}
                      >
                        {isUpdating && (
                          <LoaderCircle className="mr-1 size-3.5 animate-spin" />
                        )}

                        <SelectValue placeholder="Choose status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Application status</SelectLabel>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Reviewing">Reviewing</SelectItem>
                          <SelectItem value="Interview">Interview</SelectItem>
                          <SelectItem value="Offer">Offer</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="size-4 text-slate-400" />
                      {formattedDate(application.applied_at)}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {application.status === "Interview" && (
                        <DialogButtonTrigger
                          Component={ScheduleInterviewDialog}
                          componentProps={{ application }}
                          interview
                        />
                      )}

                      {application.cover_letter && (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveCoverLetter({
                              candidateName,
                              text: application.cover_letter || "",
                            })
                          }
                          title="Read cover letter"
                          aria-label={`Read cover letter for ${candidateName}`}
                          className="inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
                        >
                          <FileText className="size-4" />
                        </button>
                      )}

                      {application.resume_url ? (
                        <NextLink
                          href={application.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          title="Open resume"
                          aria-label={`Open resume for ${candidateName}`}
                          className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-slate-900 px-3 text-xs font-semibold text-white transition hover:bg-violet-700 dark:bg-white dark:text-slate-900 dark:hover:bg-violet-100"
                        >
                          Resume
                          <ExternalLink className="size-3.5" />
                        </NextLink>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No resume
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800 sm:px-6">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {applications.length} application
          {applications.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
