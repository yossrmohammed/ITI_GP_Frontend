import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import Skeleton from '../Skeleton';

const HospitalsApproval = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHospitals(currPage);
  }, [currPage]);

  const fetchHospitals = (page) => {
    setLoading(true);
    axiosInstance.get(`/hospital?page=${page}`)
      .then(response => {
        setHospitals(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching hospitals:", error);
        setLoading(false);
      });
  };
// 'accepted', 'rejected'
  const approveHospital = (hospitalId) => {
    axiosInstance.put(`hospital/${hospitalId}/verification`,{ status:'accepted'})
    .then(response => {
      const updatedHospitals = hospitals.map(hospital => {
        if (hospital.id === hospitalId) {
          return { ...hospital, verification_status: 'accepted' };
        }
        return hospital;
      });
      setHospitals(updatedHospitals);
    })
    .catch(error => {
      console.error("Error fetching hospitals:", error);
      
    });
  };

  const rejectHospital = (hospitalId) => {
    axiosInstance.put(`hospital/${hospitalId}/verification`,{ status:'rejected'})
    .then(response => {
      const updatedHospitals = hospitals.map(hospital => {
        if (hospital.id === hospitalId) {
          return { ...hospital, verification_status: 'rejected' };
        }
        return hospital;
      });
      setHospitals(updatedHospitals);
    })
    .catch(error => {
      console.error("Error fetching hospitals:", error);
      
    });
  };


  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  return (
    <div className="p-4" style={{ border: '2px solid white', borderRadius: '25px' }}>
      <h1 className="text-2xl font-bold mb-4">Approve Hospitals</h1>
      <div className="overflow-x-auto w-full">
        {loading ? (
          <Skeleton count={5} />
        ) : (
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
              {hospitals?.map((hospital, index) => (
                <tr key={index}>
                  <td>{hospital.user.name}</td>
                  <td>{moment(hospital.created_at).format("DD MMM YY")}</td>
                  <td>{hospital.verification_status}</td>
                  <td>
                    {hospital.verification_status === 'pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveHospital(hospital.id)}>
                          <RiCheckLine className="w-5" /> 
                        </button>
                        <button className="btn btn-square btn-error ml-2" onClick={() => rejectHospital(hospital.id)}>
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

export default HospitalsApproval;
