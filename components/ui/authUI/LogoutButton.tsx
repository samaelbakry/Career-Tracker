"use client";

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
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks/redux-hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      await signOut();

      await fetch("/api/auth/logout" , {
        method:"POST"
      })
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate.push("/");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="gap-2 rounded-xl border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        }
      />

      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>

          <AlertDialogDescription>
            You will need to log back in to access your dashboard and account
            settings.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleSubmit}
            className="rounded-xl"
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
