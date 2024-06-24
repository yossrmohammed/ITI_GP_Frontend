// src/components/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Statistics from '../Statistics/Statistics';
import DoctorsApproval from './DoctorsApproval';
import NursesApproval from './NursesApproval';
import HospitalsApproval from './HospitalsApproval';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'; // Importing icons from React Icons

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('statistics');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'doctors':
        return <DoctorsApproval />;
      case 'nurses':
        return <NursesApproval />;
      case 'hospitals':
        return <HospitalsApproval />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveComponent={setActiveComponent} />
      <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-10'}`}>
        <button onClick={toggleSidebar} className="btn btn-primary mb-4">
          {isSidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
