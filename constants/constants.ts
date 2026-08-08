import { CheckCircle2, Clock, Video, XCircle } from "lucide-react";

// job_seeker dashboard 
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

// employer application status 
export const getApplictaionStatusBadge = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-700 ring-blue-600/20";

    case "Reviewing":
      return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";

    case "Interview":
      return "bg-purple-50 text-purple-700 ring-purple-600/20";

    case "Offer":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

    case "Rejected":
      return "bg-red-50 text-red-700 ring-red-600/20";

    default:
      return "bg-gray-50 text-gray-700 ring-gray-600/20";
  }
};

// navbar links 
export const navLinks = {
  job_seeker: [
    { href: "/jobSeeker/jobs", label: "Jobs" },
    { href: "/jobSeeker/search", label: "Search" },
    { href: "/jobSeeker/dashboard", label: "Dashboard" },
  ],
  employer: [
    { href: "/employer/feed", label: "Feed" },
    { href: "/employer/postJob", label: "Post Job" },
    { href: "/employer/companies", label: "Companies" },
    { href: "/employer/dashboard", label: "Dashboard" },
  ],
};


// landing page 
export const heroContent = {
  job_seeker: {
    title: "Organize Every Job Application.",
    highlight: "Land Your Next Role Faster.",
    description:
      "Keep every application, interview, recruiter contact, and follow-up organized in one dashboard.",
    button: "Go to Dashboard",
    href: "/jobSeeker/dashboard",
  },
  employer: {
    title: "Hire Smarter.",
    highlight: "Manage Every Candidate Easily.",
    description:
      "Post jobs, review applicants, and track the hiring process from one place.",
    button: "Employer Dashboard",
    href: "/employer/dashboard",
  },
};

