import * as z from "zod";


 export  const schema = z.object({
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

  })



  export  type loginSchemaType = z.infer <typeof schema >