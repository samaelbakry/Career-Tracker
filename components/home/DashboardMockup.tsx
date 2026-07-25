import { 
  CheckCircle2, 
  Clock, 
  MoreHorizontal, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Bell, 
  Sparkles 
} from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-170 lg:max-w-none mx-auto select-none">
      <div className="absolute -top-12 -right-8 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-16 -left-12 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -top-6 -left-4 z-20 hidden sm:flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/60 px-3.5 py-2 rounded-2xl shadow-lg text-xs font-semibold text-[#1E3A8A]">
        <Sparkles size={16} className="text-blue-500" />
        <span>Auto-syncing Applications</span>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-[24px] shadow-2xl p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-semibold text-slate-400">
              Dashboard Overview
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Sync
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100 space-y-2.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-slate-700">Applied</span>
              <span className="text-[10px] font-semibold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md">12</span>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200/60 space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  S
                </div>
                <MoreHorizontal size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Stripe</p>
                <p className="text-[11px] text-[#64748B]">Frontend Engineer</p>
              </div>
              <span className="inline-block text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium">
                Applied Oct 12
              </span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100 space-y-2.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-slate-700">Interview</span>
              <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md">3</span>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200/60 space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-lg bg-black text-white font-bold text-xs flex items-center justify-center">
                  V
                </div>
                <MoreHorizontal size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Vercel</p>
                <p className="text-[11px] text-[#64748B]">Product Designer</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium">
                <Clock size={10} /> Tomorrow, 2 PM
              </span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100 space-y-2.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-slate-700">Offer</span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">1</span>
            </div>
            
            <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-200 space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-lg bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                  L
                </div>
                <MoreHorizontal size={14} className="text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Linear</p>
                <p className="text-[11px] text-[#64748B]">Senior Developer</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium">
                <CheckCircle2 size={10} /> $165k/year
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">Application Velocity</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp size={12} /> +24%
              </span>
            </div>
            <div className="h-16 flex items-end justify-between gap-1.5 pt-2">
              {[40, 65, 30, 85, 55, 95, 70].map((h, i) => (
                <div key={i} className="w-full bg-blue-100 rounded-t-md relative group">
                  <div 
                    className="bg-[#3B82F6] rounded-t-md transition-all duration-500" 
                    style={{ height: `${h}%` }} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-blue-600" />
                <span className="text-xs font-bold text-slate-700">Upcoming Alert</span>
              </div>
              <span className="text-[10px] text-slate-400">10m ago</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold text-xs shrink-0">
                <CalendarIcon size={16} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#0F172A] truncate">Interview with Linear</p>
                <p className="text-[10px] text-[#64748B]">Technical Screening • 45m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}