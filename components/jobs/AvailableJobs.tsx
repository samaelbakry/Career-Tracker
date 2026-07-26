"use client";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import { Fragment } from "react/jsx-runtime";
import CardSkeleton from "./CardSkeleton";
import JobCard from "./JobCard";

export default function AvailableJobs() {
  const { data: jobs, isLoading } = useFetch({
    queryFn: getAllJobs,
    queryKey: ["getAllJobs"],
  });

  return (
    <>
      {isLoading ? (
        [
          ...Array(3).map((index) => (
            <Fragment key={index}>
              <CardSkeleton />
            </Fragment>
          )),
        ]
      ) : (
        <div className="grid grid-cols-3 gap-3 my-4">
          {jobs?.map((item) => (
            <Fragment key={item.id}>
              <JobCard job={item} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
