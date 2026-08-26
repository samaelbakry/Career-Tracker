"use client";

import { registerSchema, registerSchemaType } from "@/schemas/authschema";
import { signUp } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, LoaderCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../button";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";
import { useState } from "react";

type Role = "job_seeker" | "employer"

export default function RegisterForm({role="job_seeker"}:{role:Role}) {
  const navigate = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const form = useForm<registerSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      rePassword: "",
      email: "",
      password: "",
      role,
    },
    resolver: zodResolver(registerSchema),
  });

  async function sendRegisterData(values: registerSchemaType) {
    try {
      await signUp(values);
      toast.success("Wait for verification your account");
      form.reset();

      navigate.push(`/verifyEmail?email=${values.email}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  }

  return (
   <form onSubmit={form.handleSubmit(sendRegisterData)} className="space-y-4">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-1.5 font-sans">
            <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-slate-800">
              Full Name
            </FieldLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="name"
                type="text"
                placeholder="John Doe"
                className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
            </div>
            {fieldState.invalid && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
                <AlertCircle size={14} className="shrink-0" />
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-1.5 font-sans">
            <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-slate-800">
              Email Address
            </FieldLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                type="email"
                placeholder="name@example.com"
                className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
            </div>
            {fieldState.invalid && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
                <AlertCircle size={14} className="shrink-0" />
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-1.5 font-sans">
            <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-slate-800">
              Password
            </FieldLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldState.invalid && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
                <AlertCircle size={14} className="shrink-0" />
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          </Field>
        )}
      />

      <Controller
        name="rePassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-1.5 font-sans">
            <FieldLabel htmlFor={field.name} className="block text-xs font-semibold text-slate-800">
              Confirm Password
            </FieldLabel>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="new-password"
                type={showRePassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full bg-white border rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${
                  fieldState.invalid
                    ? "border-red-500 ring-2 ring-red-500/10 focus:border-red-500"
                    : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                tabIndex={-1}
              >
                {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldState.invalid && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
                <AlertCircle size={14} className="shrink-0" />
                <FieldError errors={[fieldState.error]} />
              </div>
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-xl py-3 flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all duration-200 cursor-pointer mt-4"
      >
        {form.formState.isSubmitting ? (
          <LoaderCircle className="w-5 h-5 animate-spin text-white" />
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="flex justify-center items-center text-xs text-slate-500 pt-3">
        <span>Already have an account?&nbsp;</span>
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Log in
        </Link>
      </div>
    </form>
  );
}
