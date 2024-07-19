import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../Auth/Firebase'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [period, setPeriod] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Report Component Rendered");
  }, []);

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setPeriod(period);
    console.log('Period set to:', period);
    const end = new Date();
    let start;

    switch (period) {
      case '1w':
        start = new Date(end);
        start.setDate(end.getDate() - 7);
        break;
      case '1m':
        start = new Date(end);
        start.setMonth(end.getMonth() - 1);
        break;
      case '3m':
        start = new Date(end);
        start.setMonth(end.getMonth() - 3);
        break;
      default:
        setStartDate('');
        setEndDate('');
        return;
    }

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    console.log('Start Date:', start.toISOString().split('T')[0], 'End Date:', end.toISOString().split('T')[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error('Please select a valid date range');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const response = await axios.get(`http://localhost:5000/api/attendance/report`, {
        params: {
          userId: user.uid,
          startDate,
          endDate
        }
      });
      console.log('API Response:', response.data); // Log the response
      setReportData(response.data);
      toast.success('Report fetched successfully');
    } catch (error) {
      toast.error('Failed to fetch report');
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Attendance Report</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="period">
              Select Period
            </label>
            <select
              id="period"
              value={period}
              onChange={handlePeriodChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Period</option>
              <option value="1w">Last 1 Week</option>
              <option value="1m">Last 1 Month</option>
              <option value="3m">Last 3 Months</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>
        </form>
        <div>
          {reportData.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Report Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Work Summary
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((item) => (
                    <tr key={item.date}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.workSummary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
