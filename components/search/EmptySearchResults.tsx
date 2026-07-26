import { SearchX } from "lucide-react";

export default function EmptySearchResults() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-8 text-center transition-all">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-3">
        <SearchX className="h-6 w-6 text-slate-500 dark:text-slate-400" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
        No jobs found
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        We couldn&apos;t find any positions matching your search. Try checking
        for typos or searching with broader keywords.
      </p>
    </div>
  );
}
