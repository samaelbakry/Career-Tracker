"use client";

import { useFetch } from "@/hooks/useFetch";
import { calculateProfileCompletion } from "@/lib/helpers";
import {
  getCertificates,
  getJobSeekerProfile,
} from "@/services/jobSeekerProfile";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";

export default function ProfileCompletionCard() {
  const userId = useAppSelector(selectedUser)?.id;

  const { data: certificates = [] } = useFetch({
    queryFn: () => getCertificates(userId!),
    queryKey: ["certificates", userId],
    enabled: !!userId,
  });

  const { data: profile} = useFetch({
    queryFn: () => getJobSeekerProfile(userId!),
    queryKey: ["jobSeekerProfile", userId],
    enabled: !!userId,
  });

  const { percentage, missing } = calculateProfileCompletion(
    profile ?? null,
    certificates,
  );

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600">
              <Sparkles size={12} />
              Profile Status
            </div>

            <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
              Complete Your Profile
            </h2>

            <p className="text-xs text-slate-500 sm:text-sm">
              A complete profile helps employers match you with relevant opportunities.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
              <Target size={22} />
            </div>
            <div>
              <span className="block text-2xl font-black text-slate-950 sm:text-3xl">
                {percentage}%
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Completed
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-violet-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {missing.length > 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={15} className="text-amber-500" />
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Missing Information
              </p>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {missing.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium text-slate-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-emerald-800">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <p className="text-xs font-bold sm:text-sm">
              Your profile is fully completed and optimized for recruiters! 🎉
            </p>
          </div>
        )}
      </div>
    </section>
  );
}