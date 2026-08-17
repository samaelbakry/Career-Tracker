import Link from "next/link";
import {
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Star,
  Sparkles,
} from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50  font-sans">
      <div className="hidden lg:col-span-5 xl:col-span-6 lg:flex flex-col justify-between p-12 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute -top-24 -right-24 w-md h-md bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[24rem] h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <Briefcase size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-slate-200 transition-colors">
              Career Tracker
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="p-8 rounded-2xl bg-white/3 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-white/5 pointer-events-none">
              <Sparkles size={80} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-lg font-medium leading-relaxed text-slate-200">
                “Career Tracker completely transformed my job search. I went
                from scattered spreadsheets to landing my dream senior role in
                less than 30 days.”
              </blockquote>

              <div className="flex items-center gap-3.5 pt-2 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 border border-white/20 flex items-center justify-center font-bold text-sm text-white shadow-inner">
                  EK
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Elena Rostova
                  </p>
                  <p className="text-xs text-slate-400">
                    Senior Product Designer at Vercel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
          {["Smart Reminders", "Kanban Board", "Analytics Dashboard"].map(
            (feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-medium text-slate-300"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <CheckCircle2 size={12} />
                </div>
                <span>{feature}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative">
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to website
          </Link>

          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Briefcase size={18} />
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              Career Tracker
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-10 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
          </div>

          <div className="space-y-4">{children}</div>
        </div>

        <div className="text-xs text-slate-400 text-center lg:text-left pt-6">
          © {new Date().getFullYear()} Career Tracker Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
