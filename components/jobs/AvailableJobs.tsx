"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { getAllJobs } from "@/services/jobs";
import JobCard from "./JobCard";
import CardSkeleton from "./CardSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const JOBS_PER_PAGE = 6;

export default function AvailableJobs() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetch({
    queryKey: ["getAllJobs", page],
    queryFn: () => getAllJobs(page, JOBS_PER_PAGE),
  });

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 my-4">
          {Array.from({ length: JOBS_PER_PAGE }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 my-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="my-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();

                      if (page > 1) {
                        setPage((prev) => prev - 1);
                      }
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <span className="px-4 text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();

                      if (page < totalPages) {
                        setPage((prev) => prev + 1);
                      }
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </>
  );
}
