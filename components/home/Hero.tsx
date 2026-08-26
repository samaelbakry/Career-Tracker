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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-white via-blue-50/40 to-white px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24 lg:px-8">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-8 text-left lg:col-span-6">
            {authenticated && (
              <div className="inline-flex items-center rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-2 text-sm font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-300">
                Welcome back, {userName}!
              </div>
            )}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#1E3A8A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                Track Every Opportunity
              </div>
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[56px]">
              {content.title}{" "}
              <span className="bg-linear-to-r from-[#1E3A8A] to-[#3B82F6] bg-clip-text text-transparent">
                {content.highlight}
              </span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-[#64748B] sm:text-lg">
              {content.description}
            </p>

            {authenticated ? (
              <Link
                href={content.href}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1E3A8A] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#172554] hover:shadow-xl active:scale-[0.98]"
              >
                <span>{content.button}</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/selectRole"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1E3A8A] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#172554] hover:shadow-xl active:scale-[0.98]"
                >
                  <span>Join Us!</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-[#1E3A8A] shadow-sm transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]"
                >
                  Login
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-1 text-sm text-[#64748B] sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-3.5 w-3.5 text-[#3B82F6]" />
                </span>

                <span>Free forever</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
                  <Check className="h-3.5 w-3.5 text-[#3B82F6]" />
                </span>

                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-blue-200/30 blur-3xl" />

            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}