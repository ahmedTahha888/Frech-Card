"use server";

import { CardType } from "@/Types/card.type";
import { getMyToken } from "@/utils/getMyToken";

//======================== Add Product Card=============================================
export async function AddProductToCard(id: string): Promise<CardType> {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),

    headers: {
      "Content-Type": "application/json",

      token: token as string,
    },
  });

  const finalRes = await res.json();

  // console.log("finalRes", finalRes);
  return finalRes;
}

//======================== Get  Card=============================================
export async function getUserCart(): Promise<CardType | null> {
  const token = await getMyToken();
  if (!token) return null;

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token: token as string,
    },
  });

  const finalRes = await res.json();
  // console.log("finalRes", finalRes);
  return finalRes;
}

//======================== Delete Card=============================================
export async function deleteCart(productId: string): Promise<CardType> {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      headers: {
        token: token as string,
      },
      method: "DELETE",
    },
  );

  const finalRes = res.json();
  // console.log("finalRes", finalRes);
  return finalRes;
}

//======================== Update Card=============================================
export async function updateProductToCard(
  id: string,
  count: number,
): Promise<CardType> {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify({ count }),

    headers: {
      "Content-Type": "application/json",

      token: token as string,
    },
  });

  const finalRes = await res.json();

  // console.log("finalRes", finalRes);
  return finalRes;
}

//======================== Delete All  Card=============================================
export async function deleteAllCart(): Promise<CardType> {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token: token as string,
    },
    method: "DELETE",
  });

  const finalRes = res.json();
  // console.log("finalRes", finalRes);
  return finalRes;
}
