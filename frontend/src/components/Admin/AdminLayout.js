import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidenav from './Sidenav';
import Navbar from './Navbar';
import Home from './Home';
import Dashboard from './Dashboard';
import Adddepartment from './Adddepartment';
import Managedepartment from './Managedepartment';
import AddEmployee from './AddEmployee';
import ManageEmployee from './ManageEmployee';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [employees, setEmployees] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const adddepartment = (newDepartment) => {
    setDepartmentList([...departmentList, newDepartment]);
  };

  const deleteDepartment = (index) => {
    const newDepartmentList = departmentList.filter((_, i) => i !== index);
    setDepartmentList(newDepartmentList);
  };

  const editDepartment = (index, newName) => {
    const newDepartmentList = departmentList.map((department, i) =>
      i === index ? newName : department
    );
    setDepartmentList(newDepartmentList);
  };

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const deleteEmployee = (index) => {
    const newEmployeeList = employees.filter((_, i) => i !== index);
    setEmployees(newEmployeeList);
  };

  return (
    <div className="flex">
      <div className={`fixed left-0 top-0 h-screen w-[80%] z-50 md:w-[28%] lg:w-[20%] bg-gray-800 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidenav toggleSidebar={toggleSidebar} />
      </div>
      <div className="ml-0 md:ml-[28%] lg:ml-[20%] w-full">
        <div className="fixed w-full md:w-[60%]">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
        <div className="mt-16 p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-department" element={<Adddepartment adddepartment={adddepartment} />} />
            <Route
              path="/add-employee"
              element={<AddEmployee addEmployee={addEmployee} />}
            />
            <Route
              path="/manage-employee"
              element={<ManageEmployee employees={employees} deleteEmployee={deleteEmployee}/>}
            />
            <Route
              path="/manage-department"
              element={
                <Managedepartment
                  departmentList={departmentList}
                  deleteDepartment={deleteDepartment}
                  editDepartment={editDepartment}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
