import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from 'react-icons/fa6';

export default function Rating({rating }: {rating:number}) {    

  return (
    <div className='flex'>
      {[1,2,3,4,5,].map((star)=>{
        if(rating >= star){
        return <FaStar key={star} />
        }else if( rating >= star -0.5 ){
            return <FaStarHalfAlt key={star} />
        }else {
            return <FaRegStar key={star} />
        }
      })}
    </div>
  )
}


// <FaStar />   <FaStarHalfAlt />   <SlStar />