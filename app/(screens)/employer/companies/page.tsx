import CompaniesExplorer from "@/components/companies/companiesFeed/CompaniesExplorer";
import CompanyHeader from "@/components/companies/companiesUi/CompanyHeader";

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <CompanyHeader />
        <CompaniesExplorer />
      </div>
    </main>
  );
}
