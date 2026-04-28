"use server"

import { Brand } from "@/Types/brand.type";



//=====================All Brands=======================================
export async function getBrands() :Promise<Brand[]>{
  const res = await fetch(
    'https://ecommerce.routemisr.com/api/v1/brands?limit=40',
    { cache: 'no-store' }
  );
  const finalRes = await res.json();
  return finalRes.data;
}







//=====================Specific Brand====================================
export async function getSpecificBrand(id: string): Promise<Brand> {
  const res = await fetch(
   //https://ecommerce.routemisr.com/api/v1/brands/64089ceb24b25627a2531596
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { cache: "no-store" }
  );
 const finalRes = await res.json();
  return finalRes.data;
}