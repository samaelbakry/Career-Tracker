"use client"

import AuthLayout from "@/components/ui/authUI/AuthLayout"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserCheck, Building2, ArrowRight, CheckCircle2 } from "lucide-react"

type Role = "job_seeker" | "employer"

export default function SelectRole() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role>("job_seeker")

  const handleContinue = () => {
    router.push(`/register?role=${selectedRole}`)
  }

  return (
    <AuthLayout
      title="Choose how you'll use Career Tracker"
      subtitle="Select your account type to personalize your workspace experience."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          
          <div
            onClick={() => setSelectedRole("job_seeker")}
            className={`group relative p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4 ${
              selectedRole === "job_seeker"
                ? "border-blue-600 bg-blue-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
            }`}
          >
            <div
              className={`p-3 rounded-xl transition-colors ${
                selectedRole === "job_seeker"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
              }`}
            >
              <UserCheck size={22} />
            </div>

            <div className="flex-1 pr-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 text-base">
                  I&apos;m looking for a job
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Track job applications, organize interview pipelines, and land your next role.
              </p>
            </div>

            <div className="absolute top-5 right-5">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedRole === "job_seeker"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-transparent"
                }`}
              >
                {selectedRole === "job_seeker" && <CheckCircle2 size={14} />}
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedRole("employer")}
            className={`group relative p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4 ${
              selectedRole === "employer"
                ? "border-blue-600 bg-blue-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
            }`}
          >
            <div
              className={`p-3 rounded-xl transition-colors ${
                selectedRole === "employer"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
              }`}
            >
              <Building2 size={22} />
            </div>

            <div className="flex-1 pr-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 text-base">
                  I&apos;m hiring candidates
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Post open job opportunities, review applications, and discover top tech talent.
              </p>
            </div>

            <div className="absolute top-5 right-5">
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  selectedRole === "employer"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-transparent"
                }`}
              >
                {selectedRole === "employer" && <CheckCircle2 size={14} />}
              </div>
            </div>
          </div>

        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </AuthLayout>
  )
}