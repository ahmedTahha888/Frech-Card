import * as z from "zod";

export const checkoutSchema = z.object({
  city: z.string().min(1, "*City is required"),
  details: z.string().min(1, "*Street address is required"),
  phone: z
    .string("*Please enter your phone number")
    .regex(
      /^(\+20|0)(10|11|12|15)[0-9]{8}$/gm,
      "*Only Egyptian phone numbers are allowed",
    ),
  paymentMethod: z.enum(["cash", "online"]),
});

export type CheckoutType = z.infer<typeof checkoutSchema>;
