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
        <AlertDialogTrigger>
          <Trash2 size={16} color="red" className="cursor-pointer" />
        </AlertDialogTrigger>

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
