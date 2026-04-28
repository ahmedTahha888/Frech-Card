import React from 'react'
import { FaArrowRotateLeft, FaShieldHalved, FaTruck } from 'react-icons/fa6'
import { MdHeadsetMic } from 'react-icons/md'

export default function CartHome() {
  return (<>
    <div className='bg-[#F9FAFB] w-full grid md:grid-cols-4  py-8 px-8  gap-5 ' >
        {/* cart 1 */}
    <div className='flex items-center gap-2.5 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl w-full md:max-ww[228px] xl:max-w-[356px]'>
        {/* icon */}
        <div className='text-[#2B7FFF] bg-[#FEF2F2] flex justify-center items-center w-12 text-xl h-12 rounded-full'>
           <FaTruck /> 
        </div>

        {/* content */}
        <div>
            <h3 className='text-[#1E2939] text-sm font-semibold'>Free Shipping</h3>
            <p className='text-[#6A7282] font-light text-xs'>On orders over 500 EGP</p>
        </div>
      
    </div>
    {/* cart 2 */}
    <div className='flex items-center gap-2.5 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl w-full md:max-ww[228px] xl:max-w-[356px]'>
        {/* icon */}
        <div className='text-[#00BC7D] bg-[#ECFDF5] flex justify-center items-center w-12 text-xl h-12 rounded-full'>
           <FaShieldHalved  /> 
        </div>

        {/* content */}
        <div>
            <h3 className='text-[#1E2939] text-sm font-semibold'>Secure Payment</h3>
            <p className='text-[#6A7282] font-light text-xs'>100% secure transactions</p>
        </div>
      
    </div>

    {/* cart 3 */}
    <div className='flex items-center gap-2.5 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl w-full md:max-ww[228px] xl:max-w-[356px]'>
        {/* icon */}
        <div className='text-[#FF6900] bg-[#F3F4F6] flex justify-center items-center w-12 text-xl h-12 rounded-full'>
           <FaArrowRotateLeft  /> 
        </div>

        {/* content */}
        <div>
            <h3 className='text-[#1E2939] text-sm font-semibold'>Easy Returns</h3>
            <p className='text-[#6A7282] font-light text-xs'>14-day return policy</p>
        </div>
      
    </div>

    {/* cart 4 */}
    <div className='flex items-center gap-2.5 p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl w-full md:max-ww[228px] xl:max-w-[356px]'>
        {/* icon */}
        <div className='text-[#AD46FF] bg-[#F9FAFB] flex justify-center items-center w-12 text-xl h-12 rounded-full'>
           <MdHeadsetMic  /> 
        </div>

        {/* content */}
        <div>
            <h3 className='text-[#1E2939] text-sm font-semibold'>24/7 Support</h3>
            <p className='text-[#6A7282] font-light text-xs'>Dedicated support team</p>
        </div>
      
    </div>

    </div>
  
  
  </>
  )
}

