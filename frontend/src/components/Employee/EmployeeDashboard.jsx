import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AttendanceForm from './Attendance/AttendanceForm';
import AttendanceList from './Attendance/AttendanceList';
import WorkProgressForm from './Workprogress/WorkprogressForm';
import WorkProgressList from './Workprogress/WorkprogressList';
import DashboardOverview from './DashboardOverview';
import Profile from './Profile';

const EmployeeDashboard = () => {
  const recentActivities = ['Checked in at 9:00 AM', 'Completed task ABC', 'Checked out at 5:00 PM'];
  const attendances = [{ date: '2023-07-01', status: 'present' }, { date: '2023-07-02', status: 'present' }];
  const progressList = [{ date: '2023-07-01', description: 'Completed module X' }, { date: '2023-07-02', description: 'Started module Y' }];
  const user = { name: 'John Doe', email: 'john.doe@example.com' };

  return (
    <div className="employee-dashboard">
      <Header />
      <Sidebar />
      <main>
        <DashboardOverview recentActivities={recentActivities} />
        <AttendanceForm />
        <AttendanceList attendances={attendances} />
        <WorkProgressForm />
        <WorkProgressList progressList={progressList} />
        <Profile user={user} />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
