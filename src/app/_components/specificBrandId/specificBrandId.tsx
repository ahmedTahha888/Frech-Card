
import { Brand } from "@/Types/brand.type";
import { ProductType } from "@/Types/product.types";
import ProductCart from "@/app/_components/AllProducts/productCart";
import Link from "next/link";
import { FaFilter, FaTags } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import EmptySpecificBrand from "../EmptySpecificBrand/EmptySpecificBrand";
import { getProductsByBrand } from "@/app/_actions/Product.action";

interface Props {
  brand: Brand;
}

export default async function SpecificBrandId({ brand }: Props) {
  const products = await getProductsByBrand(brand._id);

  if (!products) return <div>No products found</div>;

  return (
    <div className="px-4 py-8">
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-2 text-sm text-gray-600">
          <FaFilter />
          Active Filters:
        </span>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
        >
          <FaTags className="text-xs" />
          {brand.name}
          <HiMiniXMark className="text-xs" />
        </Link>
        <Link
          href="/shop"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear All
        </Link>
      </div>

      {/* Showing products */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {products.results} products
      </div>

      {/* Products Grid */}
      {products && products.results === 0 ? (
        <EmptySpecificBrand />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.data.map((product: ProductType) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
