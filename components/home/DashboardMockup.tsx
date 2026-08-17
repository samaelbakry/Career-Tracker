import {
  CheckCircle2,
  Clock,
  MoreHorizontal,
  TrendingUp,
  Calendar as CalendarIcon,
  Bell,
  Sparkles,
} from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-170 select-none lg:max-w-none">
      <div className="pointer-events-none absolute -right-8 -top-12 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="absolute -left-4 -top-6 z-20 hidden items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] shadow-lg backdrop-blur-md sm:flex">
        <Sparkles size={16} className="text-blue-500" />
        <span>Auto-syncing Applications</span>
      </div>

      <div className="relative z-10 space-y-6 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-2xl backdrop-blur-md sm:p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />

            <span className="ml-2 text-xs font-semibold text-slate-400">
              Dashboard Overview
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            Live Sync
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-700">Applied</span>

              <span className="rounded-md bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                12
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                  S
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#0F172A]">Stripe</p>

                <p className="text-[11px] text-[#64748B]">Frontend Engineer</p>
              </div>

              <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                Applied Oct 12
              </span>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-700">
                Interview
              </span>

              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                3
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
                  V
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#0F172A]">Vercel</p>

                <p className="text-[11px] text-[#64748B]">Product Designer</p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                <Clock size={10} />
                Tomorrow, 2 PM
              </span>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-700">Offer</span>

              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                1
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-emerald-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">
                  L
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#0F172A]">Linear</p>

                <p className="text-[11px] text-[#64748B]">Senior Developer</p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                <CheckCircle2 size={10} />
                $165k/year
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col justify-between space-y-2 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Application Velocity
              </span>

              <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                <TrendingUp size={12} />
                +24%
              </span>
            </div>

            <div className="flex h-16 items-end justify-between gap-1.5 pt-2">
              {[40, 65, 30, 85, 55, 95, 70].map((height, index) => (
                <div
                  key={index}
                  className="relative h-full w-full rounded-t-md bg-blue-100"
                >
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-[#3B82F6] transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-blue-600" />

                <span className="text-xs font-bold text-slate-700">
                  Upcoming Alert
                </span>
              </div>

              <span className="text-[10px] text-slate-400">10m ago</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white p-2.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1E3A8A]">
                <CalendarIcon size={16} />
              </div>

              <div className="overflow-hidden">
                <p className="truncate text-xs font-semibold text-[#0F172A]">
                  Interview with Linear
                </p>

                <p className="text-[10px] text-[#64748B]">
                  Technical Screening • 45m
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
