import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDetails = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details
  const [attendanceData, setAttendanceData] = useState([]); // Selected employee's attendance data
  const [progressData, setProgressData] = useState([]); // Selected employee's work progress data
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
      setAttendanceData(attendanceResponse.data);
  
      // Fetch work progress details for the selected employee
      const progressUrl = `http://localhost:5000/api/workprogress/${employee.firebaseId}`;
      console.log('Fetching progress from:', progressUrl);
      const progressResponse = await axios.get(progressUrl);
      console.log('Progress data:', progressResponse.data); // Debugging: Log the progress data
      setProgressData(progressResponse.data);
  
      // Set the selected employee
      setSelectedEmployee(employee);
    } catch (err) {
      setError('Failed to fetch details for the selected employee');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Attendance and Work Progress</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="table-auto w-full">
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

          <h3 className="text-lg font-semibold">Attendance Records:</h3>
          <ul className="list-disc pl-6 mb-4">
            {attendanceData.length > 0 ? (
              attendanceData.map((att) => (
                <li key={att._id}>
                  Date: {new Date(att.date).toLocaleDateString()} - Status: {att.status}
                </li>
              ))
            ) : (
              <li>No attendance records found.</li>
            )}
          </ul>

          <h3 className="text-lg font-semibold">Work Progress:</h3>
          <ul className="list-disc pl-6">
            {progressData.length > 0 ? (
              progressData.map((prog) => (
                <li key={prog._id}>
                  Date: {new Date(prog.date).toLocaleDateString()} - Work: {prog.work}
                </li>
              ))
            ) : (
              <li>No work progress found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
