export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;


};

export type CategoriesResponse = {
  results: number;
  data: Category[];
};
