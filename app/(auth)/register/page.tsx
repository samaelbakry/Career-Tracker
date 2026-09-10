import Register from "@/components/ui/authUI/Register";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Register />
    </Suspense>
  );
}