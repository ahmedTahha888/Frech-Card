"use client";

import {  useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/FreshCartLogo.png";
import { IoMenu, IoSearchSharp } from "react-icons/io5";
import { LuHeart, LuUserRound } from "react-icons/lu";
import {
  FaCartShopping,
  FaGift,
  FaRegCircleUser,
  FaRightFromBracket,
  FaTruck,
} from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { cardContext } from "@/app/_context/CardContextProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// ─── Navbar ───────────────────────────────────────────────────────────────────
interface NavbarProps {
  categoriesDropdown: React.ReactNode
}
export default  function Navbar({ categoriesDropdown } : NavbarProps) {
  const { numberOfCardItem, numberOfWishlistItem } = useContext(cardContext);

  const session = useSession();


  function handleLogOut() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }


  return (
    <>
      {/* ── Top Bar (hidden on mobile) ───────────────────────────────────── */}
      <div className="bg-white hidden py-2.5 px-5 lg:flex justify-between border-b border-gray-200 ">
        {/* left */}
        <div className="flex gap-6">
          <span className="flex gap-2">
            <span className="text-global flex opacity-100">
              {" "}
              <FaTruck />
            </span>
            <p className="text-sm text-[#6A7282]">
              Free Shipping on Orders 500 EGP
            </p>
          </span>

          <span className="flex gap-2">
            <span className="text-global flex opacity-100">
              <FaGift />
            </span>
            <span className="text-sm text-[#6A7282]">New Arrivals Daily</span>
          </span>
        </div>

        {/* right */}
        <div className="flex gap-6">
          <span className="text-sm flex gap-2 items-center text-[#6A7282] hover:text-global">
            <FaPhoneAlt /> +1 (800) 123-4567
          </span>
          <span className="text-sm flex items-center gap-2 text-[#6A7282] hover:text-global">
            <MdOutlineEmail /> support@freshcart.com
          </span>

          <div className="h-4 border-l-2 border-gray-100"></div>

          {session.data ? (
            <>
              {/* <Link
                href="/profile"
                className="text-[#4A5565] text-sm hover:text-global flex gap-2 items-center"
              >
                <BiUser />
                medo
              </Link> */}
              <button
                onClick={handleLogOut}
                className="text-[#4A5565] text-sm hover:text-red-500 flex gap-2 items-center"
              >
                <FaRightFromBracket />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-[#4A5565] text-sm hover:text-global flex gap-2 items-center"
              >
                <BiUser />
                Sign In
              </Link>
              <Link
                href="/"
                className="text-[#4A5565] text-sm hover:text-red-500 flex gap-2 items-center"
              >
                <FaRightFromBracket />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Main Navbar ──────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between px-5 py-3 gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="FreshCart Logo"
              width={165}
              height={36}
              priority
            />
          </Link>

          {/* Search (hidden on mobile) */}
          <div className="hidden lg:flex w-1/2  relative mx-4 ">
            <input
              type="text"
              className="border-2  w-full py-2  px-5 rounded-full"
              placeholder="Search for products, brands and more..."
            />
            <div className="h-9 w-9 bg-global rounded-full flex justify-center items-center absolute right-1 top-1 hover:bg-[#15803D] transition duration-100 ease-in-out ">
              <span className="text-white">
                <IoSearchSharp />
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5">
            <Link className="hover:text-global" href="/">
              Home
            </Link>
            <Link className="hover:text-global" href="/shop">
              Shop
            </Link>

            {/* Categories Dropdown */}
          
              {categoriesDropdown}


            <Link className="hover:text-global" href="/brands">
              Brands
            </Link>

            {/* Support */}
            <div className="flex gap-2 pe-3">
              <div className="bg-[#F0FDF4] text-global  group-hover:text-[#37bc68] opacity-100 w-10 h-10 rounded-full flex justify-center items-center">
                <PiHeadsetFill />
              </div>
              <div>
                <p className="text-xs text-[#99A1AF] group-hover:text-[#afb9cb]">
                  Support
                </p>
                <p className="text-xs text-[#364153] group-hover:text-[#6b7587]">
                  24/7 Help
                </p>
              </div>
            </div>

            <div className="h-10 border-l-2 border-gray-100 mx-1" />
          </div>

          {/* Icons */}
          <div className="flex items-center relative gap-1">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center text-[#6A7282] hover:text-global hover:bg-gray-100 rounded-full  text-xl"
            >
              <LuHeart className="text-[22px]" />
              {numberOfWishlistItem ? (
                <span className="absolute top-0.5 right-0.5 size-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {numberOfWishlistItem}
                </span>
              ) : (
                ""
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-10 h-10 flex items-center justify-center text-[#6A7282] hover:text-global hover:bg-gray-100 rounded-full  text-xl"
            >
              <FaCartShopping className="text-[22px]" />
              {numberOfCardItem ? (
                <span className="absolute top-0.5 right-0.5 size-[18px] rounded-full bg-global text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {numberOfCardItem}
                </span>
              ) : (
                ""
              )}
            </Link>

            {/* User / Sign In */}
            {session.data ? (
              <Link
                href="/profile"
                className="w-10 h-10 flex items-center justify-center text-[#6A7282] hover:text-global hover:bg-gray-100 rounded-full  text-xl"
              >
                <FaRegCircleUser className="text-[22px]" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-global hover:bg-green-700 text-white text-sm font-semibold  shadow-sm"
              >
                <LuUserRound className="text-base" />
                <span>Sign</span>
                <span>In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="flex lg:hidden w-10 h-10 items-center justify-center text-white bg-global hover:bg-green-700 rounded-full transition-colors text-2xl ml-1"
                  aria-label="Toggle menu"
                >
                  <IoMenu  />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] p-0 overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="FreshCart Logo"
                      width={130}
                      height={30}
                      priority
                    />
                  </Link>
                </div>

                <div className="px-5 py-4 flex flex-col gap-4">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      className="border-2 w-full py-2 px-5 rounded-full text-sm"
                      placeholder="Search products..."
                    />
                    <div className="h-9 w-9 bg-global rounded-full flex justify-center items-center absolute right-1 top-0">
                      <IoSearchSharp className="text-white" />
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/"
                      className="py-3 px-4 hover:bg-green-50 rounded-lg text-[#364153] hover:text-global font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className="py-3 px-4 hover:bg-green-50 rounded-lg text-[#364153] hover:text-global font-medium transition-colors"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/categories"
                      className="py-3 px-4 hover:bg-green-50 rounded-lg text-[#364153] hover:text-global font-medium transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/categories"
                      className="py-3 px-4 hover:bg-green-50 rounded-lg text-[#364153] hover:text-global font-medium transition-colors"
                    >
                      Brands
                    </Link>
                  </div>

                  {/* Wishlist & Cart */}
                  <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                    <Link
                      href="/wishlist"
                      className="flex items-center justify-between py-2.5 px-4 text-[#364153] hover:bg-red-50 rounded-lg hover:text-red-500 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                          <LuHeart className="text-red-400 text-lg" />
                        </div>
                        <span className="font-medium">Wishlist</span>
                      </div>
                      {numberOfWishlistItem ? (
                        <span className="size-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {numberOfWishlistItem}
                        </span>
                      ) : null}
                    </Link>

                    <Link
                      href="/cart"
                      className="flex items-center justify-between py-2.5 px-4 text-[#364153] hover:bg-green-50 rounded-lg hover:text-global transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                          <FaCartShopping className="text-global text-lg" />
                        </div>
                        <span className="font-medium">Cart</span>
                      </div>
                      {numberOfCardItem ? (
                        <span className="size-5 rounded-full bg-global text-white text-[10px] font-bold flex items-center justify-center">
                          {numberOfCardItem}
                        </span>
                      ) : null}
                    </Link>
                  </div>

                  {/* Auth */}
                  <div className="border-t border-gray-100 pt-4">
                    {session.data ? (
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 py-2.5 px-4 text-[#364153] hover:bg-green-50 rounded-lg hover:text-global transition-colors"
                        >
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                            <BiUser className="text-lg" />
                          </div>
                          <span className="font-medium">Profile</span>
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="flex items-center gap-3 py-2.5 px-4 text-[#364153] hover:bg-red-50 rounded-lg hover:text-red-500 transition-colors cursor-pointer">
                          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                            <FaRightFromBracket className="text-red-400 text-lg" />
                          </div>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Link
                          href="/login"
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-global hover:bg-green-700 text-white text-sm font-semibold shadow-sm transition-colors"
                        >
                          <LuUserRound />
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-global text-global hover:bg-green-50 text-sm font-semibold transition-colors"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Support */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 cursor-pointer">
                      <div className="w-9 h-11 rounded-full bg-white flex items-center justify-center">
                        <PiHeadsetFill className="text-global text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#364153]">
                          Need Help?
                        </p>
                        <p className="text-xs text-global">Contact Support</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Menu */}
      </nav>
    </>
  );
}


