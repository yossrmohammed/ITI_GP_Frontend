import { Fragment, useEffect, useState } from "react"
import { getReadPrescriptions } from "/src/axios/Prescriptions.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
function ReadPrescriptions() {  

    const doctorId = 1;
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (doctorId) {
          setLoading(true);
          getReadPrescriptions(doctorId)
            .then(response => {
              setPrescriptions(response.data.data);
              console.log("getReadPrescriptions response date : ",response.data.data)
              setLoading(false);
            })
            .catch(error => {
              setError(error);
              setLoading(false);
            });
        }
      }, []);
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
    if (loading) {
    return <>
    <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col md:flex-row my-4">
        <div className="grid grid-cols-2 gap-4 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card lg:card-side bg-base-100 shadow-xl mb-4">
          <div style={{ width: "40%" }}>
            <div className="skeleton h-32 w-full"></div>
          </div>
          <div className="card-body" style={{ width: "60%" }}>
            <div className="skeleton h-4 w-28 mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
          </div>
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
        <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col md:flex-row my-4">
        <div className="grid grid-cols-2 gap-4 w-full">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="card lg:card-side bg-base-100 shadow-xl">
            <div  style={{width: "40%"}}>
                    <figure style={{width: "100%"}}>
                    {/* <img src={prescription.prescription_image} alt="Album" /> */}
                            <a href={prescription.prescription_image} target="_blank" rel="noopener noreferrer">
                                <img src={prescription.prescription_image} alt="Album" className="w-full" />
                            </a>
                    </figure>
            </div>
            
            <div className="card-body" style={{width: "60%"}}>
              <div className="card-title mb-2">
                    <p> <FontAwesomeIcon icon={faUser} /> {prescription.patient_name}</p>
                    {prescription.patient_DOB && <span className="badge badge-outline">{calculateAge(prescription.patient_DOB)} Years</span>}
                    {prescription.patient_gender == "f" ? <span className="badge badge-secondary">Female</span> : <span className="badge badge-info">Male</span>}
              </div>
              <div className="card-title  mb-2">
                    <p> <FontAwesomeIcon icon={faPhone} />  {prescription.patient_phone} </p>
              </div>
              <p>{prescription.prescription_description}.</p>
              
            </div>
          </div>
        ))}
      </div>
            
        </div>
    </>
)
}

export default ReadPrescriptions;
