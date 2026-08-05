"use client";

import { registerSchema, registerSchemaType } from "@/schemas/authschema";
import { signUp } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../button";
import { Field, FieldError, FieldLabel } from "../field";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Label } from "../label";

export default function RegisterForm() {
  const navigate = useRouter();
  const form = useForm<registerSchemaType>({
    mode: "all",
    defaultValues: {
      name: "",
      rePassword: "",
      email: "",
      password: "",
      role: "job_seeker",
    },
    resolver: zodResolver(registerSchema),
  });

  async function sendRegisterData(values: registerSchemaType) {
    try {
      const res = await signUp(values);
      console.log(res , "register")
      toast.success("Wait for verification your account");
      form.reset();

      navigate.push(`/verifyEmail?email=${values.email}`);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(sendRegisterData)} className="space-y-4">
      <Controller
        name="name"
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
              Name
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="name"
              type="text"
              placeholder="john deo"
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
      <Controller
        name="rePassword"
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
      <Controller
        name="role"
        control={form.control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="job_seeker" id="job_seeker" />
              <Label htmlFor="job_seeker">Job Seeker</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="employer" id="employer" />
              <Label htmlFor="employer">Employer</Label>
            </div>
          </RadioGroup>
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
          "create account"
        )}
      </Button>

      <div className="flex justify-center items-center text-xs text-[#64748B] pt-2">
        <span>Already have an account?&nbsp;</span>
        <Link
          href="/login"
          className="font-semibold text-[#1E3A8A] hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
