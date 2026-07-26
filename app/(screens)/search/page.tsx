import { JobSearchHeader } from '@/components/search/JobSearchHeader'

export default function SearchPage() {

  return (
    <main className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-6xl mx-auto space-y-2">
        <JobSearchHeader />
      </div>
    </main>
  )
}