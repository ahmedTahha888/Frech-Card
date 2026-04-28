import AllBrands from "@/app/_components/AllBrands/AllBrands";
import SkeletonBrand from "@/app/_Skeletons/SkelatonBrand";
import Link from "next/link";
import { Suspense } from "react";
import { FaTags } from "react-icons/fa6";


export default  function Brands() {



  return (
    <div className="min-h-screen bg-gray-50/50">

       <div className='bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white'>
              <div className='container mx-auto px-4 py-12 sm:py-16'>
                <nav className='flex items-center gap-2 text-sm text-white/70 mb-6'>
                  <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                  <span className='text-white/40'> /</span>
                  <span className='text-white font-medium'>Brands</span>
                </nav>
                <div className='flex items-center gap-5'>
                  <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                    <FaTags className='text-3xl'/>
                  </div>
                  <div>
                    <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>Top Brands</h1>
                    <p className='text-white/80 mt-1'>Shop from your favorite brands</p>
                  </div>
                </div>
              </div>
            </div>

        <Suspense fallback={<SkeletonBrand />}>
        <AllBrands />
      </Suspense>
    
    </div>
   
  )
}
