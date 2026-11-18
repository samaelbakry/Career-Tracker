import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobCardSkeleton() {
  return (
    <Card className="group relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-0 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-600/30 to-indigo-500/30" />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <Skeleton className="size-12 shrink-0 rounded-2xl bg-violet-100 dark:bg-violet-400/10" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-2.5 w-28 bg-violet-100 dark:bg-violet-400/10" />
              <Skeleton className="h-5 w-40 max-w-full bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          <Skeleton className="size-9 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="mt-5 space-y-2">
          <Skeleton className="h-3.5 w-full bg-slate-100 dark:bg-slate-800" />
          <Skeleton className="h-3.5 w-4/5 bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-3.5 w-24 bg-violet-100/80 dark:bg-violet-400/10"
            />
          ))}
        </div>

        <div className="my-6 h-px bg-slate-100 dark:bg-slate-800" />

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="size-4 rounded bg-emerald-100 dark:bg-emerald-400/10" />
              <Skeleton className="h-2.5 w-36 bg-slate-100 dark:bg-slate-800" />
            </div>

            <Skeleton className="h-7 w-52 max-w-full bg-slate-200 dark:bg-slate-700" />

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-full bg-emerald-100 dark:bg-emerald-400/10" />
              <Skeleton className="h-3 w-24 bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>

          <div className="flex w-full shrink-0 gap-2 sm:w-auto">
            <Skeleton className="h-11 flex-1 rounded-xl bg-violet-100 dark:bg-violet-400/10 sm:w-28 sm:flex-none" />
            <Skeleton className="size-11 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </Card>
  );
}
