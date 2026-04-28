"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import {
  FaInfoCircle,
  FaPhoneAlt,
  FaShieldAlt,
  FaShoppingBag,
} from "react-icons/fa";
import {
  FaCity,
  FaCreditCard,
  FaHouse,
  FaLocationDot,
  FaMoneyBill,
  FaTruck,
  FaWallet,
} from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { BsBox2HeartFill } from "react-icons/bs";
import image1 from "@/images/visa.png";
import image2 from "@/images/mastercard.png";
import image3 from "@/images/amex.png";
import Image from "next/image";

import { useContext, useState } from "react";
import {
  checkoutSchema,
  CheckoutType,
} from "@/app/(pages)/payment/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressType } from "@/Types/order.type";
import { createCashOrder, createVisaOrder } from "@/app/_actions/Order.action";
import { cardContext } from "@/app/_context/CardContextProvider";
import { CardItemType } from "@/Types/card.type";
import StaticPayment from "../StaticPayment/StaticPayment";
import EmptyCheckOut from "../EmptyCheckOut/EmptyCheckOut";
import { toast } from "sonner";

export default function FormAboutPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cartId,
    setCartId,
    totalPrice,
    cartProduct,
    setTotalPrice,
    setCartProduct,
  } = useContext(cardContext);

  const { control, handleSubmit } = useForm<CheckoutType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  async function handelCheckOut(data: CheckoutType) {
    console.log("cartId ==>", cartId);
    console.log(data);
    setIsLoading(true);

    const userCart: shippingAddressType = {
      shippingAddress: {
        city: data.city,
        details: data.details,
        phone: data.phone,
      },
    };

    if (data.paymentMethod == "cash") {
      const res = await createCashOrder(cartId!, userCart);
      console.log("Order Payment cash", res);
      console.log("cartIdfromorder ==>", cartId);

      if (res.status == "success") {
        setCartId(res.cartId);
        setCartProduct([]);
        setTotalPrice(0);
        console.log("res to order");

        toast.success("Order placed successfully! 🎉", {
          position: "top-center",
          richColors: true,
        });
      } else {
        toast.error("Something went wrong, please try again!", {
          position: "top-center",
          richColors: true,
        });
        setIsLoading(false);
      }
    } else if (data.paymentMethod == "online") {
      const res = await createVisaOrder(cartId!, userCart);
      console.log("Order Payment Online", res);

      if (res.status == "success") {
        window.open(res.session.url);
        setCartId(res.cartId);
        setCartProduct([]);
        setTotalPrice(0);

        toast.success("Order placed successfully! 🎉", {
          position: "top-center",
          richColors: true,
        });
      } else {
        toast.error("Something went wrong, please try again!", {
          position: "top-center",
          richColors: true,
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {cartProduct && cartProduct.length > 0 ? (
        <>
          <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
            <StaticPayment />

            <form onSubmit={handleSubmit(handelCheckOut)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-global to-green-700 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FaHouse />
                        Shipping Address
                      </h2>
                      <p className="text-green-100 text-sm mt-1">
                        Where should we deliver your order?
                      </p>
                    </div>
                    <div className="p-6 space-y-5">
                      {/* Delivery Information */}
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <FaInfoCircle className="text-blue-600 text-sm" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-800 font-medium">
                            Delivery Information
                          </p>
                          <p className="text-xs text-blue-600 mt-0.5">
                            Please ensure your address is accurate for smooth
                            delivery
                          </p>
                        </div>
                      </div>
                      {/* Start Form */}
                      {/* City */}
                      <div className="mb-7">
                        <Controller
                          name="city"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                City <span className="text-red-500">*</span>
                              </FieldLabel>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-gray-400 bg-gray-100 flex items-center justify-center">
                                  <FaCity size={20} />
                                </span>
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="e.g. Cairo, Alexandria, Giza"
                                  autoComplete="off"
                                  className="w-full px-4 py-6 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>

                      {/* Street Address */}
                      <div className="mb-7">
                        <Controller
                          name="details"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Street Address{" "}
                                <span className="text-red-500">*</span>
                              </FieldLabel>
                              <div className="relative">
                                <span className="absolute left-4 top-[31%] -translate-y-1/2 w-8 h-8 rounded-lg text-gray-400 bg-gray-100 flex items-center justify-center">
                                  <FaLocationDot size={20} />
                                </span>
                                <Textarea
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Street name, building number, floor, apartment..."
                                  autoComplete="off"
                                  rows={3}
                                  className="w-full px-4 py-6 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="mb-7">
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor={field.name}>
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                              </FieldLabel>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-gray-400 bg-gray-100 flex items-center justify-center">
                                  <FaPhoneAlt size={20} />
                                </span>
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="01xxxxxxxxx"
                                  autoComplete="off"
                                  className="w-full px-4 py-6 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                />
                                <p className="absolute right-4 top-5 text-xs text-gray-400 text-right">
                                  Egyptian numbers only
                                </p>
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-global to-green-700 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FaWallet />
                        Payment Method
                      </h2>
                      <p className="text-green-100 text-sm mt-1">
                        Choose how you&apos;d like to pay
                      </p>
                    </div>
                    <div className="p-6 space-y-4">
                      <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <div className="space-y-3">
                              {/* Cash on Delivery */}
                              <label
                                htmlFor="cash-on-delivery"
                                className={`group/card w-full p-5 cursor-pointer rounded-xl border-2 transition-all flex items-center gap-4 ${
                                  field.value === "cash"
                                    ? "border-global bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
                                    : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                                }`}
                              >
                                <div
                                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                    field.value === "cash"
                                      ? "bg-gradient-to-br from-global to-green-600 text-white shadow-lg shadow-global/30"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  <FaMoneyBill className="text-xl" />
                                </div>
                                <div className="flex-1 text-left">
                                  <h3 className="font-bold text-gray-900">
                                    Cash on Delivery
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-0.5">
                                    Pay when your order arrives at your doorstep
                                  </p>
                                </div>
                                <Checkbox
                                  id="cash-on-delivery"
                                  checked={field.value === "cash"}
                                  onCheckedChange={() => field.onChange("cash")}
                                />
                              </label>

                              {/* Pay Online */}
                              <label
                                htmlFor="pay-online"
                                className={`group/card w-full p-5 cursor-pointer rounded-xl border-2 transition-all flex items-center gap-4 ${
                                  field.value === "online"
                                    ? "border-global bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
                                    : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                                }`}
                              >
                                <div
                                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                                    field.value === "online"
                                      ? "bg-gradient-to-br from-global to-blue-600 text-white shadow-lg shadow-global/30"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  <FaCreditCard className="text-xl" />
                                </div>
                                <div className="flex-1 text-left">
                                  <h3 className="font-bold text-gray-900">
                                    Pay Online
                                  </h3>
                                  <p className="text-sm text-gray-500 mt-0.5">
                                    Secure payment with Credit/Debit Card via
                                    Stripe
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Image
                                      src={image1}
                                      width={20}
                                      height={20}
                                      alt="visa"
                                    />
                                    <Image
                                      src={image2}
                                      width={20}
                                      height={20}
                                      alt="mastercard"
                                    />
                                    <Image
                                      src={image3}
                                      width={20}
                                      height={20}
                                      alt="amex"
                                    />
                                  </div>
                                </div>
                                <Checkbox
                                  id="pay-online"
                                  checked={field.value === "online"}
                                  onCheckedChange={() =>
                                    field.onChange("online")
                                  }
                                />
                              </label>

                              {/* Error Message */}
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </div>
                          </Field>
                        )}
                      />
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <FaShieldAlt className="text-global" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Secure & Encrypted
                          </p>
                          <p className="text-xs text-green-600 mt-0.5">
                            Your payment info is protected with 256-bit SSL
                            encryption
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* side left */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FaShoppingBag />
                        Order Summary
                      </h2>
                      <p className="text-green-100 text-sm mt-1">3 items</p>
                    </div>

                    <div className="p-5">
                      <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                        {cartProduct.map((cart: CardItemType) => (
                          <div
                            key={cart.product.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            {/* image */}
                            <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                              <Image
                                src={cart.product.imageCover}
                                width={56}
                                height={56}
                                className="w-full h-full object-contain"
                                alt={cart.product.title}
                              />
                            </div>
                            {/* content */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {cart.product.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {cart.count} × {cart.price} EGP
                              </p>
                            </div>
                            <div className="text-sm font-bold text-gray-900 shrink-0">
                              {cart.count * cart.price}
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr className="border-gray-100 my-4" />
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-medium">{totalPrice} EGP</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span className="flex items-center gap-2">
                            <FaTruck className="text-green-600" />
                            Shipping
                          </span>
                          <span className="font-medium text-global">Free</span>
                        </div>
                        <hr className="border-gray-100" />
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">
                            Total
                          </span>
                          <div>
                            <span className="text-2xl font-bold text-global">
                              {totalPrice}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              EGP
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 active:scale-[0.98]
                          ${isLoading ? "opacity-70 cursor-not-allowed from-green-700 to-green-800" : "hover:from-green-700 hover:to-green-800"}`}
                      >
                        {isLoading ? (
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
                            Placing Order...
                          </>
                        ) : (
                          <>
                            <BsBox2HeartFill />
                            Place Order
                          </>
                        )}
                      </button>
                      <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <FaShieldAlt className="text-global" />
                          <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <FaTruck className="text-blue-500" />
                          <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <BsBox2HeartFill className="text-orange-500" />
                          <span>Easy Returns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <EmptyCheckOut />
      )}
    </>
  );
}
