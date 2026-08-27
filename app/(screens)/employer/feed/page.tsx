import EmployerFeedExplorer from "@/components/EmployerFeed/EmployerFeedExplorer";
import EmployerFeedHeader from "@/components/EmployerFeed/EmployerFeedUI/EmployerFeedHeader";

export default function EmployerFeed() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <EmployerFeedHeader />
        <EmployerFeedExplorer />
      </div>
    </main>
  );
}
