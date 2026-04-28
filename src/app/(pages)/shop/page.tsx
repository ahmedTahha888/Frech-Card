import { getAllProducts } from '@/app/_actions/Product.action';
import ProductCart from '@/app/_components/AllProducts/productCart'
import Link from 'next/link'
import { FaBoxOpen } from 'react-icons/fa6'




export default async function Shop() {
      const AllProducts = await getAllProducts();
    
  return (
    <>
    <div className='min-h-screen bg-gray-50/50'>
        <div className='bg-gradient-to-br from-global via-green-500 to-green-400 text-white'>
            <div className=' px-4 py-10 sm:py-14'>
                {/* Home / All Products */}
                <div className=' flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                    <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                    <span className='text-white/40'> /</span>
                    <span className='text-white font-medium'> All Product</span>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                        <FaBoxOpen className='text-3xl' />
                    </div>
                    <div>
                        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>All Products</h2>
                        <p className='text-white/80 mt-1'>Explore our complete product collection</p>
                    </div>
                </div>
            </div>
        </div>
        {/* Show Products */}
        <div className=' px-4 py-8'>
            <div className='mb-6 text-sm text-gray-500'>
                Showing {AllProducts?.length} products
            </div>
                <div className="w-full grid md:grid-cols-4 xl:grid-cols-5  pt-8 pb-10 px-8 gap-6 ">
                        {AllProducts?.map((product) => (
                          <ProductCart key={product.id} product={product} />
                        ))}
                      </div>

        </div>
    </div>
      
    </>
  )
}
