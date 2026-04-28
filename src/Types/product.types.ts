 export interface ProductType {
    imageCover:string,
    price:number,
    quantity:number,
    ratingsQuantity:number,
    ratingsAverage:number,
    priceAfterDiscount:number,
    id:string,
    title:string,
    description:string,
    images:string[],
    brand:BrandType ,
    category:CategoryType ,
  }

export interface ProductsResponse {
  results: number;
  data: ProductType[];
}

 export interface CategoryType{
    _id: string,
    image: string,
    name: string,
    slug: string,

  }

 export interface BrandType{
    _id: string,
    image: string,
    name: string,
    slug: string,

  }

  export interface SubCategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string; // category ID
}