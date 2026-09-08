"use client";

import { deleteCertificate } from "@/services/certificates";
import { Certificate } from "@/types/profileOptimizing";
import { Award, Calendar, ExternalLink, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CertificatesForm from "./CertificatesForm";
import Link from "next/link";

export default function CertificatesView({certificates, refetch , isLoading}: {certificates: Certificate[], refetch: () => void , isLoading:boolean}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteCertificate(id);
      refetch();
    } catch (err) {
      console.error("Failed to delete certificate:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950 sm:text-xl">
              Your Certificates
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              View and manage your qualifications.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 sm:self-auto sm:text-sm"
          >
            <Plus size={16} />
            {showAddForm ? "Cancel" : "Add Certificate"}
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certificates?.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100/60 text-blue-600">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                        {cert.created_at ? cert.name : "Untitled Certificate"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {cert.name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(cert.id)}
                    disabled={deletingId === cert.id}
                    className="text-slate-400 hover:text-rose-600 disabled:opacity-50"
                  >
                    {deletingId === cert.id ? (
                      <Loader2 size={16} className="animate-spin text-slate-400" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/50 pt-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{cert.issue_date}</span>
                  </div>

                  {cert.credential_url && (
                    <Link
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                    >
                      Verify <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <CertificatesForm
          onSuccess={() => {
            setShowAddForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}