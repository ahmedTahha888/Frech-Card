"use client";
import React, { useContext, useState } from "react";
import { FaShareAlt, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaBolt,
  FaRegHeart,
  FaTruck,
} from "react-icons/fa6";
import Rating from "../Rating/Rating";
import { ProductType } from "@/Types/product.types";
import { cardContext } from "@/app/_context/CardContextProvider";
import { AddProductToCard } from "@/app/_actions/Card.actions";
import BtnAddToWishlist from "../BtnAddToWishlist/BtnAddToWishlist";

export default function DetailsProduct({ product }: { product: ProductType }) {
  const { cartProduct, setCartProduct, setNumberOfCardItem, setTotalPrice } =
    useContext(cardContext);

  const cartItem = cartProduct.find(
    (item: { product: { id: string } }) => item.product.id === product.id,
  );
  const productCount = cartItem?.count ?? 1;

  const [quantity, setQuantity] = useState(productCount);
  const [isLoading, setIsLoading] = useState(false);
  // Increase
  const handleIncrease = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) return null;

  const handleAddToCart = async () => {
    setIsLoading(true);
    const res = await AddProductToCard(product.id);

    if (res.status === "success") {
      setCartProduct(res.data.products);
      setNumberOfCardItem(res.numOfCartItems);
      setTotalPrice(res.data.totalCartPrice);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="lg:w-3/4">
        <div className="bg-white mb-4 rounded-xl shadow-sm p-6">
          {/* top span */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-50 text-global text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition">
              {product.category.name}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              {product.brand.name}
            </span>
          </div>

          {/* title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            {product.title}
          </h3>

          {/* rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="star text-yellow-400">
              <Rating rating={product.ratingsAverage} />
            </div>
            <span className="text-sm text-gray-600">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* salary */}
          <div className="flex items-center flex-wrap gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {product.priceAfterDiscount || product.price} EGP
            </span>
            {product.priceAfterDiscount ? (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {product.price} EGP
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                      100,
                  )}
                  %
                </span>
              </>
            ) : null}
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              In Stock
            </span>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-5 mb-6">
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-global transition disabled:opacity-50 text-2xl"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min={1}
                  max={200}
                  className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= product.quantity}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-global transition disabled:opacity-50 text-2xl"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.quantity} available
              </span>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Price:</span>
              <span className="text-2xl font-bold text-global">
                {(product.priceAfterDiscount || product.price) * quantity}
                EGP
              </span>
            </div>
          </div>

          {/* Button Buy */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              id="add-to-cart"
              className={`flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green/25 bg-global
              ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
              `}
            >
              <span>
                <FaShoppingCart />
              </span>
              <span>{isLoading ? "Adding..." : "Add To Cart"}</span>
            </button>
            <button
              id="buy-now"
              className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>
                <FaBolt />
              </span>
              <span>Buy Now</span>
            </button>
          </div>

          {/* Button Add to Wishlist */}
          <div className="flex gap-3 mb-6">
            <BtnAddToWishlist
              productId={product.id}
              className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-global hover:text-global"
              showLabel
            >
              <>
                <FaRegHeart />
                <span>Add to Wishlist</span>
              </>
            </BtnAddToWishlist>
            <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition">
              <span>
                <FaShareAlt />
              </span>
            </button>
          </div>

          {/* services */}
          <div className="border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* card 1 */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#DCFCE7]  text-global rounded-full flex items-center justify-center shrink-0">
                  <FaTruck />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Free Delivery
                  </h4>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>

              {/* card 2 */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#DCFCE7]  text-global rounded-full flex items-center justify-center shrink-0">
                  <FaArrowRotateLeft />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Free Delivery
                  </h4>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>

              {/* card 3 */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#DCFCE7]  text-global rounded-full flex items-center justify-center shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Free Delivery
                  </h4>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
