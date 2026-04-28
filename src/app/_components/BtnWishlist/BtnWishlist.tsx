import React from "react";
import { FaCartShopping, FaCheck } from "react-icons/fa6";

interface BtnWishlistProps {
  isInCart: boolean;
  isLoading: boolean;
  onAddToCart: () => void;
  onViewCart: () => void;
}

export default function BtnWishlist({
  isInCart,
  isLoading,
  onAddToCart,
  onViewCart,
}: BtnWishlistProps) {
  //  In Cart State
  if (isInCart) {
    return (
      <button
        onClick={onViewCart}
        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        <FaCheck className="text-xs" />
        <span>View Cart</span>
      </button>
    );
  }

  //  Loading State
  if (isLoading) {
    return (
      <button
        disabled
        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-500 text-white opacity-70 cursor-not-allowed"
      >
        <span className="animate-pulse">Added!</span>
      </button>
    );
  }

  //  Default State
  return (
    <button
      onClick={onAddToCart}
      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700"
    >
      <FaCartShopping className="text-xs" />
      <span className="md:hidden lg:inline">Add to Cart</span>
    </button>
  );
}