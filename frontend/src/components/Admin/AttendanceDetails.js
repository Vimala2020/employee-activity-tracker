import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDetails = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details
  const [attendanceData, setAttendanceData] = useState([]); // Attendance data
  const [progressData, setProgressData] = useState([]); // Work progress data
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

      // Set the attendance and work progress data
      setAttendanceData(attendanceResponse.data);
      setProgressData(progressResponse.data);

      // Set the selected employee
      setSelectedEmployee(employee);
    } catch (err) {
      setError('Failed to fetch details for the selected employee');
      console.error(err);
    }
  };

  // Helper function to merge attendance and progress data
  const mergeAttendanceAndProgress = () => {
    // Convert both dates to the same format for comparison
    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    // Create a map to store work progress by date for quick lookup
    const progressMap = new Map();
    progressData.forEach((progress) => {
      const formattedDate = formatDate(progress.date);
      progressMap.set(formattedDate, progress.work);
    });

    // Merge attendance and progress data based on the formatted date
    const mergedData = attendanceData.map((attendance) => {
      const formattedDate = formatDate(attendance.date);
      return {
        date: formattedDate,
        status: attendance.status,
        work: progressMap.get(formattedDate) || '- - - - - ',
      };
    });

     // Sort merged data by date
     mergedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return mergedData;
  };

   // Helper function to format dates as "day month year"
   const formatDisplayDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Employee Attendance and Work Progress</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2 hidden md:block">Mobile</th>
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
              <td className="px-4 py-2 capitalize text-center">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-4 py-2 text-center">{employee.email}</td>
              <td className="px-4 py-2 hidden md:block text-center">{employee.mobile}</td>
              <td className="px-4 py-2 text-center">{formatDisplayDate(employee.joiningDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 capitalize">
            Attendance and Work Progress for {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h2>

          <table className="table-auto w-full mb-8">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Attendance Status</th>
                <th className="px-4 py-2">Work Progress</th>
              </tr>
            </thead>
            <tbody>
              {mergeAttendanceAndProgress().length > 0 ? (
                mergeAttendanceAndProgress().map((data, index) => (
                  <tr key={index} className="bg-white border-b ">
                     <td className="px-4 py-2 text-center">{formatDisplayDate(data.date)}</td>
                    <td
                      className={`px-4 py-2 text-center ${
                        data.status.toLowerCase() === 'absent' ? 'text-red-500' : ''
                      }`}
                    >
                      {data.status}
                    </td>
                    <td className="px-4 py-2 ">{data.work}</td>
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
