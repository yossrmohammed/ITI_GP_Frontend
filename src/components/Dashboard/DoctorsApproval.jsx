// src/pages/DoctorsApproval.jsx
import React, { useState } from 'react';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri'; // Importing icons from React Icons

const DoctorsApproval = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/150',
      status: 'Pending',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://via.placeholder.com/150',
      status: 'Pending',
    },
    // Add more dummy doctors if needed
  ]);

  const getDummyStatus = (index) => {
    const statuses = ['Pending', 'Approved', 'Rejected'];
    return statuses[index % statuses.length];
  };

  const approveDoctor = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index].status = 'Approved';
    setDoctors(updatedDoctors);
  };

  const rejectDoctor = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index].status = 'Rejected';
    setDoctors(updatedDoctors);
  };

  const deleteCurrentDoctor = (index) => {
    setDoctors(doctors.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Approve Doctors</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.map((doctor, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={doctor.avatar} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{doctor.first_name}</div>
                        <div className="text-sm opacity-50">{doctor.last_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{doctor.email}</td>
                  <td>{moment().add(-5 * (index + 2), 'days').format("DD MMM YY")}</td>
                  <td>{doctor.status}</td>
                  <td>
                    {doctor.status === 'Pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveDoctor(index)}>
                          <RiCheckLine className="w-5" /> 
                        </button>
                        <button className="btn btn-square btn-error ml-2" onClick={() => rejectDoctor(index)}>
                          <RiCloseLine className="w-5" /> 
                        </button>
                      </>
                    )}
                    <button className="btn btn-square btn-ghost ml-2" onClick={() => deleteCurrentDoctor(index)}>
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

export default DoctorsApproval;
