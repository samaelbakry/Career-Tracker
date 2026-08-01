"use client";

import { selectedUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { CalendarDays, Pencil, Sparkles, CheckCircle2 } from "lucide-react";

export default function DashboardHeader() {
  const user = useAppSelector(selectedUser);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-indigo-50/70 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-3xl font-extrabold text-white shadow-lg shadow-blue-500/20 ring-4 ring-white">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white"
              title="Active Status"
            >
              <CheckCircle2 size={14} className="stroke-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-500/10">
              <Sparkles size={12} className="text-blue-500" />
              <span>{greeting}</span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {user?.name ?? "User"}
            </h1>

            <p className="max-w-lg text-sm text-slate-500">
              Welcome back! Track your applications and discover new
              opportunities.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-5 md:items-end md:border-none md:pt-0">
          <button className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95">
            <Pencil
              size={15}
              className="transition-transform group-hover:-rotate-12"
            />
            <span>Edit Profile</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <CalendarDays size={13} className="text-slate-400" />
            <span>Member since {user?.created_at ? new Date(user.created_at).getFullYear() : "2026"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}