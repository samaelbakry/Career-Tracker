"use client";

import { Input } from "@/components/ui/input";
import {
  applicationFormSchema,
  ApplicationFormValues,
} from "@/schemas/application";
import { applyForJob } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Application() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get("id");
  const jobTitle = searchParams.get("title");
  const companyName = searchParams.get("company");
  const jobLocation = searchParams.get("location");

  const userId = useAppSelector(selectedUser)?.id;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      resume_url: "",
      cover_letter: "",
      status: "pending",
    },
    resolver: zodResolver(applicationFormSchema),
  });

  const onSubmit: SubmitHandler<ApplicationFormValues> = async (formData) => {
    if (!userId) {
      toast("Please login first.");
      return;
    }

    if (!jobId) {
      toast("Invalid job.");
      return;
    }
    try {
      const application = await applyForJob({
        jobId,
        resumeUrl: formData.resume_url,
        coverLetter: formData.cover_letter,
      });
      console.log("Application submitted:", application);

      toast("Application submitted successfully.");
      setTimeout(() => {
        router.push("/jobSeeker/dashboard");
      }, 1000);

      reset({
        resume_url: "",
        cover_letter: "",
        status: "pending",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";

      toast(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden transition-all">
        <div className="bg-[#0A192F] px-8 py-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 mb-3 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Job Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {jobTitle ? `Apply for ${jobTitle}` : "Apply for this Job"}
              </h2>
            </div>
          </div>
          <p className="text-slate-300/90 text-sm mt-2.5 max-w-lg leading-relaxed">
            {companyName || jobLocation ? (
              <span>
                Applying at{" "}
                <strong className="text-white">
                  {companyName ?? "Company"}
                </strong>
                {jobLocation ? ` • ${jobLocation}` : ""}
              </span>
            ) : (
              "Complete the form below to submit your application. Your saved profile details will automatically be attached."
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-7">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-800">
                Resume URL <span className="text-rose-500 font-bold">*</span>
              </label>
              <span className="text-xs text-slate-400">
                PDF or Google Drive link
              </span>
            </div>

            <Controller
              name="resume_url"
              control={control}
              render={({ field }) => (
                <div className="relative rounded-xl shadow-xs">
                  <Input
                    {...field}
                    placeholder="https://drive.google.com/your-resume"
                    className="h-11 px-4 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10 transition-all text-sm placeholder:text-slate-400"
                  />
                </div>
              )}
            />

            {errors.resume_url && (
              <p className="text-rose-500 text-xs font-medium flex items-center gap-1 mt-1.5">
                <span>✕</span> {errors.resume_url.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-800">
                Cover Letter <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>

            <Controller
              name="cover_letter"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={6}
                  placeholder="Tell the recruiter why you're a great fit for this role..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 placeholder:text-slate-400 resize-none transition-all focus:bg-white focus:outline-none focus:border-[#0A192F] focus:ring-2 focus:ring-[#0A192F]/10"
                />
              )}
            />

            {errors.cover_letter && (
              <p className="text-rose-500 text-xs font-medium flex items-center gap-1 mt-1.5">
                <span>✕</span> {errors.cover_letter.message}
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Application Details
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                Pending Submission
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-xs text-slate-400 block font-medium">
                  Position
                </span>
                <span className="font-semibold text-slate-700 text-xs truncate block mt-0.5">
                  {jobTitle ?? "Not Specified"}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-xs text-slate-400 block font-medium">
                  Company & Location
                </span>
                <span className="font-semibold text-slate-700 text-xs truncate block mt-0.5">
                  {companyName
                    ? `${companyName}${jobLocation ? ` (${jobLocation})` : ""}`
                    : "Not Specified"}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-xs text-slate-400 block font-medium">
                  Job Reference ID
                </span>
                <span className="font-semibold text-slate-700 font-mono text-xs truncate block mt-0.5">
                  {jobId ?? "Not Found"}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                <span className="text-xs text-slate-400 block font-medium">
                  Applicant Account
                </span>
                <span className="font-semibold text-slate-700 font-mono text-xs truncate block mt-0.5">
                  {userId ?? "Not Logged In"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => router.back()}
              type="button"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100/80 active:bg-slate-200/70 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A192F] text-white text-sm font-medium hover:bg-[#112240] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0A192F] transition-all shadow-md shadow-[#0A192F]/10 focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:ring-offset-2"
            >
              {isSubmitting && (
                <Loader className="w-4 h-4 animate-spin text-white" />
              )}
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
