"use server"
import { OrderType, shippingAddressType } from "@/Types/order.type";
import { getMyToken } from "@/utils/getMyToken";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/nextAuth.config";




// ============================Cash Order======================================================
export async function createCashOrder( cartId : string , shippingAddress : shippingAddressType ){

    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}` , {
        cache: "no-store",
        headers:{
            token :token as string,
            "Content-Type" : "application/json"
        },
        method: "POST",
        body:JSON.stringify(shippingAddress),
        
    })
 
    const finalRes = await res.json()

    return finalRes

}

// ============================Online Or Visa Order======================================================
export async function createVisaOrder( cartId : string , shippingAddress : shippingAddressType ){
  const baseUrl = process.env.NEXTAUTH_URL_PRODUCTION ?? process.env.NEXTAUTH_URL;

    const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}` , {
        cache: "no-store",
        headers:{
            token :token as string,
            "Content-Type" : "application/json"
        },
        method: "POST",
        body:JSON.stringify(shippingAddress),
        
    })
 
    const finalRes = await res.json()

    return finalRes

}


// ============================Get User Orders======================================================


export async function getUserOrders(): Promise<OrderType[] | null> {
  const session = await getServerSession(nextAuthConfig)
  if (!session?.user?.id) return null
  console.log("session =>", session)
console.log("user id =>", session?.user?.id)

  try {
    const res = await fetch(
      `${process.env.API}orders/user/${session.user.id}`,
      { cache: 'no-store' }
    )
    const finalRes: OrderType[] = await res.json()
return finalRes
  } catch (err) {
    console.log(err)
    return null
  }
}
