import { ProductsResponse, ProductType } from "@/Types/product.types";

export async function getAllProducts(): Promise<ProductType[] | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      cache: "force-cache",
    });

    const finalRes = await res.json();

    // console.log("finalRes" , finalRes.data);
    // !important don't forget return
    return finalRes.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "force-cache",
      },
    );

    const finalRes = await res.json();

    // console.log("finalRes" , finalRes.data);
    return finalRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}





export async function getProductsByBrand(id: string): Promise<ProductsResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      { cache: "force-cache" }
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}




export async function getProductsByCategories(id: string): Promise<ProductsResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
      { cache: "force-cache" }
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}