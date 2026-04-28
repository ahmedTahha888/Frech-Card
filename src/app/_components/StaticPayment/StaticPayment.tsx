import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong, FaReceipt } from 'react-icons/fa6'

export default function StaticPayment() {
  return (
   <div className='px-4'>
            {/* naves or to span */}
            <div className='mb-8'>
                <div className='flex items-center gap-2 text-sm text-gray-500 mb-6'>
                    <Link href='/' className='hover:text-global transition'>Home</Link>
                    <span className='text-gray-300'> /</span>
                    <Link href='/productData' className='hover:text-global transition'>Cart</Link>
                    <span className='text-gray-300'> /</span>
                    <span className='text-gray-900 font-medium'>Checkout</span>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                    <h2 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                        <span className='bg-gradient-to-br from-global to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-global/20'><FaReceipt /></span>
                        Complete Your Order
                    </h2>
                    <p className='text-gray-500 mt-2'>Review your items and complete your purchase</p>
                </div>
                <Link href='/productData' className='text-global hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all'>
                    <FaArrowLeftLong />
                    Back to Cart
                </Link>
            </div>
        </div>
  )
}
