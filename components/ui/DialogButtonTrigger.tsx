"use client";

import { Calendar1Icon, Edit, PlusCircle } from "lucide-react";
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
  interview?: boolean;
};

export default function DialogButtonTrigger<T>({
  Component,
  edit,
  componentProps,
  interview,
}: DialogButtonTriggerProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

   return (
    <>
      {edit && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="group cursor-pointer transition duration-500 mr-2"
        >
          <Edit size={16} />
        </button>
      )}

      {!edit && !interview && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center justify-center gap-1 rounded-lg bg-indigo-500 px-4 py-1 text-gray-200 shadow transition duration-500 hover:bg-indigo-700"
        >
          <PlusCircle />
          Create yours
        </button>
      )}

      {interview && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="group flex items-center justify-center gap-1 rounded-lg bg-indigo-400 px-3 py-1 text-gray-200 shadow transition duration-500 hover:bg-indigo-300"
        >
          <Calendar1Icon
            size={16}
            className="mr-1 text-indigo-100 group-hover:text-white"
          />
          <span className="text-xs font-medium">Schedule</span>
        </button>
      )}

      <Component
        {...(componentProps as T)}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
