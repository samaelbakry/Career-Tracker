"use client";

import { useFetch } from "@/hooks/useFetch";
import { getDashboardStats } from "@/services/application";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Video,
  XCircle,
} from "lucide-react";

export default function DashboardStats() {
  const userId = useAppSelector(selectedUser)?.id;
  const { data: stats, isLoading } = useFetch({
    queryFn: () => getDashboardStats(userId!),
    queryKey: ["dashboardStats", userId],
  });

  const cards = [
    {
      title: "Applied Jobs",
      value: stats?.applied ?? 0,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      title: "Pending",
      value: stats?.Reviewing ?? 0,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      title: "Interview",
      value: stats?.Interview ?? 0,
      icon: Video,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      title: "Accepted-Offer",
      value: stats?.Offer ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      title: "Rejected",
      value: stats?.rejected ?? 0,
      icon: XCircle,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wide text-slate-500">
                {card.title}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.bgColor} ${card.color} transition-transform group-hover:scale-110`}
              >
                <Icon size={16} />
              </div>
            </div>

            <div className="mt-3">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-100" />
              ) : (
                <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {card.value.toLocaleString()}
                </h2>
              )}
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1 w-full rounded-b-2xl ${card.bgColor}`}
            />
          </div>
        );
      })}
    </div>
  );
}