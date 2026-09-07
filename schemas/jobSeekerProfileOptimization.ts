import { z } from "zod";

export const profileSchema = z.object({
  target_job_title: z
    .string()
    .min(1, "Target job title is required"),

  experience_years: z
    .coerce
    .number()
    .min(0, "Experience cannot be negative"),

  experience_level: z.enum([
    "Entry Level",
    "Junior",
    "Mid Level",
    "Senior",
    "Lead",
  ], {
    message: "Experience level is required",
  }),

  skills: z
    .string()
    .min(1, "Add at least one skill"),

  preferred_location: z
    .string()
    .min(1, "Location is required"),

  work_mode: z.enum([
    "Remote",
    "Hybrid",
    "On-site",
  ], {
    message: "Work mode is required",
  }),

  employment_type: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ], {
    message: "Employment type is required",
  }),

  bio: z
    .string()
    .min(10, "Bio should be at least 10 characters"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;