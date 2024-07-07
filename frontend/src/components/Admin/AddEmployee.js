import React, { useState } from "react";
import {auth} from '../Auth/Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'


const AddEmployee = ({ addEmployee, departmentList }) => {
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    mobile: "",
    joiningDate: "",
    state: "",
    city: "",
    address: "",
    id: "",
    password: "",
  };

  const [employee, setEmployee] = useState(initialEmployeeState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createUserWithEmailAndPassword(auth,employee.email,employee.password)
        addEmployee(employee); 
        console.log("Submitted Employee:", employee);
       setEmployee(initialEmployeeState); // Reset the form fields after submission
      
    } catch (error) {
      console.log('Error creating user',error)
      
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="border-2 w-full md:w-[70%] lg:w-[50%] mx-auto">
        <h2 className="text-center text-xl p-2 font-bold">
          Employee Registration Form
        </h2>
        <div className="mx-5 pt-5 flex flex-col  pb-5">

          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 ">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Department</label>
                <select
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                >
                  <option value="">Select Department</option>
                  {departmentList.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Employee Id</label>
                <input
                  type="number"
                  name="id"
                  value={employee.id}
                  onChange={handleChange}
                  required
                  placeholder="Employee Id"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5 ">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Mobile No</label>
                <input
                  type="number"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Mobile No"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  value={employee.dateOfJoining}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5 ">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">State</label>
                <input
                  type="text"
                  name="state"
                  value={employee.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">City</label>
                <input
                  type="text"
                  name="city"
                  value={employee.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5 ">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Address</label>
                <textarea
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  required
                  placeholder="Address"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-5 ">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">User Email</label>
                <input
                  type="text"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Password</label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 font-bold mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
