import React, { useState } from "react";
import { auth } from '../Auth/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


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
      const userCredential = await createUserWithEmailAndPassword(auth, employee.email, employee.password);
      const userId = userCredential.user.uid;
      
      const employeeWithId = { ...employee, firebaseId: userId };
      addEmployee(employeeWithId); 
      
      console.log("Submitted Employee:", employeeWithId);
      setEmployee(initialEmployeeState); // Reset the form fields after submission
    } catch (error) {
      console.log('Error creating user', error);
      alert(error)
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
        <h2 className="text-center text-xl p-2 font-bold">Employee Registration Form</h2>
        <div className="mx-5 pt-5 flex flex-col pb-5">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5">
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
                    <option key={index} value={dept.name}>{dept.name}</option>
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

            <div className="flex gap-5">
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
                <label className="font-medium mt-3">Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                  required
                  placeholder="Joining Date"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Email Id</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Id"
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

            <div className="flex gap-5">
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

            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium mt-3">Address</label>
                <textarea
                  type="text"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  required
                  placeholder="Address"
                  className="w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 w-full p-2 rounded-md text-white mt-4"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
