import React from 'react';
import { MdDeleteForever } from 'react-icons/md';


const ManageEmployee = ({employees, deleteEmployee }) => {
 

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id); // Assuming deleteEmployee makes a DELETE request      
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="">
      <h2 className="text-center font-bold text-xl mt-5">Employee List</h2>
      <div className="mt-5 overflow-x-auto ">
        <div className=" bg-gray-100 font-bold text-sm hidden lg:flex">
          <div className="w-1/12 px-4 py-2">Sno</div>
          <div className="w-1/12 px-4 py-2">ID</div>
          <div className="w-3/12 px-4 py-2">Name</div>
          <div className="w-2/12 md:w-3/12 px-4 py-2">Department</div>
          <div className="w-2/12 md:w-3/12 px-4 py-2">Joining Date</div>
          <div className="w-2/12 md:w-3/12 px-4 py-2">Phone</div>
          <div className="w-2/12 px-4 py-2">Actions</div>
        </div>
        <div>
          {employees.map((employee, index) => (
            <div key={employee._id} className="flex justify-between items-center border-gray-200 py-2">

              <div>
              <div className="w-1/12 px-8">{index + 1}</div>
              </div> 

              <div className='flex flex-col lg:flex-row items-center  w-full'>
              <div className="w-1/12 px-4 hidden lg:flex">{employee.id}</div>
              <div className="w-full lg:w-3/12  px-4 capitalize">{`${employee.firstName} ${employee.lastName}`}</div>
              <div className="w-full lg:w-3/12 px-4">{employee.department}</div>           
             <div className="w-full lg:w-3/12 px-4">{employee.joiningDate}</div>
              <div className="w-full lg:w-3/12 px-4 lg:px-8">{employee.mobile}</div>
              </div>  
             
              <div className="w-2/12 flex justify-center">
                <button className="text-red-500 text-xl" onClick={() => handleDelete(employee._id)}>
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

export default ManageEmployee;
