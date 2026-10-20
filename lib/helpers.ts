import { Certificate, JobSeekerProfile } from "@/types/profileOptimizing";
import {
  BriefcaseBusiness,
  CalendarCheck,
  Handshake,
  Users,
} from "lucide-react";

export const getAvatarGradient = (name: string = "C") => {
  const gradients = [
    "from-indigo-500 to-purple-600 text-white",
    "from-blue-500 to-cyan-600 text-white",
    "from-emerald-500 to-teal-600 text-white",
    "from-rose-500 to-pink-600 text-white",
    "from-amber-500 to-orange-600 text-white",
  ];
  const charCodeSum = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[charCodeSum % gradients.length];
};

export const formatSalary = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(amount);

export const formattedDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export function calculateProfileCompletion(
  profile: JobSeekerProfile | null,
  certificates: Certificate[] = [],
) {
  if (!profile) {
    return {
      percentage: 0,
      missing: [
        "Target job title",
        "Experience",
        "Skills",
        "Location",
        "Work mode",
        "Employment type",
        "Certificates",
        "Bio",
      ],
    };
  }

  const items = [
    {
      label: "Target job title",
      completed: !!profile.target_job_title,
    },

    {
      label: "Experience",
      completed:
        profile.experience_years !== null || !!profile.experience_level,
    },

    {
      label: "Skills",
      completed: profile.skills.length > 0,
    },

    {
      label: "Location",
      completed: !!profile.preferred_location,
    },

    {
      label: "Work mode",
      completed: !!profile.work_mode,
    },

    {
      label: "Employment type",
      completed: !!profile.employment_type,
    },

    {
      label: "Certificates",
      completed: certificates?.length > 0,
    },

    {
      label: "Bio",
      completed: !!profile.bio,
    },
  ];

  const completed = items.filter((item) => item?.completed).length;

  const percentage = Math.round((completed / items.length) * 100);

  const missing = items
    .filter((item) => !item.completed)
    .map((item) => item.label);

  return {
    percentage,
    missing,
  };
}
export const stats = (data: {
  totalApplicants: number;
  activeJobs: number;
  interviews: number;
  offers: number;
}) => {
  return [
    {
      label: "Total Applicants",
      value: data.totalApplicants,
      description: "Applications received",
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",
    },
    {
      label: "Active Jobs",
      value: data.activeJobs,
      description: "Currently open listings",
      icon: BriefcaseBusiness,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      label: "Interviews",
      value: data.interviews,
      description: "Candidates in interview stage",
      icon: CalendarCheck,
      color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40",
    },
    {
      label: "Offers",
      value: data.offers,
      description: "Candidates in offer stage",
      icon: Handshake,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40",
    },
  ];
};
