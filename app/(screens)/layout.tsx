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
    <div className="relative isolate flex min-h-screen flex-col overflow-clip bg-[#fafbff] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-950 dark:bg-[#080b14] dark:text-slate-100 dark:selection:text-indigo-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-64 left-1/2 h-136 w-232 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-600/12" />

        <div className="absolute -left-40 top-112 h-80 w-80 rounded-full bg-violet-400/8 blur-[100px] dark:bg-violet-600/8" />

        <div className="absolute -right-40 top-260 h-96 w-96 rounded-full bg-sky-400/8 blur-[120px] dark:bg-sky-600/[0.07]" />

        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-12"
          style={{
            backgroundImage:
              "linear-linear(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-linear(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-linear(to bottom, black, transparent 75%)",
            WebkitMaskImage: "linear-linear(to bottom, black, transparent 75%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/30 to-transparent" />
      </div>

      <Navbar />

      <main className="relative flex flex-1 flex-col">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
    </div>
  );
}
