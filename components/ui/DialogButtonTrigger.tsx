"use client";

import { Edit, PlusCircle } from "lucide-react";
import React, { useState } from "react";

export type DialogButtonTriggerProps<T> = {
  Component: React.ComponentType<
    T & {
      open: boolean;
      onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    }
  >;
  componentProps?: T;
  edit?: boolean;
};

export default function DialogButtonTrigger<T>({Component,edit,componentProps}: DialogButtonTriggerProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {edit ? (
        <>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer group transition duration-500"
          >
            <Edit size={16} className="group-hover:text-indigo-500 text-gray-400 mr-2" />
          </button>

          <Component
            {...(componentProps as T)}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </>
      ) : (
        <>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-indigo-500 text-gray-200 flex items-center justify-center gap-1 px-4 py-1 cursor-pointer rounded-lg shadow hover:bg-indigo-700 transition duration-500"
          >
            <PlusCircle />
            Create yours
          </button>

          <Component
            {...(componentProps as T)}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </>
      )}
    </>
  );
}