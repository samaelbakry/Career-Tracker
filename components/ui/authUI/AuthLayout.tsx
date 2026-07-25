import Link from 'next/link';
import { Briefcase, ArrowLeft, CheckCircle2, Star } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#F8FAFC]">

         <div className="hidden lg:col-span-6 lg:flex flex-col justify-between p-12 bg-linear-to-br from-[#172554] via-[#1E3A8A] to-[#0F172A] text-white relative overflow-hidden">
        
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#DBEAFE 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#3B82F6]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <Briefcase size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Career Tracker
          </span>
        </div>

        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="text-xl font-medium leading-relaxed text-slate-100">
              “Career Tracker completely transformed my job search. I went from scattered spreadsheets to landing my dream senior role in less than 30 days.”
            </blockquote>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-blue-300/20 border border-white/20 flex items-center justify-center font-bold text-sm text-blue-200">
              EK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Elena Rostova</p>
              <p className="text-xs text-blue-200/80">Senior Product Designer at Vercel</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs text-blue-200/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#3B82F6]" />
            <span>Smart Reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#3B82F6]" />
            <span>Kanban Board</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#3B82F6]" />
            <span>Analytics Dashboard</span>
          </div>
        </div>

      </div>
      
      <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#1E3A8A] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to website
          </Link>

          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-md">
              <Briefcase size={18} />
            </div>
            <span className="font-bold text-lg text-[#0F172A]">Career Tracker</span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-12 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-[#64748B]">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        <div className="text-xs text-[#64748B] text-center lg:text-left">
          © {new Date().getFullYear()} Career Tracker Inc. All rights reserved.
        </div>
      </div>

     

    </div>
  );
}