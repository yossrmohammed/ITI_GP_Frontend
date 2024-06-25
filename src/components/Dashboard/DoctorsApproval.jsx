// src/pages/DoctorsApproval.jsx
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import { axiosInstance } from '../../axios';
import Skeleton from '../Skeleton';

const DoctorsApproval = () => {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDoctors(currPage);
  }, [currPage]);

  const fetchDoctors = (page) => {
    setLoading(true);
    axiosInstance.get(`/doctors?page=${page}`)
      .then(response => {
        setDoctors(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  };

  const approveDoctor = (doctorId) => {
    axiosInstance.patch(`/doctors/${doctorId}/verify`,{ verification_status:'accepted'})
    .then(response => {
      const updatedDoctors = doctors.map(doctor => {
        if (doctor.id === doctorId) {
          return { ...doctor, verification_status: 'accepted' };
        }
        return doctor;
      });
      setDoctors(updatedDoctors);
    })
    .catch(error => {
      console.error("Error fetching doctors:", error);
      
    });
  };

  const rejectDoctor = (doctorId) => {
    axiosInstance.patch(`/doctors/${doctorId}/verify`,{ verification_status:'rejected'})
    .then(response => {
      const updatedDoctors = doctors.map(doctor => {
        if (doctor.id === doctorId) {
          return { ...doctor, verification_status: 'rejected' };
        }
        return doctor;
      });
      setDoctors(updatedDoctors);
    })
    .catch(error => {
      console.error("Error fetching doctors:", error);
      
    });
   
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  return (
    <div className="p-4" style={{ border: '2px solid white', borderRadius: '25px' }}>
      <h1 className="text-2xl font-bold mb-4">Approve Doctors</h1>
      <div className="overflow-x-auto w-full">
        {loading ? (
          <Skeleton count={5} />
        ) : (
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
              {doctors.map((doctor, index) => (
                <tr key={index+1}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={doctor.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{doctor?.user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{doctor.user.email}</td>
                  <td>{moment(doctor.created_at).format("DD MMM YY")}</td>
                  <td>{doctor.verification_status}</td>
                  <td>
                    {doctor.verification_status === 'pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveDoctor(doctor.id)}>
                          <RiCheckLine className="w-5" />
                        </button>
                        <button className="btn btn-square btn-error ml-2" onClick={() => rejectDoctor(doctor.id)}>
                          <RiCloseLine className="w-5" />
                        </button>
                      </>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <div className="text-center">
            <div className="join my-5">
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currPage - 1)}
                disabled={currPage === 1}
              >
                «
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  className={`join-item btn btn-md ${currPage === page + 1 ? 'btn-active' : ''}`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currPage + 1)}
                disabled={currPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsApproval;
