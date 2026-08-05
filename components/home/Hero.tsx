"use client";
import { ArrowRight, Check } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedAuthenticated, selectedUser } from "@/store/slices/authSlice";
import { heroContent } from "@/constants/constants";

export default function Hero() {
  const authenticated = useAppSelector(selectedAuthenticated);
  const userName = useAppSelector(selectedUser)?.name;
  const role = useAppSelector(selectedUser)?.role;
  const isEmployer = role === "employer";
  const content = isEmployer ? heroContent.employer : heroContent.job_seeker;

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-white via-[#DBEAFE]/30 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="flex items-center  gap-6">
              {authenticated && (
                <>
                  <span className="font-semibold text-xl">{`Welcome back, ${userName}!`}</span>
                </>
              )}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DBEAFE]/60 border border-blue-200/60 text-[#1E3A8A] text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                Track Every Opportunity
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0F172A] leading-[1.12]">
             {content.title}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1E3A8A] to-[#3B82F6]">
                {content.highlight}
              </span>
            </h1>

            <p className="text-lg text-[#64748B] max-w-xl leading-relaxed font-normal">
             {content.description}
            </p>
            {authenticated ? (
              <Link
                href={content.href}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
              >
                <span>{content.button}</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={"/register"}
                  className="flex items-center justify-center gap-2 px-7 py-4 bg-[#1E3A8A] hover:bg-[#172554] text-white font-semibold rounded-2xl shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
                >
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href={"/login"}
                  className="flex items-center justify-center px-7 py-4 bg-white border border-slate-200 text-[#1E3A8A] hover:bg-slate-50 font-semibold rounded-2xl transition-all duration-300 active:scale-[0.98]"
                >
                  Login
                </Link>
              </div>
            )}

            <div className="flex items-center gap-6 pt-2 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#3B82F6]" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-[#3B82F6]" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
