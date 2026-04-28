"use client";
import React, { useState } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaShieldHalved,
  FaStar,
  FaTruckFast,
  FaUserPlus,
} from "react-icons/fa6";
import { Spinner } from "@/components/ui/spinner"
import ImgReview from "@/images/imgReveiw.png";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchemaType, schema } from "./registerSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "./register.action";
export default function Register() {
  const[isLoading , setIsLoading] = useState(false)
 const router = useRouter()
  const { control, handleSubmit } = useForm <registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

 async function handelRegister(values : registerSchemaType) {
    setIsLoading(true)
  try {
  const registerRes = await  registerAction(values)
        if(registerRes){
          toast.success("Sign Up Successfully", {
            position: "top-right",
            richColors : true,
          })
          setTimeout(()=>{
            router.push("/login")  

          }, 1000)
        }
  } catch (err) {
    console.log(err);
    toast.error("Registration failed. Please check your details and try again." , {
      position : "top-right",
      richColors : true,
    })
    
    
  }finally{
    setIsLoading(false)
  }

  
  }

  return (
    <main className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-4 ">
        {/* Content */}
        <div>
          {/* title */}
          <div>
            <h3 className="font-bold text-4xl">
              <span>Welcome to</span>
              <span className="text-global">FreshCart</span>
            </h3>
            <p className="text-xl text-[#364153] font-medium pt-2">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>
          {/* Service */}
          <div className="py-6">
            <div className="flex items-center gap-2">
              <div className="bg-[#BBF7D0] w-12 h-12 rounded-full flex justify-center items-center text-global">
                <FaStar className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#364153]">
                  Premium Quality
                </h3>
                <p className="font-medium text-base text-[#4A5565]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 py-6">
              <div className="bg-[#BBF7D0] w-12 h-12 rounded-full flex justify-center items-center text-global">
                <FaTruckFast className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#364153]">
                  Premium Quality
                </h3>
                <p className="font-medium text-base text-[#4A5565]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#BBF7D0] w-12 h-12 rounded-full flex justify-center items-center text-global">
                <FaShieldHalved className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#364153]">
                  Premium Quality
                </h3>
                <p className="font-medium text-base text-[#4A5565]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>
          </div>
          {/* Review */}
          <div className="review p-4 bg-white shadow-sm rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 ">
                <img
                  src={ImgReview.src}
                  className="w-full rounded-full"
                  alt="image"
                />
              </div>
              <div>
                <h3 className="font-medium text-base text-[#364153]">
                  Sarah Johnson
                </h3>
                <span className="text-yellow-400 flex gap-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
              </div>
            </div>
            <p className="italic mt-4 font-medium text-base text-[#4A5565]">
              {" "}
              FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white py-10 px-6 shadow-md rounded-lg">
          <h3 className="text-3xl font-semibold text-[#364153] text-center mb-2">
            Create Your Account
          </h3>
          <p className="font-Medium text-base text-center text-[#364153]">
            Start your fresh journey with us today
          </p>
          {/* Register Option */}
          <div className="flex gap-2 py-8">
            <button className="flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-200 border rounded-md py-2 px-4 w-full md:w-1/2">
              <FaGoogle className="text-red-600" />
              <span className="font-SemiBold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-200 border rounded-md py-2 px-4 w-full md:w-1/2">
              <FaFacebook className="text-blue-600" />
              <span className="font-SemiBold">Facebook</span>
            </button>
          </div>
          {/* Line or */}
          <div className="flex items-center gap-3">
            <div className=" relative w-1/2 h-0.5 bg-gray-300/30 my-4 flex items-center "></div>{" "}
            <span>or</span>{" "}
            <div className=" relative w-1/2 h-0.5 bg-gray-300/30 my-4 flex items-center "></div>
          </div>

          <form className="form" onSubmit={handleSubmit(handelRegister)}>
            {/* Name */}
            <div className="mb-7">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ali"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Email */}
            <div className="mb-7">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="ali@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Password */}
            <div className="mb-7">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="create a strong password"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* rePassword */}
            <div className="mb-7">
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password*
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="confirm your password"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Phone */}
            <div className="mb-7">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="+1 234 567 8900"
                      autoComplete="off"
                    />
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
                I agree to the
                <Link href="/login" className="text-global">
                  Terms of Service{" "}
                </Link>
                and
                <Link href="/login" className="text-global ">
                  Privacy Policy  
                </Link>
                   *
              </label>
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 mb-7 py-3 px-4 text-white  bg-global hover:bg-green-700 transition-all duration-200 rounded-md cursor-pointer"
            >
              {isLoading ? <span className="flex gap-3"><Spinner className="size-6" /> Loading...</span> :
              <>
              <FaUserPlus className="text-lg" />
              <span className="text-base font-semibold">Create My Account</span>
              </>
              }
            </button>
          </form>
          <p>
            Already have an account?
            <Link href="/login" className="text-global">
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
