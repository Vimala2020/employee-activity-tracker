import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import admin from '../../assets/admin2.png'

const Navbar = ({toggleSidebar}) => {
  return (
    <div className='w-full bg-white shadow-xl'>
        <div className='flex justify-between mx-5 p-5'>
            <button onClick={toggleSidebar}><RxHamburgerMenu  size={24} className='md:hidden'/></button>
            <div className='flex gap-4 items-center'>
                <h2 className='font-bold text-base'>Admin</h2>
                <img src={admin} alt="admin" className='w-7' />
            </div>
        </div>
    </div>
  )
}

export default Navbar