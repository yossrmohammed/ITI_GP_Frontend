/* eslint-disable react/prop-types */
import Rating from "../Rating/Rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcaseMedical, faClock, faLocationDot, faMoneyBillWave, faUserDoctor } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
function DoctorCard(props) {
  return (
    <div className="px-20">
      <div className="relative border-4 rounded-md h-50 p-3 my-5 w-full flex justify-betwee bg-base-200">
        <div className="flex items-center">
          <div className={props.online == 1 ? 'avatar mx-10 online' : 'avatar mx-10 offline'}>
            <div className="w-24 rounded-full">
              <img src={props.image} />
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-semibold mb-2">
              <span>{props.proffession}: </span>
              {props.proffession === 'Doctor' && <Link to={'/user/doctor/'+ props.id}>{props.name}</Link>}
              {props.proffession === 'Nurse' && <Link to={'/user/nurse/'+ props.id}>{props.name}</Link>}
            </h1>

            <Rating
            rate={props.rating}
            />

            <p>{props.average_rating}</p>
            <div className="my-2">
              
              { props.proffession === 'Doctor' &&
              <p>
              <FontAwesomeIcon className="mr-3 text-xl text-blue-600" icon={faUserDoctor} />
              <span className="font-bold">Specialization: </span>
              {props.specialization} 
              </p>}
              
              <p> 
              <FontAwesomeIcon className="ml-1 mr-4 text-xl text-blue-600" icon={faLocationDot} />
              <span className="font-bold">City: </span>
              {props.city} 
              </p>

              <p> 
              <FontAwesomeIcon className="mr-3 text-xl text-blue-600" icon={faMoneyBillWave} />
              <span className="font-bold">Fees: </span>
              {props.fees} EGP 
              </p>

              <p>
              <FontAwesomeIcon className="mr-3 text-xl text-blue-600" icon={faBriefcaseMedical} />
              <span className="font-bold">Work days: </span>
              {props.work_days?.split(',').map(el => <p key='' className="btn btn-sm disabled mx-1">{el}</p>)} 
              </p>
              
              <p> 
              <FontAwesomeIcon className="mr-3 text-xl text-blue-600" icon={faClock} />
              <span className="font-bold">Work Hours: </span>
                From 
                <span className="font-bold">
                {' ' + props.work_start + ' '} 
                </span>
                to 
                <span className="font-bold">
                  {' ' + props.work_end}
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default DoctorCard