
import React from "react";
import { ArrowUpRight } from "lucide-react";

type JobStatusCardProps = {
  title: string;
  count: number;
  description?: string;
  icon?: React.ReactNode;
  accent?: "violet" | "emerald" | "amber";
};

const accents = {
  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    line: "bg-violet-500",
    glow: "group-hover:shadow-violet-500/5",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    line: "bg-emerald-500",
    glow: "group-hover:shadow-emerald-500/5",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    line: "bg-amber-500",
    glow: "group-hover:shadow-amber-500/5",
  },
};

export default function JobStatusCard({
  title,
  count,
  description,
  icon,
  accent = "violet",
}: JobStatusCardProps) {
  const style = accents[accent];

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 ${style.glow}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${style.line}`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {count.toLocaleString()}
          </p>
        </div>

        {icon && (
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${style.icon}`}
          >
            {icon}
          </div>
        )}
      </div>

      {description && (
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>

          <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      )}
    </article>
  );
}
