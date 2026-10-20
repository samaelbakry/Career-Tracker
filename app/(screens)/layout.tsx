import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import PageTransition from "@/components/shared/PageTransition";
import React from "react";

export default function ScreensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div
        className="
          pointer-events-none absolute
          -top-32 left-1/2
          h-80 w-160
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
          dark:bg-blue-800/15
        "
      />

      <div
        className="
          pointer-events-none absolute
          right-0 top-20
          h-56 w-56
          rounded-full
          bg-indigo-500/5
          blur-3xl
          dark:bg-indigo-800/10
        "
      />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  );
}