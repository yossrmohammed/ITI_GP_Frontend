import { medicalSpecialties } from '../../data/specalities';
import { egyptianCities } from '../../data/egyptCities';

function Filters() {
    console.log(medicalSpecialties);
  return (
    
    <div className="col-3 d-none d-lg-block">
    
    <div className="mt-3 border-2 rounded-xl py-3 px-10">
    <h5 className="mx-3 fw-bold">Filters</h5>

    <p className="mx-3 my-3">Availability</p>
    <div className="">

    <div className="form-control">
    <label className="label cursor-pointer">
        <span className="label-text">Today</span> 
        <input type="checkbox" className="checkbox checkbox-primary" />
    </label>
    </div>



    <div className="form-control">
    <label className="label cursor-pointer">
        <span className="label-text">Tomorrow</span> 
        <input type="checkbox" className="checkbox checkbox-primary" />
    </label>
    </div>

    </div>

    {/* city */}
    <div className="form-control">
        <label htmlFor="city" className="label">
            <span className="label-text">Select City</span>
        </label>
        <select id="city" className="select select-bordered w-full max-w-xs">
            {egyptianCities.map(city => (
            <option key={city} value={city}>{city}</option>
            ))}
        </select>
    </div>

    {/* spaciality */}
    <div>
    <div className="form-control">
      <label htmlFor="specialty" className="label">
        <span className="label-text">Select Specialty</span>
      </label>
      <select id="specialty" className="select select-bordered w-full max-w-xs">
        {Object.entries(medicalSpecialties).map(([category, specialties]) => (
          <optgroup key={category} label={category}>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>    
    </div>

    <p className="mx-3 fw-bold my-3">Fees</p>


    <label className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text">What is your name?</span>
        </div>
        <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <div className="label">
        </div>
    </label>



    <div className="d-flex align-baseline justify-content-around">
        <button className="btn btn-primary my-5">Filter</button>
        <button className="btn btn-danger my-5 mx-3 ">Reset</button>
    </div>

    </div>
    </div>
  )
}

export default Filters