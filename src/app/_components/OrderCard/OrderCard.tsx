"use client";
import { useState } from "react";
import Image from "next/image";
import { BsBoxFill } from "react-icons/bs";
import { FaLocationDot, FaReceipt, FaHashtag, FaClock, FaMoneyBill, FaTruck, FaCreditCard } from "react-icons/fa6";
import { FaCalendarAlt, FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { OrderType } from "@/Types/order.type";

interface Props {
  order: OrderType;
}

export default function OrderCard({ order }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  const subtotal = order.cartItems.reduce(
    (acc, item) => acc + item.price * item.count, 0
  );

  const isCard = order.paymentMethodType === "card";
 const isDelivered = order.paymentMethodType === "card";

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              <Image
                src={order.cartItems[0]?.product.imageCover}
                width={90} height={90}
                className="w-full h-full object-contain"
                alt={order.cartItems[0]?.product.title}
              />
            </div>
            {order.cartItems.length > 1 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{order.cartItems.length - 1}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                {/*  Status Badge */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2 ${
                  isDelivered ? "bg-blue-100" : "bg-amber-100"
                }`}>
                  {isDelivered ? (
                    <FaTruck  className="text-xs text-blue-600" />
                  ) : (
                    <FaClock  className="text-xs text-amber-600" />
                  )}
                  <span className={`text-xs font-semibold ${
                    isDelivered ? "text-xs font-light text-blue-600 " : " text-xs font-light text-amber-600"
                  }`}>
                    {isDelivered ? "On the way" : "Processing"}
                  </span>
                </div>

                {/* Order Number */}
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FaHashtag className="text-xs text-gray-400" />
                  {order.id}
                </h3>
              </div>

              {/*  Payment Method Icon */}
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                isCard ? "bg-purple-100" : "bg-gray-100"
              }`}>
                {isCard ? (
                  <FaCreditCard  className="text-purple-600" />
                ) : (
                  <FaMoneyBill className="text-gray-600" />
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-xs text-gray-400" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <BsBoxFill className="text-xs text-gray-400" />
                {order.cartItems.length} {order.cartItems.length === 1 ? "item" : "items"}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <FaLocationDot className="text-xs text-gray-400" />
                {order.shippingAddress.details}
              </span>
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">{order.totalOrderPrice}</span>
                <span className="text-sm font-medium text-gray-400 ml-1">EGP</span>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  showDetails
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showDetails ? "Hide" : "Details"}
                <FaChevronDown className={`text-xs transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      {showDetails && (
        <>
          <div className="border-t border-gray-100 bg-gray-50/50">
            <div className="p-5 sm:p-6">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaReceipt className="text-xs text-global" />
                </div>
                Order Items
              </h4>
              <div className="space-y-3">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                      <Image
                        src={item.product.imageCover}
                        width={48} height={48}
                        className="w-full h-full object-contain"
                        alt={item.product.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium text-gray-700">{item.count}</span> × {item.price} EGP
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-gray-900">{item.count * item.price}</p>
                      <p className="text-xs text-gray-400">EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Address and Order Summary */}
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
            {/* Delivery Address */}
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaLocationDot className="text-xs text-blue-600" />
                </div>
                Delivery Address
              </h4>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{order.shippingAddress.city}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{order.shippingAddress.details}</p>
                <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                  <FaPhoneAlt className="text-xs text-gray-400" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/*  Order Summary */}
            <div className={`p-4 rounded-xl border ${
              isCard ? "bg-blue-50 border-blue-200" : "bg-amber-100 border-amber-200"
            }`}>
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  isCard ? "bg-blue-500" : "bg-amber-500"
                }`}>
                  {isCard ? (
                    <FaTruck  className="text-xs text-white" />
                  ) : (
                    <FaClock className="text-xs text-white" />
                  )}
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">{order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}</span>
                </div>
               
                <hr className="border-gray-200/50 my-2" />
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">{order.totalOrderPrice} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}