import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDetails = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details
  const [combinedData, setCombinedData] = useState([]); // Combined attendance and work progress data
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch employee data
        const response = await axios.get('http://localhost:5000/api/employee');
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = async (employee) => {
    console.log('Selected employee:', employee); // Ensure userId exists here
    
    try {
      // Fetch attendance details for the selected employee
      const attendanceUrl = `http://localhost:5000/api/attendance/${employee.firebaseId}`;
      console.log('Fetching attendance from:', attendanceUrl);
      const attendanceResponse = await axios.get(attendanceUrl);
      console.log('Attendance data:', attendanceResponse.data); // Debugging: Log the attendance data
  
      // Fetch work progress details for the selected employee
      const progressUrl = `http://localhost:5000/api/workprogress/${employee.firebaseId}`;
      console.log('Fetching progress from:', progressUrl);
      const progressResponse = await axios.get(progressUrl);
      console.log('Progress data:', progressResponse.data); // Debugging: Log the progress data

      // Combine attendance and work progress data based on date
      const combined = combineData(attendanceResponse.data, progressResponse.data);

      // Set the selected employee and combined data
      setSelectedEmployee(employee);
      setCombinedData(combined);
    } catch (err) {
      setError('Failed to fetch details for the selected employee');
      console.error(err);
    }
  };

  const combineData = (attendance, progress) => {
    const combined = [];
    const attendanceMap = new Map();
    const progressMap = new Map();

    // Map attendance data by date
    attendance.forEach(att => attendanceMap.set(att.date, att.status));

    // Map work progress data by date
    progress.forEach(prog => progressMap.set(prog.date, prog.work));

    // Combine data based on dates
    const allDates = new Set([...attendanceMap.keys(), ...progressMap.keys()]);
    allDates.forEach(date => {
      combined.push({
        date: new Date(date).toLocaleDateString(),
        status: attendanceMap.get(date) || 'No Data',
        work: progressMap.get(date) || 'No Data'
      });
    });

    return combined;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance and Work Progress</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Mobile</th>
            <th className="px-4 py-2">Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee._id}
              className="bg-white border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleEmployeeClick(employee)}
            >
              <td className="px-4 py-2">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.mobile}</td>
              <td className="px-4 py-2">{new Date(employee.joiningDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Attendance and Work Progress for {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h2>

          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Attendance Status</th>
                <th className="px-4 py-2">Work Progress</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.length > 0 ? (
                combinedData.map((data, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-4 py-2">{data.date}</td>
                    <td className="px-4 py-2">{data.status}</td>
                    <td className="px-4 py-2">{data.work}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
