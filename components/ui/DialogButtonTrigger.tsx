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
          aria-label="Edit item"
          className="
      group inline-flex items-center justify-center
      rounded-xl border border-slate-200
      bg-white p-2
      text-slate-500
      shadow-sm
      transition-all duration-200
      hover:border-indigo-200
      hover:bg-indigo-50
      hover:text-indigo-600
      hover:shadow-md
      active:scale-95
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-indigo-500
      focus-visible:ring-offset-2
      cursor-pointer
    "
        >
          <Edit
            size={16}
            strokeWidth={2}
            className="
        transition-transform duration-200
        group-hover:rotate-[-8deg]
        group-hover:scale-110
      "
          />
        </button>
      )}

      {!edit && !interview && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="
      group inline-flex items-center justify-center
      gap-2
      rounded-xl
      bg-indigo-600
      px-4 py-2.5
      text-sm font-semibold text-white
      shadow-md shadow-indigo-600/20
      transition-all duration-200
      hover:-translate-y-0.5
      hover:bg-indigo-700
      hover:shadow-lg hover:shadow-indigo-600/25
      active:translate-y-0
      active:scale-[0.98]
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-indigo-500
      focus-visible:ring-offset-2
      cursor-pointer
    "
        >
          <PlusCircle
            size={18}
            strokeWidth={2}
            className="
        transition-transform duration-200
        group-hover:rotate-90
      "
          />

          <span>Create yours</span>
        </button>
      )}

      {interview && (
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="
      group inline-flex items-center justify-center
      gap-2
      rounded-xl
      border border-indigo-200
      bg-indigo-50
      px-3.5 py-2
      text-xs font-semibold text-indigo-700
      shadow-sm
      transition-all duration-200
      hover:-translate-y-0.5
      hover:border-indigo-600
      hover:bg-indigo-600
      hover:text-white
      hover:shadow-md hover:shadow-indigo-600/20
      active:translate-y-0
      active:scale-[0.98]
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-indigo-500
      focus-visible:ring-offset-2
      cursor-pointer
    "
        >
          <span
            className="
        flex h-6 w-6 items-center justify-center
        rounded-lg
        bg-white/70
        text-indigo-600
        transition-all duration-200
        group-hover:bg-white/20
        group-hover:text-white
      "
          >
            <Calendar1Icon size={14} strokeWidth={2.2} />
          </span>

          <span>Schedule</span>
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
