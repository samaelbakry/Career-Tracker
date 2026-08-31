import VerifyEmail from "@/components/ui/authUI/VerifyEmail";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmail />
    </Suspense>
  );
}