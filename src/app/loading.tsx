import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <FaSpinner className='animate-spin text-4xl text-global '/>
   
    </div>
  )
}
