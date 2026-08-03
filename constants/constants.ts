import { CheckCircle2, Clock, Video, XCircle } from "lucide-react";

export const getStatusBadge = (status: string) => {
  const normalized = status?.toLowerCase() ?? "pending";

  switch (normalized) {
    case "accepted":
      return {
        label: "Accepted",
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      };
    case "interview":
    case "interviewed":
      return {
        label: "Interview",
        icon: Video,
        className: "bg-purple-50 text-purple-700 ring-purple-600/20",
      };
    case "rejected":
      return {
        label: "Rejected",
        icon: XCircle,
        className: "bg-rose-50 text-rose-700 ring-rose-600/20",
      };
    default:
      return {
        label: "Pending",
        icon: Clock,
        className: "bg-amber-50 text-amber-700 ring-amber-600/20",
      };
  }
};