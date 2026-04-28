import React from 'react'

export default function SkeletonBrand() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
      {Array(12).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-100 rounded-2xl">
          <div className="w-30 h-30 rounded-xl bg-gray-200 animate-pulse" />
          <div className="w-16 h-3 rounded-full bg-gray-200 animate-pulse" />
        </div>
      ))}
    </div>
  )
}
