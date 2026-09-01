import ApplicationContent from "@/components/applications/ApplicationContent";
import { Suspense } from "react";

export default function Application() {
  return (
    <Suspense fallback={<p>loadig....</p>}>
      <ApplicationContent />
    </Suspense>
  );
}
