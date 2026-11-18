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
    <div className="relative mx-auto w-full max-w-145 select-none lg:max-w-none">
      <div className="pointer-events-none absolute -right-8 -top-12 h-72 w-72 rounded-full bg-blue-400/20 blur-[100px] dark:bg-blue-600/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-80 w-80 rounded-full bg-indigo-400/20 blur-[100px] dark:bg-indigo-600/10" />

      <div className="absolute -left-4 -top-6 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/80 bg-white/80 px-4 py-2.5 text-xs font-semibold text-blue-900 shadow-xl shadow-blue-900/5 backdrop-blur-md sm:flex dark:border-slate-800 dark:bg-slate-900/90 dark:text-blue-300">
        <Sparkles size={16} className="text-blue-600 animate-pulse dark:text-blue-400" />
        <span>Auto-syncing Applications</span>
      </div>

      <div className="relative z-10 space-y-5 rounded-[28px] border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-7 dark:border-slate-800 dark:bg-slate-900/90">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-500 shadow-xs shadow-rose-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500 shadow-xs shadow-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50" />

            <span className="ml-2 text-xs font-bold tracking-wide text-slate-400 uppercase dark:text-slate-500">
              Dashboard Overview
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            Live Sync
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Applied</span>

              <span className="rounded-md bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                12
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white p-3 shadow-xs transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-xs shadow-indigo-600/30">
                  S
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Stripe</p>

                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Frontend Engineer</p>
              </div>

              <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                Applied Oct 12
              </span>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Interview
              </span>

              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                3
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200/60 bg-white p-3 shadow-xs transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white shadow-xs dark:bg-slate-800">
                  V
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Vercel</p>

                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Product Designer</p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                <Clock size={10} />
                Tomorrow, 2 PM
              </span>
            </div>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Offer</span>

              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                1
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-emerald-200/80 bg-white p-3 shadow-xs transition-all duration-200 hover:shadow-md dark:border-emerald-800/60 dark:bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-xs shadow-blue-600/30">
                  L
                </div>

                <MoreHorizontal size={14} className="text-slate-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Linear</p>

                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Senior Developer</p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <CheckCircle2 size={10} />
                $165k/year
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col justify-between space-y-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Application Velocity
              </span>

              <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <TrendingUp size={12} />
                +24%
              </span>
            </div>

            <div className="flex h-16 items-end justify-between gap-1.5 pt-2">
              {[40, 65, 30, 85, 55, 95, 70].map((height, index) => (
                <div
                  key={index}
                  className="relative h-full w-full rounded-t-md bg-blue-100/60 dark:bg-slate-800"
                >
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-500 dark:from-blue-600 dark:to-blue-400"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-blue-600 dark:text-blue-400" />

                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Upcoming Alert
                </span>
              </div>

              <span className="text-[10px] font-medium text-slate-400">10m ago</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
                <CalendarIcon size={16} />
              </div>

              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                  Interview with Linear
                </p>

                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
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