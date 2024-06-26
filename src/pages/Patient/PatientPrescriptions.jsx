import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getAllPatientPrescriptions } from "../../store/slices/PrescriptionSlice";

export default function PatientPrescriptions() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { prescriptions, isLoading } = useSelector((state) => state.prescriptions);

  useEffect(() => {
    if (user) {
      dispatch(getAllPatientPrescriptions({ id: user.id }));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col my-4">
      <div className="grid grid-cols-2 gap-4 w-full">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="card lg:card-side bg-base-100 shadow-xl">
            <div style={{ width: "40%" }}>
              <figure style={{ width: "100%" }}>
                <a href={prescription.prescription_image} target="_blank" rel="noopener noreferrer">
                  <img src={prescription.prescription_image} alt="Prescription" className="w-full" />
                </a>
              </figure>
            </div>

            <div className="card-body" style={{ width: "60%" }}>
              <div className="card-title mb-2">
                <FontAwesomeIcon icon={faUser} />
                <Link to={`/user/doctor/${prescription.doctor_id}`} className="text-blue-500 hover:underline">
                  <p>{prescription.doctor_name}</p>
                </Link>
              </div>
              <div className="card-title mb-2">
                <p><FontAwesomeIcon icon={faPhone} /> {prescription.doctor_phone}</p>
              </div>
              <p className="description-text">
                {prescription.prescription_description
                  ? prescription.prescription_description
                  : "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
