// Types/brand.type.ts

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;

};

export type BrandsResponse = {
  results: number;
  data: Brand[];
};

