import { useEffect, useState } from "react"
import { getDoctorAppointments, ApproveDoctorAppointments, AddNoteToDoctorAppointments} from "/src/axios/DoctorAppointments.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck , faXmark ,faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

function DoctorAppointments () {  

    const doctorId = 1;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [notes, setNotes] = useState('');
    const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

    useEffect(() => {
        if (doctorId) {
          setLoading(true);
          CallDoctorAppointmentsFunction(doctorId)
        
        }
      }, []);
      const CallDoctorAppointmentsFunction = (doctorId) => {
        getDoctorAppointments(doctorId)
        .then(response => {
         setAppointments(response.data.data);
          console.log("getDoctorAppointments response date : ",response.data.data)
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
      };
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
      if (loading) {
        return <>
        <div>LOading</div>
    
        </>
        }
      if (error) {
        return <div>Error: {error.message}</div>;
        }
    
    return (
        <>
        <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg  my-4">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th className="font-bold">Type</th>
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
                                    {appointment.day} - {appointment.date}
                                </td>
                                <td className="flex justify-center">
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
                                    <button className="btn btn-outline btn-success btn-xs"   
                                    onClick={() => handleApprove(appointment.id , "accepted")}>
                                        Accept <FontAwesomeIcon icon={faCheck} /> 
                                    </button>
                                    }    
                                </th>
                                <th>
                                    {appointment.kind_of_visit === "clinic" ? " --" :
                                        <button className="btn btn-outline btn-error btn-xs"
                                        onClick={() => handleApprove(appointment.id , "cancelled")}>
                                        Decline <FontAwesomeIcon icon={faXmark} /> </button>
                                    }
                              
                              </th>
                                <th>
                                {appointment.notes} 
                                <button className="ml-2 btn btn-circle btn-outline btn-info btn-xs"
                                        onClick={() => 
                                            {
                                                setCurrentAppointmentId(appointment.id);
                                                document.getElementById('note_modal').showModal()
                                            }
                                        }>
                                         <FontAwesomeIcon icon={faPlus} /> </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
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
// Zemlak, Daniel and Leannon
// <br />
// <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>