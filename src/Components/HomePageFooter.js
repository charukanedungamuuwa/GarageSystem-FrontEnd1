import React from 'react'
import { Button, Divider, Flex, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
function HomePageFooter() {
  return (
<div className='relative bg-neutral-400 h-auto inset-x-0 bottom-0 	mt-32			'> 
     <div className='flex justify-center  my-3 gap-x-7 items-center '>
      <div className='flex gap-x-4 '> <img 	 className='h-10 ' src='./images/Vector.png'></img>
        <span className='text-3xl text-sky-900 font-bold	'>My Garage</span></div>
        </div> 
    
    
    <div  className='flex justify-center gap-x-16 mt-5 ' >
    <a className='text-black	no-underline	font-bold' href="/services">Services</a>
    <a className='text-black	no-underline font-bold' href="/vehicles ">Vehicles</a>
    <a  className='text-black no-underline	font-bold' href="/appointments ">Appointments</a>
    <a  className='text-black	no-underline font-bold' href="/contactus ">Contact Us</a>
    <a  className='text-black	no-underline font-bold' href="/aboutus ">About Us</a>
    </div>    <div className='flex justify-center mt-5 mb-5'> <Button className='w-[560px] h-[35px] bg-sky-900	' type="primary" shape="round" icon={<DownloadOutlined />} >
            Download
          </Button></div>
          <div >
          <span className='flex justify-center	'>Emergency? Call now : <span className='text-yellow-300	'>077 467 4870</span></span><br />
          <span  className='flex justify-center	relative top-[-12px]'>Address: Address: 1287 High Road, Barnet, London N20 9HS</span>
          </div>
  <hr className=' relative w-[920px] left-[600px] top-[-9px]'/>
    <div className='flex gap-x-4 top-[-6px]	 relative top-4 justify-center 	'>  <span >Copyright @ Nori Mobile Auto Locksmith,All Rights Reserved.</span>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a>
    <a href=''><img src='./images/.png'></img> </a></div>
    
   </div>
  )
}

export default HomePageFooter