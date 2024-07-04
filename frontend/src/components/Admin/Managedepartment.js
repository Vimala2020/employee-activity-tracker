import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Managedepartment = ({departmentList}) => {
  return (
    <div className=''>
        <h2 className='text-center font-bold text-xl mt-5'>Department List</h2>              
            <div className='mt-5'>
                {
                    departmentList.map((department,index)=>(
                        <div key={index} className='flex justify-between border-2 p-2 w-[80%] mx-auto ' >
                            <div className='flex gap-10'>
                            <h2 className='text-lg font-bold'>{index+1}</h2>
                            <h2 className='text-lg font-semibold capitalize'>{department}</h2>
                            </div>
                            <div className='flex gap-5'>
                                <button className='text-blue-500 text-2xl'><FaRegEdit /></button>
                                <button className='text-red-500 text-2xl'><MdDeleteForever /></button>
                            </div>    
                        </div>    
                    ))
                }
            </div>        
    </div>
  )
}

export default Managedepartment