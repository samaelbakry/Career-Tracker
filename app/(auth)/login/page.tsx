"use client";

import AuthLayout from "@/components/ui/authUI/AuthLayout";
import LoginForm from "@/components/ui/authUI/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Good to see you again"
      subtitle="Log in to your account and pick up where you left off."
    >
      <LoginForm />
    </AuthLayout>
  );
}
