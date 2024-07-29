import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://attendance-tracker-backend-vwag.onrender.com/api/department');
        setDepartmentList(response.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://attendance-tracker-backend-vwag.onrender.com/api/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchDepartments();
    fetchEmployees();
  }, []);

  const addDepartment = async (newDepartment) => {
    try {
      const response = await axios.post('https://attendance-tracker-backend-vwag.onrender.com/api/department/add', { name: newDepartment });
      setDepartmentList([...departmentList, response.data.department]);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Department already exists. Please choose a different name.');
      } else {
        toast.error(error.response?.data?.message || 'Error adding department');
      }
    }
  };

  const editDepartment = async (id, updatedName) => {
    try {
      const response = await axios.put(`https://attendance-tracker-backend-vwag.onrender.com/api/department/edit/${id}`, { name: updatedName });
      setDepartmentList(departmentList.map(dept => (dept._id === id ? response.data.department : dept)));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating department');
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(`https://attendance-tracker-backend-vwag.onrender.com/api/department/delete/${id}`);
      setDepartmentList(departmentList.filter(dept => dept._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting department');
    }
  };

  const addEmployee = async (newEmployee) => {
    try {
      // Add employee to MongoDB
      const response = await axios.post('https://attendance-tracker-backend-vwag.onrender.com/api/employee/add', newEmployee);
      setEmployees([...employees, response.data.employee]);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding employee');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`https://attendance-tracker-backend-vwag.onrender.com/api/employee/delete/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting employee');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
            <Route path="/dashboard" element={<Dashboard departmentList={departmentList} employees={employees} />} />
            <Route path="/add-employee" element={<AddEmployee addEmployee={addEmployee} departmentList={departmentList} />} />
            <Route path="/manage-employee" element={<ManageEmployee employees={employees} deleteEmployee={deleteEmployee} />} />
            <Route path="/add-department" element={<Adddepartment addDepartment={addDepartment} />} />
            <Route path="/attendance" element={<AttendanceDetails />} />
            <Route path="/report" element={<Report />} />
            <Route path="/manage-department" element={<Managedepartment departmentList={departmentList} editDepartment={editDepartment} deleteDepartment={deleteDepartment} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
