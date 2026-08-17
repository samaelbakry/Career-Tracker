"use client";

import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import {
  selectedAuthenticated,
  selectedUser,
} from "@/store/slices/authSlice";
import LogoutButton from "../ui/authUI/LogoutButton";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const authenticated = useAppSelector(selectedAuthenticated);
  const role = useAppSelector(selectedUser)?.role;

  const isEmployer = role === "employer";
  const links = isEmployer ? navLinks.employer : navLinks.job_seeker;

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
      className={`fixed left-0 right-0 top-0 z-50 transition-all shadow duration-300 ${
        isScrolled
          ? "border-b border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/85"
          : "bg-white/70 backdrop-blur-md dark:bg-slate-950/70"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-900/10 transition-transform duration-200 group-hover:scale-105">
            <Briefcase className="h-5 w-5" />
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
            Career Tracker
          </span>
        </Link>

        {authenticated && (
          <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1 md:flex dark:border-slate-800 dark:bg-slate-900/60">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-400"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {authenticated ? (
          <div className="flex items-center">
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 sm:px-5"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition-all hover:bg-[#172554] active:scale-[0.98] sm:px-5"
            >
              <span className="hidden sm:inline">
                Create Account
              </span>

              <span className="sm:hidden">
                Sign Up
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}