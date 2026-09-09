import { JobSeekerProfile } from "@/types/profileOptimizing";
import {
  Briefcase,
  Calendar,
  Clock,
  Code2,
  Edit,
  Globe,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";

export default function JobSeekerProfileView({
  profile,
  onEdit,
}: {
  profile: JobSeekerProfile | null;
  onEdit: () => void;
}) {
  return (
    <section className="relative isolate animate-in fade-in-50 slide-in-from-top-3 duration-300 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-8">
        <div className="relative border-b border-slate-100 pb-6 pr-28">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600 mb-3">
            <Sparkles size={12} />
            Candidate Profile
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {profile?.target_job_title || "Target Position Not Specified"}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-600">
            {profile?.experience_level && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">
                <Briefcase size={13} className="text-blue-500" />
                {profile.experience_level}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">
              <Calendar size={13} className="text-blue-500" />
              {profile?.experience_years ?? 0}{" "}
              {profile?.experience_years === 1 ? "year" : "years"} experience
            </span>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="absolute right-0 top-0 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Edit size={13} />
            Edit Profile
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
              <MapPin size={17} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Preferred Location
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm">
                {profile?.preferred_location || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm">
              <Globe size={17} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Work Mode
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm">
                {profile?.work_mode || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 shadow-sm">
              <Clock size={17} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Employment Type
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm">
                {profile?.employment_type || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-blue-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skills & Expertise
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile?.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-1.5 text-xs font-bold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-100/70"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">
                No skills listed yet.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            <User size={16} className="text-blue-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About Me
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5">
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm whitespace-pre-line">
              {profile?.bio || "No biography provided."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
