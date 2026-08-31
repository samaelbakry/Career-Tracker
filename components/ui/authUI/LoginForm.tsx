"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/schemas/authschema";
import { getProfile, signIn } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks/redux-hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<loginSchemaType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const sendLogInData = async (values: loginSchemaType) => {
    try {
      const userData = await signIn(values);
      const profile = await getProfile(userData.id);

      dispatch(
        setCredentials({
          user: {
            id: userData.id,
            name: userData.user_metadata.full_name,
            email: userData.email!,
            role: profile.role!,
            created_at: userData.created_at,
            avatar_url: profile.avatar_url,
          },
        }),
      );

      await fetch("/api/auth/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: profile.role,
        }),
      });

      toast.success("Logged in successfully!");

      if (profile.role === "employer") {
        navigate.push("/employer/feed");
      } else {
        navigate.push("/jobSeeker/search");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(sendLogInData)} className="space-y-4">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="space-y-1.5 font-sans"
          >
            <FieldLabel
              htmlFor={field.name}
              className="block text-xs font-semibold text-slate-800"
            >
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
          <Field
            data-invalid={fieldState.invalid}
            className="space-y-1.5 font-sans"
          >
            <FieldLabel
              htmlFor={field.name}
              className="block text-xs font-semibold text-slate-800"
            >
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
                autoComplete="current-password"
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

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-xl py-3 flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all duration-200 cursor-pointer mt-4"
      >
        {form.formState.isSubmitting ? (
          <LoaderCircle className="w-5 h-5 animate-spin text-white" />
        ) : (
          "Log In"
        )}
      </Button>

      <div className="flex justify-center items-center text-xs text-slate-500 pt-3">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          href="/select-role"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
