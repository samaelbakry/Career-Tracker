"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Job } from "@/types/jobs";
import { ArrowUpRight, Banknote, Building2, Clock, MapPin } from "lucide-react";


export default function JobCard({ job }: { job:Job  }) {
  const formatSalary = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      maximumFractionDigits: 0,
    }).format(amount);

  const formattedDate = new Date(job?.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
   <Card className="group relative w-full max-w-md overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
      <div className="h-1 w-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Building2 className="h-5 w-5 text-zinc-500" />
            </div>

            <div>
              <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {job?.title ?? "Untitled Position"}
              </CardTitle>
             
            </div>
          </div>

          <Badge
            variant="outline"
            className={
              job?.status === "open"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            }
          >
            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${job?.status === "open" ? "bg-emerald-500" : "bg-zinc-400"}`} />
            {job?.status ?? "draft"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-2 text-sm text-zinc-600 dark:text-zinc-300">
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {job?.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="bg-zinc-100 font-normal text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            {job?.employment_type}
          </Badge>
          <Badge variant="secondary" className="bg-zinc-100 font-normal text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            {job?.experience_level} Level
          </Badge>
          <Badge variant="secondary" className="bg-zinc-100 font-normal text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
            <MapPin className="mr-1 h-3 w-3 text-zinc-400" />
            {job?.location}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/80 p-2.5 text-xs dark:border-zinc-800/60 dark:bg-zinc-900/50">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
            <Banknote className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              {formatSalary(job?.salary_min)} - {formatSalary(job?.salary_max)}
            </span>
            <span className="text-[10px] font-normal text-zinc-400">/ year</span>
          </div>

          <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-5 pt-3">
        <Button className="w-full gap-1 shadow-none" size="sm">
          Apply Now
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="dark:border-zinc-800">
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}