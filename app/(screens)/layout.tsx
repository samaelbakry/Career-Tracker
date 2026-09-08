import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function ScreensLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
          <div
        className="
          pointer-events-none absolute
          -top-32 left-1/2
          h-80 w-160
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
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
        "
      />
      <Navbar />
      <main className="flex-1 pt-15">{children}</main>
      <Footer />
    </div>
  );
}