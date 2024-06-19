/* eslint-disable react/prop-types */
import Rating from "../Rating/Rating"

function DoctorCard(props) {
  return (
    <div className="px-20">
      <div className="relative border rounded-md h-50 p-3 my-5 w-full flex justify-between">
        <div className="flex items-center">
          <div className="avatar mx-10">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Doctor" />
            </div>
          </div>
          <div className="ml-5">
            <h1 className="text-xl font-semibold mb-2">
              <span>{props.proffession}: </span>
              {props.name}
            </h1>

            <Rating
            rate='4'
            />
            <div className="my-2">
              <p> <span className="font-bold">Specialization: </span>
              {props.specialization} 
              </p>
              
              <p> <span className="font-bold">City: </span>
              {props.city} 
              </p>

              <p> <span className="font-bold">Fees: </span>
              {props.fees} EGP 
              </p>

              <p> <span className="font-bold">Work days: </span>
              {props.work_days?.split(',').map(el => <p key='' className="btn btn-sm disabled mx-1">{el}</p>)} 
              </p>
              
              <p> <span className="font-bold">Work Hours: </span>
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