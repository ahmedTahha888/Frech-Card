import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <FaSpinner className='animate-spin text-5xl text-global '/>
   
    </div>
  )
}
