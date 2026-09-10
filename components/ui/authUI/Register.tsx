"use client";

import RegisterForm from "@/components/ui/authUI/RegisterForm";
import AuthLayout from "@/components/ui/authUI/AuthLayout";
import { useSearchParams } from "next/navigation";
import PageTransition from "@/components/shared/PageTransition";

export default function Register() {
  const searchParams = useSearchParams();

  const role = searchParams.get("role");

  if (role !== "employer" && role !== "job_seeker") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Invalid role
      </div>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking applications and organize your job search today."
    >
      <PageTransition auth>
      <RegisterForm role={role} />
      </PageTransition>
    </AuthLayout>
  );
}