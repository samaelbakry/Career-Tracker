"use client";

import { useFetch } from "@/hooks/useFetch";
import { getCompanyOwner } from "@/services/companies";
import { getEmployerApplications } from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  AlertCircle,
  Loader2,
  UserCheck,
  X
} from "lucide-react";
import { useState } from "react";
import CandidateStatusCard from "./CandidateStatusCard";

export default function CandidateStatus() {
  const userId = useAppSelector(selectedUser)?.id;
  const [activeInterview, setActiveInterview] = useState(false)
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
    queryFn: () => getCompanyOwner(userId!),
    enabled: !!userId,
  });

  const {
    data: applications ,
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useFetch({
    queryKey: ["getEmployerApplications", company?.id],
    queryFn: () => company?.id ? getEmployerApplications(company.id) : Promise.resolve([]),
    enabled: !!company?.id,
  });

  const isLoading = companyLoading || applicationsLoading;

  if (isLoading) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500">
          Loading candidate applications...
        </p>
      </div>
    );
  }

  if (companyError || applicationsError) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <p className="text-sm font-medium">
          Failed to load applications. Please verify your company profile or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-3">
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
          <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Candidate Applications
          </span>
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400">
          Manage and review the candidates who have applied to your open roles.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {!applications || applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:p-20">
            <div className="mb-4 rounded-full bg-slate-50 p-4 dark:bg-slate-800/50">
              <UserCheck className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              No applications yet
            </h3>
            <p className="mt-2 max-w-sm text-base text-slate-500 dark:text-slate-400">
              You haven&apos;t received any candidate applications for your
              posted positions at this time.
            </p>
          </div>
        ) : (
          <CandidateStatusCard applications={applications} setActiveCoverLetter={setActiveCoverLetter}/>
        )}
      </div>

      {activeCoverLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:border dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Cover Letter — {activeCoverLetter.candidateName}
              </h3>
              <button
                onClick={() => setActiveCoverLetter(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 max-h-80 overflow-y-auto rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
              <p className="whitespace-pre-wrap font-sans">
                {activeCoverLetter.text}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveCoverLetter(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
