import { ArrowRight, BarChart3 } from "lucide-react";
import React from "react";

import Link from "next/link";

export default function AnalyticsEmptyState({
  title,
  description,
  icon: Icon = BarChart3,
  action,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
  action?: {
    label: string;
    href: string;
  };
}) {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="relative flex flex-col items-center px-6 py-12 text-center">
        <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-violet-100/60 blur-3xl dark:bg-violet-500/10" />

        <div className="relative flex size-16 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
          <Icon className="size-7" />
        </div>

        <div className="relative mt-5 max-w-md">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        {action && (
          <Link
            href={action.href}
            className="relative mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-violet-600 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-300"
          >
            {action.label}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
