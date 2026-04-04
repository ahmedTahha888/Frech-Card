import React from 'react'

export default async function ProductData({params}) {

  console.log(params);
  const details =await  params

  console.log("details" , details.id);
  
  
  return (
    <div>
      Product Data
    </div>
  )
}
