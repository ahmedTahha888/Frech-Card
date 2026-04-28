"use server"


import { Category } from "@/Types/category.type";






//======================Get AllCategory===============================
export async function getAllCategory() :Promise<Category[]>{
  const res = await fetch(
    'https://ecommerce.routemisr.com/api/v1/categories',
    { cache: 'no-store' }
  );
  const finalRes = await res.json();
  return finalRes.data;
}


//======================Get SubCategories===============================
export async function getSubCategories(id: string): Promise<Category> {
  const res = await fetch(
   //https://ecommerce.routemisr.com/api/v1/categories/6407ebf65bbc6e43516931ec
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    { cache: "no-store" }
  );
 const finalRes = await res.json();
  return finalRes.data;
}