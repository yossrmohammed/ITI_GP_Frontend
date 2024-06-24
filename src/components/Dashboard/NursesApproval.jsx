// src/pages/NursesApproval.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine } from 'react-icons/ri'; 

const NursesApproval = () => {
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
  
    const fakeNurses = [
      { id: 1, name: 'Nurse John Doe', status: 'Pending', createdAt: new Date() },
      { id: 2, name: 'Nurse Jane Smith', status: 'Pending', createdAt: new Date() },

    ];
    setNurses(fakeNurses);
  }, []);

  const approveNurse = (nurseId) => {

    const updatedNurses = nurses.map(nurse => {
      if (nurse.id === nurseId) {
        return { ...nurse, status: 'Approved' };
      }
      return nurse;
    });
    setNurses(updatedNurses);
  };

  const deleteCurrentNurse = (nurseId) => {
    
    const updatedNurses = nurses.filter(nurse => nurse.id !== nurseId);
    setNurses(updatedNurses);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approve Nurses</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              nurses.map((nurse, index) => (
                <tr key={index}>
                  <td>{nurse.name}</td>
                  <td>{moment(nurse.createdAt).format("DD MMM YY")}</td>
                  <td>{nurse.status}</td>
                  <td>
                    {nurse.status === 'Pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveNurse(nurse.id)}>
                          <RiCheckLine className="w-5" /> 
                        </button>
                      </>
                    )}
                    <button className="btn btn-square btn-ghost ml-2" onClick={() => deleteCurrentNurse(nurse.id)}>
                      <RiDeleteBinLine className="w-5" /> 
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NursesApproval;
