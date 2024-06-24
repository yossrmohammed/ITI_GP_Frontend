// src/pages/DoctorsApproval.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsApproval = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors awaiting approval
    /*axios.get('/api/doctors?status=pending').then(response => {
      setDoctors(response.data);
    });*/
    const fakeDoctors = [
        { id: 1, name: 'Dr. John Doe' },
        { id: 2, name: 'Dr. Jane Smith' },
        { id: 3, name: 'Dr. William Johnson' }
      ];
      setDoctors(fakeDoctors);
  }, []);

  const approveDoctor = (doctorId) => {
    axios.put(`/api/doctors/${doctorId}`, { status: 'approved' }).then(() => {
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approve Doctors</h1>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.name}
            <button onClick={() => approveDoctor(doctor.id)} className="btn btn-success ml-2">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsApproval;
