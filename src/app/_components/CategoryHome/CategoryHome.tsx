import { getAllCategory } from "@/app/_actions/Category.action";
import { Category } from "@/Types/category.type";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function CategoryHome() {
  const Category = await getAllCategory();
  return (
    <div className="py-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 ">
        <div className="ms-8 flex gap-4">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h3 className="text-3xl font-bold">
            <span className="text-[#1E2939]">Shop By</span>
            <span className="text-global ms-2 ">Category</span>
          </h3>
        </div>
        <div className="me-6 self-end mt-2.5 md:mt-0 text-global hover:text-green-700 ">
          <Link className="flex items-center gap-2" href="/shop">
            {" "}
            View All Categories <FaArrowRightLong />
          </Link>
        </div>
      </div>

      <div>
        
        <div className=" grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5 px-8 m-auto py-8 ">
          {Category?.map((item :Category) => (
            <Link
            href={`/SubCategory/${item._id}`}
              key={item._id}
              className="bg-white shadow-sm  hover:shadow-md transition-shadow duration-300  p-4 rounded-lg"
            >
              <img
                className=" w-20 h-20 rounded-full mx-auto object-cover"
                src={item.image}
                alt="category"
              />
              <h3 className="font-medium text-base text-center pt-3">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
