"use server";


import { WishlistType } from "@/Types/wishlist.type";
import { getMyToken } from "@/utils/getMyToken";




//======================== Add Product Card=============================================
export async function AddProductToWishlist(id: string): Promise<WishlistType> {
  const token = await getMyToken();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId: id }),

    headers: {
      "Content-Type": "application/json",

      token: token as string,
    },
  });

  const finalRes = await res.json();
  console.log("finalRes from add to wishlist===>", finalRes);


  return finalRes;
}







//======================== Get  Wishlist=============================================
export async function getUserWishlist(): Promise<WishlistType | null> {
  const token = await getMyToken();
  if (!token) return null;

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: token as string,
    },
  });

    const finalRes = await res.json();
  console.log("finalResWishlist===>", finalRes);
  return finalRes;
}






//======================== Delete Wishlist=============================================
export async function deleteWishlist(productId: string): Promise<WishlistType> {
  const token = await getMyToken();

  const res = await fetch(
  // https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
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