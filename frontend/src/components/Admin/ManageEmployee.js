import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const ManageEmployee = ({ deleteEmployee }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id); // Assuming deleteEmployee makes a DELETE request
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="">
      <h2 className="text-center font-bold text-xl mt-5">Employee List</h2>
      <div className="mt-5 overflow-x-auto">
        <div className="flex bg-gray-100 font-bold text-sm">
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
            <div key={employee._id} className="flex items-center justify-between border-b border-gray-200 py-2">
              <div className="w-1/12 px-4">{index + 1}</div>
              <div className="w-1/12 px-4">{employee.id}</div>
              <div className="w-full md:w-3/12 px-4">{`${employee.firstName} ${employee.lastName}`}</div>
              <div className="w-full md:w-3/12 px-4">{employee.department}</div>
              <div className="w-full md:w-3/12 px-4">{employee.joiningDate}</div>
              <div className="w-full md:w-3/12 px-4">{employee.mobile}</div>
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
