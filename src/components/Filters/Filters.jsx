/* eslint-disable react/prop-types */
import { medicalSpecialties } from '../../data/specalities';
import { egyptianCities } from '../../data/egyptCities';
import { useState } from 'react';

function Filters(props) {

  const [availability, setAvailability] = useState({ today: false, tomorrow: false });
  const [city, setCity] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [fees, setFees] = useState('');
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleAvailabilityChange = (e) => {
    const { name, checked } = e.target;
    setAvailability((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCityChange = (e) => setCity(e.target.value);

  const handleSpecializationChange = (e) => { 
    
    setSpecialization(e.target.value);
  }
  const handleFeesChange = (e) => setFees(e.target.value);

  const handleFilter = () => {
    const filters = {
      name,
      city,
      specialization,
      fees
    };
    
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const day = new Date();
    const today = day.getDay();
    const tomorrow = (today+1) % 6;

    if (availability.tomorrow && availability.today) filters.available = days[today]+','+days[tomorrow-1];
    else if (availability.today) filters.available = days[today];
    else if (availability.tomorrow) filters.available = days[tomorrow-1];
    
    props.onFilterChange(filters);
  };

  const handleReset = () => {
    setAvailability({ today: false, tomorrow: false });
    setCity('');
    setSpecialization('');
    setFees('');
    setName('');
    props.onFilterChange({ name:'' ,city: '', specialization: '', available: '', fees: '' });
  };



  return (
    
    <div className="m-auto mt-5 w-3/4 text-center bg-base-200">
    
    <div className="mt-3 border-4 rounded-xl py-3 px-10">
    <p className="font-bold text-2xl">Filters</p>

    <label className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text font-bold text-lg">Name</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={name} onChange={handleNameChange} />
        <div className="label">
        </div>
    </label>

    <label htmlFor="city" className="label">
        <span className="label-text font-bold text-lg">Availability</span>
    </label>
    <div className="">

    <div className="form-control">
    <label className="label cursor-pointer">
        <span className="label-text">Today</span> 
        <input type="checkbox" className="checkbox checkbox-primary" name='today' value='today' checked={availability.today} onChange={handleAvailabilityChange}/>
    </label>
    </div>

    <div className="form-control">
    <label className="label cursor-pointer">
        <span className="label-text">Tomorrow</span> 
        <input type="checkbox" className="checkbox checkbox-primary" name='tomorrow' value='tomorrow' checked={availability.tomorrow} onChange={handleAvailabilityChange} />
    </label>
    </div>

    </div>

    <div className="form-control">
        <label htmlFor="city" className="label">
            <span className="label-text font-bold text-lg">Select City</span>
        </label>
        <select id="city" className="select select-bordered w-full max-w-xs" value={city} onChange={handleCityChange}>
            <option value="null" selected>Choose city</option>
            {egyptianCities.map(city => (
            <option key={city} value={city}>{city}</option>
            ))}
        </select>
    </div>

    { props.proffession === 'Doctor' &&
      <div>
    <div className="form-control">
      <label htmlFor="specialty" className="label">
        <span className="label-text font-bold text-lg">Select Specialty</span>
      </label>
      <select id="specialty" className="select select-bordered w-full max-w-xs" value={specialization} onChange={handleSpecializationChange}>
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
    }

    <label className="form-control w-full max-w-xs">
        <div className="label">
            <span className="label-text font-bold text-lg">Fees</span>
        </div>
        <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={fees} onChange={handleFeesChange} />
        <div className="label">
        </div>
    </label>



    <div className="d-flex align-baseline justify-content-around">
        <button className="btn btn-primary my-5" onClick={handleFilter}>Filter</button>
        <button className="btn btn-danger my-5 mx-3 " onClick={handleReset}>Reset</button>
    </div>

    </div>
    </div>
  )
}

export default Filters