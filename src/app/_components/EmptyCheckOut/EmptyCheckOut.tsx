import Link from 'next/link'
import React from 'react'
import { BsExclamationTriangleFill } from 'react-icons/bs'

export default function EmptyCheckOut() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center px-4'>
        <div className='max-w-md text-center'>
            <div className='w-24 h-24 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mx-auto mb-6'>
                <BsExclamationTriangleFill className='text-4xl text-amber-500' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-3'>Your cart is empty</h3>
            <p className='text-gray-500 mb-6'>Add some items to your cart before checking out.</p>
            <Link href='/' className='inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20'>
                Continue Shopping
            </Link>
        </div>
      
    </div>
  )
}
