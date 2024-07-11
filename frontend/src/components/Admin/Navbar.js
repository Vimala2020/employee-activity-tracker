import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import admin from '../../assets/admin2.png';
import { IoIosLogOut } from "react-icons/io";
import {auth} from '../Auth/Firebase'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';



const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try {
     await auth.signOut()
     navigate('/') 
     toast.success('successfully Logged Out')    
    } catch (error) {
      alert(error)
      toast.error(error)     
    }
   }

  return (
    <div className="w-full md:w-[80%] bg-white shadow-xl fixed top-0 z-10">
      <div className="flex justify-between mx-5 p-5">
        <button onClick={toggleSidebar} className="md:visible">
          <RxHamburgerMenu size={24} />
        </button>
        <div className="flex gap-4 items-center mr-0 md:mr-7">
          <img src={admin} alt="admin" className="w-7 h-7 rounded-full object-cover" />
          <h2 className="font-bold text-base">Admin</h2>
          <button onClick={handleLogout} className=''><IoIosLogOut size={24} className='text-red-500'/></button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
