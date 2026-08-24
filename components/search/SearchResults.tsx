"use client";

import { Job } from "@/types/jobs";
import JobCard from "../jobs/JobCard";
import CardSkeleton from "../skeletons/CardSkeleton";

type Props = {
  loading: boolean;
  jobs: Job[];
};

export default function SearchResults({ loading, jobs }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
