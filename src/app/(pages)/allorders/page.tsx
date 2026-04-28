import { getUserOrders } from "@/app/_actions/Order.action";
import { BsBox2HeartFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { OrderType } from "@/Types/order.type";
import OrderCard from "@/app/_components/OrderCard/OrderCard";

export default async function AllOrder() {
  const orders = await getUserOrders();

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-global transition">Home</Link>
          <span> /</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-global flex items-center justify-center shadow-lg shadow-green-500/25">
              <BsBox2HeartFill className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders?.length ?? 0} orders
              </p>
            </div>
          </div>
          <Link href="/" className="self-start sm:self-auto text-global hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm">
            <FaShoppingBag className="text-xs" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* All Orders */}
      <div className="space-y-4">
        {!orders || orders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No orders found</p>
        ) : (
          orders.map((order: OrderType) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}