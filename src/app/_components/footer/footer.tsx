import React from "react";
import { FaInstagramSquare, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";
import { FaArrowRotateLeft, FaFacebook, FaLocationDot, FaTruck, FaTwitter, FaYoutube } from "react-icons/fa6";
import { PiHeadsetFill } from "react-icons/pi";
import logo from "@/images/FreshCartLogo.png";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { HiCreditCard } from "react-icons/hi";

export default function Footer() {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4   px-4  gap-6 bg-[#F0FDF4]  py-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0 text-global">
            <FaTruck size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              Free Shipping
            </h4>
            <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0 text-global">
            <FaArrowRotateLeft size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              Easy Returns
            </h4>
            <p className="text-gray-500 text-xs">14-day return policy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0 text-global">
            <FaShieldAlt size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              Secure Payment
            </h4>
            <p className="text-gray-500 text-xs">100% secure checkout</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] flex items-center justify-center shrink-0 text-global">
            <PiHeadsetFill size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              24/7 Support
            </h4>
            <p className="text-gray-500 text-xs">Contact us anytime</p>
          </div>
        </div>
      </div>
      {/* Discretion Footer  */}
      <footer id="footer" className="bg-gray-900 text-white">
        <div className=" mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="bg-white rounded-lg px-4 py-2 inline-block">
                  <img
                    src={logo.src}
                    alt="logo"
                    className="h-8 w-auto"
                    loading="lazy"
                  />
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              <div className="space-y-3  mb-6">
                <Link href='/' className="flex items-center gap-3  text-gray-400 hover:text-global transition-colors text-base">
                    <span className="text-global"><FaPhoneAlt /></span>
                    <span>+1 (800) 123-4567</span>
                </Link>
                <Link href='/' className="flex items-center gap-3  text-gray-400 hover:text-global transition-colors text-base">
                    <span className="text-global"><MdEmail  /></span>
                    <span>support@freshcart.com</span>
                </Link>
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <span className="text-global mt-0.5"><FaLocationDot /></span>
                    <span>123 Commerce Street, New York, NY 10001</span>
                  </div>
              </div>
               {/* icon social */}
              <div className="flex items-center gap-3">
                <Link href='/' className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-global hover:text-white transition-colors">
                  <FaFacebook />
                </Link>

                <Link href='/' className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-global hover:text-white transition-colors">
                  <FaTwitter  />
                </Link>

                <Link href='/' className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-global hover:text-white transition-colors">
                  <FaInstagramSquare  />
                </Link>

                <Link href='/' className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-global hover:text-white transition-colors">
                  <FaYoutube  />
                </Link>

              </div>
            </div>
          {/* Column 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3" >
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">All Products</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Categories</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Brands</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Electronics</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Mens Fashion</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Women Fashion</Link>
              </li>
             
            </ul>

          </div>

          {/* Column 3 */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Account</h3>
            <ul className="space-y-3" >
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">My Account</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Order History</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Wishlist</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Shopping Cart</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Sign In</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Create Account</Link>
              </li>
             
            </ul>

          </div>
          {/* Column 4 */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3" >
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">MContact Us</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Help Center</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Shipping Info</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Returns & Refunds</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">STrack Order</Link>
              </li>

            </ul>

          </div>
          {/* Column 5 */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3" >
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">HTerms of Service</Link>
              </li>
              <li>
                <Link href='/' className="text-gray-400 hover:text-global transition-colors text-sm">Cookie Policy</Link>
              </li>

            </ul>

          </div>
          
          </div>

        </div>

        {/* footer bottom */}
        <div className="border-t border-gray-800">
          <div className=" px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-500 text-sm text-center md:text-left">© 2026 FreshCart. All rights reserved.</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <HiCreditCard />
                  <span>Visa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <HiCreditCard />
                  <span>Mastercard</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <HiCreditCard />
                  <span>PayPal</span>
                </div>

              </div>
              </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
