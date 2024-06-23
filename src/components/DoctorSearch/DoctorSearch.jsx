// DoctorSearch.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../../axios'; // Import your axios instance

const DoctorSearch = ({ steps, triggerNextStep }) => {
  const { city_name } = steps;
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    const fetchDoctorsByCity = async (city) => {
      try {
        const response = await axiosInstance.get('/doctors', { params: { city } });
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    if (city_name.value) {
      fetchDoctorsByCity(city_name.value);
    }
  }, [city_name]);

  return (
    <div>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <div>
          <p>Here are the doctors in {city_name.value}:</p>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.id}>{doctor.user?.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No doctors found in {city_name.value}.</p>
      )}
      <button onClick={triggerNextStep}>Next</button>
    </div>
  );
};

DoctorSearch.propTypes = {
  steps: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default DoctorSearch;
