import React from 'react'
import Image from 'next/image'
import image1 from '../../../public/images/categories-img/nordwood-themes-Nv4QHkTVEaI-unsplash (1).jpg'
import image2 from '../../../public/images/categories-img/for-her1.png'
import image3 from '../../../public/images/categories-img/for-her2.png'

const page = () => {
  return (
    <>
    <h1 className='flex justify-center content-center items-center text-6xl text-yellow-600'>Unskippable Categories</h1>
    <hr className="w-[700px] mx-auto border-2 border-zinc-700 mt-8" />
    <div className='flex justify-center content-center mt-12'>
    <Image src={image1} alt='' height={1300}  width={1300} className='border-8 rounded-3xl border-red-700'/>
    </div>
    <div className='flex justify-center content-center mt-12 gap-24'>
    <Image src={image2} alt='' height={600}  width={600} className='border-8 rounded-3xl border-red-700'/>
    <Image src={image3} alt='' height={600}  width={600} className='border-8 rounded-3xl border-red-700'/>
    </div>
    </>
  )
}

export default page
