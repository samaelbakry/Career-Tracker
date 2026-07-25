import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function ScreensLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      <main className="min-h-[calc(100vh-240px)]">{children}</main>
      <Footer />
    </div>
  );
}
