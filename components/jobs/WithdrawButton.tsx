"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { Loader2, Undo2 } from "lucide-react";
import { withdrawApplication } from "@/services/application";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function WithdrawButton({userId,jobId}: {userId: string;jobId: string}) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      if (!userId || !jobId) return;
      await withdrawApplication(userId!, jobId)
      toast.success("Application withdrawn")
      queryClient.invalidateQueries({queryKey:["applications"]})
    } catch (error) {
      console.error("Failed to withdraw application:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="h-9 border-rose-200 text-xs font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900/50 dark:text-rose-400 dark:hover:bg-rose-950/50"
              onClick={(e) => e.stopPropagation()}
            >
              {isLoading ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Undo2 className="mr-1.5 h-3.5 w-3.5" />
              )}
              Withdraw
            </Button>
          }
        ></AlertDialogTrigger>

        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Withdraw Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to withdraw your application? This action
              cannot be undone, and you may need to re-apply if the position is
              still open.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWithdraw}
              className="bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700"
            >
              Confirm Withdrawal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
