"use client";

import { createCertificate } from "@/services/certificates";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  Award,
  Building,
  Calendar,
  ExternalLink,
  Loader2,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface CertificatesFormProps {
  onSuccess?: () => void;
}

export default function CertificatesForm({ onSuccess }: CertificatesFormProps) {
  const userId = useAppSelector(selectedUser)?.id;

  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev)=>({...prev , [name]:value}))
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setErrorMessage("You must be logged in to add a certificate.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await createCertificate(userId, {
        name: formData.name,
        issuer: formData.issuer || null,
        issue_date: formData.issue_date || null,
        credential_url: formData.credential_url || null,
        created_at:new Date().toLocaleString()
      });

      setFormData({
        name: "",
        issuer: "",
        issue_date: "",
        credential_url: "",
      });

      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit certificate",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative isolate animate-in fade-in-50 slide-in-from-top-3 duration-300 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)] sm:p-8">
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          Add Certificate Details
        </h3>

        {errorMessage && (
          <p className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-600 sm:text-sm">
            {errorMessage}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
              Certificate Name
            </label>
            <div className="relative flex items-center">
              <Award className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. AWS Certified Solutions Architect"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
              Issuer / Organization
            </label>
            <div className="relative flex items-center">
              <Building className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g. Amazon Web Services"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                Issue Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                Credential URL
              </label>
              <div className="relative flex items-center">
                <ExternalLink className="absolute left-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  name="credential_url"
                  value={formData.credential_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 focus:outline-none disabled:opacity-50 sm:text-sm"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Plus size={16} /> Save Certificate
            </>
          )}
        </button>
      </form>
    </div>
  );
}
