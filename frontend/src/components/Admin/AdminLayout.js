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
import AttendanceDetails from './AttendanceDetails';
import Report from './Report';
import { toast } from 'react-toastify';


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
    try {
      const newDepartmentList = departmentList.filter((_, i) => i !== index);
      setDepartmentList(newDepartmentList);
      toast.success('Successfully Deleted ')      
    } catch (error) {
      toast.error(error)
    }
   
  };

  const editDepartment = (index, newName) => {
    try {
      const newDepartmentList = departmentList.map((department, i) => i === index ? newName : department)     
      setDepartmentList(newDepartmentList);
      toast.success('successfully Edited')      
    } catch (error) {
      toast.error(error)      
    }
    
  };

  const addEmployee = (newEmployee) => {
    try {
      setEmployees([...employees, newEmployee]);
      toast.success('New Employee added')      
    } catch (error) {
      toast.error(error)     
    }
  
  };


  const deleteEmployee = (index) => {
    try {
      const newEmployeeList = employees.filter((_, i) => i !== index);
      setEmployees(newEmployeeList);
      toast.success('Employee deleted successfully')
    } catch (error) {
      toast.error(error)      
    }
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
            <Route path="/dashboard" element={<Dashboard  departmentList={departmentList} employees={employees} />} />
            <Route path="/add-employee" element={<AddEmployee addEmployee={addEmployee} departmentList={departmentList} />} />            
            <Route path="/manage-employee" element={<ManageEmployee employees={employees} deleteEmployee={deleteEmployee}/>} />            
            <Route path="/add-department" element={<Adddepartment adddepartment={adddepartment} />} />
            <Route path="/attendance" element={<AttendanceDetails />} />
            <Route path="/report" element={<Report />} />
            <Route path="/manage-department" element={ <Managedepartment   departmentList={departmentList} 
                         deleteDepartment={deleteDepartment} editDepartment={editDepartment}/>} />
            </Routes>
            
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;      
                           
              
                
              
        
