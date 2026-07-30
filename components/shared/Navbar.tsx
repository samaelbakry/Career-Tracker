"use client";

import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedAuthenticated } from "@/store/slices/authSlice";
import LogoutButton from "../ui/authUI/LogoutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "/jobs", label: "Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const authenticated = useAppSelector(selectedAuthenticated);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white shadow-md shadow-blue-900/10">
            <Briefcase size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0F172A]">
            Career Tracker
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? "font-bold text-[#1E3A8A]"
                  : "font-medium text-[#64748B] hover:text-[#1E3A8A]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {authenticated ? (
          <LogoutButton />
        ) : (
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold text-[#1E3A8A] border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98]">
              Login
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1E3A8A] rounded-xl hover:bg-[#172554] shadow-sm transition-all active:scale-[0.98]">
              Create Account
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
