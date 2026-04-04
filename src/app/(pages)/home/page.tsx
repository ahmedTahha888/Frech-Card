import Image from "next/image";
import Link from "next/link";

export default async function home() {


async function  getAllProducts(){


 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)


    const finalRes = await res.json()

    console.log("finalRes" , finalRes.data);
    // !important don't forget return
    return  finalRes.data;
    
}
const AllProducts = await getAllProducts()



  return (<>
    
    <div className="grid grid-cols-2 bg-red-50 gap-4">
        {AllProducts.map( (product) => <Link key={product.id} href={`product/${product.id}`}>
     
     
     
        <div  className="bg-global p-4" >

        
            <Image width={400} height={150} className="w-full" src={product.imageCover} alt={product.title}/>
            <p>{product.slug}</p>
            <h3>{product.title}</h3>
        
        </div>
     
     
     
     
     
        </Link> )}

    </div>
    
  
  
  
  </>
  )
}
