import { Briefcase, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 font-sans text-sm text-[#64748B]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-md shadow-blue-900/10">
                <Briefcase size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#0F172A]">
                JobTracker
              </span>
            </div>
            <p className="text-[#64748B] max-w-sm leading-relaxed text-xs sm:text-sm">
              The modern application tracking workspace built for job seekers, career changers, and modern professionals.
            </p>
            
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <p className="font-bold text-[#0F172A] text-xs uppercase tracking-wider">Product</p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#features" className="hover:text-[#1E3A8A] transition-colors">Kanban Board</a></li>
              <li><a href="#features" className="hover:text-[#1E3A8A] transition-colors">Email Auto-Sync</a></li>
              <li><a href="#features" className="hover:text-[#1E3A8A] transition-colors">Analytics</a></li>
              <li><a href="#pricing" className="hover:text-[#1E3A8A] transition-colors">Pricing</a></li>
              <li><a href="#" className="inline-flex items-center gap-1 hover:text-[#1E3A8A] transition-colors">Changelog <ArrowUpRight size={12} /></a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <p className="font-bold text-[#0F172A] text-xs uppercase tracking-wider">Resources</p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Resume Templates</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Interview Prep</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Salary Insights</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Career Blog</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <p className="font-bold text-[#0F172A] text-xs uppercase tracking-wider">Company</p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#about" className="hover:text-[#1E3A8A] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Partners</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3">
            <p className="font-bold text-[#0F172A] text-xs uppercase tracking-wider">Legal</p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-[#1E3A8A] transition-colors">Security</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} JobTracker Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All systems operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}