import { getSpecificBrand } from '@/app/_actions/Brands.action'
import Link from 'next/link'
import Image from 'next/image'
import SpecificBrandId from './../../../_components/specificBrandId/specificBrandId'



export default async function page({ params }: { params: { id: string } })  {

        const { id } = await params 
        const brand = await getSpecificBrand(id)




  return (
    <div className='min-h-screen bg-gray-50/50'>
        <div className='bg-gradient-to-br from-global via-green-500 to-green-400 text-white'>
            <div className=' px-4 py-10 sm:py-14'>
                {/* Home / Brands*/}
                <div className=' flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                    <Link href='/shop' className='hover:text-white transition-colors'>Home</Link>
                    <span className='text-white/40'> /</span>
                    <Link href='/brands' className='hover:text-white transition-colors'>Brands</Link>
                    <span className='text-white/40'> /</span>
                    <span className='text-white font-medium'> {brand.image}</span>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                        <Image src={brand.image} width={40} height={40} className='w-10 h-10 object-contain' alt={brand.name} />
                    </div>
                    <div>
                        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>Canon</h2>
                        <p className='text-white/80 mt-1'>Shop Canon products</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Show specificBrand */}
        <SpecificBrandId brand={brand} />

      
    </div>
  )
}
