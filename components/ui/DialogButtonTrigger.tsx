"use client"
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

type DialogButtonTriggerProps = {
  Component: React.ComponentType<{
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
}

export default function DialogButtonTrigger({ Component }: DialogButtonTriggerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen((prev) => !prev)}
        className="bg-indigo-500 text-gray-200 flex items-center justify-center gap-1 px-4 py-1 cursor-pointer rounded-lg shadow hover:bg-indigo-700 transition duration-500"
      >
        <PlusCircle />
        Create yours
      </button>
      <Component open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
