import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteJob } from "@/services/jobs";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);

      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <button
              type="button"
              aria-label="Delete item"
              className="
    group inline-flex items-center justify-center
    rounded-xl border border-red-100
    bg-red-50 p-2
    text-red-500
    shadow-sm
    transition-all duration-200
    hover:border-red-200
    hover:bg-red-100
    hover:text-red-600
    hover:shadow-md
    active:scale-95
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-red-500
    focus-visible:ring-offset-2
    cursor-pointer
  "
            >
              <Trash2
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </button>
          }
        ></AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
