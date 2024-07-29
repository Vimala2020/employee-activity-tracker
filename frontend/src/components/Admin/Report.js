import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Report = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details
  const [attendanceData, setAttendanceData] = useState([]); // Attendance data
  const [progressData, setProgressData] = useState([]); // Work progress data
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch employee data
        const response = await axios.get('https://attendance-tracker-backend-vwag.onrender.comapi/employee');
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
      const attendanceUrl = `https://attendance-tracker-backend-vwag.onrender.comapi/attendance/${employee.firebaseId}`;
      console.log('Fetching attendance from:', attendanceUrl);
      const attendanceResponse = await axios.get(attendanceUrl);
      console.log('Attendance data:', attendanceResponse.data); // Debugging: Log the attendance data

      // Fetch work progress details for the selected employee
      const progressUrl = `https://attendance-tracker-backend-vwag.onrender.comapi/workprogress/${employee.firebaseId}`;
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

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    // Define the CSV header
    const header = ['Date', 'Attendance Status', 'Work Progress'];

    // Map data to CSV format
    const rows = data.map((item) => [
      formatDisplayDate(item.date),
      item.status,
      item.work,
    ]);

    // Join header and rows
    const csvContent = [header, ...rows]
      .map((row) => row.join(','))
      .join('\n');

    return csvContent;
  };

  // Function to handle CSV download
  const handleDownloadCSV = (employee) => {
    const data = mergeAttendanceAndProgress();

    if (data.length === 0) {
      alert('No data available to download.');
      return;
    }

    const csvContent = convertToCSV(data);

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to download the CSV file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${employee.firstName}_${employee.lastName}_attendance.csv`);
    link.style.display = 'none';

    // Append link to the body and click it
    document.body.appendChild(link);
    link.click();

    // Clean up the link after download
    document.body.removeChild(link);
  };

  // Function to handle PDF download
  const handleDownloadPDF = (employee) => {
    const data = mergeAttendanceAndProgress();

    if (data.length === 0) {
      alert('No data available to download.');
      return;
    }

    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text(`Attendance and Work Progress for ${employee.firstName} ${employee.lastName}`, 14, 10);

    // Define table columns and data
    const columns = ['Date', 'Attendance Status', 'Work Progress'];
    const rows = data.map((item) => [
      formatDisplayDate(item.date),
      item.status,
      item.work,
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF with a custom file name
    doc.save(`${employee.firstName}_${employee.lastName}_attendance.pdf`);
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
        <div>
          <h2 className="text-lg md:text-xl font-bold mb-2">
            {selectedEmployee.firstName} {selectedEmployee.lastName}'s Details
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleDownloadCSV(selectedEmployee)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Download CSV
            </button>

            <button
              onClick={() => handleDownloadPDF(selectedEmployee)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>

          <table className="table-auto w-full mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Attendance Status</th>
                <th className="px-4 py-2">Work Progress</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 || progressData.length > 0 ? (
                mergeAttendanceAndProgress().map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-4 py-2">{formatDisplayDate(item.date)}</td>
                    <td
                      className={`px-4 py-2 text-center ${
                        item.status.toLowerCase() === 'absent' ? 'text-red-500' : ''
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-4 py-2">{item.work}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="3">
                    No attendance or work progress data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Report;
