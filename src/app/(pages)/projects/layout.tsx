import Link from 'next/link'
import React from 'react'

export default function layout({children}) {
  return (
    <div className='grid grid-cols-4 min-h-screen'>
        <div className='col-span-1 bg-emerald-300 flex flex-col gap-5 p-5 '>
            <Link href={"/projects/react"}>React</Link>

            <Link href={"/projects/veu"}> Veu</Link>

            <Link href={"/projects/angular"}> Angular</Link>
        </div>

        <div className='col-span-3 p-4 bg-emerald-500'>
            {children}
        </div>

      
    </div>
  )
}
