import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Managedepartment = ({ departmentList, deleteDepartment, editDepartment }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState('');

  const handleEdit = (index) => {
    setIsEditing(index);
    setNewName(departmentList[index]);
  };

  const handleSave = (index) => {
    editDepartment(index, newName);
    setIsEditing(null);
    setNewName('');
  };

  return (
    <div className=''>
      <h2 className='text-center font-bold text-xl mt-5'>Department List</h2>
      <div className='mt-5 overflow-x-auto'>
        <div className='flex bg-gray-100 font-bold text-sm'>
          <div className='w-1/12 px-4 py-2'>Sno</div>
          <div className='w-8/12 px-4 py-2'>Department Name</div>
          <div className='w-3/12 px-4 py-2'>Actions</div>
        </div>
        <div className=''>
          {departmentList.map((department, index) => (
            <div key={index} className='flex items-center justify-between border-b border-gray-200 py-2'>
              <div className='w-1/12 px-4'>{index + 1}</div>
              <div className='w-8/12 px-4'>
                {isEditing === index ? (
                  <input
                    type='text'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className='border-2 outline-none p-1 rounded-md w-full'
                  />
                ) : (
                  <h2 className='text-lg font-semibold capitalize'>{department}</h2>
                )}
              </div>
              <div className='w-3/12 flex justify-center'>
                {isEditing === index ? (
                  <button
                    className='text-green-600 text-xl '
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className='text-blue-600 text-2xl'
                      onClick={() => handleEdit(index)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className='text-red-500 text-2xl ml-2'
                      onClick={() => deleteDepartment(index)}
                    >
                      <MdDeleteForever />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Managedepartment;
