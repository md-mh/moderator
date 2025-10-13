import { z } from "zod";

export interface Moderator {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  userId: string;
}

export interface ModeratorList {
  data: Moderator[];
  pagination: {
    page: number;
    limit: number;
  };
}

// Zod schema validation for creating/updating a moderator
export const moderatorSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer the type from the Zod schema
export type ModeratorFormValues = z.infer<typeof moderatorSchema>;
