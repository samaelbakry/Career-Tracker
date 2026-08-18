import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

export default function PaginationBar({page,setPage,totalPages,}: { page: number ; setPage: Dispatch<SetStateAction<number>>; totalPages: number; }) {
  return (
    <>
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();

                if (page > 1) {
                  setPage((prev) => prev - 1);
                }
              }}
              className={`cursor-pointer rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 ${
                page === 1 ? "pointer-events-none opacity-40" : ""
              }`}
            />
          </PaginationItem>

          <PaginationItem>
            <div className="flex h-9 items-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              Page{" "}
              <span className="mx-1 font-bold text-slate-900 dark:text-slate-100">
                {page}
              </span>
              of {totalPages}
            </div>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();

                if (page < totalPages) {
                  setPage((prev) => prev + 1);
                }
              }}
              className={`cursor-pointer rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 ${
                page === totalPages ? "pointer-events-none opacity-40" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
