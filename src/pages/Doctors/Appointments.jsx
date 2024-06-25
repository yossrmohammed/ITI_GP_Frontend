import { useEffect, useState } from "react"
import { getDoctorAppointments, ApproveDoctorAppointments, AddNoteToDoctorAppointments} from "/src/axios/DoctorAppointments.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck , faXmark ,faPlus, faPen} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import "/src/App.css";
import {calculateAge} from "/src/helperFunctions"
function DoctorAppointments () {  

    const loggedUser = useSelector((state) => state.auth.user);
    const doctorId = loggedUser.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [notes, setNotes] = useState('');
    const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
   
    const [selectedkindOfVisitFilter, setSelectedkindOfVisitFilter] = useState('all'); 

    const [currPage,setCurrPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    const [date, setDate] = useState(null);

    useEffect(() => {
        if (doctorId) {
          setLoading(true);
          CallDoctorAppointmentsFunction(doctorId);
        }
      }, [currPage]);
      const CallDoctorAppointmentsFunction = (doctorId ) => {
        const params = {};
        params.kind_of_visit = selectedkindOfVisitFilter;
        params.date = date;
        params.page = currPage;

        getDoctorAppointments(doctorId , params)
        .then(response => {
         setAppointments(response.data.data);
         setTotalPages(response.data.pagination.total_pages);
          console.log("getDoctorAppointments response date : ",response.data.data)
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
      };
      const handlePageChange = (page) => {
        setCurrPage(page);
    }
      const handlekindOfVisitFilter = (event) => {
        setSelectedkindOfVisitFilter(event.target.value);
        console.log("selectedkindOfVisitFilter : ",event.target.value)
      };
    
      const handleFilterButtonClick = () => {
        setCurrPage(1);
        CallDoctorAppointmentsFunction(doctorId);
      };
      const handleDateFilter =(event)=>{
        setDate(event.target.value);
        console.log("selectedDate : ",event.target.value)
      }
      const getBadgeClass = (status) => {
        switch (status) {
          case "accepted":
            return "badge badge-success ";
          case "cancelled":
            return "badge badge-error";
          default:
            return "badge badge-neutral";
        }
      };
      const handleApprove = (appointmentId , status) => {
        const formData = new FormData();
        formData.append("_method", "patch");
        formData.append("status", status);
        ApproveDoctorAppointments(appointmentId, formData)
          .then(response => {
            setAppointments(prevAppointments =>
              prevAppointments.map(appointment =>
                appointment.id === appointmentId ? { ...appointment, status: status } : appointment
              )
            );
          })
          .catch(error => {
            console.error("Error approving appointment:", error);
          });
      };
      const handleAddNote = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method","patch");
        formData.append("notes",notes);
        AddNoteToDoctorAppointments(currentAppointmentId, formData)
                .then(response => {
                  console.log('Note submitted successfully');
                  document.getElementById('note_modal').close();
                  setNotes('');
                  setCurrentAppointmentId(null);
                  CallDoctorAppointmentsFunction(doctorId)
                  Swal.fire({
                    icon: "success",
                    text: "Your Note submitted successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                })
                .catch(error => {
                  console.error('Error submitting reply:', error);
                });
      };
      const renderSkeletonTable = () => (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-24"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
     
      if (error) {
        return <div>Error: {error.message}</div>;
        }
    
    return (
        <>
        <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg  my-4 flex justify-between">
            <div className="filters-container p-4 rounded-lg max-h-fit"> 
                <h2 className="text-2xl font-bold mb-4">Appointment Type</h2>
                <hr></hr>
                <div className="form-control ">
                    <label className="label cursor-pointer">
                        <span className="label-text">All Appointments</span>
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio radio-sm ml-2"
                            value="all"
                            checked={selectedkindOfVisitFilter === 'all'}
                            onChange={handlekindOfVisitFilter}
                            />               
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">  Clinic Appointments</span>
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio radio-sm ml-2"
                            value="clinic"
                            checked={selectedkindOfVisitFilter === 'clinic'}
                            onChange={handlekindOfVisitFilter}
                            />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Home Visit Appointments</span>
                        <input
                            type="radio"
                            name="radio-1"
                            className="radio radio-sm ml-2"
                            value="home"
                            checked={selectedkindOfVisitFilter === 'home'}
                            onChange={handlekindOfVisitFilter}
                            />
                    </label>
                </div>
                <br></br>
                
                <h2 className="text-2xl font-bold mb-4">Appointment Date</h2>
                <hr></hr>
                <input type="date" value={date}  onChange={handleDateFilter} placeholder="Type here" 
                className="input input-bordered w-full max-w-xs mt-3" />
                <button
                    className="btn btn-info mt-4"
                    onClick={handleFilterButtonClick} >Apply Filter
                </button>

               
                
            </div>
        {loading ? renderSkeletonTable() : (
            <div className="table-container overflow-x-auto grow ml-5">
                <table className="table text-base">
                    <thead  className="text-base font-bold">
                        <tr className="text-center"> 
                            <th >Type</th>
                            <th>Patient</th>
                            <th>Date</th>
                            <th >Status</th>
                            <th>Accept</th>
                            <th>Decline</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr className="text-center">
                                <td>
                                    {appointment.kind_of_visit}
                                </td>
                                <td>
                                    <Link to={`/patient/${appointment.patient_id}`} className="text-blue-500 hover:underline">
                                        {appointment.patient_name}
                                    </Link> - {calculateAge(appointment.patient_DOB)} Years
                                         {/* <br /> */}
                                        {/* < br /> */}
                                    {/* {appointment.patient_phone}                                     */}
                                </td>
                                <td>
                                    {appointment.day} - {appointment.date}
                                </td>
                                <td className="">
                                    {
                                    appointment.kind_of_visit === "clinic" ? " --" :
                                    <div className={getBadgeClass(appointment.status) } >
                                        {appointment.status}
                                    </div>
                                    }
                                </td>
                                <th>
                                   {
                                    appointment.kind_of_visit === "clinic" ? " --" :
                                    <button className="btn btn-circle btn-outline btn-success btn-sm"   
                                    onClick={() => handleApprove(appointment.id , "accepted")}>
                                         <FontAwesomeIcon icon={faCheck} /> 
                                    </button>
                                    }    
                                </th>
                                <th>
                                    {appointment.kind_of_visit === "clinic" ? " --" :
                                        <button className=" btn btn-circle btn-outline btn-error btn-sm"
                                        onClick={() => handleApprove(appointment.id , "cancelled")}>
                                         <FontAwesomeIcon icon={faXmark} /> </button>
                                    }
                              
                              </th>
                                <th style={{ maxWidth: '200px' }} >
                                <p className="note-text">{appointment.notes} </p>
                                <button className="ml-2 btn-xs"
                                        onClick={() => 
                                            {
                                                setCurrentAppointmentId(appointment.id);
                                                document.getElementById('note_modal').showModal()
                                            }
                                        }>
                                         <FontAwesomeIcon icon={faPen} className="text-info text-base" /> </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
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
            </div>
        )}
            <dialog id="note_modal" className="modal" >
                <div className="modal-box" style={{ width: '500px', maxWidth: '90%', maxHeight: '400px' }}>
                <div className="modal-action mt-0 flex flex-col justify-center items-center ">
                    <h2 className="font-bold mb-3 text-lg">Write Your Note</h2>
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={handleAddNote}>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById('note_modal').close()}>X</button>
                    <textarea
                        className="textarea textarea-bordered textarea-lg w-full max-w-xs w-full"
                        placeholder="Write Your note"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                        style={{ maxWidth: '500px', height: '200px' }}
                    ></textarea>
                    <button type="submit" className="btn mt-4 btn-outline btn-sm btn-wide rounded-full btn-info">Submit</button>
                    </form>
                </div>
                </div>
            </dialog>
        </div>
        </>
    )
}
export default DoctorAppointments;
