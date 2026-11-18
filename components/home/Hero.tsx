"use client";

import { ArrowRight, Check } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import {
  selectedAuthenticated,
  selectedUser,
} from "@/store/slices/authSlice";
import { heroContent } from "@/constants/constants";

export default function Hero() {
  const authenticated = useAppSelector(selectedAuthenticated);
  const user = useAppSelector(selectedUser);

  const userName = user?.name;
  const role = user?.role;

  const isEmployer = role === "employer";
  const content = isEmployer ? heroContent.employer : heroContent.job_seeker;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 via-white to-blue-50/30 px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-400/15 blur-[120px] dark:bg-blue-600/10" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-indigo-400/15 blur-[140px] dark:bg-indigo-600/10" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-8 text-left lg:col-span-6">
            {authenticated && (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200/80 bg-linear-to-r from-indigo-50/80 to-blue-50/80 px-4 py-2.5 text-sm font-semibold text-indigo-800 shadow-xs backdrop-blur-md dark:border-indigo-800/60 dark:from-indigo-950/40 dark:to-blue-950/40 dark:text-indigo-300">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse dark:bg-indigo-400" />
                Welcome back, {userName}!
              </div>
            )}

            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-xs font-bold tracking-wider uppercase text-blue-700 shadow-xs backdrop-blur-md dark:border-blue-800/60 dark:bg-slate-900/80 dark:text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-600 shadow-xs shadow-blue-500/50 dark:bg-blue-400" />
                Track Every Opportunity
              </div>
            </div>

            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-[58px] lg:leading-[1.08] dark:text-white">
              {content.title}{" "}
              <span className="bg-linear-to-r from-blue-700 via-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300">
                {content.highlight}
              </span>
            </h1>

            <p className="max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {content.description}
            </p>

            {authenticated ? (
              <Link
                href={content.href}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-700 to-indigo-700 px-8 py-4.5 font-semibold text-white shadow-xl shadow-blue-700/25 transition-all duration-300 ease-in-out hover:from-blue-800 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-700/30 active:scale-[0.98] dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500"
              >
                <span>{content.button}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="/selectRole"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-700 to-indigo-700 px-8 py-4.5 font-semibold text-white shadow-xl shadow-blue-700/25 transition-all duration-300 ease-in-out hover:from-blue-800 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-700/30 active:scale-[0.98] dark:from-blue-600 dark:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500"
                >
                  <span>Join Us!</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300/80 bg-white/90 px-8 py-4.5 font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Login
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-3.5 pt-2 text-sm font-medium text-slate-600 sm:flex-row sm:items-center sm:gap-8 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100/80 dark:bg-blue-950/80">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                </span>
                <span>Free forever</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100/80 dark:bg-blue-950/80">
                  <Check className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                </span>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 -z-10 scale-95 rounded-3xl bg-linear-to-tr from-blue-500/10 via-indigo-500/10 to-transparent blur-2xl" />
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}