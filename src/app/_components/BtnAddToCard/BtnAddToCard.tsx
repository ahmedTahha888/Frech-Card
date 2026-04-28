"use client"
import { AddProductToCard} from '@/app/_actions/Card.actions'
import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useMutation } from "@tanstack/react-query";
import { Spinner } from '@/components/ui/spinner'
import { cardContext } from '@/app/_context/CardContextProvider'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function ButtonAddToCard({productId} : {productId : string}) {
  const { data: session } = useSession()
  const router = useRouter()
 const {setNumberOfCardItem , setCartProduct , setTotalPrice  , setCartId } =   useContext(cardContext) 

const { mutate, isPending } = useMutation({
  mutationFn: AddProductToCard,
  onSuccess: (res) => {
    console.log("res", res);
    toast.success(res.message, { position: "top-center", richColors: true });
    setCartId(res.cartId)
    setNumberOfCardItem(res.numOfCartItems)
    setCartProduct(res.data.products)
    setTotalPrice(res.data.totalCartPrice)

  },
  onError: (error) => {
    toast.error(error.message, { position: "top-center", richColors: true });
  },
});

function handelAddToCart() {
  // if user does't logged
    if (!session) {
      toast.warning("Please login first!", { 
        position: "top-center", 
        richColors: true 
      });
      setTimeout(() => {
        router.push("/login")
      }, 1500);
      return;
    }
    mutate(productId);
  }

  return (
  <button
      onClick={handelAddToCart}
      disabled={isPending}
      className="w-10 h-10 flex justify-center cursor-pointer items-center text-white bg-global rounded-full"
    >
      {isPending ? <span><Spinner className='size-6 animate-spin'/></span> : <FaPlus className='size-6' />}
    </button>
  )
}
