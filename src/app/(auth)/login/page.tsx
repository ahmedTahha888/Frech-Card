"use client";
import React, { useState } from "react";
import {
  FaClock,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaShieldHalved,
  FaStar,
  FaTruck,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchemaType, schema } from "./loginSchema";
import loginImage from "@/images/imageInLogin.png";
import { MdEmail } from "react-icons/md";
import { loginAction } from "./login.action";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LOgin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  async function handelLogin(values: loginSchemaType) {
    setIsLoading(true);
    try {
      const responseLogin = await signIn("credentials", {
        ...values,
        redirect: false,
        
      });
      console.log(responseLogin);

      if (responseLogin?.ok) {
        toast.success("Sign In Successfully", {
          position: "top-right",
          richColors: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 900);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Registration failed. Please check your details and try again.",
        {
          position: "top-center",
          richColors: true,
        },
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-4 ">
        {/* Left said Login  */}
        <div className="hidden lg:block">
          <div className="text-center mt-36 space-y-6">
            {/* Image */}
            <Image
              width={200}
              height={150}
              src={loginImage}
              className="w-full h-96 rounded-2xl shadow-xl object-cover"
              alt="login illustration"
            />
            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-3xl font-Bold text-[#1E2939]">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h3>
              <p className="text-lg font-Medium text-[#4A5565]">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <FaTruck className="text-global size-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldHalved className="text-global size-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-global size-4" />
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white py-10 px-6 shadow-md rounded-lg">
          <h3 className="text-3xl font-semibold text-[#364153] text-center mb-2">
            <span className="text-global">Fresh</span>
            Cart
          </h3>
          <h3 className="text-3xl font-semibold text-[#364153] text-center mb-2">
            Welcome Back!
          </h3>
          <p className="font-Medium text-base text-center text-[#364153] mb-6">
            Sign in to continue your fresh shopping experience
          </p>
          {/* Login Option */}
          <div>
            <div className="mb-3">
              <button className="flex items-center justify-center gap-3 hover:bg-[#F0FDF4]  hover:border-green-500 py-3 transition-all duration-200 border cursor-pointer rounded-md px-4 w-full ">
                <FaGoogle className="text-red-600" />
                <span className="font-SemiBold">Continue with Google</span>
              </button>
            </div>

            <div>
              <button className="flex items-center justify-center gap-3 hover:bg-[#F0FDF4] hover:border-green-500 py-3 transition-all duration-200 border cursor-pointer rounded-md px-4 w-full ">
                <FaFacebook className="text-blue-600" />
                <span className="font-SemiBold">Continue with Facebook</span>
              </button>
            </div>
          </div>

          {/* Line or */}
          <div className="flex items-center gap-3">
            <div className=" relative w-1/2 h-0.5 bg-gray-300/30 my-4 flex items-center "></div>
            <span>or</span>{" "}
            <div className=" relative w-1/2 h-0.5 bg-gray-300/30 my-4 flex items-center "></div>
          </div>

          <form className="form" onSubmit={handleSubmit(handelLogin)}>
            {/* Email */}
            <div className="mb-7 relative">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <MdEmail size={20} />
                      </span>{" "}
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="ali@example.com"
                        autoComplete="off"
                        className="pl-10"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Password */}
            <div className="mb-7 relative">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FaLock size={19} />
                      </span>{" "}
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                        type="password"
                        className="pl-10"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* check box */}
            <div className="mb-7">
              <input
                id="terms"
                className="size-4 me-4 cursor-pointer"
                type="checkbox"
              />
              <label htmlFor="terms" className="font-medium text-base">
                Keep me signed in
              </label>
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 mb-7 py-3 px-4 text-white  bg-global hover:bg-green-700 transition-all duration-200 rounded-md cursor-pointer"
            >
              {isLoading ? (
                <span className="flex gap-3">
                  <Spinner className="size-6" /> Loading...
                </span>
              ) : (
                <>
                  <FaUserPlus className="text-lg" />
                  <span className="text-base font-semibold">Sign In</span>
                </>
              )}
            </button>
          </form>
          <div className="text-center mt-8 pt-6 border-t border-gray-100 ">
            <p className="text-center" mt-3>
              <span className="font-medium text-base text-[#4A5565]">
                New to FreshCart?
              </span>

              <Link
                href="/register"
                className="text-global text-base font-SemiBold ms-2"
              >
                Create an account
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FaLock className="text-[#6A7282]" />
              <span className="font-medium text-xs text-[#6A7282]">
                SSL Secured
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-[#6A7282]" />
              <span className="font-medium text-xs text-[#6A7282]">
                50K+ Users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-[#6A7282]" />
              <span className="font-medium text-xs text-[#6A7282]">
                4.9 Rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
