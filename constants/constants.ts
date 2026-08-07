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

// navbar links 
export const navLinks = {
  job_seeker: [
    { href: "/jobSeeker/dashboard", label: "Jobs" },
    { href: "/jobSeeker/jobs", label: "Jobs" },
    { href: "/jobSeeker/search", label: "Search" },
  ],
  employer: [
    { href: "/employer/dashboard", label: "Dashboard" },
    { href: "/employer/feed", label: "Feed" },
    { href: "/employer/postJob", label: "Post Job" },
    { href: "/employer/companies", label: "Companies" },
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

