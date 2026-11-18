"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Company } from "@/types/companies";
import { useAppSelector } from "@/store/hooks/redux-hooks";
import { selectedUser } from "@/store/slices/authSlice";
import { createCompany } from "@/services/companies";
import { toast } from "sonner";
import { Building2, Loader2 } from "lucide-react";
import { FormDialogProps } from "@/types/Props";
import { useForm } from "react-hook-form";

export function CompanyFormDialog({ open, onOpenChange }: FormDialogProps) {
  const user = useAppSelector(selectedUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Company>({
    defaultValues: {
      name: "",
      website: "",
      industry: "",
      location: "",
      description: "",
      logo_url: "",
      cover_image: "",
      company_size: "",
      employees: "",
      headquarters: "",
      founded_year: undefined,
      linkedin_url: "",
      twitter_url: "",
    },
  });

  const onSubmit = async (data: Company) => {
    if (!user?.id) {
      toast.error("Please sign in before creating a company.");
      return;
    }

    try {
      await createCompany(data, user.id);
      toast.success("Your company has been added successfully.");
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create company:", error);
      toast.error("Failed to create company. Please try again.");
    }
  };

  const inputClassName =
    "h-11 rounded-xl border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 transition-all focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  const labelClassName =
    "text-sm font-semibold text-slate-700 dark:text-slate-200";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-6xl! max-h-[92vh] overflow-y-auto border border-slate-200 bg-white p-0 shadow-2xl shadow-violet-950/10 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-950">
        {" "}
        <DialogHeader className="border-b border-slate-100 bg-linear-to-br from-violet-50 via-white to-indigo-50/70 px-6 py-6 dark:border-slate-800 dark:from-violet-950/30 dark:via-slate-950 dark:to-indigo-950/20 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <Building2 className="size-5" />
            </div>

            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                Create Company Profile
              </DialogTitle>

              <DialogDescription className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Build your company presence and share important organization
                details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="px-6 py-6 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Basic Information
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Tell candidates about your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelClassName}>
                    Company Name <span className="text-violet-600">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Acme Corp"
                    {...register("name", {
                      required: "Company name is required",
                    })}
                    className={inputClassName}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className={labelClassName}>
                    Industry
                  </Label>
                  <Input
                    id="industry"
                    placeholder="Software & Technology"
                    {...register("industry")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className={labelClassName}>
                    Website URL
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    {...register("website")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headquarters" className={labelClassName}>
                    Headquarters
                  </Label>
                  <Input
                    id="headquarters"
                    placeholder="Cairo, Egypt"
                    {...register("headquarters")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className={labelClassName}>
                    Primary Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Egypt"
                    {...register("location")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded_year" className={labelClassName}>
                    Founded Year
                  </Label>
                  <Input
                    id="founded_year"
                    type="number"
                    placeholder="2020"
                    {...register("founded_year", {
                      setValueAs: (value) =>
                        value === "" ? undefined : Number(value),
                    })}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_size" className={labelClassName}>
                    Company Size
                  </Label>
                  <Input
                    id="company_size"
                    placeholder="10-50 employees"
                    {...register("company_size")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees" className={labelClassName}>
                    Number of Employees
                  </Label>
                  <Input
                    id="employees"
                    type="number"
                    placeholder="25"
                    {...register("employees", {
                      setValueAs: (value) =>
                        value === "" ? "" : Number(value),
                    })}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Company Description
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Give candidates a quick overview of your company.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className={labelClassName}>
                  About Your Company
                </Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Briefly describe your company, its mission, and what makes it a great place to work..."
                  {...register("description")}
                  className="min-h-32 resize-y rounded-xl border-slate-200 bg-slate-50/70 text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus-visible:border-violet-400 focus-visible:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Brand Assets
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Add your company logo and cover image.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logo_url" className={labelClassName}>
                    Logo URL
                  </Label>
                  <Input
                    id="logo_url"
                    type="url"
                    placeholder="https://example.com/logo.png"
                    {...register("logo_url")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image" className={labelClassName}>
                    Cover Image URL
                  </Label>
                  <Input
                    id="cover_image"
                    type="url"
                    placeholder="https://example.com/cover.png"
                    {...register("cover_image")}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Social Links
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Help candidates find and connect with your company.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url" className={labelClassName}>
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    placeholder="https://linkedin.com/company/..."
                    {...register("linkedin_url")}
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter_url" className={labelClassName}>
                    Twitter / X URL
                  </Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    placeholder="https://x.com/..."
                    {...register("twitter_url")}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-xl border-slate-200 px-5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-xl bg-violet-600 px-6 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-700 disabled:translate-y-0 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving Company...
                  </>
                ) : (
                  "Create Company"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
