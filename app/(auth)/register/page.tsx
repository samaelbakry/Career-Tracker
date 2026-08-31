import { Suspense } from "react";
import Register from "@/components/ui/authUI/Register";

export default function RegisterPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Register />
    </Suspense>
  );
}