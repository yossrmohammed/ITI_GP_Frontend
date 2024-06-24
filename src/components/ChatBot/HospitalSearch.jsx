import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../../axios'; // Import your axios instance

const HospitalSearch = ({ steps, triggerNextStep }) => {
  const { hospital_city_name } = steps;
  const [loading, setLoading] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const baseUrl = import.meta.env.VITE_FRONT_URL; // Use VITE_FRONT_URL

  useEffect(() => {
    const fetchHospitals = async (city) => {
      try {
        const response = await axiosInstance.get('/hospitals', { params: { address: city} });
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hospital_city_name?.value) {
      fetchHospitals(hospital_city_name.value);
    }
  }, [hospital_city_name]);

  return (
    <div>
      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length > 0 ? (
        <div>
          <p>Here are the hospitals (click on name to get hospital page):</p>
          <ul>
            {hospitals.map((hospital) => (
              <li key={hospital.id}>
                <a href={`${baseUrl}/hospital/${hospital.id}`} target="_blank" rel="noopener noreferrer">
                  {hospital.user.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hospitals found.</p>
      )}
      <button onClick={triggerNextStep}>Next</button>
    </div>
  );
};

HospitalSearch.propTypes = {
  steps: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default HospitalSearch;
