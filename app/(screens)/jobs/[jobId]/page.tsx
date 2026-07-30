import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatSalary, formattedDate } from "@/lib/helpers"
import { getJobDetails } from "@/services/jobs"
import { Award, BadgeCheck, Banknote, BriefcaseBusiness, Building2, CalendarDays, Clock3, ExternalLink, Globe, MapPin } from "lucide-react"
import Link from "next/link"

type prop ={
  jobId:string
}
export default async function JobDetails({params}:{params:Promise<prop>}) {
  const { jobId } = await params
  const job = await getJobDetails(jobId)
    
    return (
   <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="rounded-2xl border-blue-100/80 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 via-blue-500 to-sky-400" />
          <CardContent className="p-6 md:p-8 pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
                    {job.company.name}
                  </span>
                  <Badge
                    variant="outline"
                    className="capitalize border-blue-200 bg-blue-50 text-blue-700 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 text-xs"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                    {job.status}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  {job.title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-sm font-medium">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-sm font-medium">
                <BriefcaseBusiness className="w-4 h-4 text-blue-600" />
                <span>{job.employment_type}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-sm font-medium">
                <Award className="w-4 h-4 text-blue-600" />
                <span>{job.experience_level}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 text-sm font-medium">
                <CalendarDays className="w-4 h-4 text-blue-600" />
                <span>Posted {formattedDate(job.created_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-2xl border-blue-100/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">
                  About this Role
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-base">
                {job.description}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-blue-100/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/30 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-blue-100/80 text-blue-600">
                      <BriefcaseBusiness className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Employment Type
                      </span>
                      <span className="text-base font-semibold text-slate-900 mt-0.5 block">
                        {job.employment_type}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/30 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-blue-100/80 text-blue-600">
                      <Clock3 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Experience Level
                      </span>
                      <span className="text-base font-semibold text-slate-900 mt-0.5 block">
                        {job.experience_level}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/30 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-blue-100/80 text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="text-base font-semibold text-slate-900 mt-0.5 block">
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-50 bg-blue-50/30 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-blue-100/80 text-blue-600">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Salary Range
                      </span>
                      <span className="text-base font-semibold text-slate-900 mt-0.5 block">
                        {formatSalary(job.salary_min)} – {formatSalary(job.salary_max)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            <Card className="rounded-2xl border-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-2">
                  <Banknote className="w-4 h-4" />
                  <span>Compensation</span>
                </div>
                <div className="text-3xl font-extrabold tracking-tight">
                  {formatSalary(job.salary_min)} – {formatSalary(job.salary_max)}
                </div>
                <span className="text-xs text-blue-200 mt-1 block">
                  Estimated annual package
                </span>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-blue-100/80 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden text-blue-600 font-bold text-xl">
                    {job.company.logo_url ? (
                      <img
                        src={job.company.logo_url}
                        alt={job.company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      job.company.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <Link href={`/companies/${job?.company.id}`}>
                    <h3 className="font-bold text-lg text-slate-900">
                      {job.company.name}
                    </h3>
                    </Link>
                    <p className="text-xs text-slate-500 font-medium">
                      {job.company.industry}
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
                  <span className="font-medium text-slate-800">
                    {job.company.industry}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-500">Headquarters</span>
                  </div>
                  <span className="font-medium text-slate-800 text-right">
                    {job.company.location}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href={job.company.website!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
