
"use client";

import { useFetch } from "@/hooks/useFetch";
import { getHiringAnalytics } from "@/services/hiringAnalytics";

export function useHiringAnalytics(companyId?: string) {
  return useFetch({
    queryKey: ["hiringAnalytics", companyId],
    queryFn: () => {
      if (!companyId) {
        throw new Error("Company ID is required");
      }

      return getHiringAnalytics(companyId);
    },
    enabled: !!companyId,
  });
}
