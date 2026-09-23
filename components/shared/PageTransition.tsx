"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function PageTransition({
  children,
  auth,
  isLeaving,
}: {
  children: React.ReactNode;
  auth?: boolean;
  isLeaving?: boolean;
}) {
  const pathname = usePathname();

  return (
    <main
      key={pathname}
      className={`${isLeaving ? "page-exit" : "page-enter"} flex-1 ${
        auth ? "pt-0" : "pt-15"
      }`}
    >
      {children}
    </main>
  );
}