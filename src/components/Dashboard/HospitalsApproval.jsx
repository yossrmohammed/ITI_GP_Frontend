// src/pages/HospitalsApproval.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine } from 'react-icons/ri'; 

const HospitalsApproval = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
 
    const fakeHospitals = [
      { id: 1, name: 'Hospital John Doe', status: 'Pending', createdAt: new Date() },
      { id: 2, name: 'Hospital Jane Smith', status: 'Pending', createdAt: new Date() },

    ];
    setHospitals(fakeHospitals);
  }, []);

  const approveHospital = (hospitalId) => {

    const updatedHospitals = hospitals.map(hospital => {
      if (hospital.id === hospitalId) {
        return { ...hospital, status: 'Approved' };
      }
      return hospital;
    });
    setHospitals(updatedHospitals);
  };

  const deleteCurrentHospital = (hospitalId) => {
  

    const updatedHospitals = hospitals.filter(hospital => hospital.id !== hospitalId);
    setHospitals(updatedHospitals);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approve Hospitals</h1>
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
              hospitals.map((hospital, index) => (
                <tr key={index}>
                  <td>{hospital.name}</td>
                  <td>{moment(hospital.createdAt).format("DD MMM YY")}</td>
                  <td>{hospital.status}</td>
                  <td>
                    {hospital.status === 'Pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveHospital(hospital.id)}>
                          <RiCheckLine className="w-5" /> 
                        </button>
                      </>
                    )}
                    <button className="btn btn-square btn-ghost ml-2" onClick={() => deleteCurrentHospital(hospital.id)}>
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

export default HospitalsApproval;
