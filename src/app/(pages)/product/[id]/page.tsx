import { getAllProducts, getProductById } from "@/app/_actions/Product.action";
import DetailsProduct from "@/app/_components/DetailsProduct/DetailsProduct";
import SliderProductDetails from "@/app/_components/Sliders/SliderProductDetails/sliderProductDetaile";
import SliderRelatedProducts from "@/app/_components/Sliders/SliderRelatedProducts/SliderRelatedProducts";



export default async function ProductData({ params }: { params: Promise<{ id: string }>}) {

  const { id } = await params  

  console.log("id ==>", id)

  const products = await getProductById(id)
  if (!products) return <div>No products found</div>;
  const allProducts = await getAllProducts() 

  
  return (<>
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Slider */}
      <div className="lg:w-1/4">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-4 sticky top-4">
          <SliderProductDetails images={products.images} />
        </div>
      </div>

      {/* Details */}
      <DetailsProduct product={products} />
    </div>
  
    {/* Product */}

    
   <SliderRelatedProducts products={allProducts ?? []} />
  </>



    
  
  )
}
