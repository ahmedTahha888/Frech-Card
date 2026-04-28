"use server"
import { cookies } from "next/headers";
import { loginSchemaType } from "./loginSchema";

export async function loginAction (values : loginSchemaType){
     const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              body: JSON.stringify(values),
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const finalRes = await res.json();
          console.log(finalRes);
          
          
          
          if(!res.ok) throw new Error(res.statusText)
            

            // Cookies
      const myCookie = await cookies()
      myCookie.set("token" , finalRes.token , {
        httpOnly:true,
        expires:60 *60* 24,
      })
      
          return res.ok
         
}