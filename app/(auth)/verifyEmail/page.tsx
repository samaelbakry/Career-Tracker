"use client";

import AuthLayout from "@/components/ui/authUI/AuthLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address not found.");
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Verification email sent.");
  };

  return (
    <AuthLayout
      title="Check your email"
      subtitle="We've sent a verification link to your email address."
    >
      <div className="space-y-6 font-sans">
        <div className="flex justify-center my-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1E3A8A] shadow-inner">
              <Mail size={32} />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs ring-4 ring-white">
              <CheckCircle2 size={12} />
            </div>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-[#64748B]">
            We&apos;ve sent a verification email to
          </p>

          <p className="font-semibold text-[#1E3A8A] mt-2 break-all">{email}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-1">
          <p className="text-xs text-[#64748B]">
            Please open your inbox and click the confirmation link before
            logging in.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-[#0F172A]">
            Didn&apos;t receive the email?
          </p>
          <ul className="space-y-2 text-xs text-[#64748B]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
              <span>Check your spam or junk mail folder.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
              <span>
                Wait a few minutes (delivery can sometimes be delayed).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
              <span>
                Make sure you entered the correct email address during sign-up.
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            type="button"
            onClick={handleResendEmail}
            className="w-full bg-white border border-slate-200 text-[#1E3A8A] hover:bg-slate-50 text-sm font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>resend email</span>
          </Button>

          <Link href="/login" className="block">
            <Button
              variant="outline"
              type="button"
              className="w-full bg-white border border-slate-200 text-[#1E3A8A] hover:bg-slate-50 text-sm font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Back to Login</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
