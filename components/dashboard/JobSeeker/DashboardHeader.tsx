"use client";

import { selectedUser, updateUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux-hooks";
import {
  CalendarDays,
  Pencil,
  Sparkles,
  CheckCircle2,
  X,
  Loader2,
  Camera,
  UserRound,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  updateUserProfile,
  uploadAvatar,
} from "@/services/jobSeekerProfile";

export default function DashboardHeader() {
  const user = useAppSelector(selectedUser);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userNameInput, setUserNameInput] = useState(user?.name ?? "");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon"  : "Good Evening";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userNameInput.trim() && !avatarFile) {
      toast.error("Please change at least one field");
      return;
    }

    try {
      setLoading(true);

      let avatar: string | undefined;

      if (avatarFile) {
        avatar = await uploadAvatar(avatarFile);
      }

      await updateUserProfile(userNameInput, avatar ?? "");

      toast.success("Profile updated successfully");

      dispatch(
        updateUser({
          name: userNameInput,
          ...(avatar && { avatar_url: avatar }),
        }),
      );

      setIsOpen(false);
      setAvatarFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_-25px_rgba(15,23,42,0.18)]">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="rounded-[1.4rem] bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 p-0.5 shadow-lg shadow-blue-500/20">
                {user?.avatar_url ? (
                  <div className="h-19 w-19 overflow-hidden rounded-[1.3rem] bg-white sm:h-21 sm:w-21">
                    <img
                      src={user.avatar_url}
                      alt={user.name ?? "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-19 w-19 items-center justify-center rounded-[1.3rem] bg-linear-to-br from-blue-600 to-indigo-600 text-3xl font-black text-white sm:h-21 sm:w-21">
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
              </div>

              <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white shadow-sm">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
            </div>

            <div className="min-w-0 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-600">
                <Sparkles size={12} />
                {greeting}
              </div>

              <h1 className="truncate text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {user?.name ?? "User"}
              </h1>

              <p className="max-w-xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                Welcome back! Track your applications and discover new
                opportunities.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5 md:flex-col md:items-end md:border-0 md:pt-0">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-blue-500/20 active:translate-y-0 sm:px-5 sm:text-sm"
            >
              {isOpen ? (
                <>
                  <X size={15} />
                  <span>Close Edit</span>
                </>
              ) : (
                <>
                  <Pencil
                    size={15}
                    className="transition-transform duration-200 group-hover:-rotate-12"
                  />
                  <span>Edit Profile</span>
                </>
              )}
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
              <CalendarDays size={13} className="text-blue-500" />

              <span>
                Member since{" "}
                <span className="font-bold text-slate-700">
                  {user?.created_at ? new Date(user.created_at).getFullYear() : "2026"}
                </span>
              </span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="mt-7 animate-in fade-in-50 slide-in-from-top-3 duration-300">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserRound size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Edit Profile
                    </h3>

                    <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                      Keep your profile information up to date.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="avatarUrl"
                    className="text-xs font-bold text-slate-700"
                  >
                    Profile Avatar
                  </Label>

                  <div className="relative">
                    <Camera
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                      id="avatarUrl"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setAvatarFile(e.target.files?.[0] ?? null)
                      }
                      className="h-10 cursor-pointer rounded-xl border-slate-200 bg-white pl-9 text-xs shadow-sm transition-all file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-blue-600 hover:border-blue-300 hover:file:bg-blue-100 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="nameInput"
                    className="text-xs font-bold text-slate-700"
                  >
                    Display Name
                  </Label>

                  <Input
                    id="nameInput"
                    type="text"
                    placeholder="Enter your full name"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    className="h-10 rounded-xl border-slate-200 bg-white text-xs shadow-sm transition-all placeholder:text-slate-400 hover:border-blue-300 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-white/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="h-10 rounded-xl border-slate-200 px-5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 min-w-30 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}