"use client"
import RegisterForm from "@/components/ui/authUI/RegisterForm";
import AuthLayout from "@/components/ui/authUI/AuthLayout";
import { useSearchParams } from "next/navigation";

export default function Register() {
  const searchParams = useSearchParams()

  const role = searchParams.get("role");

  if(role !== "employer" && role !== "job_seeker"){
    return console.log("Error from register page invalid role")
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking applications and organize your job search today."
    >
      <RegisterForm role={role} />
    </AuthLayout>
  );
}
