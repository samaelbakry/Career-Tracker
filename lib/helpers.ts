import { Certificate, JobSeekerProfile } from "@/types/profileOptimizing";

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
