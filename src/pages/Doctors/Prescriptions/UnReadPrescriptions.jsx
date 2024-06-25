import { Fragment, useEffect, useState } from "react"
import { getUnReadPrescriptions ,replyToPrescription } from "/src/axios/Prescriptions.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCalendarDays, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'

function UnReadPrescriptions() {  

    const loggedUser = useSelector((state) => state.auth.user);
    const doctorId = loggedUser.id;
    
    const [prescriptions, setPrescriptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState('');
    const [currentPrescriptionId, setCurrentPrescriptionId] = useState(null);

    const [currPage,setCurrPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    useEffect(() => {
        if (doctorId) {
          setLoading(true);
          callUnReadPrescriptionsFunction(doctorId)
        }
      }, [currPage]);
  const calculateAge = (birthDateString) => {
      const birthDate = new Date(birthDateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
    
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    
      return age;
    };
  function callUnReadPrescriptionsFunction(doctorId){
      const params = {};
      params.page = currPage;
      getUnReadPrescriptions(doctorId, params)
      .then(response => {
        setPrescriptions(response.data.data);
        setTotalPages(response.data.pagination.total_pages);
        console.log("getUnReadPrescriptions response date : ",response.data.data)
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }

    const handlePageChange = (page) => {
      setCurrPage(page);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("_method","patch");
      formData.append("description",description);
      replyToPrescription(currentPrescriptionId, formData)
              .then(response => {
                console.log('Reply submitted successfully');
                document.getElementById('my_modal_1').close();
                setDescription('');
                setCurrentPrescriptionId(null);
                callUnReadPrescriptionsFunction(doctorId)
                Swal.fire({
                  icon: "success",
                  text: "Your reply submitted successfully",
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
        <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col md:flex-row my-4">
            <div className="grid grid-cols-2 gap-4 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
            <div className="card  bg-base-100 w-96 shadow-xl p-6">
                <div className="mb-4">
                <div className="skeleton h-32 w-full"></div>
                </div>
                <div className="skeleton h-4 w-28 mb-2"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
              </div>
          ))}
            </div>
    </div>

    </>
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }

    return (
    <>
    <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col  my-4">
        <div className="grid grid-cols-3 gap-3 w-full">
        {prescriptions.map((prescription) => (
            <div className="card card-compact bg-base-100 w-97 shadow-xl">
                <div className="avatar w-full">
                        <div className="w-full rounded">
                            <a href={prescription.prescription_image} target="_blank" rel="noopener noreferrer">
                                <img src={prescription.prescription_image} alt="Album" className="w-full" />
                            </a>                       
                        </div>
                </div>
                <div className="card-body">
                    <div className="card-title mb-2">
                            <p> <FontAwesomeIcon icon={faUser} /> {prescription.patient_name}</p>
                            {/* {prescription.patient_DOB && <span className="badge badge-outline">{calculateAge(prescription.patient_DOB)} Years</span>} */}
                            {prescription.patient_gender == "f" ? <span className="badge badge-secondary">Female</span> : <span className="badge badge-info">Male</span>}
                    </div>
                    <div className="card-title  mb-2">
                            <p> <FontAwesomeIcon icon={faPhone} />  {prescription.patient_phone} </p>
                    </div>
                    <div className="card-title  mb-2">
                      {prescription.patient_DOB && <p ><FontAwesomeIcon icon={faCalendarDays} /> {calculateAge(prescription.patient_DOB)} Years</p>}
                    </div>
                    <div className="card-actions justify-center">
                    <button className="btn btn-outline  btn-md btn-wide rounded-full btn-info "
                     onClick={()=>{
                      setCurrentPrescriptionId(prescription.id);
                      document.getElementById('my_modal_1').showModal()
                      }}>Reply</button>
            </div>
               </div>
            </div>
        ))}
      </div>
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

    <dialog id="my_modal_1" className="modal" >
        <div className="modal-box" style={{ width: '500px', maxWidth: '90%', maxHeight: '400px' }}>
          <div className="modal-action mt-0 flex flex-col justify-center items-center ">
            <h2 className="font-bold mb-3 text-lg">Write Your description</h2>
            <form className="flex flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById('my_modal_1').close()}>X</button>
              <textarea maxlength="700"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs w-full"
                placeholder="Write Your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ maxWidth: '500px', height: '200px' }}
              ></textarea>
              <button type="submit" className="btn mt-4 btn-outline btn-sm btn-wide rounded-full btn-info">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
)
}

export default UnReadPrescriptions;
