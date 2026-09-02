"use client";

import { useState, useEffect } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedAuthenticated, selectedUser } from "@/store/slices/authSlice";
import LogoutButton from "../ui/authUI/LogoutButton";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authenticated = useAppSelector(selectedAuthenticated);
  const role = useAppSelector(selectedUser)?.role;

  const isEmployer = role === "employer";
  const links = isEmployer ? navLinks.employer : navLinks.job_seeker;

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 shadow ${
        isScrolled
          ? "border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/85"
          : "border-transparent bg-white/70 backdrop-blur-md dark:bg-slate-950/70"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
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
            <div className="hidden items-center md:flex">
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
                <span className="hidden sm:inline">Create Account</span>

                <span className="sm:hidden">Sign Up</span>
              </Link>
            </div>
          )}

          {authenticated && (
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {authenticated && (
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
              isMenuOpen
                ? "mt-3 grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <nav className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-white text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-400"
                            : "text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  <div className="mt-1 border-t border-slate-200/70 pt-1 dark:border-slate-800">
                    <div className="w-full">
                      <LogoutButton />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
