import { useRouter } from "next/navigation";
import React from "react";

export default function CompanyDetailsEmptyStatus({
  isError,
  error,
}: {
  isError: boolean;
  error: Error;
}) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-stone-50/60 dark:bg-slate-950 py-16 px-4 flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full text-center space-y-5 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Company Not Found
          </h2>
          <p className="text-sm text-stone-500 dark:text-slate-400 leading-relaxed">
            {isError
              ? (error as Error).message
              : "The requested company details could not be retrieved."}
          </p>
        </div>
        <button
          onClick={() => router.push("/companies")}
          type="button"
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ← Back to All Companies
        </button>
      </div>
    </main>
  );
}
