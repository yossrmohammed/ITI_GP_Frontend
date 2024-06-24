// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setActiveComponent }) => {
  return (
    <div className={`bg-gray-800 text-white p-4 ${isOpen ? 'w-1/4' : 'w-0'} transition-all duration-300`}>
      {isOpen && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <nav className="flex flex-col space-y-4">
            <button onClick={() => setActiveComponent('statistics')} className="btn btn-primary">Statistics</button>
            <button onClick={() => setActiveComponent('doctors')} className="btn btn-primary">Approve Doctors</button>
            <button onClick={() => setActiveComponent('nurses')} className="btn btn-primary">Approve Nurses</button>
            <button onClick={() => setActiveComponent('hospitals')} className="btn btn-primary">Approve Hospitals</button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
