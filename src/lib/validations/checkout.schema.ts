import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  mobile: z
    .string()
    .regex(/^01\d{9}$/, "Mobile number must be in format: 01XXXXXXXXX"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
