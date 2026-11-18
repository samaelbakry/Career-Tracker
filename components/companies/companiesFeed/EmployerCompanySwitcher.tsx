"use client";

import { Building2, Check, Loader2 } from "lucide-react";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFetch } from "@/hooks/useFetch";
import { getCompaniesByOwner } from "@/services/companies";

import { useAppDispatch, useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";

import {
  clearActiveCompany,
  setActiveCompanyId,
} from "@/store/slices/activeCompanySlice";

import { Company } from "@/types/companies";

export default function EmployerCompanySwitcher() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectedUser)?.id;
  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data: companies = [],
    isLoading,
    isError,
  } = useFetch<Company[]>({
    queryKey: ["employerCompanies", userId],
    queryFn: () => getCompaniesByOwner(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (!userId || isLoading || isError) return;

    if (companies.length === 0) {
      dispatch(clearActiveCompany());
      return;
    }

    const currentCompanyExists = companies.some(
      (company) => company.id === activeCompanyId,
    );

    if (currentCompanyExists) return;

    const storageKey = `activeCompanyId:${userId}`;
    const savedCompanyId = localStorage.getItem(storageKey);

    const savedCompanyExists = companies.some(
      (company) => company.id === savedCompanyId,
    );

    const nextCompanyId = savedCompanyExists
      ? savedCompanyId!
      : companies[0].id;

    dispatch(setActiveCompanyId(nextCompanyId));
  }, [userId, companies, activeCompanyId, isLoading, isError, dispatch]);

  useEffect(() => {
    if (!userId || !activeCompanyId) return;

    const isValid = companies.some((company) => company.id === activeCompanyId);

    if (isValid) {
      localStorage.setItem(`activeCompanyId:${userId}`, activeCompanyId);
    }
  }, [userId, activeCompanyId, companies]);

  const handleCompanyChange = (companyId: string | null) => {
    if (companyId === null) return;

    dispatch(setActiveCompanyId(companyId));
  };

  if (isLoading) {
    return (
      <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm text-slate-500 dark:border-slate-700">
        <Loader2 className="size-4 animate-spin" />
        Loading companies...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
        Unable to load companies.
      </div>
    );
  }

  if (companies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        ACTIVE COMPANY
      </p>

      <Select value={companies.find((c) => c.id === activeCompanyId)?.name || ""} onValueChange={handleCompanyChange}>
        <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <div className="flex min-w-0 items-center gap-2">
            <Building2 className="size-4 shrink-0 text-violet-500" />
            <SelectValue placeholder="Select a company" />
          </div>
        </SelectTrigger>

        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              <div className="flex items-center gap-2">
                <span className="truncate">{company.name}</span>

                {company.id === activeCompanyId && (
                  <Check className="size-3.5 text-violet-600" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-xs text-slate-400">
        {companies.length} {companies.length === 1 ? "company" : "companies"}{" "}
        available
      </p>
    </div>
  );
}
