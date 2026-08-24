"use client";
import { saveJob, unsaveJob } from "@/services/savedJobs";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { Bookmark, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SaveJobs({ jobId }: { jobId: string }) {
  const userId = useAppSelector(selectedUser)?.id;
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedJob = localStorage.getItem(`saved-job-${jobId}`);
    return savedJob ? JSON.parse(savedJob) : false;
  });

  const handleClick = async () => {
    if (!userId || !jobId || loading) return;
    try {
      setLoading(true);
      if (isBookmarked) {
        await unsaveJob(userId, jobId);
        toast.success("Removed");
        setIsBookmarked(false);
      } else {
        await saveJob(userId, jobId);
        toast.success("Saved");
        setIsBookmarked(true);
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : error;
      console.log(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(`saved-job-${jobId}`, JSON.stringify(isBookmarked));
  }, [isBookmarked, jobId]);

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={loading}
      aria-label={isBookmarked ? "Remove bookmark" : "Save job"}
      className="group relative flex size-9 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-75 active:translate-y-0"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin text-indigo-600" />
      ) : (
        <Bookmark
          className={`size-4.5 transition-all duration-300 ease-spring ${
            isBookmarked
              ? "scale-110 fill-indigo-600 stroke-indigo-600"
              : "stroke-slate-400 group-hover:scale-110 group-hover:stroke-indigo-600"
          }`}
        />
      )}
    </button>
  );
}
