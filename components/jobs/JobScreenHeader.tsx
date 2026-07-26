import AvailableJobs from "./AvailableJobs";

export default function JobScreenHeader() {
  return (
    <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-3">
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-64 w-full max-w-7xl -translate-x-1/2 rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto space-y-6 text-center sm:text-left">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Available Jobs
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed">
            Search open positions across all departments and locations.
          </p>
        </div>

        <div className="pt-2">
          <div className="relative flex-1 w-full">
           <AvailableJobs/>
          </div>
        </div>
      </div>
    </section>
  );
}