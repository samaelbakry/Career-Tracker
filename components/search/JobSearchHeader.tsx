import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, Sparkles } from "lucide-react";
import { JobSearchPanel } from "./JobSearchPanel";

export function JobSearchHeader() {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div
        className="
          pointer-events-none absolute
          -top-32 left-1/2
          h-80 w-160
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          right-0 top-20
          h-56 w-56
          rounded-full
          bg-indigo-500/5
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-7xl space-y-7">
          <Badge
            variant="outline"
            className="
              inline-flex
              items-center gap-2
              rounded-full
              border-blue-200/70
              bg-white/80
              px-3.5 py-1.5
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-blue-700
              shadow-sm
              backdrop-blur-sm
              dark:border-blue-900/50
              dark:bg-slate-950/60
              dark:text-blue-300
            "
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/60">
              <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </span>

            <span>2,500+ new jobs this week</span>
          </Badge>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              <span>Career Opportunities</span>
            </div>

            <h1
              className="
                text-4xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-slate-950
                sm:text-5xl
                lg:text-6xl
                dark:text-white
              "
            >
              Find the work
              <br className="hidden sm:block" />
              <span
                className="
                  bg-linear-to-r
                  from-[#1E3A8A]
                  via-blue-600
                  to-indigo-500
                  bg-clip-text
                  text-transparent
                "
              >
                {" "}
                worth building your future for.
              </span>
            </h1>

            <p className="max-w-7xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
              Discover carefully selected opportunities from innovative
              companies, ambitious startups, and remote-first teams.
            </p>
          </div>

          <div className="pt-2">
            <div
              className="
                relative
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-2
                shadow-lg
                shadow-slate-900/5
                transition-all
                duration-300
                focus-within:border-blue-300
                focus-within:shadow-xl
                focus-within:shadow-blue-900/5
                dark:border-slate-800
                dark:bg-slate-950
              "
            >
              <JobSearchPanel />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Fresh opportunities</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Verified companies</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Remote & onsite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
