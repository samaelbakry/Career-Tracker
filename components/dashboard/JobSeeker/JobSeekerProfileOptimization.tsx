"use client";

import { useFetch } from "@/hooks/useFetch";
import { getJobSeekerProfile } from "@/services/jobSeekerProfile";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { AlertCircle, Loader2, LogIn, UserX } from "lucide-react";

import JobSeekerProfileForm from "./JobSeekerProfileForm";
import JobSeekerProfileView from "./JobSeekerProfileView";

export default function JobSeekerProfileOptimization() {
  const user = useAppSelector(selectedUser);
  const userId = user?.id;

  const {
    data: profile,
    isLoading,
    isError,
  } = useFetch({
    queryFn: () => getJobSeekerProfile(userId!),
    queryKey: ["jobSeekerProfile", userId],
    enabled: !!userId,
  });

  if (!userId) {
    return (
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-8 text-center shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
            <LogIn size={26} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
              Authentication Required
            </h3>
            <p className="text-xs text-slate-500 sm:text-sm">
              Please log in to your account to view and manage your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-12 text-center shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)]">
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="animate-spin text-blue-600" />
          <p className="text-xs font-bold text-slate-600 sm:text-sm">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-rose-200/80 bg-rose-50/30 p-8 text-center shadow-[0_20px_60px_-25px_rgba(225,29,72,0.1)] sm:p-12">
        <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-inner">
            <AlertCircle size={26} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
              Failed to Load Profile
            </h3>
            <p className="text-xs text-slate-500 sm:text-sm">
              Something went wrong while fetching your details. Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-inner">
              <UserX size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-950 sm:text-xl">
                Complete Your Profile
              </h2>
              <p className="text-xs text-slate-500 sm:text-sm">
                No profile details were found. Fill out the form below to get started.
              </p>
            </div>
          </div>
        </div>

        <JobSeekerProfileForm userId={userId} profile={null} />
      </div>
    );
  }

  return <JobSeekerProfileView profile={profile} />;
}