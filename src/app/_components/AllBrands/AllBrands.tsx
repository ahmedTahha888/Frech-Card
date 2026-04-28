
import { getBrands } from '@/app/_actions/Brands.action'
import { Brand } from '@/Types/brand.type'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'

export default async function AllBrands() {

    const brands = await getBrands();


  return (
   
     
        <>

      {/* Show All Brands */}
      <div className=' px-4 py-10'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5'>
          {brands.map(  (brand : Brand)=> (<>
            <Link key={brand._id} href={`/specificBrand/${brand._id}`}  className='group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1'>
            <div className='aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center'>
              <Image src={brand.image} width={158} height={158} className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-500' alt={brand.name}/>
            </div>
            <h3 className='font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate'>{brand.name}</h3>
            <div className='flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
              <span className='text-xs text-violet-600 flex items-center gap-1'>
                View Products
                <FaArrowRightLong  className='text-[12px]' />
              </span>
            </div>
          </Link>
          </>)  )}
          
        </div>
      </div>
        
        
        </>
     
      

  )
}
