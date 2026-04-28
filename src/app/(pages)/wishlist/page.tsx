// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaHeart, FaTrash } from "react-icons/fa6";
// import { useContext } from "react";
// import { cardContext } from "@/app/_context/CardContextProvider";
// import { WishlistItemType } from "@/Types/wishlist.type";
// import BtnWishlist from "@/app/_components/BtnWishlist/BtnWishlist";

// export default function Wishlist() {

//   const {wishlistProduct , numberOfWishlistItem} = useContext(cardContext)

//   return (
//     <div className="min-h-screen bg-gray-50/50">
//         <div className="bg-white border-b border-gray-100">
//             <div className="px-4 py-8">
//                 <header className="flex items-center gap-2 text-sm text-gray-500 mb-4">
//                     <Link href='/' className="hover:text-global transition-colors">Home</Link>
//                     <span> /</span>
//                     <span className="text-gray-900 font-medium">Wishlist</span>
//                 </header>

//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
//                             <FaHeart className="text-xl text-red-500"/>
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900"> My Wishlist</h1>
//                                 <p className="text-gray-500 text-sm">{numberOfWishlistItem} item saved</p>
//                             </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {/* view product in wishlist */}
//         <div className="px-4 py-8">
//             <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//                 <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
//                     <div className="col-span-6">Product</div>
//                     <div className="col-span-2 text-center">Price</div>
//                     <div className="col-span-2 text-center">Status</div>
//                     <div className="col-span-2 text-center">Actions</div>
//                 </div>
//                 <div className="divide-y divide-gray-100">

//                    {wishlistProduct.map(  (item : WishlistItemType)=> <>
//                      <div  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">

//                         {/* image */}
//                         <div className="md:col-span-6 flex items-center gap-4">
//                             <Link  href={`/product/${item.id}`} className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
//                             <Image src={item.imageCover} width={80} height={80} className="w-full h-full object-contain p-2" alt={item.title}/>
//                             </Link>
//                             <div className="min-w-0">
//                                 <Link  href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-global transition-colors line-clamp-2">{item.title}</Link>
//                                 <p className="text-sm text-gray-400 mt-1">{item.category.name}</p>
//                             </div>
//                         </div>

//                         {/* price */}
//                         <div className="md:col-span-2 flex md:justify-center items-center gap-2">
//                             <span className="md:hidden text-sm text-gray-500">Price:</span>
//                             <div className="text-right md:text-center">
//                                 <div className="font-semibold text-gray-900">{item.price} EGP</div>
//                             </div>
//                         </div>

//                         {/* Status */}
//                         <div className="md:col-span-2 flex md:justify-center">
//                             <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
//                                 In Stock
//                             </span>
//                         </div>

//                         {/* Actions */}
//                         <div className="md:col-span-2 flex items-center gap-2 md:justify-center">

//                            <BtnWishlist/>

//                             <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50" title="Remove">
//                                 <FaTrash className="text-sm" />
//                             </button>
//                         </div>
//                     </div>

//                    </> )}

//                 </div>
//             </div>
//             {/* Btn Back To Shopping */}
//             <div className="mt-8 flex items-center justify-between">
//                 <Link href='/shop' className="text-gray-500 hover:text-global text-sm font-medium transition-colors">← Continue Shopping</Link>
//             </div>
//         </div>

//     </div>
//   )
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCartShopping, FaHeart, FaTrash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { cardContext } from "@/app/_context/CardContextProvider";
import { WishlistItemType } from "@/Types/wishlist.type";
import BtnWishlist from "@/app/_components/BtnWishlist/BtnWishlist";
import { AddProductToCard } from "@/app/_actions/Card.actions";
import {
  deleteWishlist,
  getUserWishlist,
} from "@/app/_actions/wishlist.action";
import { Spinner } from "@/components/ui/spinner";
import EmptyWishlist from "@/app/_components/EmptyWishlist/EmptyWishlist";

export default function Wishlist() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const {
    wishlistProduct,
    numberOfWishlistItem,
    cartProduct,
    setCartProduct,
    setNumberOfCardItem,
    setTotalPrice,
    setCartId,
    setWishlistProduct,
    setNumberOfWishlistItem,
    setWishlistIds,
  } = useContext(cardContext);

  const { mutate, isPending, variables } = useMutation({
    mutationFn: AddProductToCard,
    onSuccess: async (res) => {
      toast.success(res.message, { position: "top-center", richColors: true });
      setCartId(res.cartId);
      setNumberOfCardItem(res.numOfCartItems);
      setCartProduct(res.data.products);
      setTotalPrice(res.data.totalCartPrice);

      
      const wishlist = await getUserWishlist();
      if (wishlist) setWishlistProduct(wishlist.data);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  const isInCart = (id: string) =>
    cartProduct?.some((cartItem) => cartItem.product.id === id);

  const {
    mutate: deleteFromWishlist,
    isPending: isDeleting,
    variables: deletingId,
  } = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: (res) => {
      toast.success("Product removed from wishlist", {
        position: "top-center",
        richColors: true,
      });
      setWishlistProduct((prev) =>
        prev.filter((item) => (res.data as any).includes(item.id)),
      );
      setNumberOfWishlistItem(res.data.length);
      setWishlistIds(res.data as any);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  return (
    <>
      {wishlistProduct && wishlistProduct.length > 0 ? (
        <div className="min-h-screen bg-gray-50/50">
          {/* Header */}
          <div className="bg-white border-b border-gray-100">
            <div className="px-4 py-8">
              <header className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-global transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Wishlist</span>
              </header>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <FaHeart className="text-xl text-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      My Wishlist
                    </h1>
                    <p className="text-gray-500 text-sm">
                      {numberOfWishlistItem} item saved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              <div className="divide-y divide-gray-100">
                {wishlistProduct?.length === 0 ? (
                  <p className="p-6 text-gray-500">No items in wishlist</p>
                ) : (
                  wishlistProduct.map((item: WishlistItemType) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link
                          href={`/product/${item.id}`}
                          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                        >
                          <Image
                            src={item.imageCover}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain p-2"
                            alt={item.title}
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            href={`/product/${item.id}`}
                            className="font-medium text-gray-900 hover:text-global transition-colors line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="text-sm text-gray-400 mt-1">
                            {item.category.name}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                        <span className="md:hidden text-sm text-gray-500">
                          Price:
                        </span>
                        <div className="text-center">
                          {item.priceAfterDiscount ? (
                            <>
                              <div className="font-semibold text-gray-900">
                                {item.priceAfterDiscount} EGP
                              </div>
                              <div className="text-sm text-gray-400 line-through">
                                {item.price} EGP
                              </div>
                            </>
                          ) : (
                            <div className="font-semibold text-gray-900">
                              {item.price} EGP
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2 flex md:justify-center">
                        {isInCart(item.id) ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            <FaCartShopping className="text-xs" />
                            In Cart
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                        {/* Btn Add To Cart */}
                        <BtnWishlist
                          isInCart={isInCart(item.id)}
                          isLoading={isPending && variables === item.id}
                          onAddToCart={() => mutate(item.id)}
                          onViewCart={() => router.push("/cart")}
                        />

                        {/* Btn Delete */}
                        <button
                          onClick={() => deleteFromWishlist(item.id)}
                          disabled={isDeleting && deletingId === item.id}
                          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                          title="Remove"
                        >
                          {isDeleting && deletingId === item.id ? (
                            <Spinner className="size-4 animate-spin" />
                          ) : (
                            <FaTrash className="text-sm" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/shop"
                className="text-gray-500 hover:text-global text-sm font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </>
  );
}
