
"use client";

import { useState } from "react";
import {
  AlertCircle,
  UsersRound,
  FileSearch,
  X,
  Sparkles,
} from "lucide-react";

import CardSkeleton from "@/components/skeletons/CandidateStatusSkeleton";
import { useFetch } from "@/hooks/useFetch";
import { getCompanyOwner } from "@/services/companies";
import { getEmployerApplications } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import CandidateStatusCard from "./CandidateStatusCard";

export default function CandidateStatus() {
  const userId = useAppSelector(selectedUser)?.id;

  const [activeCoverLetter, setActiveCoverLetter] = useState<{
    candidateName: string;
    text: string;
  } | null>(null);

  const {
    data: company,
    isLoading: companyLoading,
    isError: companyError,
  } = useFetch({
    queryKey: ["employerCompany", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is required");
      return getCompanyOwner(userId);
    },
    enabled: !!userId,
  });

  const {
    data: applications,
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useFetch({
    queryKey: ["getEmployerApplications", company?.id],
    queryFn: () =>
      company?.id
        ? getEmployerApplications(company.id)
        : Promise.resolve([]),
    enabled: !!company?.id,
  });

  const isLoading = companyLoading || applicationsLoading;

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (companyError || applicationsError) {
    return (
      <div
        role="alert"
        className="my-8 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400"
      >
        <AlertCircle className="mt-0.5 size-5 shrink-0" />
        <div>
          <p className="font-semibold">
            Unable to load candidate applications
          </p>
          <p className="mt-1 text-sm opacity-80">
            Please check your company profile and try again.
          </p>
        </div>
      </div>
    );
  }

  const totalApplications = applications?.length ?? 0;

  const reviewingCount =
    applications?.filter(
      (application) =>
        application.status === "Reviewing"
    ).length ?? 0;

  return (
    <section className="my-12 space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles className="size-4" />
            <span>Talent management</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Candidate Applications
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Review candidates, track application progress, and manage your hiring pipeline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <UsersRound className="size-4 text-violet-500" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {totalApplications}
            </span>
            <span className="text-sm text-slate-500">
              Applicants
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            <FileSearch className="size-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {reviewingCount}
            </span>
            <span className="text-sm text-slate-500">
              Reviewing
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {!applications || applications.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-500/10">
              <UsersRound className="size-7 text-violet-600 dark:text-violet-400" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              No applications yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              When candidates apply to your job listings, their applications will appear here.
            </p>
          </div>
        ) : (
          <CandidateStatusCard
            applications={applications}
            setActiveCoverLetter={setActiveCoverLetter}
          />
        )}
      </div>

      {activeCoverLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setActiveCoverLetter(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cover-letter-title"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  Candidate document
                </p>

                <h3
                  id="cover-letter-title"
                  className="mt-1 text-lg font-bold text-slate-900 dark:text-white"
                >
                  Cover Letter
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Submitted by {activeCoverLetter.candidateName}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close cover letter"
                onClick={() => setActiveCoverLetter(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5 sm:p-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
                {activeCoverLetter.text}
              </p>
            </div>

            <div className="flex justify-end border-t border-slate-100 p-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveCoverLetter(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
