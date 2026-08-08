import React from 'react'
import NextLink from 'next/link'
import { Application } from '@/types/applications'
import { getStatusBadge } from '@/constants/constants'
import { Briefcase, Calendar, ExternalLink, FileText, User } from 'lucide-react'

interface ActiveCoverLetterData {
  candidateName: string
  text: string
}

interface CandidateStatusCardProps {
  applications: Application[]
  setActiveCoverLetter: (data: ActiveCoverLetterData) => void
}

export default function CandidateStatusCard({
  applications,
  setActiveCoverLetter,
}: CandidateStatusCardProps) {
  const formatDate = (isoString?: string) => {
    if (!isoString) return 'N/A'
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            <th className="px-6 py-3.5 font-semibold">Candidate</th>
            <th className="px-6 py-3.5 font-semibold">Job Title</th>
            <th className="px-6 py-3.5 font-semibold">Status</th>
            <th className="px-6 py-3.5 font-semibold">Applied Date</th>
            <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {applications.map((application) => (
            <tr
              key={application.id}
              className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {application.profiles?.full_name ? (
                      application.profiles.full_name.charAt(0).toUpperCase()
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {application.profiles?.full_name || 'Unknown Candidate'}
                    </div>
                    <div className="font-mono text-xs text-slate-400">
                      ID: {application.user_id ? `${application.user_id.slice(0, 8)}...` : 'N/A'}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Briefcase className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="font-medium">
                    {application.jobs?.title || 'Position Unavailable'}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusBadge(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </td>

              <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{formatDate(application.applied_at)}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  {application.cover_letter && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCoverLetter({
                          candidateName:
                            application.profiles?.full_name || 'Candidate',
                          text: application.cover_letter || '',
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      title="Read Cover Letter"
                    >
                      <FileText className="h-3.5 w-3.5 text-slate-500" />
                      <span>Letter</span>
                    </button>
                  )}

                  {application.resume_url ? (
                    <NextLink
                      href={application.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                    >
                      <span>Resume</span>
                      <ExternalLink className="h-3 w-3" />
                    </NextLink>
                  ) : (
                    <span className="text-xs italic text-slate-400">
                      No Resume
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}