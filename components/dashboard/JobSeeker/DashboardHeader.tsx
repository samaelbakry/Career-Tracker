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
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserProfile, uploadAvatar } from "@/services/jobSeekerProfile";

export default function DashboardHeader() {
  const user = useAppSelector(selectedUser);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userNameInput, setUserNameInput] = useState(user?.name ?? "");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

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
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-indigo-50/70 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              {user?.avatar_url ? (
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src={user.avatar_url}
                    alt={user.name ?? "User"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-extrabold text-white shadow-lg shadow-blue-500/20 ring-4 ring-white">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}

              <div
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white"
                title="Active Status"
              >
                <CheckCircle2 size={14} className="stroke-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-500/10">
                <Sparkles size={12} className="text-blue-500" />
                <span>{greeting}</span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {user?.name ?? "User"}
              </h1>

              <p className="max-w-lg text-sm text-slate-500">
                Welcome back! Track your applications and discover new
                opportunities.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 border-t border-slate-100 pt-5 md:items-end md:border-none md:pt-0">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
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
                    className="transition-transform group-hover:-rotate-12"
                  />
                  <span>Edit Profile</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <CalendarDays size={13} className="text-slate-400" />
              <span>
                Member since{" "}
                {user?.created_at
                  ? new Date(user.created_at).getFullYear()
                  : "2026"}
              </span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="animate-in fade-in-50 slide-in-from-top-2 duration-200 border-t border-slate-100 pt-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Edit Profile
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update your avatar image and display name below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="avatarUrl"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Profile Avatar
                  </Label>
                  <Input
                    id="avatarUrl"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                    className="cursor-pointer bg-white text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="nameInput"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Display Name
                  </Label>
                  <Input
                    id="nameInput"
                    type="text"
                    placeholder="Enter your full name"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    className="h-9 bg-white text-xs focus-visible:ring-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="h-9 text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-9 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white min-w-[100px]"
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5">
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
