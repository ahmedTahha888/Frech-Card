
import { getSubCategories } from '@/app/_actions/Category.action'
import SubCategoryById from '@/app/_components/SubCategoryById/SubCategoryById'
import Image from 'next/image'
import Link from 'next/link'



export default async function page({ params }: { params: { id: string } })  {

     const { id } = await params 
     const category = await getSubCategories(id)
  
  return (
    <div className='min-h-screen bg-gray-50/50'>
        <div className='bg-gradient-to-br from-global via-green-500 to-green-400 text-white'>
            <div className=' px-4 py-10 sm:py-14'>
                {/* Home / All Categories */}
                <div className=' flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap'>
                    <Link href='/shop' className='hover:text-white transition-colors'>Home</Link>
                    <span className='text-white/40'> /</span>
                    <Link href='/brands' className='hover:text-white transition-colors'>Categories</Link>
                    <span className='text-white/40'> /</span>
                    <span className='text-white font-medium'> {category.name}</span>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30'>
                        <Image src={category.image} className='w-12 h-12 object-contain' width={48} height={48} alt={category.name}/>
                    </div>
                    <div>
                        <h2 className='text-3xl sm:text-4xl font-bold tracking-tight'>{category.name}</h2>
                        <p className='text-white/80 mt-1'>Choose a subcategory to browse products</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Show SubCategories */}
        
        <SubCategoryById category={category} />

      
    </div>
  )
}
