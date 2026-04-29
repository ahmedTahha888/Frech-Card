import Link from "next/link";
import { FaFilter, FaFolderOpen } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import EmptySpecificBrand from "../EmptySpecificBrand/EmptySpecificBrand";
import ProductCart from "../AllProducts/productCart";
import { ProductType } from "@/Types/product.types";
import { Category } from "@/Types/category.type";
import { getProductsByCategories } from "@/app/_actions/Product.action";

interface Props {
  category: Category;
}
export default async function SubCategoryById({ category }: Props) {
  const products = await getProductsByCategories(category._id);
  if (!products) return <div>No products found</div>;

  return (
    <>
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
            <FaFolderOpen className="text-xs" />
            {category.name}
            <HiMiniXMark className="text-xs" />
          </Link>
          <Link
            href="/shop"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear All
          </Link>
        </div>

        {/* Show SubCategories */}
       
        
            <div className="mb-6 text-sm text-gray-500">
              Showing {products?.results} products
            </div>

            {products.results === 0 ? (
              <EmptySpecificBrand />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {products.data.map((product: ProductType) => (
                  <ProductCart key={product.id} product={product} />
                ))}
              </div>
            )}
          
       
      </div>
    </>
  );
}
