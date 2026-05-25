import { z } from "zod";

/**
 * Single source of truth for the contact form's shape and validation rules.
 * Imported by both the client form (react-hook-form resolver) and the
 * server-side API route, so validation can never drift between the two.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name (at least 2 characters)." })
    .max(80, { message: "That name is a bit too long." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Your message should be at least 10 characters." })
    .max(2000, { message: "Please keep your message under 2000 characters." }),
  /**
   * Honeypot field. Real users never fill this (it's visually hidden);
   * bots that auto-fill every input will, so a non-empty value = spam.
   */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
