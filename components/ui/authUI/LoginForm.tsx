"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaType } from "@/schemas/authschema";
import { signIn } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const navigate = useRouter();
  const form = useForm<loginSchemaType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function sendLogInData(values: loginSchemaType) {
    try {
     await signIn(values);
      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.log(error)
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(sendLogInData)} className="space-y-4">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className="space-y-1 font-sans"
          >
            <FieldLabel
              htmlFor={field.name}
              className="block text-xs font-semibold text-[#0F172A]"
            >
              Email Address
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="email"
              type="email"
              placeholder="name@example.com"
              className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                fieldState.invalid
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-[#1E3A8A] focus:ring-blue-100"
              }`}
            />
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-xs text-red-500 font-medium mt-1"
              />
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
            className="space-y-1 font-sans"
          >
            <FieldLabel
              htmlFor={field.name}
              className="block text-xs font-semibold text-[#0F172A]"
            >
              Password
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="current-password"
              type="password"
              placeholder="••••••••"
              className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                fieldState.invalid
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-200 focus:border-[#1E3A8A] focus:ring-blue-100"
              }`}
            />
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-xs text-red-500 font-medium mt-1"
              />
            )}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-white text-sm font-semibold rounded-xl py-3.5 flex items-center justify-center shadow-md shadow-blue-900/10 transition-all duration-200 active:scale-[0.98] cursor-pointer mt-2"
      >
        {form.formState.isSubmitting ? (
          <LoaderCircle className="size-5 animate-spin text-white" />
        ) : (
          "Log In"
        )}
      </Button>

      <div className="flex justify-center items-center text-xs text-[#64748B] pt-2">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          href="/register"
          className="font-semibold text-[#1E3A8A] hover:underline"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
