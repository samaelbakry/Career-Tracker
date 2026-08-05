import { getAvatarGradient } from "@/lib/helpers";
import { Company } from "@/types/companies";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <Link
      key={company.id}
      href={`/employer/companies/${company.id}`}
      className="group relative bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-stone-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div
            className={`w-13 h-13 rounded-xl bg-linear-to-br ${getAvatarGradient(
              company.name,
            )} font-extrabold text-xl flex items-center justify-center shadow-sm shrink-0 border border-white/20 select-none`}
          >
            {company.name ? company.name.charAt(0).toUpperCase() : "?"}
          </div>

          <div className="space-y-1.5 overflow-hidden">
            <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {company.name}
            </h2>

            {company.industry && (
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-stone-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-stone-200/60 dark:border-slate-700/60">
                {company.industry}
              </span>
            )}
          </div>
        </div>

        {company.location && (
          <p className="text-sm text-stone-600 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-slate-500 shrink-0" />
            <span className="truncate">{company.location}</span>
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        <span>Explore Profile</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
}
