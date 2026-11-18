"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJob, updateJob } from "@/services/jobs";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { CreateJobT } from "@/types/jobs";
import { FormDialogProps } from "@/types/Props";
import { useQueryClient } from "@tanstack/react-query";
import { Briefcase, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function JobFormDialog({
  open,
  onOpenChange,
  mode,
  job,
}: FormDialogProps) {
  const userId = useAppSelector(selectedUser)?.id;

  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateJobT>({
    defaultValues: {
      title: "",
      description: "",
      employment_type: "Full Time",
      experience_level: "Mid",
      location: "",
      salary_min: undefined,
      salary_max: undefined,
      status: "open",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && job) {
      reset({
        title: job.title,
        description: job.description,
        location: job.location,
        employment_type: job.employment_type,
        experience_level: job.experience_level,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        status: job.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        employment_type: "Full Time",
        experience_level: "Mid",
        location: "",
        salary_min: undefined,
        salary_max: undefined,
        status: "open",
      });
    }
  }, [open, mode, job, reset]);

  const onSubmit = async (data: CreateJobT) => {
    if (!activeCompanyId || !userId) {
      toast.error("Please select an active company first.");
      return;
    }

    if (mode === "edit" && job?.company_id !== activeCompanyId) {
      toast.error("This job does not belong to the selected company.");
      return;
    }

    try {
      const payload: CreateJobT = {
        ...data,
        company_id: activeCompanyId,
        salary_min: Number(data.salary_min),
        salary_max: Number(data.salary_max),
      };

      if (mode === "create") {
        await createJob(payload, activeCompanyId, userId);
        toast.success("Job posting created successfully!");
      } else if (mode === "edit" && job?.id) {
        await updateJob(job.id, payload);
        toast.success("Job updated successfully!");
      } else {
        toast.error("Unable to update job: job ID is missing.");
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["employerJobs"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["employerJobStats"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["hiringAnalytics"],
      });

      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Failed to save job:", error);
      toast.error("Failed to save job posting. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-6xl! max-h-[92vh] overflow-y-auto border border-slate-200 bg-white p-0 shadow-2xl shadow-violet-950/10 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-950">
        <DialogHeader className="border-b border-slate-100 bg-linear-to-br from-violet-50 via-white to-indigo-50/70 px-6 py-6 dark:border-slate-800 dark:from-violet-950/30 dark:via-slate-950 dark:to-indigo-950/20 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <Briefcase className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                {mode === "edit" ? "Edit Job Opening" : "Create Job Opening"}
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                {mode === "edit"
                  ? "Update your job details and keep your listing up to date."
                  : "Create a new opportunity and connect with the right talent."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 sm:px-8">
          {!activeCompanyId && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
              Please select an active company before creating a job.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Job Title <span className="text-violet-600">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Senior Frontend Engineer"
                {...register("title", {
                  required: "Job title is required",
                })}
                className="h-11 rounded-xl border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              {errors.title && (
                <p className="text-xs font-medium text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Location <span className="text-violet-600">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Remote, Cairo"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900"
                />
                {errors.location && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Job Status
                </Label>
                <select
                  id="status"
                  {...register("status")}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="employment_type"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Employment Type
                </Label>
                <select
                  id="employment_type"
                  {...register("employment_type")}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="experience_level"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Experience Level
                </Label>
                <select
                  id="experience_level"
                  {...register("experience_level")}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-700 outline-none transition-all focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4 dark:border-violet-400/10 dark:bg-violet-400/5">
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Salary Range
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Enter the monthly compensation in EGP.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="salary_min"
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Minimum Salary
                  </Label>
                  <Input
                    id="salary_min"
                    type="number"
                    placeholder="80000"
                    {...register("salary_min", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Salary cannot be negative",
                      },
                    })}
                    className="h-11 rounded-xl border-slate-200 bg-white focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900"
                  />
                  {errors.salary_min && (
                    <p className="text-xs text-red-500">
                      {errors.salary_min.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="salary_max"
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Maximum Salary
                  </Label>
                  <Input
                    id="salary_max"
                    type="number"
                    placeholder="120000"
                    {...register("salary_max", {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Salary cannot be negative",
                      },
                    })}
                    className="h-11 rounded-xl border-slate-200 bg-white focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900"
                  />
                  {errors.salary_max && (
                    <p className="text-xs text-red-500">
                      {errors.salary_max.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Job Description <span className="text-violet-600">*</span>
              </Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe the job responsibilities, requirements, and benefits..."
                {...register("description", {
                  required: "Description is required",
                })}
                className="min-h-32 resize-y rounded-xl border-slate-200 bg-slate-50/70 text-sm leading-6 focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900"
              />
              {errors.description && (
                <p className="text-xs font-medium text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <DialogFooter className="flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-xl border-slate-200 px-5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !activeCompanyId}
                className="h-11 rounded-xl bg-violet-600 px-6 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-700 disabled:translate-y-0 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving Job...
                  </>
                ) : mode === "edit" ? (
                  "Save Changes"
                ) : (
                  "Publish Job"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
