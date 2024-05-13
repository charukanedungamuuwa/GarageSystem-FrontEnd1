import React from 'react'

function Footer() {
  return (
    <div className=' bg-neutral-400  items-center bottom-0		w-full fixed z-10 		'> 

      <div className='flex gap-x-4 relative top-[50px] ml-14'> <img 	 className='h-10 ' src='./images/Vector.png'></img>
        <span className='text-3xl text-sky-900 font-bold'>My Garage</span></div>
     

        
    
    <div  className='flex justify-center gap-x-16 relative mb-1' >
    <a className='text-black	no-underline	font-bold' href="/services">Services</a>
    <a className='text-black	no-underline font-bold' href="/vehicles ">Vehicles</a>
    <a  className='text-black no-underline	font-bold' href="/appointments ">Appointments</a>
    <a  className='text-black	no-underline font-bold' href="/contactus ">Contact Us</a>
    <a  className='text-black	no-underline font-bold' href="/aboutus ">About Us</a>
    </div>
    <div className='flex  justify-center'>
  <hr className=' relative w-[920px] mb-1.5  border-4 border-black-500 '/>
  </div>
    <div className='flex gap-x-4 top-[-1px]	 relative mb-1 justify-center font-bold	'>  <span >Copyright @ Nori Mobile Auto Locksmith,All Rights Reserved.</span>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a></div>
    
   </div>
    
    
  )
}

export default Footer