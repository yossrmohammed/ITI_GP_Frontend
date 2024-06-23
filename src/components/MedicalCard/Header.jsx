/* eslint-disable react/prop-types */

import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcaseMedical, faBuildingColumns, faClock, faEnvelope, faLocationDot, faMoneyBillWave, faPhone, faUserDoctor } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
const headerClass = "text-lg font-semibold card-title";
const iconClass = "text-blue-600 text-3xl";

const rate = Number(props.rating) || 0;
  return (
    <div className="container mx-auto p-5">
      <div className="card lg:card-side bg-base-200 shadow-xl border-2 p-5">
        <div className="lg:w-1/3">
    {props.image ? (
      <img
        src={props.image}
        alt={props.role}
        className="m-auto my-10 w-40 rounded-full"
      />
    ) : (
      <img
        src={
          props.role === 'doctor'
            ? "https://i.ibb.co/J5XNVjg/default-doctor.webp"
            : "https://i.ibb.co/7ybQ2T4/default-nurse.png"
        }
        alt={props.role}
        className="mx-auto my-10 w-40 rounded-full ring ring-base-content"
      />
    )}

        </div>
        <div className="card-body lg:w-2/3">

          <h2 className={`card-title text-2xl font-bold mb-1`}>{props.role === 'doctor' ? 'Dr:' : 'Nurse:'} {props.name}</h2>

          <Rating rate={rate}/>
          <div>
            <h3 className={headerClass}>Qualifications: </h3>
            <p className="font-normal">{props.qualifications} </p>
          </div>

          <div className="mt-4 inline-block">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faBuildingColumns} />
              Education: <span className="font-normal">{props.university} </span></h3>
          </div>
          {
            props.role === 'doctor' &&
            <div className="mt-4">
            <h3 className={headerClass}>
            <FontAwesomeIcon className={iconClass} icon={faUserDoctor} />
              Specialization: <span className="font-normal">{props.specialization} </span></h3>
          </div>
          }

          <div className="mt-4">
            <h3 className={headerClass}>
            <FontAwesomeIcon className={iconClass} icon={faMoneyBillWave} />
              Fees: <span className="font-normal">{props.fees} EGP</span></h3>
          </div>

          {
            props.role === 'doctor' &&
            <div className="mt-4">
            <h3 className={headerClass}>
            <FontAwesomeIcon className={iconClass} icon={faLocationDot} />
              Clinic Address: <span className="font-normal">{props.address}</span></h3>
          </div>
          }

          <div className="mt-4">
            <h3 className={headerClass}>
            <FontAwesomeIcon className={iconClass} icon={faEnvelope} />
              Email: <span className="font-normal">{props.email}</span></h3>
          </div>

          <div className="mt-4">
            <h3 className={headerClass}>
            <FontAwesomeIcon className={iconClass} icon={faPhone} />
              Phone: <span className="font-normal">{props.phone}</span></h3>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Book Appointment</button>
            <button className="btn btn-outline">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Header