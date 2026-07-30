import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { SearchInput } from "./SearchInput";

export function JobSearchHeader() {
  return (
    <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 rounded-full" />

      <div className="max-w-7xl mx-auto space-y-6 text-center sm:text-left">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300 rounded-full"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Over 2,500+ new jobs added this week</span>
        </Badge>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
            Find your{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              dream job
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl leading-relaxed">
            Discover thousands of hand-picked opportunities from tech giants,
            fast-growing startups, and remote-first teams.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Popular:
          </span>
          <button className="hover:text-blue-600 transition-colors">
            Remote
          </button>
          <button className="hover:text-blue-600 transition-colors">
            React / Next.js
          </button>
          <button className="hover:text-blue-600 transition-colors">
            Full Time
          </button>
          <button className="hover:text-blue-600 transition-colors">
            Senior Engineer
          </button>
        </div>
        <div className="pt-2">
          <div className="relative flex-1 w-full">
            <SearchInput />
          </div>
        </div>
      </div>
    </section>
  );
}
