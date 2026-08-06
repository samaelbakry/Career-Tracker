import { useForm } from "react-hook-form";
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
import { Building2 } from "lucide-react";
import { FormDialogProps } from "@/types/Props";

export function CompanyFormDialog({
  open,
  onOpenChange,
}: FormDialogProps) {
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
    if (!user || !user.id) {
      console.error("User not found. Cannot create company without user id.");
      return;
    }
    await createCompany(data, user.id);
    toast.success("Your compnay added successfully");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full sm:max-w-6xl max-h-screen overflow-y-auto">
        <DialogHeader className="space-y-3 pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
                Company Profile
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Provide your organization details and social handles below.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                placeholder="Acme Corp"
                {...register("name", { required: "Company name is required" })}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Software & Tech"
                {...register("industry")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                {...register("website")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Input
                id="headquarters"
                placeholder="San Francisco, CA"
                {...register("headquarters")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="location">Primary Location</Label>
              <Input
                id="location"
                placeholder="United States"
                {...register("location")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="founded_year">Founded Year</Label>
              <Input
                id="founded_year"
                type="number"
                placeholder="2020"
                {...register("founded_year")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="company_size">Company Size</Label>
              <Input
                id="company_size"
                placeholder="10-50 employees"
                {...register("company_size")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                placeholder="25"
                {...register("employees")}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Briefly describe your company..."
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                type="url"
                placeholder="https://example.com/logo.png"
                {...register("logo_url")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="cover_image">Cover Image URL</Label>
              <Input
                id="cover_image"
                type="url"
                placeholder="https://example.com/cover.png"
                {...register("cover_image")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                type="url"
                placeholder="https://linkedin.com/company/..."
                {...register("linkedin_url")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="twitter_url">Twitter / X URL</Label>
              <Input
                id="twitter_url"
                type="url"
                placeholder="https://x.com/..."
                {...register("twitter_url")}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
