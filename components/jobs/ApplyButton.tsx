"use client"
import { Job } from "@/types/jobs";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyButton({job}:{job:Job}) {
  const jobId = job.id;
  const jobTitle = job.title;
  const companyName = job.company?.name;
  const jobLocation = job.location;


  const router = useRouter()
   const handleClick = () => {
    router.push(`/jobSeeker/application?id=${jobId}&title=${jobTitle}&company=${companyName}&location=${jobLocation}`);
  };

  return (
  <button
  onClick={handleClick}
  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-blue-600 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98] cursor-pointer"
>
  <span>Apply now</span>
 <ArrowRight className="w-4 h-4 text-blue-600 transition-transform duration-200 group-hover:translate-x-0.5" />
</button>
  );
}
