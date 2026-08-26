"use client";
import { Job } from "@/types/jobs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyButton({ job }: { job: Job }) {
  const jobId = job.id;
  const jobTitle = job.title;
  const companyName = job.company?.name;
  const jobLocation = job.location;

  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/jobSeeker/application?id=${jobId}&title=${jobTitle}&company=${companyName}&location=${jobLocation}`,
    );
  };

  return (
    <button
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-blue-500/25 active:scale-[0.97] cursor-pointer overflow-hidden"
    >
      <span className="relative z-10 tracking-wide">Apply Now</span>

      <ArrowRight className="relative z-10 w-4 h-4 text-white transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </button>
  );
}
