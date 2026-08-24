import { Loader2 } from 'lucide-react'

export default function CandidateStatusSkeleton() {
  return (
     <div className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500">
          Loading candidate applications...
        </p>
      </div>
  )
}
