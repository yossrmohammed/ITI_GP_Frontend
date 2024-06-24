// src/pages/NursesApproval.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios';
import moment from 'moment';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import Skeleton from '../Skeleton';

const NursesApproval = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  useEffect(() => {
    fetchHospitals(currPage);
  }, [currPage]);

  const fetchHospitals = (page) => {
    setLoading(true);
    axiosInstance.get(`/nurses?page=${page}`)
      .then(response => {
        setNurses(response.data.data);
        setTotalPages(response.data.last_page);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching nurses:", error);
        setLoading(false);
      });
  };
  const approveNurse = (nurseId) => {


  };
 
  const rejectNurse = (nurseId) => {
  
  
  };


  const handlePageChange = (page) => {
    setCurrPage(page);
  };


  return (
    <div className="p-4" style={{ border: '2px solid white', borderRadius: '25px' }}>
      <h1 className="text-2xl font-bold mb-4">Approve Nurses</h1>
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
            {
              nurses.map((nurse, index) => (
                <tr key={index}>
                   <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={nurse?.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{nurse?.user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{moment(nurse?.createdAt).format("DD MMM YY")}</td>
                  <td>{nurse?.verification_status}</td>
                  <td>
                    {nurse.verification_status === 'pending' && (
                      <>
                        <button className="btn btn-square btn-success" onClick={() => approveNurse(nurse.id)}>
                          <RiCheckLine className="w-5" /> 
                        </button>
                        <button className="btn btn-square btn-error ml-2" onClick={() => rejectNurse(nurse.id)}>
                          <RiCloseLine className="w-5" /> 
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            }
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

export default NursesApproval;
