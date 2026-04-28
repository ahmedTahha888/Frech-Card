

"use client";

import React, { ReactNode, createContext, useState } from "react";
import { CardItemType, CardType } from "@/Types/card.type";
import { WishlistItemType, WishlistType } from "@/Types/wishlist.type";

type CardContextType = {
  // cart
  cartId: string | undefined;
  setCartId: React.Dispatch<React.SetStateAction<string | undefined>>;
  numberOfCardItem: number;
  setNumberOfCardItem: React.Dispatch<React.SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  cartProduct: CardItemType[];
  setCartProduct: React.Dispatch<React.SetStateAction<CardItemType[]>>;

  // wishlist
  wishlistProduct: WishlistItemType[];
  setWishlistProduct: React.Dispatch<React.SetStateAction<WishlistItemType[]>>;
  numberOfWishlistItem: number;
  setNumberOfWishlistItem: React.Dispatch<React.SetStateAction<number>>;
  wishlistIds: string[];
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const cardContext = createContext<CardContextType>({} as CardContextType);

export default function CardContextProvider({
  children,
  userData,
  userWishlist,
}: {
  children: ReactNode;
  userData: CardType | null;
  userWishlist: WishlistType | null;
}) {
  const [cartId, setCartId] = useState(userData?.cartId);
  const [numberOfCardItem, setNumberOfCardItem] = useState(userData?.numOfCartItems ?? 0);
  const [totalPrice, setTotalPrice] = useState(userData?.data?.totalCartPrice ?? 0);
  const [cartProduct, setCartProduct] = useState<CardItemType[]>(userData?.data?.products ?? []);

  const [wishlistProduct, setWishlistProduct] = useState<WishlistItemType[]>(userWishlist?.data ?? []);
  const [numberOfWishlistItem, setNumberOfWishlistItem] = useState<number>(userWishlist?.count ?? 0);
 const [wishlistIds, setWishlistIds] = useState<string[]>(
  userWishlist?.data?.map((item) => item.id as string) ?? []
);

  return (
    <cardContext.Provider
      value={{
        cartId, setCartId,
        numberOfCardItem, setNumberOfCardItem,
        totalPrice, setTotalPrice,
        cartProduct, setCartProduct,
        wishlistProduct, setWishlistProduct,
        numberOfWishlistItem, setNumberOfWishlistItem,
        wishlistIds, setWishlistIds,
      }}
    >
      {children}
    </cardContext.Provider>
  );
}