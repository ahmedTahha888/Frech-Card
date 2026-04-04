"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export default function Navbar() {

    const active =  "bg-emerald-500 p-2 rounded rounded-md"

    

  const path = usePathname()

  console.log("path" , path);
  

  const navLinks = [
    {
        label: "home",
        pathLink:"/home"
    },
    {
        label: "shop",
        pathLink:"/shop"
    },
    {
        label: "profile",
        pathLink:"/profile"
    },
    {
        label: "projects",
        pathLink:"/projects"
    },
  ]



  return (
    <nav className='flex items-center justify-between p-3 bg-gray-400 '>
        <div className='bg-emerald-400 p-2  rounded-full cursor-pointer'>
            Logo
        </div>

        <div>
            <ul className='flex gap-5 cursor-pointer'>
                {navLinks.map( (link)=> <li key={link.pathLink}>
                    <Link className={path === link.pathLink ? active : ""} href={link.pathLink}>{link.label}</Link>
                </li>  )}
            </ul>
        </div>
      
    </nav>
  )
}














