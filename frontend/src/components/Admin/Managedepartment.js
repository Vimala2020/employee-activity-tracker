import React, {  useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Managedepartment = ({ departmentList, editDepartment, deleteDepartment }) => {
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditClick = (id, currentName) => {
    setEditMode(id);
    setEditName(currentName);
  };

  const handleEditSubmit = (id) => {
    editDepartment(id, editName);
    setEditMode(null);
    setEditName('');
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
            <div key={department._id} className='flex items-center justify-between border-b border-gray-200 py-2'>
              <div className='w-1/12 px-4'>{index + 1}</div>
              <div className='w-8/12 px-4'>
                {editMode === department._id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  <h2 className='text-lg font-semibold capitalize'>{department.name}</h2>
                )}
              </div>
              <div className='w-3/12 flex justify-center'>
                {editMode === department._id ? (
                  <button onClick={() => handleEditSubmit(department._id)} className='text-green-600 text-2xl'>
                    ✔
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(department._id, department.name)} className='text-blue-600 text-2xl'>
                    <FaRegEdit />
                  </button>
                )}
                <button onClick={() => deleteDepartment(department._id)} className='text-red-500 text-2xl ml-2'>
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Managedepartment;
