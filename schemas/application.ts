import { z } from 'zod';

export const applicationStatusEnum = z.enum([
  'pending',
  'under_review',
  'interviewed',
  'accepted',
  'rejected',
]);

export const applicationFormSchema = z.object({
  resume_url: z.string().url('Please enter a valid resume URL (e.g., https://...)'),
  cover_letter: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters long')
    .max(2000, 'Cover letter cannot exceed 2000 characters'),
  status: applicationStatusEnum.default('pending'),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;