import ProductCart from "@/app/_components/AllProducts/productCart";
import SliderHome from "./_components/Sliders/SliderHomePage/sliderHome";
import CartHome from "./_components/CartHome/CartHome";
import { lazy, Suspense } from "react";
import SkeletonCategoryHome from "./_Skeletons/SkeletonCategoryHome";
import { getMyToken } from "@/utils/getMyToken";
import CardFruitsAndVegetables from "./_components/CardFruitsAndVegetables/CardFruitsAndVegetables";
import { getAllProducts } from "./_actions/Product.action";


export default async function Home() {
  const AllProducts = await getAllProducts();
 const CategoryHomeAsLazyComp = lazy(()=> import("./_components/CategoryHome/CategoryHome"))

 getMyToken()

  return (
    <>
    {/* Slider Home */}
    <SliderHome />

    {/* Cart Home */}
    <CartHome/>

    {/* Category Home Lazy loading */}
<Suspense fallback={<SkeletonCategoryHome count={10}/>}>
    <CategoryHomeAsLazyComp/>
</Suspense>

      {/* All Product */}
      <div className="flex gap-4 ps-8 ">
        <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
        <h3 className="text-3xl font-bold">
          <span className="text-[#1E2939]">Featured</span>
          <span className="text-global ms-2 ">Products</span>
        </h3>
      </div>

      <CardFruitsAndVegetables/>

      <div className="w-full grid md:grid-cols-4 xl:grid-cols-5  pt-8 pb-10 px-8 gap-6 ">
        {AllProducts?.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
