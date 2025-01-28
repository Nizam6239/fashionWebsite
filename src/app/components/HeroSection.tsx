"use client"
import Image from 'next/image'
import React from 'react'
import image1 from "../../../public/images/index-img/Off-the-Wall.jpg"

const HeroSection = () => {
  return (
    <>
    <Image
     className='ml-32 rounded-3xl border-8 border-gray-800'
      src={image1}
      height={1000}
      width={1200}
      alt="Picture of the author"
    />
    </>
  )
}

export default HeroSection
