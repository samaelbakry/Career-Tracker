import EmployerFeedExplorer from "@/components/EmployerFeed/EmployerFeedExplorer";
import EmployerFeedHeader from "@/components/EmployerFeed/EmployerFeedUI/EmployerFeedHeader";
import EmployerHiringActivity from "@/components/EmployerFeed/EmployerFeedUI/EmployerHiringActivity";
import EmployerHiringBrief from "@/components/EmployerFeed/EmployerFeedUI/EmployerHiringBrief";

export default function EmployerFeed() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950">
      <div className="container">
        <EmployerFeedHeader />
        <EmployerHiringBrief/>
        <EmployerHiringActivity/>
        <EmployerFeedExplorer />
      </div>
    </main>
  );
}
