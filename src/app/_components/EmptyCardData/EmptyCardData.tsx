import Link from 'next/link';
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { HiOutlineInboxArrowDown } from "react-icons/hi2";

export default function EmptyCardData() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center  px-4'>
        <div className='max-w-md text-center'>
            <div className='w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto'>
                <HiOutlineInboxArrowDown className='text-5xl text-gray-300  ' />
            </div>
            <div className='mt-5'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>Your cart is empty</h2>
            <p className='text-gray-500 mb-8 leading-relaxed'>Looks like you haven't added anything to your cart yet. <br /> Start exploring our products!</p>
            <Link href='/' className='inline-flex items-center gap-2 bg-linear-to-r from-global to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20  active:scale-[0.98] t'>
            Start Shopping <FaArrowRightLong className='text-sm' />
            </Link>
            <div className='mt-12 pt-8 border-t border-gray-100'>
                <p className='text-sm text-gray-400 mb-4'>Popular Categories</p>
            </div>

            </div>
        </div>
      
    </div>
  )
}
