import DialogButtonTrigger from "@/components/ui/DialogButtonTrigger";
import { Sparkles } from "lucide-react";
import { CompanyFormDialog } from "./CompanyFormDialog";

export default function CompanyHeader() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl dark:bg-indigo-950/30" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/20" />

      <div className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Company Directory
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                Explore{" "}
                <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  top organizations
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                Discover companies, learn about their workplace culture, and
                explore the opportunities they offer.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <DialogButtonTrigger
              Component={CompanyFormDialog}
              componentProps={{ mode: "create" as const }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
