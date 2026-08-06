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
import { useFetch } from "@/hooks/useFetch";
import { getCompanyOwner } from "@/services/companies";
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

export default function JobFormDialog({ open, onOpenChange , mode , job }: FormDialogProps) {
  const userId = useAppSelector(selectedUser)?.id;
  const queryClient = useQueryClient();

  const { data: companyOwner, isLoading: isLoadingCompany, isError: isCompanyError} = useFetch({
    queryKey: ["companyOwner", userId],
    queryFn: () => getCompanyOwner(userId!),
    enabled: !!userId && open,
  });

  const companyId = companyOwner?.id;

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
   if(mode === "edit" && job){
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
   }else{
    reset()
   }
  }, [])
  

  const onSubmit = async (data: CreateJobT) => {
    if (!companyId || !userId) {
      toast.error("Company profile not found. Please create a company profile first.");
      return;
    }

    try {
      const payload: CreateJobT = {
        ...data,
        company_id: companyId,
        salary_min: Number(data.salary_min),
        salary_max: Number(data.salary_max),
      };
      if (mode === "create") {
        await createJob(payload, companyId, userId);
        toast.success("Job posting created successfully!");
      } else if (job?.id) {
        await updateJob(job.id, payload);
        toast.success("Job updated successfully!");
      } else {
        toast.error("Unable to update job: job ID is missing.");
      }
      
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      onOpenChange(false);
      reset();

    } catch (error) {
      console.error("Failed to create job:", error);
      toast.error("Failed to create job posting. Please try again.");
    }
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full max-h-screen sm:max-w-6xl overflow-y-auto">
        <DialogHeader className="space-y-3 pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Create Job Opening
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Fill in the details below to publish a new job listing.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isCompanyError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg text-red-600 dark:text-red-400 text-xs">
            Could not retrieve your company details. Make sure you have created a company profile first.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Senior Frontend Engineer"
              {...register("title", { required: "Job title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g. Remote, San Francisco, CA"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-xs text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="employment_type">Employment Type</Label>
              <select
                id="employment_type"
                {...register("employment_type")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              >
                <option value="Full Time" defaultChecked>Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.employment_type && (
                <p className="text-xs text-red-500">
                  {errors.employment_type.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="experience_level">Experience Level</Label>
              <select
                id="experience_level"
                {...register("experience_level")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              >
                <option value="Junior" defaultChecked>Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.experience_level && (
                <p className="text-xs text-red-500">
                  {errors.experience_level.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="salary_min">Minimum Salary EGP</Label>
              <Input
                id="salary_min"
                type="number"
                placeholder="80000"
                {...register("salary_min", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Salary cannot be negative" },
                })}
              />
              {errors.salary_min && (
                <p className="text-xs text-red-500">
                  {errors.salary_min.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="salary_max">Maximum Salary EGP</Label>
              <Input
                id="salary_max"
                type="number"
                placeholder="120000"
                {...register("salary_max", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Salary cannot be negative" },
                })}
              />
              {errors.salary_max && (
                <p className="text-xs text-red-500">
                  {errors.salary_max.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoadingCompany || !companyId}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting Job...
                </>
              ) : isLoadingCompany ? (
                "Loading Company..."
              ) : (
               mode ? "Update" : "Post"
              )}

            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}