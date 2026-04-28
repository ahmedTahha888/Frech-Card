import * as z from "zod";


 export  const schema = z.object({
     name: z
        .string("*Full name is required.")
        .min(3, "*Full name is required.")
        .max(15, "15 maximum later"),
      email: z
        .email("*Email is required.")
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "*Please enter a valid email address.",
        ),
        password: z
        .string("*Password is required.")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "*Password must include uppercase, lowercase, number, and special character.",
        ),
      rePassword: z
        .string("*Password is required.")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "*Password must include uppercase, lowercase, number, and special character.",
        ),
        phone: z
        .string("*Please enter your phone number")
        .regex(/^(\+20|0)(10|11|12|15)[0-9]{8}$/gm , 
          "*Only Egyptian phone numbers are allowed"
        ),
  }).refine((value) => value.password === value.rePassword, {
      message: "Passwords do not match rePassword",
      path: ["rePassword"],
    });



  export  type registerSchemaType = z.infer <typeof schema >