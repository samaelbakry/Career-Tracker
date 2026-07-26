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

export default function LogoutButton() {
  const navigate = useRouter();
  const dipatch = useAppDispatch();
  const handleSubmit = async () => {
    await signOut();
    dipatch(logout());
    navigate.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Log out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to log back in to access your dashboard and account
            settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={handleSubmit}>
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
