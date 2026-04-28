import Link from 'next/link'

import { Suspense } from 'react';
import SkeletonBrand from '@/app/_Skeletons/SkelatonBrand';
import AllCategories from '@/app/_components/AllCategories/AllCategories';
import { FaLayerGroup } from 'react-icons/fa6';

export default async function Categories() {
    
  return (
    <>
    <div className='min-h-screen bg-gray-50/50'>
        <div className='bg-gradient-to-br from-global via-green-500 to-green-400 text-white'>
            <div className=' px-4 py-10 sm:py-14'>
                {/* Home / All Categories */}
                <div className=' flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                    <Link href='/' className='hover:text-white transition-colors'>Home</Link>
                    <span className='text-white/40'> /</span>
                    <span className='text-white font-medium'> Categories</span>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                        <FaLayerGroup  className='text-3xl' />
                    </div>
                    <div>
                        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>All Categories</h2>
                        <p className='text-white/80 mt-1'>Browse our wide range of product categories</p>
                    </div>
                </div>
            </div>
        </div>

        {/* show All Categories */}

        <Suspense fallback={<SkeletonBrand />}>
                <AllCategories />
              </Suspense>
        
    </div>
      
    </>
  )
}
