import React from 'react'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <div className=' mx-10  h-screen flex justify-center items-center flex-col gap-16'>
        <img src="" alt="" />
        <div className='flex justify-between items-center'>
       <div className='w-full'>
        <h1 className='text-9xl text-blue-500 text-center font-semibold'>Employee</h1>
        <h2 className='text-8xl mt-10 text-center'>Attendance Tracker</h2>
       </div>
       <div className='w-[50%]'>
        <img src="https://www.softworks.com/wp-content/uploads/2023/11/Strategies-for-Improving-Employee-Attendance-Blog-Image.png" alt="" className='rounded-md'/>
       </div>
       </div>
       <div className='flex justify-center mt-5'>
        <div className='flex justify-center gap-10 w-full'>
        <Link to={'/home'}><button className=' px-3 rounded-md py-2 bg-blue-400 border-none hover:bg-blue-500 text-xl'>Admin</button></Link>
        <Link><button className=' px-3 rounded-md py-2 bg-pink-100 border-none hover:bg-pink-200 text-xl'>Employee</button>  </Link>       
        </div>
       </div>
       
   
    </div>
  )
}

export default Banner