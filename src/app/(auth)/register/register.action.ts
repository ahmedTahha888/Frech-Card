"use server"
import { cookies } from "next/headers";
import { registerSchemaType } from "./registerSchema";

export async function registerAction(values : registerSchemaType) {
    const res = await  fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
      body: JSON.stringify(values),
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      }
    })
     if(!res.ok) throw new Error(res.statusText)
            
            const finalRes = await res.json();
           // Cookies
      const myCookie = await cookies()
      myCookie.set("token" , finalRes.token , {
        httpOnly:true,
        expires:60 *60* 24,
      })
          return res.ok
}