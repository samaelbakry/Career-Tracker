"use client"
import { Job } from "@/types/jobs";
import React, { Fragment } from "react";
import JobCard from "../jobs/JobCard";
import CardSkeleton from "../jobs/CardSkeleton";

type Props = {
  loading: boolean;
  jobs: Job[];
};

export default function SearchResults({ loading, jobs }: Props) {

  return (
    <>
      {loading ? ( [...Array(5).map((index)=> <Fragment key={index} ><CardSkeleton/></Fragment>)] ) : <div className="grid grid-cols-3 px-3 gap-3 my-4">
        {jobs.map((item) => (
          <Fragment key={item.id}>
            <JobCard job={item} />
          </Fragment>
        ))}
      </div>}
    </>
  );
}
