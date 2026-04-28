import Link from "next/link";
import { FaArrowsRotate, FaRegEye, FaRegHeart } from "react-icons/fa6";
import { ProductType } from "@/Types/product.types";
import Image from "next/image";
import ButtonAddToCard from "@/app/_components/BtnAddToCard/BtnAddToCard";
import Rating from "../Rating/Rating";
import BtnAddToWishlist from "../BtnAddToWishlist/BtnAddToWishlist";

interface productCartType {
  product: ProductType;
}
export default function ProductCart({ product }: productCartType) {
  return (
    <>
      <div
        key={product.id}
        className="bg-white w-full md:max-w-[222px] lg:max-w-[275px] h-auto relative rounded-lg pb-6 border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 "
      >
        <div className="absolute right-2.5 top-2.5 cursor-pointer z-20">
          
          {/* Button Add To Wishlist */}
          <BtnAddToWishlist productId={product.id}/>

          <button className=" text-[#4A5565] hover:text-global w-8 my-1.5 h-8 shadow-sm rounded-full bg-white flex justify-center items-center cursor-pointer">
            <FaArrowsRotate />
          </button>

          {/* Link Product Details */}
          <Link
            href={`/product/${product.id}`}
            className=" text-[#4A5565] hover:text-global z-10 w-8 h-8 shadow-sm rounded-full bg-white flex justify-center items-center cursor-pointer"
          >
            <FaRegEye />
          </Link>
        </div>

        <div className="w-full relative md:max-w-[220px] lg:max-w-[273px] h-[240px] ">
          <div className="w-full h-full overflow-hidden">

          <Image
            width={273}
            height={240}
            className="w-full h-full object-contain "
            src={product.imageCover}
            alt={product.title}
          />
          </div>
          <div className="absolute top-3 left-3 z-10">
            {product.priceAfterDiscount ? (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {Math.round(((product.price - product.priceAfterDiscount) /product.price) *100)}%
              </span>
            ) : null}
          </div>
        </div>

        <div className="  px-4 pt-4 ">
          <p className="text-xs text-[#6A7282]">{product.category.name}</p>
          <h3 className="line-clamp-2 wrap-break-word text-base text-[#364153]">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 px-4 pt-1 ">
          <span className="text-yellow-400">
            <Rating rating={product.ratingsAverage} />
          </span>
          <span className="text-xs text-[#6A7282]">
            {product.ratingsAverage}
          </span>
          <span className="text-xs text-[#6A7282]">
            ({product.ratingsQuantity})
          </span>
        </div>

        <div className="flex justify-between items-center px-4 pt-2.5">
          {product.priceAfterDiscount ? (
            <div>
              <span className="text-global font-bold text-lg">
                {product.priceAfterDiscount} EGP
              </span>{" "}
              <span className="text-sm text-[#6A7282] line-through">
                {product.price} EGP
              </span>
            </div>
          ) : (
            <h3 className="text-[#1E2939] text-lg font-bold">
              {product.price} EGP
            </h3>
          )}
            {/* Button Add To Card */}
          <ButtonAddToCard productId={product.id} />
        </div>
      </div>
    </>
  );
}
