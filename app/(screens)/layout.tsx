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
      <Navbar />

      <main className="relative flex flex-1 flex-col">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
    </div>
  );
}
