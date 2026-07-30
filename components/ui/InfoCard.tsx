import React from "react";

export type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
};

export function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="group p-4 bg-stone-50/80 dark:bg-slate-800/50 hover:bg-stone-100/80 dark:hover:bg-slate-800/80 rounded-2xl border border-stone-200/80 dark:border-slate-800 transition-all duration-200">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-slate-400">
        <span className="shrink-0 text-stone-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </div>

      <p className="mt-2 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
        {value !== null && value !== undefined && value !== "" ? value : "Not specified"}
      </p>
    </div>
  );
}