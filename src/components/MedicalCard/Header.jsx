/* eslint-disable react/prop-types */

import Rating from "../Rating/Rating";

function Header(props) {
const headerClass = "text-lg font-semibold card-title";

  return (
    <div className="container mx-auto p-5">
      <div className="card lg:card-side bg-base-100 shadow-xl border-2 p-5">
        <div className="lg:w-1/3">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="Doctor"
            className="m-auto my-10 w-40 rounded-full"
          />
        </div>
        <div className="card-body lg:w-2/3">

          <h2 className={`card-title text-2xl font-bold mb-4`}>{props.role === 'doctor' ? 'Dr:' : 'Nurse:'} {props.name}</h2>

          <Rating rate='4'/>
          <div>
            <h3 className={headerClass}>Qualifications: </h3>
            <p className="font-normal">{props.qualifications} </p>
          </div>

          <div className="mt-4">
            <h3 className={headerClass}>Education: <span className="font-normal">{props.university} </span></h3>
          </div>
          {
            props.role === 'doctor' &&
            <div className="mt-4">
            <h3 className={headerClass}>Specialization: <span className="font-normal">{props.specialization} </span></h3>
          </div>
          }

          <div className="mt-4">
            <h3 className={headerClass}>Fees: <span className="font-normal">{props.fees} EGP</span></h3>
          </div>

          {
            props.role === 'doctor' &&
            <div className="mt-4">
            <h3 className={headerClass}>Clinic Address: <span className="font-normal">{props.address}</span></h3>
          </div>
          }

          <div className="mt-4">
            <h3 className={headerClass}>Email: <span className="font-normal">{props.email}</span></h3>
          </div>

          <div className="mt-4">
            <h3 className={headerClass}>Phone: <span className="font-normal">{props.phone}</span></h3>
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