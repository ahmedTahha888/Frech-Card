"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  FaCartShopping,
  FaLock,
  FaTag,
  FaTrash,
  FaTruck,
} from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import Image from "next/image";
import { FaShieldAlt, FaShoppingBag } from "react-icons/fa";
import { cardContext } from "../_context/CardContextProvider";
import { CardItemType } from "@/Types/card.type";
import EmptyCardData from "../_components/EmptyCardData/EmptyCardData";
import {
  deleteAllCart,
  deleteCart,
  updateProductToCard,
} from "../_actions/Card.actions";
import Swal from "sweetalert2";

export default function CardData() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const {
    numberOfCardItem,
    cartProduct,
    totalPrice,
    setNumberOfCardItem,
    setTotalPrice,
    setCartProduct,
  } = useContext(cardContext);

  // Delete Card
  async function handelDeleteCard(id: string) {
    setLoadingId(id);
    const res = await deleteCart(id);
    setCartProduct(res.data.products);
    setTotalPrice(res.data.totalCartPrice);
    setNumberOfCardItem(res.numOfCartItems);
    setLoadingId(null);
  }
  // Update Card
  async function handelUpdateCard(id: string, count: number) {
    setLoadingId(id);
    const res = await updateProductToCard(id, count);
    console.log(res);

    if (res.status == "success") {
      setCartProduct(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      setNumberOfCardItem(res.numOfCartItems);
    }
    setLoadingId(null);
  }

  // ===========Delete All Cards==============
  async function handelDeleteAllCards() {
    const result = await Swal.fire({
      title: "Clear Your Cart?",
      text: "All items will be removed from your cart. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Clear All",
      cancelButtonText: "Keep Shopping",
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#E5E7EB",
    });
    if (result.isConfirmed) {
      const res = await deleteAllCart();
      setCartProduct(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      setNumberOfCardItem(res.numOfCartItems);
      Swal.fire({
        title: "Cart Cleared!",
        text: "Your cart is now empty.",
        icon: "success",
        confirmButtonText: "Continue Shopping",
        confirmButtonColor: "#16a34a",
      });
    }
  }

  return (

    <>
    
      {cartProduct && cartProduct.length > 0 ? (
        <div className="bg-gray-50 min-h-screen px-8 py-8">
          <div className=" px-4">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-global transition">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="bg-global text-white w-12 h-12 rounded-xl flex items-center justify-center">
                      <FaCartShopping />
                    </span>
                    Shopping Cart
                  </h1>
                  <p className="text-gray-500 mt-4">
                    You have{" "}
                    <span className="font-semibold text-global">{numberOfCardItem} item </span>in
                    your cart
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
            <div className="lg:col-span-2">
              {cartProduct.map((item: CardItemType) => (
                <div key={item.product.id} className="space-y-4">
                  <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 mb-4 transition-all duration-300 ">
                    {loadingId === item.product.id && (
                      <div className="absolute inset-0 bg-white/70 rounded-2xl z-10 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-global border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    <div className="p-4 sm:p-5">
                      <div className="flex-wrap md:flex gap-4 sm:gap-6">
                        <Link href="/" className="relative shrink-0 group">
                          <div className="w-full h-29 sm:w-32 sm:h-32 rounded-xl bg-gray-100 p-3 border border-gray-100 overflow-hidden">
                            <Image
                              width={102}
                              height={102}
                              src={item.product.imageCover}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                              alt={item.product.title}
                            />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-green-500 text-white text-[10px]  font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <IoMdCheckmark />{" "}
                            <span className="text-xs">In Stock</span>
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="mb-3">
                            <Link href="/" className="title">
                              <h3 className="font-semibold text-gray-900 hover:text-global transition-colors leading-relaxed text-base sm:text-lg">
                                {item.product.title}
                              </h3>
                            </Link>
                            {/* Top Spans */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                {item.product.category.name}
                              </span>
                              <span className="text-xs text-gray-400">.</span>
                              <span className="text-xs text-gray-500">
                                {item.product.brand.name}
                              </span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-global font-bold text-lg">
                                {item.price} EGP
                              </span>
                              <span className="text-xs text-gray-400">
                                per unit
                              </span>
                            </div>
                          </div>

                          {/* Quantity and Total */}
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                            {/* left */}
                            <div className="flex items-center">
                              <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                <button
                                  onClick={() =>
                                    handelUpdateCard(
                                      item.product.id,
                                      item.count - 1,
                                    )
                                  }
                                  disabled={item.count <= 1}
                                  className="h-8 w-8 rounded-lg cursor-pointer bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 text-3xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                                >
                                  -
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900">
                                  {item.count}
                                </span>
                                <button
                                  onClick={() =>
                                    handelUpdateCard(
                                      item.product.id,
                                      item.count + 1,
                                    )
                                  }
                                  className="h-8 w-8 rounded-lg cursor-pointer bg-global shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-2xl"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            {/* right */}
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="text-xs text-gray-400  mb-0.5">
                                  Total
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  {item.price * item.count}
                                  <span className="text-sm font-medium text-gray-400">
                                    {" "}
                                    EGP
                                  </span>
                                </p>
                              </div>
                              {/* Btn Delete Product */}
                              <button
                                onClick={() =>
                                  handelDeleteCard(item.product.id)
                                }
                                title="Remove item"
                                className="w-10 h-10 flex justify-center  items-center border rounded-xl text-red-500 border-red-200 bg-red-50 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Links Shop and Clear */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-global hover:text-green-700 font-medium text-sm flex items-center gap-2"
                >
                  <span>←</span> Continue Shopping
                </Link>
                <button
                  onClick={() => handelDeleteAllCards()}
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  <FaTrash /> <span>Clear all items</span>
                </button>
              </div>
            </div>
            {/* Order  */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                <div className="bg-gradient-to-r from-global to-green-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaShoppingBag />
                    Order Summary
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    {numberOfCardItem} item in your cart
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaTruck className="text-orange-500 text-lg" />
                      <span className="text-sm font-medium text-gray-700">
                        Add 1 EGP for free shipping
                      </span>
                    </div>
                    {/* bar */}
                    <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"></div>
                    </div>
                  </div>
                  {/* Salary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {totalPrice} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-green-700">Free</span>
                    </div>
                    {/* Total */}
                    <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-900 font-semibold">
                          Total
                        </span>
                        <div className="right total">
                          <span className="text-2xl font-bold text-gray-900">
                            {totalPrice}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Apply Promo Code */}
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-global hover:bg-green-50/50 transition-all">
                    <FaTag />
                    <span className="text-sm font-medium">
                      Apply Promo Code
                    </span>
                  </button>
                  <Link
                    href="/payment"
                    onClick={() => setIsNavigating(true)}
                    className={`w-full bg-gradient-to-r from-global to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20
    ${
      isNavigating
        ? "opacity-70 pointer-events-none from-green-700 to-green-800"
        : "hover:from-green-700 hover:to-green-800 active:scale-[0.98]"
    }`}
                  >
                    {isNavigating ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <FaLock />
                        <span>Secure Checkout</span>
                      </>
                    )}
                  </Link>
                  <p className="text-xs text-gray-400 text-center">
                    Don&apos;t have an account?
                    <Link href="/login" className="text-global hover:underline">
                      Sign Up
                    </Link>
                  </p>

                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaShieldAlt className="text-global" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaTruck className="text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                  <Link
                    href="/"
                    className="block text-center text-global hover:text-green-700 text-sm font-medium py-2"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCardData />
      )}
    </>
  );
}
