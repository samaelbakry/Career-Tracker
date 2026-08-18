import { Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white pt-16 pb-12 font-sans text-sm text-[#64748B]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-8 pb-12 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-2 space-y-4 md:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E3A8A] text-white shadow-md shadow-blue-900/10">
                <Briefcase size={18} />
              </div>

              <span className="text-lg font-bold tracking-tight text-[#0F172A]">
                Career Tracker
              </span>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-[#64748B] sm:text-sm">
              The modern application tracking workspace built for job seekers,
              career changers, and modern professionals.
            </p>
          </div>

          <div className="col-span-1 space-y-3 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Product
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>Kanban Board</li>
              <li>Email Auto-Sync</li>
              <li>Analytics</li>
              <li>Pricing</li>
              <li>Changelog</li>
            </ul>
          </div>

          <div className="col-span-1 space-y-3 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Resources
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>Resume Templates</li>
              <li>Interview Prep</li>
              <li>Salary Insights</li>
              <li>Career Blog</li>
            </ul>
          </div>

          <div className="col-span-1 space-y-3 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Company
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Partners</li>
            </ul>
          </div>

          <div className="col-span-1 space-y-3 md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Legal
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Settings</li>
              <li>Security</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} Career Tracker Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
