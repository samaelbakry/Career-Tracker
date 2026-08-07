import React from "react";

type JobStatusCardProps = {
  title: string;
  count: number;
  description?: string;
  icon?: React.ReactNode;
};

export default function JobStatusCard({
  title,
  count,
  description,
  icon,
}: JobStatusCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C4FD6]/30 hover:shadow-xl hover:shadow-[#6C4FD6]/10">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#6C4FD6]/6 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      <div className="absolute inset-x-0 top-0 h-0.75 scale-x-0 bg-linear-to-r from-[#6C4FD6] to-[#8B6FE8] transition-transform duration-300 group-hover:scale-x-100" />

      <div className="relative flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-slate-600">
          {title}
        </span>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#EDE9FB] to-[#E1DAFA] text-[#6C4FD6] ring-1 ring-[#6C4FD6]/10 transition-all duration-300 group-hover:scale-105 group-hover:from-[#6C4FD6] group-hover:to-[#8358E8] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#6C4FD6]/30">
            {icon}
          </div>
        )}
      </div>

      <div className="relative mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight tabular-nums text-[#1E2A5E] sm:text-4xl">
          {count}
        </span>
      </div>

      {description && (
        <p className="relative mt-2 text-xs font-medium text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}