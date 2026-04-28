"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ProductType } from "@/Types/product.types";
import ProductCart from "../../AllProducts/productCart";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function SliderRelatedProducts({ products }: { products: ProductType[] }) {
  return (
    <div className="mt-10">
      
      <div className="flex items-center justify-between ps-8 pe-4 mb-6">
        <div className="flex gap-4 items-center">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-[#1E2939]">You May Also</span>
            <span className="text-global ms-2">Like</span>
          </h3>
        </div>

        {/* الأزرار هنا فوق على اليمين */}
        <div className="flex items-center gap-2">
          <button className="details-custom-prev w-9 h-9 rounded-full  flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-[#DCFCE7] hover:text-global transition">
            <FaChevronLeft size={16} />
          </button>
          <button className="details-custom-next w-9 h-9 rounded-full  flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-[#DCFCE7] hover:text-global transition">
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".details-custom-next",
          prevEl: ".details-custom-prev",
        }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCart product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}