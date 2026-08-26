import ApplyButton from "@/components/jobs/ApplyButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatSalary, formattedDate } from "@/lib/helpers";
import { getJobDetails } from "@/services/jobs";
import {
  Award,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  ExternalLink,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type prop = {
  jobId: string;
};

export default async function JobDetails({
  params,
}: {
  params: Promise<prop>;
}) {
  const { jobId } = await params;
  const job = await getJobDetails(jobId);

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <Card className="rounded-3xl border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500" />
          
          <CardContent className="p-6 md:p-10 pt-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-3 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/companies/${job?.company?.id}`}
                    className="group inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm tracking-wide hover:text-blue-700 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span>{job?.company?.name ?? "Company"}</span>
                  </Link>

                  <span className="text-slate-300">•</span>

                  <Badge
                    variant="outline"
                    className="capitalize border-blue-200 bg-blue-50/70 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 text-xs"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                    {job?.status ?? "Open"}
                  </Badge>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {job?.title}
                </h1>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <ApplyButton job={job} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 text-slate-700 text-xs sm:text-sm font-semibold">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{job?.location}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 text-slate-700 text-xs sm:text-sm font-semibold">
                <BriefcaseBusiness className="w-4 h-4 text-indigo-600" />
                <span>{job?.employment_type}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 text-slate-700 text-xs sm:text-sm font-semibold">
                <Award className="w-4 h-4 text-violet-600" />
                <span>{job?.experience_level}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 text-slate-700 text-xs sm:text-sm font-semibold">
                <CalendarDays className="w-4 h-4 text-sky-600" />
                <span>Posted {formattedDate(job?.created_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            
            <Card className="rounded-3xl border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  About this Role
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-base sm:text-lg">
                {job?.description}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Role Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl border border-blue-100/80 bg-blue-50/40 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                      <BriefcaseBusiness className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Employment Type
                      </span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">
                        {job?.employment_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-indigo-100/80 bg-indigo-50/40 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                      <Clock3 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Experience Level
                      </span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">
                        {job?.experience_level}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-sky-100/80 bg-sky-50/40 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">
                        {job?.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/40 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Salary Range
                      </span>
                      <span className="text-base font-bold text-slate-900 mt-0.5 block">
                        {formatSalary(job?.salary_min)} – {formatSalary(job?.salary_max)}
                      </span>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8">
            
            <Card className="rounded-3xl border-0 bg-linear-to-br from-blue-600 via-indigo-700 to-slate-900 text-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <Banknote className="w-4 h-4" />
                  <span>Compensation Package</span>
                </div>
                <div className="text-3xl font-extrabold tracking-tight">
                  {formatSalary(job?.salary_min)} – {formatSalary(job?.salary_max)}
                </div>
                <p className="text-xs text-blue-200/80 mt-1 font-medium">
                  Estimated monthly/annual range
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden text-blue-600 font-bold text-xl shadow-xs">
                    {job?.company?.logo_url ? (
                      <img
                        src={job.company.logo_url}
                        alt={job.company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      job?.company?.name?.charAt(0) ?? "C"
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/companies/${job?.company?.id}`}>
                      <h3 className="font-bold text-lg text-slate-900 hover:text-blue-600 transition-colors truncate">
                        {job?.company?.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 font-semibold truncate">
                      {job?.company?.industry ?? "Technology"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-5 space-y-4 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-500">Industry</span>
                  </div>
                  <span className="font-semibold text-slate-800">
                    {job?.company?.industry ?? "N/A"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-500">Headquarters</span>
                  </div>
                  <span className="font-semibold text-slate-800 text-right">
                    {job?.company?.location ?? "N/A"}
                  </span>
                </div>

                {job?.company?.website && (
                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visit Company Website</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}