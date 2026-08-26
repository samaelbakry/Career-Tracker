
export default function UserApplicationsListSkeleton({i}:{i:number}) {
  return (
    <div
      key={i}
      className="flex animate-pulse items-center justify-between gap-4 px-2 py-5 sm:px-3"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-100" />

        <div className="space-y-2">
          <div className="h-4 w-36 rounded-md bg-slate-100 sm:w-48" />
          <div className="h-3 w-24 rounded-md bg-slate-100 sm:w-32" />
        </div>
      </div>

      <div className="h-7 w-20 shrink-0 rounded-full bg-slate-100" />
    </div>
  );
}
