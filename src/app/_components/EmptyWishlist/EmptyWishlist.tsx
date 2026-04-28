import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong, FaRegHeart } from 'react-icons/fa6'

export default function EmptyWishlist() {
  return (
    <div className='min-h-screen bg-gray-50/50'>
       <div className='px-4 py-20'>
        <div className='max-w-sm mx-auto text-center'>
            <div className='w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6'>
                <FaRegHeart className='text-3xl text-gray-400' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>Your wishlist is empty</h3>
            <p className='text-gray-500 text-sm mb-6'>Browse products and save your favorites here.</p>
            <div className='flex flex-col gap-3'>
                <Link href='/shop' className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-global text-white font-semibold hover:bg-primary-700 transition-colors'>
                    Browse Products
                    <FaArrowRightLong  className='text-sm'/>
                </Link>
            </div>
        </div>
       </div>
      
    </div>
  )
}
