"use client"
import { AddProductToWishlist, deleteWishlist, getUserWishlist } from '@/app/_actions/wishlist.action'
import { cardContext } from '@/app/_context/CardContextProvider'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

export default function BtnAddToWishlist({ productId, className, children, showLabel }: { 
  productId: string,
  className?: string,
  children?: React.ReactNode,
  showLabel?: boolean,
}) {
  const { data: session } = useSession()
  const router = useRouter()

  const { 
    wishlistIds, 
    setWishlistIds, 
    setNumberOfWishlistItem,
    setWishlistProduct, 
  } = useContext(cardContext)

  const isLiked = wishlistIds?.includes(productId)

  const { mutate, isPending } = useMutation({
    mutationFn: AddProductToWishlist,
    onSuccess: async (res) => {
      toast.success("Product Added Successfully To Your Wishlist", { 
        position: "top-center", 
        richColors: true 
      });
      setNumberOfWishlistItem(res.data.length)
      setWishlistIds((prev: string[]) => {
        if (prev.includes(productId)) return prev
        return [...prev, productId]
      })
      const wishlist = await getUserWishlist()
      if (wishlist) setWishlistProduct(wishlist.data)
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  const { mutate: removeFromWishlist, isPending: isRemoving } = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: (res) => {
      toast.success("Product Removed From Wishlist", { position: "top-center", richColors: true });
      setWishlistProduct(prev => prev.filter(item => (res.data as any).includes(item.id)))
      setNumberOfWishlistItem(res.data.length)
      setWishlistIds(res.data as any)
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });

  function handelAddToWishlist() {
    if (!session) {
      toast.warning("Please login first!", {
        position: "top-center",
        richColors: true
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    if (isLiked) {
      removeFromWishlist(productId)
    } else {
      mutate(productId)
    }
  }

  return (
    <button
      onClick={handelAddToWishlist}
      disabled={isPending || isRemoving}
      className={
        isLiked && showLabel
          ? "flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-red-200 text-red-500 bg-red-50"
          : className || "text-[#4A5565] hover:text-red-500 w-8 h-8 shadow-sm rounded-full bg-white flex justify-center items-center cursor-pointer"
      }
    >
      {isPending || isRemoving ? (
        <Spinner className='size-4 animate-spin'/>
      ) : isLiked && showLabel ? (
        <><FaHeart className="text-red-500" /><span>In Wishlist</span></>
      ) : (
        children || (isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />)
      )}
    </button>
  )
}