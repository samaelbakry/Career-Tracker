"use client";

import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  Code2,
  FileText,
  Globe,
  Loader2,
  MapPin,
  Sparkles,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

import { upsertJobSeekerProfile } from "@/services/jobSeekerProfile";
import { JobSeekerProfile } from "@/types/profileOptimizing";
import {
  ProfileFormValues,
  profileSchema,
} from "@/schemas/jobSeekerProfileOptimization";

interface Props {
  userId: string;
  profile?: JobSeekerProfile | null;
  onSuccess: () => void;
}

export default function JobSeekerProfileForm({
  userId,
  profile,
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormValues>,
    defaultValues: {
      target_job_title: profile?.target_job_title ?? "",
      experience_years: profile?.experience_years ?? 0,
      experience_level: profile?.experience_level ?? undefined,
      skills: profile?.skills?.join(", ") ?? "",
      preferred_location: profile?.preferred_location ?? "",
      work_mode: profile?.work_mode ?? undefined,
      employment_type: profile?.employment_type ?? undefined,
      bio: profile?.bio ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      upsertJobSeekerProfile({
        user_id: userId,
        target_job_title: values.target_job_title,
        experience_years: Number(values.experience_years),
        experience_level: values.experience_level,
        skills: values.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        preferred_location: values.preferred_location,
        work_mode: values.work_mode,
        employment_type: values.employment_type,
        bio: values.bio,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobSeekerProfile", userId!],
      });
      onSuccess?.();
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (values) => {
    mutation.mutate(values);
  };

  return (
    <section className="relative isolate animate-in fade-in-50 slide-in-from-top-3 duration-300 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">
        <div className="relative mb-7 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between pr-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600">
              <Sparkles size={12} />
              Career Preferences
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
              {profile ? "Edit Your Profile" : "Set Up Your Profile"}
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Provide details to help employers match you with the right roles.
            </p>
          </div>

          <button
            type="button"
            onClick={onSuccess}
            className="absolute right-0 top-0 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close form"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="target_job_title"
                className="text-xs font-bold text-slate-700"
              >
                Target Job Title
              </label>
              <div className="relative">
                <Briefcase
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="target_job_title"
                  {...register("target_job_title")}
                  placeholder="e.g. Frontend Developer"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              {errors.target_job_title && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.target_job_title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="experience_years"
                className="text-xs font-bold text-slate-700"
              >
                Years of Experience
              </label>
              <div className="relative">
                <Calendar
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="experience_years"
                  type="number"
                  min={0}
                  {...register("experience_years", { valueAsNumber: true })}
                  placeholder="0"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              {errors.experience_years && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.experience_years.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="experience_level"
                className="text-xs font-bold text-slate-700"
              >
                Experience Level
              </label>
              <div className="relative">
                <UserCheck
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  id="experience_level"
                  {...register("experience_level")}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs shadow-sm transition-all hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.experience_level && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.experience_level.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="preferred_location"
                className="text-xs font-bold text-slate-700"
              >
                Preferred Location
              </label>
              <div className="relative">
                <MapPin
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="preferred_location"
                  {...register("preferred_location")}
                  placeholder="e.g. Cairo, Egypt or Remote"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              {errors.preferred_location && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.preferred_location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="work_mode"
                className="text-xs font-bold text-slate-700"
              >
                Work Mode
              </label>
              <div className="relative">
                <Globe
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  id="work_mode"
                  {...register("work_mode")}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs shadow-sm transition-all hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select work mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate- font-mediumtext-slate-400"
                />
              </div>
              {errors.work_mode && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.work_mode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="employment_type"
                className="text-xs font-bold text-slate-700"
              >
                Employment Type
              </label>
              <div className="relative">
                <Clock
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  id="employment_type"
                  {...register("employment_type")}
                  className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs shadow-sm transition-all hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Select employment type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.employment_type && (
                <p className="text-[11px] font-medium text-rose-500">
                  {errors.employment_type.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="skills"
                className="text-xs font-bold text-slate-700"
              >
                Key Skills
              </label>
              <span className="text-[11px] font-medium text-slate-400">
                Comma separated
              </span>
            </div>
            <div className="relative">
              <Code2
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="skills"
                {...register("skills")}
                placeholder="React, TypeScript, Next.js, Tailwind CSS"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            {errors.skills && (
              <p className="text-[11px] font-medium text-rose-500">
                {errors.skills.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-xs font-bold text-slate-700">
              Professional Bio
            </label>
            <div className="relative">
              <FileText
                size={15}
                className="pointer-events-none absolute left-3 top-3 text-slate-400"
              />
              <textarea
                id="bio"
                rows={4}
                {...register("bio")}
                placeholder="Tell employers about your experience, achievements, and career goals..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 pt-2.5 text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            {errors.bio && (
              <p className="text-[11px] font-medium text-rose-500">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">
            <div className="text-xs">
              {mutation.isError && (
                <div className="flex items-center gap-1.5 font-semibold text-rose-600">
                  <AlertCircle size={15} />
                  <span>Failed to save profile. Please try again.</span>
                </div>
              )}
              {mutation.isSuccess && (
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600">
                  <CheckCircle2 size={15} />
                  <span>Profile updated successfully!</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
